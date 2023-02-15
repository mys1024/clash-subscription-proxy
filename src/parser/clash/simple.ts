import type { ClashProfile, ClashProxyGroup } from "../../types.ts";
import { yaml } from "../../deps.ts";

export default function (yamlProfile: string): string {
  const profile = yaml.parse(yamlProfile) as ClashProfile;

  // names of all raw proxies
  const rawProxies = profile.proxies.map((p) => p.name).sort();

  // region proxy groups
  const regionProxyGroups = [
    {
      name: "🌏 🇭🇰 香港",
      type: "url-test",
      proxies: rawProxies.filter((name) => /(香港|港区|港服|沪港)/.test(name)),
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
    },
    {
      name: "🌏 🇹🇼 台湾",
      type: "url-test",
      proxies: rawProxies.filter((name) => /(台湾|台区|台服)/.test(name)),
      url: "http://www.gstatic.com/generate_204",
      interval: 600,
    },
    {
      name: "🌏 🇯🇵 日本",
      type: "url-test",
      proxies: rawProxies.filter((name) => /(日本|日区|日服|中日)/.test(name)),
      url: "http://www.gstatic.com/generate_204",
      interval: 600,
    },
    {
      name: "🌏 🇸🇬 新加坡",
      type: "url-test",
      proxies: rawProxies.filter((name) => /(新加坡)/.test(name)),
      url: "http://www.gstatic.com/generate_204",
      interval: 1200,
    },
    {
      name: "🌏 🇺🇸 美国",
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
      name: "🚀 哔哩哔哩",
      type: "select",
      proxies: [],
    },
    {
      name: "🚀 OpenAI & Bing",
      type: "select",
      proxies: [],
    },
    {
      name: "🚀 国内流量",
      type: "select",
      proxies: [],
    },
    {
      name: "🚀 日本流量",
      type: "select",
      proxies: [],
    },
    {
      name: "🚀 国外流量",
      type: "select",
      proxies: [],
    },
    {
      name: "🚀 其他流量",
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
    // LAN
    "DOMAIN-SUFFIX,lan,DIRECT",
    "DOMAIN-SUFFIX,local,DIRECT",
    "IP-CIDR,127.0.0.0/8,DIRECT",
    "IP-CIDR,172.16.0.0/12,DIRECT",
    "IP-CIDR,192.168.0.0/16,DIRECT",
    "IP-CIDR,10.0.0.0/8,DIRECT",
    "IP-CIDR,17.0.0.0/8,DIRECT",
    "IP-CIDR,100.64.0.0/10,DIRECT",
    "IP-CIDR,224.0.0.0/4,DIRECT",
    "IP-CIDR6,::1/128,DIRECT",
    "IP-CIDR6,fe80::/10,DIRECT",
    "IP-CIDR6,fc00::/7,DIRECT",
    "IP-CIDR6,fd00::/8,DIRECT",
    // 🚀 哔哩哔哩
    "DOMAIN-SUFFIX,biliapi.com,🚀 哔哩哔哩",
    "DOMAIN-SUFFIX,biliapi.net,🚀 哔哩哔哩",
    "DOMAIN-SUFFIX,bilibili.com,🚀 哔哩哔哩",
    "DOMAIN-SUFFIX,bilibili.tv,🚀 哔哩哔哩",
    "DOMAIN-SUFFIX,bilivideo.com,🚀 哔哩哔哩",
    // 🚀 OpenAI & Bing
    "DOMAIN-SUFFIX,openai.com,🚀 OpenAI & Bing",
    "DOMAIN-SUFFIX,bing.com,🚀 OpenAI & Bing",
    // 🚀 国内流量
    "GEOIP,CN,🚀 国内流量",
    "DOMAIN-SUFFIX,cn,🚀 国内流量",
    "DOMAIN-SUFFIX,mzstatic.com,🚀 国内流量",
    "DOMAIN-SUFFIX,itunes.apple.com,🚀 国内流量",
    "DOMAIN-SUFFIX,icloud.com,🚀 国内流量",
    "DOMAIN-SUFFIX,icloud-content.com,🚀 国内流量",
    "DOMAIN-SUFFIX,me.com,🚀 国内流量",
    "DOMAIN-SUFFIX,aaplimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,cdn20.com,🚀 国内流量",
    "DOMAIN-SUFFIX,cdn-apple.com,🚀 国内流量",
    "DOMAIN-SUFFIX,akadns.net,🚀 国内流量",
    "DOMAIN-SUFFIX,akamaiedge.net,🚀 国内流量",
    "DOMAIN-SUFFIX,edgekey.net,🚀 国内流量",
    "DOMAIN-SUFFIX,mwcloudcdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,mwcname.com,🚀 国内流量",
    "DOMAIN-SUFFIX,apple.com,🚀 国内流量",
    "DOMAIN-SUFFIX,apple-cloudkit.com,🚀 国内流量",
    "DOMAIN-SUFFIX,apple-mapkit.com,🚀 国内流量",
    "DOMAIN-SUFFIX,126.com,🚀 国内流量",
    "DOMAIN-SUFFIX,126.net,🚀 国内流量",
    "DOMAIN-SUFFIX,127.net,🚀 国内流量",
    "DOMAIN-SUFFIX,163.com,🚀 国内流量",
    "DOMAIN-SUFFIX,360buyimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,36kr.com,🚀 国内流量",
    "DOMAIN-SUFFIX,acfun.tv,🚀 国内流量",
    "DOMAIN-SUFFIX,air-matters.com,🚀 国内流量",
    "DOMAIN-SUFFIX,aixifan.com,🚀 国内流量",
    "DOMAIN-KEYWORD,alicdn,🚀 国内流量",
    "DOMAIN-KEYWORD,alipay,🚀 国内流量",
    "DOMAIN-KEYWORD,taobao,🚀 国内流量",
    "DOMAIN-SUFFIX,amap.com,🚀 国内流量",
    "DOMAIN-SUFFIX,autonavi.com,🚀 国内流量",
    "DOMAIN-KEYWORD,baidu,🚀 国内流量",
    "DOMAIN-SUFFIX,bdimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,bdstatic.com,🚀 国内流量",
    "DOMAIN-SUFFIX,bilibili.com,🚀 国内流量",
    "DOMAIN-SUFFIX,bilivideo.com,🚀 国内流量",
    "DOMAIN-SUFFIX,caiyunapp.com,🚀 国内流量",
    "DOMAIN-SUFFIX,clouddn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,cnbeta.com,🚀 国内流量",
    "DOMAIN-SUFFIX,cnbetacdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,cootekservice.com,🚀 国内流量",
    "DOMAIN-SUFFIX,csdn.net,🚀 国内流量",
    "DOMAIN-SUFFIX,ctrip.com,🚀 国内流量",
    "DOMAIN-SUFFIX,dgtle.com,🚀 国内流量",
    "DOMAIN-SUFFIX,dianping.com,🚀 国内流量",
    "DOMAIN-SUFFIX,douban.com,🚀 国内流量",
    "DOMAIN-SUFFIX,doubanio.com,🚀 国内流量",
    "DOMAIN-SUFFIX,duokan.com,🚀 国内流量",
    "DOMAIN-SUFFIX,easou.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ele.me,🚀 国内流量",
    "DOMAIN-SUFFIX,feng.com,🚀 国内流量",
    "DOMAIN-SUFFIX,fir.im,🚀 国内流量",
    "DOMAIN-SUFFIX,frdic.com,🚀 国内流量",
    "DOMAIN-SUFFIX,g-cores.com,🚀 国内流量",
    "DOMAIN-SUFFIX,godic.net,🚀 国内流量",
    "DOMAIN-SUFFIX,gtimg.com,🚀 国内流量",
    "DOMAIN,cdn.hockeyapp.net,🚀 国内流量",
    "DOMAIN-SUFFIX,hongxiu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,hxcdn.net,🚀 国内流量",
    "DOMAIN-SUFFIX,iciba.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ifeng.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ifengimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ipip.net,🚀 国内流量",
    "DOMAIN-SUFFIX,iqiyi.com,🚀 国内流量",
    "DOMAIN-SUFFIX,jd.com,🚀 国内流量",
    "DOMAIN-SUFFIX,jianshu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,knewone.com,🚀 国内流量",
    "DOMAIN-SUFFIX,le.com,🚀 国内流量",
    "DOMAIN-SUFFIX,lecloud.com,🚀 国内流量",
    "DOMAIN-SUFFIX,lemicp.com,🚀 国内流量",
    "DOMAIN-SUFFIX,licdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,luoo.net,🚀 国内流量",
    "DOMAIN-SUFFIX,meituan.com,🚀 国内流量",
    "DOMAIN-SUFFIX,meituan.net,🚀 国内流量",
    "DOMAIN-SUFFIX,mi.com,🚀 国内流量",
    "DOMAIN-SUFFIX,miaopai.com,🚀 国内流量",
    "DOMAIN-SUFFIX,microsoft.com,🚀 国内流量",
    "DOMAIN-SUFFIX,microsoftonline.com,🚀 国内流量",
    "DOMAIN-SUFFIX,miui.com,🚀 国内流量",
    "DOMAIN-SUFFIX,miwifi.com,🚀 国内流量",
    "DOMAIN-SUFFIX,mob.com,🚀 国内流量",
    "DOMAIN-SUFFIX,netease.com,🚀 国内流量",
    "DOMAIN-SUFFIX,office.com,🚀 国内流量",
    "DOMAIN-SUFFIX,office365.com,🚀 国内流量",
    "DOMAIN-KEYWORD,officecdn,🚀 国内流量",
    "DOMAIN-SUFFIX,oschina.net,🚀 国内流量",
    "DOMAIN-SUFFIX,ppsimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,pstatp.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qcloud.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qdaily.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qdmm.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qhimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qhres.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qidian.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qihucdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qiniu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qiniucdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qiyipic.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qq.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qqurl.com,🚀 国内流量",
    "DOMAIN-SUFFIX,rarbg.to,🚀 国内流量",
    "DOMAIN-SUFFIX,ruguoapp.com,🚀 国内流量",
    "DOMAIN-SUFFIX,segmentfault.com,🚀 国内流量",
    "DOMAIN-SUFFIX,sinaapp.com,🚀 国内流量",
    "DOMAIN-SUFFIX,smzdm.com,🚀 国内流量",
    "DOMAIN-SUFFIX,snapdrop.net,🚀 国内流量",
    "DOMAIN-SUFFIX,sogou.com,🚀 国内流量",
    "DOMAIN-SUFFIX,sogoucdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,sohu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,soku.com,🚀 国内流量",
    "DOMAIN-SUFFIX,speedtest.net,🚀 国内流量",
    "DOMAIN-SUFFIX,sspai.com,🚀 国内流量",
    "DOMAIN-SUFFIX,suning.com,🚀 国内流量",
    "DOMAIN-SUFFIX,taobao.com,🚀 国内流量",
    "DOMAIN-SUFFIX,tencent.com,🚀 国内流量",
    "DOMAIN-SUFFIX,tenpay.com,🚀 国内流量",
    "DOMAIN-SUFFIX,tianyancha.com,🚀 国内流量",
    "DOMAIN-SUFFIX,tmall.com,🚀 国内流量",
    "DOMAIN-SUFFIX,tudou.com,🚀 国内流量",
    "DOMAIN-SUFFIX,umetrip.com,🚀 国内流量",
    "DOMAIN-SUFFIX,upaiyun.com,🚀 国内流量",
    "DOMAIN-SUFFIX,upyun.com,🚀 国内流量",
    "DOMAIN-SUFFIX,veryzhun.com,🚀 国内流量",
    "DOMAIN-SUFFIX,weather.com,🚀 国内流量",
    "DOMAIN-SUFFIX,weibo.com,🚀 国内流量",
    "DOMAIN-SUFFIX,xiami.com,🚀 国内流量",
    "DOMAIN-SUFFIX,xiami.net,🚀 国内流量",
    "DOMAIN-SUFFIX,xiaomicp.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ximalaya.com,🚀 国内流量",
    "DOMAIN-SUFFIX,xmcdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,xunlei.com,🚀 国内流量",
    "DOMAIN-SUFFIX,yhd.com,🚀 国内流量",
    "DOMAIN-SUFFIX,yihaodianimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,yinxiang.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ykimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,youdao.com,🚀 国内流量",
    "DOMAIN-SUFFIX,youku.com,🚀 国内流量",
    "DOMAIN-SUFFIX,zealer.com,🚀 国内流量",
    "DOMAIN-SUFFIX,zhihu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,zhimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,zimuzu.tv,🚀 国内流量",
    "DOMAIN-SUFFIX,zoho.com,🚀 国内流量",
    // 🚀 日本流量
    "GEOIP,JP,🚀 日本流量",
    "DOMAIN-SUFFIX,5ch.net,🚀 日本流量",
    "DOMAIN-SUFFIX,dmm.co.jp,🚀 日本流量",
    "DOMAIN-SUFFIX,dmm.com,🚀 日本流量",
    "DOMAIN-SUFFIX,jp,🚀 日本流量",
    // 🚀 国外流量
    "DOMAIN-KEYWORD,github,🚀 国外流量",
    "DOMAIN-KEYWORD,amazon,🚀 国外流量",
    "DOMAIN-KEYWORD,google,🚀 国外流量",
    "DOMAIN-KEYWORD,gmail,🚀 国外流量",
    "DOMAIN-KEYWORD,youtube,🚀 国外流量",
    "DOMAIN-SUFFIX,wikiwand.com,🚀 国外流量",
    "DOMAIN-SUFFIX,wikileaks.org,🚀 国外流量",
    "DOMAIN-SUFFIX,wikimedia.org,🚀 国外流量",
    "DOMAIN-SUFFIX,wikipedia.com,🚀 国外流量",
    "DOMAIN-SUFFIX,wikipedia.org,🚀 国外流量",
    // 🚀 其他流量
    "MATCH,🚀 其他流量",
  ];

  return yaml.stringify(profile);
}
