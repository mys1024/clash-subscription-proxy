import type { ClashProfile } from "../../types.ts";
import { parseYaml, stringifyYaml } from "../../deps.ts";

export default function (yamlProfile: string): string {
  const profile = parseYaml(yamlProfile) as ClashProfile;

  // names of all proxy nodes
  const rawProxies = profile.proxies.map((p) => p.name).sort();

  // region proxy groups
  const regionProxyGroups = [
    {
      name: "🇭🇰香港（负载均衡）",
      type: "load-balance",
      proxies: rawProxies.filter((name) => /(香港|港区|港服|沪港)/.test(name)),
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
    },
    {
      name: "🇹🇼台湾（负载均衡）",
      type: "load-balance",
      proxies: rawProxies.filter((name) => /(台湾|台区|台服)/.test(name)),
      url: "http://www.gstatic.com/generate_204",
      interval: 600,
    },
    {
      name: "🇯🇵日本（负载均衡）",
      type: "load-balance",
      proxies: rawProxies.filter((name) => /(日本|日区|日服|中日)/.test(name)),
      url: "http://www.gstatic.com/generate_204",
      interval: 600,
    },
    {
      name: "🇸🇬新加坡（负载均衡）",
      type: "load-balance",
      proxies: rawProxies.filter((name) => /(新加坡)/.test(name)),
      url: "http://www.gstatic.com/generate_204",
      interval: 1200,
    },
    {
      name: "🇺🇸美国（负载均衡）",
      type: "load-balance",
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
      name: "1️⃣节点一",
      type: "select",
      proxies: completedProxies,
    },
    {
      name: "2️⃣节点二",
      type: "select",
      proxies: completedProxies,
    },
    {
      name: "3️⃣节点三",
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
      name: "🚻5ch",
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
    // github
    "DOMAIN-KEYWORD,github,💻Github",
    "IP-CIDR,20.205.243.0/24,💻Github,no-resolve",
    // 5ch
    "DOMAIN-SUFFIX,5ch.net,🚻5ch",
  ];
  profile.rules = [
    ...additionalRules,
    ...profile.rules,
  ];

  return stringifyYaml(profile);
}