import type { ClashProfile } from "../../types.ts";
import { parseYaml, stringifyYaml } from "../../deps.ts";

export default function (yamlProfile: string): string {
  const profile = parseYaml(yamlProfile) as ClashProfile;

  // names of all proxy nodes
  const proxies = [
    "DIRECT",
    "REJECT",
    ...profile.proxies.map((p) => p.name),
  ];

  // completed proxy groups
  const completedProxyGroups = [
    {
      name: "1️⃣节点一",
      type: "select",
      proxies,
    },
    {
      name: "2️⃣节点二",
      type: "select",
      proxies,
    },
    {
      name: "3️⃣节点三",
      type: "select",
      proxies,
    },
  ];

  // limited proxy groups
  const limitedProxies = ["DIRECT", "REJECT", "1️⃣节点一", "2️⃣节点二", "3️⃣节点三"];
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

  // merge completed and limited proxy groups as the full proxy group list
  profile["proxy-groups"] = [
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
