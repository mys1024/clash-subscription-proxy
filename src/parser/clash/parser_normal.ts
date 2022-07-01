import type { ClashProfile } from "../../types.ts";
import { yaml } from "../../deps.ts";

/**
 * Returns profile after some preprocessing.
 */
export default function (yamlProfile: string): string {
  const profile = yaml.parse(yamlProfile) as ClashProfile;

  // names of all raw proxies
  const rawProxies = profile.proxies.map((p) => p.name).sort();

  // region proxy groups
  const regionProxyGroups = [
    {
      name: "🇭🇰地域组-香港",
      type: "url-test",
      proxies: rawProxies.filter((name) => /(香港|港区|港服|沪港)/.test(name)),
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
    },
    {
      name: "🇹🇼地域组-台湾",
      type: "url-test",
      proxies: rawProxies.filter((name) => /(台湾|台区|台服)/.test(name)),
      url: "http://www.gstatic.com/generate_204",
      interval: 600,
    },
    {
      name: "🇯🇵地域组-日本",
      type: "url-test",
      proxies: rawProxies.filter((name) => /(日本|日区|日服|中日)/.test(name)),
      url: "http://www.gstatic.com/generate_204",
      interval: 600,
    },
    {
      name: "🇸🇬地域组-新加坡",
      type: "url-test",
      proxies: rawProxies.filter((name) => /(新加坡)/.test(name)),
      url: "http://www.gstatic.com/generate_204",
      interval: 1200,
    },
    {
      name: "🇺🇸地域组-美国",
      type: "url-test",
      proxies: rawProxies.filter((name) => /(美国|美区|美服|中美)/.test(name)),
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
      name: "1️⃣完全组-组一",
      type: "select",
      proxies: completedProxies,
    },
    {
      name: "2️⃣完全组-组二",
      type: "select",
      proxies: completedProxies,
    },
    {
      name: "3️⃣完全组-组三",
      type: "select",
      proxies: completedProxies,
    },
    {
      name: "4️⃣完全组-组四",
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
  const limitedProxyGroup = [
    {
      name: "💻Github",
      type: "select",
      proxies: [],
    },
    {
      name: "🚻日本流量",
      type: "select",
      proxies: [],
    },
    ...profile["proxy-groups"],
  ];
  for (const group of limitedProxyGroup) {
    group.proxies = limitedProxies;
  }

  // merge region, completed and limited proxy groups as the full proxy group list
  profile["proxy-groups"] = [
    ...regionProxyGroups,
    ...completedProxyGroups,
    ...limitedProxyGroup,
  ];

  // prepend additional rules
  const additionalRules = [
    // LAN
    "DOMAIN-SUFFIX,lan,DIRECT",
    "DOMAIN-SUFFIX,local,DIRECT",
    // github
    "DOMAIN-KEYWORD,github,💻Github",
    "IP-CIDR,20.205.243.0/24,💻Github,no-resolve",
    // 日本流量
    "DOMAIN-SUFFIX,5ch.net,🚻日本流量",
    "DOMAIN-SUFFIX,dmm.co.jp,🚻日本流量",
  ];
  profile.rules = [
    ...additionalRules,
    ...profile.rules,
  ];

  return yaml.stringify(profile);
}
