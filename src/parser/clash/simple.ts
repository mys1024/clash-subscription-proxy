import type { ClashProfile, ClashProxyGroup } from "../../types.ts";
import { yaml } from "../../deps.ts";
import { directRules, generateNormalProxyRules } from "./rules.ts";

export default function (yamlProfile: string): string {
  const profile = yaml.parse(yamlProfile) as ClashProfile;

  // names of all raw proxies
  const rawProxies = profile.proxies.map((p) => p.name).sort();

  // region proxy groups
  const regionProxyGroups = [
    {
      name: "🌏 🇭🇰 香港",
      type: "url-test",
      proxies: rawProxies.filter((name) =>
        /(香港|港区|港服|沪港|Hong Kong)/i.test(name)
      ),
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
    },
    {
      name: "🌏 🇹🇼 台湾",
      type: "url-test",
      proxies: rawProxies.filter((name) =>
        /(台湾|台区|台服|Taiwan)/i.test(name)
      ),
      url: "http://www.gstatic.com/generate_204",
      interval: 600,
    },
    {
      name: "🌏 🇯🇵 日本",
      type: "url-test",
      proxies: rawProxies.filter((name) =>
        /(日本|日区|日服|中日|Japan)/i.test(name)
      ),
      url: "http://www.gstatic.com/generate_204",
      interval: 600,
    },
    {
      name: "🌏 🇸🇬 新加坡",
      type: "url-test",
      proxies: rawProxies.filter((name) => /(新加坡|Singapore)/i.test(name)),
      url: "http://www.gstatic.com/generate_204",
      interval: 1200,
    },
    {
      name: "🌏 🇺🇸 美国",
      type: "url-test",
      proxies: rawProxies.filter((name) =>
        /(美国|美区|美服|中美|United States)/i.test(name)
      ),
      url: "http://www.gstatic.com/generate_204",
      interval: 1200,
    },
  ];

  // completed proxy groups
  const completedProxies = [
    "DIRECT",
    "REJECT",
    ...regionProxyGroups.map((g) => g.name),
    ...rawProxies,
  ];
  const completedProxyGroups = [
    {
      name: "⚓ 完全A",
      type: "select",
      proxies: completedProxies,
    },
    {
      name: "⚓ 完全B",
      type: "select",
      proxies: completedProxies,
    },
  ];

  // limited proxy groups
  const limitedProxies = [
    "DIRECT",
    "REJECT",
    ...completedProxyGroups.map((g) => g.name),
    ...regionProxyGroups.map((g) => g.name),
  ];
  const limitedProxyGroup: ClashProxyGroup[] = [
    {
      name: "🚀 B站流量",
      type: "select",
      proxies: [],
    },
    {
      name: "🚀 ChatGPT & Copilot 流量",
      type: "select",
      proxies: [],
    },
    {
      name: "🚀 日本流量",
      type: "select",
      proxies: [],
    },
    {
      name: "🚀 一般代理流量",
      type: "select",
      proxies: [],
    },
    {
      name: "🚀 规则外流量",
      type: "select",
      proxies: [],
    },
  ];
  for (const group of limitedProxyGroup) {
    group.proxies = limitedProxies;
  }

  // merge region, completed and limited proxy groups as the full proxy group list
  profile["proxy-groups"] = [
    ...limitedProxyGroup,
    ...completedProxyGroups,
    ...regionProxyGroups,
  ];

  // replace rules
  profile.rules = [
    // 🚀 B站流量
    "IP-CIDR,101.227.0.0/16,🚀 B站流量,no-resolve",
    "IP-CIDR,101.224.0.0/13,🚀 B站流量,no-resolve",
    "IP-CIDR,119.176.0.0/12,🚀 B站流量,no-resolve",
    "DOMAIN-SUFFIX,acg.tv,🚀 B站流量",
    "DOMAIN-SUFFIX,acgvideo.com,🚀 B站流量",
    "DOMAIN-SUFFIX,b23.tv,🚀 B站流量",
    "DOMAIN-SUFFIX,bigfun.cn,🚀 B站流量",
    "DOMAIN-SUFFIX,bigfunapp.cn,🚀 B站流量",
    "DOMAIN-SUFFIX,biliapi.com,🚀 B站流量",
    "DOMAIN-SUFFIX,biliapi.net,🚀 B站流量",
    "DOMAIN-SUFFIX,bilibili.com,🚀 B站流量",
    "DOMAIN-SUFFIX,bilibili.tv,🚀 B站流量",
    "DOMAIN-SUFFIX,biligame.com,🚀 B站流量",
    "DOMAIN-SUFFIX,biligame.net,🚀 B站流量",
    "DOMAIN-SUFFIX,bilivideo.com,🚀 B站流量",
    "DOMAIN-SUFFIX,hdslb.com,🚀 B站流量",
    "DOMAIN-SUFFIX,im9.com,🚀 B站流量",
    "DOMAIN,upos-hz-mirrorakam.akamaized.net,🚀 B站流量",
    "DOMAIN-SUFFIX,smtcdns.net,🚀 B站流量",
    // 🚀 ChatGPT & Copilot 流量
    "DOMAIN-SUFFIX,openai.com,🚀 ChatGPT & Copilot 流量",
    "DOMAIN-SUFFIX,copilot.microsoft.com,🚀 ChatGPT & Copilot 流量",
    // 🚀 日本流量
    "GEOIP,JP,🚀 日本流量",
    "DOMAIN-SUFFIX,5ch.net,🚀 日本流量",
    "DOMAIN-SUFFIX,dmm.co.jp,🚀 日本流量",
    "DOMAIN-SUFFIX,dmm.com,🚀 日本流量",
    "DOMAIN-SUFFIX,jp,🚀 日本流量",
    // 🚀 一般代理流量
    ...generateNormalProxyRules("🚀 一般代理流量"),
    // DIRECT
    ...directRules,
    // 🚀 规则外流量
    "MATCH,🚀 规则外流量",
  ];

  return yaml.stringify(profile);
}
