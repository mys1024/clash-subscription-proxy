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
      name: "🚀 哔哩哔哩",
      type: "select",
      proxies: [],
    },
    {
      name: "🚀 国内流量",
      type: "select",
      proxies: [],
    },
    {
      name: "🚀 OpenAI & Bing",
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
    "IP-CIDR,192.168.0.0/16,DIRECT,no-resolve",
    "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",
    "IP-CIDR,172.16.0.0/12,DIRECT,no-resolve",
    "IP-CIDR,127.0.0.0/8,DIRECT,no-resolve",
    "IP-CIDR,100.64.0.0/10,DIRECT,no-resolve",
    "IP-CIDR6,::1/128,DIRECT,no-resolve",
    "IP-CIDR6,fc00::/7,DIRECT,no-resolve",
    "IP-CIDR6,fe80::/10,DIRECT,no-resolve",
    "IP-CIDR6,fd00::/8,DIRECT,no-resolve",
    // 🚀 哔哩哔哩
    "DOMAIN-SUFFIX,biliapi.com,🚀 哔哩哔哩",
    "DOMAIN-SUFFIX,biliapi.net,🚀 哔哩哔哩",
    "DOMAIN-SUFFIX,bilibili.com,🚀 哔哩哔哩",
    "DOMAIN-SUFFIX,bilibili.tv,🚀 哔哩哔哩",
    "DOMAIN-SUFFIX,biligame.com,🚀 哔哩哔哩",
    "DOMAIN-SUFFIX,biligame.net,🚀 哔哩哔哩",
    "DOMAIN-SUFFIX,bilivideo.com,🚀 哔哩哔哩",
    // 🚀 国内流量
    "GEOIP,CN,🚀 国内流量",
    "DOMAIN,app.adjust.com,🚀 国内流量",
    "DOMAIN,bdtj.tagtic.cn,🚀 国内流量",
    "DOMAIN,log.mmstat.com,🚀 国内流量",
    "DOMAIN,sycm.mmstat.com,🚀 国内流量",
    "DOMAIN-SUFFIX,blog.google,🚀 国内流量",
    "DOMAIN-SUFFIX,googletraveladservices.com,🚀 国内流量",
    "DOMAIN,clientservices.googleapis.com,🚀 国内流量",
    "DOMAIN,dl.google.com,🚀 国内流量",
    "DOMAIN,dl.l.google.com,🚀 国内流量",
    "DOMAIN,update.googleapis.com,🚀 国内流量",
    "DOMAIN,translate.googleapis.com,🚀 国内流量",
    "DOMAIN,fonts.googleapis.com,🚀 国内流量",
    "DOMAIN,fonts.gstatic.com,🚀 国内流量",
    "DOMAIN,mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt1-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt2-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt3-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt4-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt5-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt6-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt7-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt8-mtalk.google.com,🚀 国内流量",
    "DOMAIN,pubads.g.doubleclick.net,🚀 国内流量",
    "DOMAIN,fairplay.l.qq.com,🚀 国内流量",
    "DOMAIN,livew.l.qq.com,🚀 国内流量",
    "DOMAIN,vd.l.qq.com,🚀 国内流量",
    "DOMAIN,analytics.strava.com,🚀 国内流量",
    "DOMAIN,msg.umeng.com,🚀 国内流量",
    "DOMAIN,msg.umengcloud.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qhres.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qhimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,alibaba.com,🚀 国内流量",
    "DOMAIN-SUFFIX,alibabausercontent.com,🚀 国内流量",
    "DOMAIN-SUFFIX,alicdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,alikunlun.com,🚀 国内流量",
    "DOMAIN-SUFFIX,alipay.com,🚀 国内流量",
    "DOMAIN-SUFFIX,amap.com,🚀 国内流量",
    "DOMAIN-SUFFIX,autonavi.com,🚀 国内流量",
    "DOMAIN-SUFFIX,dingtalk.com,🚀 国内流量",
    "DOMAIN-SUFFIX,mxhichina.com,🚀 国内流量",
    "DOMAIN-SUFFIX,soku.com,🚀 国内流量",
    "DOMAIN-SUFFIX,taobao.com,🚀 国内流量",
    "DOMAIN-SUFFIX,tmall.com,🚀 国内流量",
    "DOMAIN-SUFFIX,tmall.hk,🚀 国内流量",
    "DOMAIN-SUFFIX,ykimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,youku.com,🚀 国内流量",
    "DOMAIN-SUFFIX,xiami.com,🚀 国内流量",
    "DOMAIN-SUFFIX,xiami.net,🚀 国内流量",
    "DOMAIN-SUFFIX,aaplimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,apple.co,🚀 国内流量",
    "DOMAIN-SUFFIX,apple.com,🚀 国内流量",
    "DOMAIN-SUFFIX,apple-cloudkit.com,🚀 国内流量",
    "DOMAIN-SUFFIX,appstore.com,🚀 国内流量",
    "DOMAIN-SUFFIX,cdn-apple.com,🚀 国内流量",
    "DOMAIN-SUFFIX,icloud.com,🚀 国内流量",
    "DOMAIN-SUFFIX,icloud-content.com,🚀 国内流量",
    "DOMAIN-SUFFIX,me.com,🚀 国内流量",
    "DOMAIN-SUFFIX,mzstatic.com,🚀 国内流量",
    "DOMAIN-SUFFIX,baidu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,baidubcr.com,🚀 国内流量",
    "DOMAIN-SUFFIX,baidupan.com,🚀 国内流量",
    "DOMAIN-SUFFIX,baidupcs.com,🚀 国内流量",
    "DOMAIN-SUFFIX,bdimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,bdstatic.com,🚀 国内流量",
    "DOMAIN-SUFFIX,yunjiasu-cdn.net,🚀 国内流量",
    "DOMAIN-SUFFIX,battle.net,🚀 国内流量",
    "DOMAIN-SUFFIX,blizzard.com,🚀 国内流量",
    "DOMAIN-SUFFIX,acgvideo.com,🚀 国内流量",
    "DOMAIN-SUFFIX,biliapi.com,🚀 国内流量",
    "DOMAIN-SUFFIX,biliapi.net,🚀 国内流量",
    "DOMAIN-SUFFIX,bilibili.com,🚀 国内流量",
    "DOMAIN-SUFFIX,bilibili.tv,🚀 国内流量",
    "DOMAIN-SUFFIX,hdslb.com,🚀 国内流量",
    "DOMAIN-SUFFIX,feiliao.com,🚀 国内流量",
    "DOMAIN-SUFFIX,pstatp.com,🚀 国内流量",
    "DOMAIN-SUFFIX,snssdk.com,🚀 国内流量",
    "DOMAIN-SUFFIX,iesdouyin.com,🚀 国内流量",
    "DOMAIN-SUFFIX,toutiao.com,🚀 国内流量",
    "DOMAIN-SUFFIX,cctv.com,🚀 国内流量",
    "DOMAIN-SUFFIX,cctvpic.com,🚀 国内流量",
    "DOMAIN-SUFFIX,livechina.com,🚀 国内流量",
    "DOMAIN-SUFFIX,21cn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,didialift.com,🚀 国内流量",
    "DOMAIN-SUFFIX,didiglobal.com,🚀 国内流量",
    "DOMAIN-SUFFIX,udache.com,🚀 国内流量",
    "DOMAIN-SUFFIX,hitv.com,🚀 国内流量",
    "DOMAIN-SUFFIX,mgtv.com,🚀 国内流量",
    "DOMAIN-SUFFIX,iqiyi.com,🚀 国内流量",
    "DOMAIN-SUFFIX,iqiyipic.com,🚀 国内流量",
    "DOMAIN-SUFFIX,71.am,🚀 国内流量",
    "DOMAIN-SUFFIX,jd.com,🚀 国内流量",
    "DOMAIN-SUFFIX,jd.hk,🚀 国内流量",
    "DOMAIN-SUFFIX,jdpay.com,🚀 国内流量",
    "DOMAIN-SUFFIX,360buyimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,iciba.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ksosoft.com,🚀 国内流量",
    "DOMAIN-SUFFIX,meitu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,meitudata.com,🚀 国内流量",
    "DOMAIN-SUFFIX,meitustat.com,🚀 国内流量",
    "DOMAIN-SUFFIX,meipai.com,🚀 国内流量",
    "DOMAIN-SUFFIX,dianping.com,🚀 国内流量",
    "DOMAIN-SUFFIX,dpfile.com,🚀 国内流量",
    "DOMAIN-SUFFIX,meituan.com,🚀 国内流量",
    "DOMAIN-SUFFIX,meituan.net,🚀 国内流量",
    "DOMAIN-SUFFIX,duokan.com,🚀 国内流量",
    "DOMAIN-SUFFIX,mi.com,🚀 国内流量",
    "DOMAIN-SUFFIX,mi-img.com,🚀 国内流量",
    "DOMAIN-SUFFIX,miui.com,🚀 国内流量",
    "DOMAIN-SUFFIX,miwifi.com,🚀 国内流量",
    "DOMAIN-SUFFIX,xiaomi.com,🚀 国内流量",
    "DOMAIN-SUFFIX,xiaomi.net,🚀 国内流量",
    "DOMAIN-SUFFIX,visualstudio.com,🚀 国内流量",
    "DOMAIN-SUFFIX,hotmail.com,🚀 国内流量",
    "DOMAIN-SUFFIX,outlook.com,🚀 国内流量",
    "DOMAIN,outlook.office365.com,🚀 国内流量",
    "DOMAIN,smtp.office365.com,🚀 国内流量",
    "DOMAIN-SUFFIX,dl.delivery.mp.microsoft.com,🚀 国内流量",
    "DOMAIN-SUFFIX,update.microsoft.com,🚀 国内流量",
    "DOMAIN-SUFFIX,windowsupdate.com,🚀 国内流量",
    "DOMAIN-SUFFIX,windowsupdate.microsoft.com,🚀 国内流量",
    "DOMAIN,download.microsoft.com,🚀 国内流量",
    "DOMAIN,wustat.windows.com,🚀 国内流量",
    "DOMAIN,ntservicepack.microsoft.com,🚀 国内流量",
    "DOMAIN-SUFFIX,163.com,🚀 国内流量",
    "DOMAIN-SUFFIX,126.com,🚀 国内流量",
    "DOMAIN-SUFFIX,126.net,🚀 国内流量",
    "DOMAIN-SUFFIX,127.net,🚀 国内流量",
    "DOMAIN-SUFFIX,163yun.com,🚀 国内流量",
    "DOMAIN-SUFFIX,lofter.com,🚀 国内流量",
    "DOMAIN-SUFFIX,netease.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ydstatic.com,🚀 国内流量",
    "DOMAIN-SUFFIX,youdao.com,🚀 国内流量",
    "DOMAIN-SUFFIX,paypal.com,🚀 国内流量",
    "DOMAIN-SUFFIX,paypal.me,🚀 国内流量",
    "DOMAIN-SUFFIX,paypalobjects.com,🚀 国内流量",
    "DOMAIN-SUFFIX,sina.com,🚀 国内流量",
    "DOMAIN-SUFFIX,weibo.com,🚀 国内流量",
    "DOMAIN-SUFFIX,weibocdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,sohu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,sohucs.com,🚀 国内流量",
    "DOMAIN-SUFFIX,sohu-inc.com,🚀 国内流量",
    "DOMAIN-SUFFIX,v-56.com,🚀 国内流量",
    "DOMAIN-SUFFIX,sogo.com,🚀 国内流量",
    "DOMAIN-SUFFIX,sogou.com,🚀 国内流量",
    "DOMAIN-SUFFIX,sogoucdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,steamcontent.com,🚀 国内流量",
    "DOMAIN-SUFFIX,steampowered.com,🚀 国内流量",
    "DOMAIN-SUFFIX,steamstatic.com,🚀 国内流量",
    "DOMAIN-SUFFIX,gtimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,idqqimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,igamecj.com,🚀 国内流量",
    "DOMAIN-SUFFIX,myapp.com,🚀 国内流量",
    "DOMAIN-SUFFIX,myqcloud.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qq.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qqmail.com,🚀 国内流量",
    "DOMAIN-SUFFIX,servicewechat.com,🚀 国内流量",
    "DOMAIN-SUFFIX,tencent.com,🚀 国内流量",
    "DOMAIN-SUFFIX,tencent-cloud.com,🚀 国内流量",
    "DOMAIN-SUFFIX,tencent-cloud.net,🚀 国内流量",
    "DOMAIN-SUFFIX,tenpay.com,🚀 国内流量",
    "DOMAIN-SUFFIX,wechat.com,🚀 国内流量",
    "DOMAIN,file-igamecj.akamaized.net,🚀 国内流量",
    "IP-CIDR,182.254.116.0/24,🚀 国内流量,no-resolve",
    "IP-CIDR,203.205.254.0/23,🚀 国内流量,no-resolve",
    "DOMAIN-SUFFIX,ccgslb.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ccgslb.net,🚀 国内流量",
    "DOMAIN-SUFFIX,chinanetcenter.com,🚀 国内流量",
    "DOMAIN-SUFFIX,meixincdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ourdvs.com,🚀 国内流量",
    "DOMAIN-SUFFIX,staticdn.net,🚀 国内流量",
    "DOMAIN-SUFFIX,wangsu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ipip.net,🚀 国内流量",
    "DOMAIN-SUFFIX,ip.la,🚀 国内流量",
    "DOMAIN-SUFFIX,ip.sb,🚀 国内流量",
    "DOMAIN-SUFFIX,ip-cdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ipv6-test.com,🚀 国内流量",
    "DOMAIN-SUFFIX,myip.la,🚀 国内流量",
    "DOMAIN-SUFFIX,test-ipv6.com,🚀 国内流量",
    "DOMAIN-SUFFIX,whatismyip.com,🚀 国内流量",
    "DOMAIN,ip.istatmenus.app,🚀 国内流量",
    "DOMAIN,sms.imagetasks.com,🚀 国内流量",
    "DOMAIN-SUFFIX,netspeedtestmaster.com,🚀 国内流量",
    "DOMAIN,speedtest.macpaw.com,🚀 国内流量",
    "DOMAIN-SUFFIX,acg.rip,🚀 国内流量",
    "DOMAIN-SUFFIX,animebytes.tv,🚀 国内流量",
    "DOMAIN-SUFFIX,awesome-hd.me,🚀 国内流量",
    "DOMAIN-SUFFIX,broadcasthe.net,🚀 国内流量",
    "DOMAIN-SUFFIX,chdbits.co,🚀 国内流量",
    "DOMAIN-SUFFIX,classix-unlimited.co.uk,🚀 国内流量",
    "DOMAIN-SUFFIX,comicat.org,🚀 国内流量",
    "DOMAIN-SUFFIX,empornium.me,🚀 国内流量",
    "DOMAIN-SUFFIX,gazellegames.net,🚀 国内流量",
    "DOMAIN-SUFFIX,hdbits.org,🚀 国内流量",
    "DOMAIN-SUFFIX,hdchina.org,🚀 国内流量",
    "DOMAIN-SUFFIX,hddolby.com,🚀 国内流量",
    "DOMAIN-SUFFIX,hdhome.org,🚀 国内流量",
    "DOMAIN-SUFFIX,hdsky.me,🚀 国内流量",
    "DOMAIN-SUFFIX,icetorrent.org,🚀 国内流量",
    "DOMAIN-SUFFIX,jpopsuki.eu,🚀 国内流量",
    "DOMAIN-SUFFIX,keepfrds.com,🚀 国内流量",
    "DOMAIN-SUFFIX,madsrevolution.net,🚀 国内流量",
    "DOMAIN-SUFFIX,morethan.tv,🚀 国内流量",
    "DOMAIN-SUFFIX,m-team.cc,🚀 国内流量",
    "DOMAIN-SUFFIX,myanonamouse.net,🚀 国内流量",
    "DOMAIN-SUFFIX,nanyangpt.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ncore.cc,🚀 国内流量",
    "DOMAIN-SUFFIX,open.cd,🚀 国内流量",
    "DOMAIN-SUFFIX,ourbits.club,🚀 国内流量",
    "DOMAIN-SUFFIX,passthepopcorn.me,🚀 国内流量",
    "DOMAIN-SUFFIX,privatehd.to,🚀 国内流量",
    "DOMAIN-SUFFIX,pterclub.com,🚀 国内流量",
    "DOMAIN-SUFFIX,redacted.ch,🚀 国内流量",
    "DOMAIN-SUFFIX,springsunday.net,🚀 国内流量",
    "DOMAIN-SUFFIX,tjupt.org,🚀 国内流量",
    "DOMAIN-SUFFIX,totheglory.im,🚀 国内流量",
    "DOMAIN-SUFFIX,cn,🚀 国内流量",
    "DOMAIN-SUFFIX,115.com,🚀 国内流量",
    "DOMAIN-SUFFIX,360in.com,🚀 国内流量",
    "DOMAIN-SUFFIX,51ym.me,🚀 国内流量",
    "DOMAIN-SUFFIX,8686c.com,🚀 国内流量",
    "DOMAIN-SUFFIX,99.com,🚀 国内流量",
    "DOMAIN-SUFFIX,abchina.com,🚀 国内流量",
    "DOMAIN-SUFFIX,accuweather.com,🚀 国内流量",
    "DOMAIN-SUFFIX,agora.io,🚀 国内流量",
    "DOMAIN-SUFFIX,aicoinstorge.com,🚀 国内流量",
    "DOMAIN-SUFFIX,air-matters.com,🚀 国内流量",
    "DOMAIN-SUFFIX,air-matters.io,🚀 国内流量",
    "DOMAIN-SUFFIX,aixifan.com,🚀 国内流量",
    "DOMAIN-SUFFIX,amd.com,🚀 国内流量",
    "DOMAIN-SUFFIX,b612.net,🚀 国内流量",
    "DOMAIN-SUFFIX,bdatu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,beitaichufang.com,🚀 国内流量",
    "DOMAIN-SUFFIX,booking.com,🚀 国内流量",
    "DOMAIN-SUFFIX,bstatic.com,🚀 国内流量",
    "DOMAIN-SUFFIX,cailianpress.com,🚀 国内流量",
    "DOMAIN-SUFFIX,camera360.com,🚀 国内流量",
    "DOMAIN-SUFFIX,chaoxing.com,🚀 国内流量",
    "DOMAIN-SUFFIX,chaoxing.com,🚀 国内流量",
    "DOMAIN-SUFFIX,chinaso.com,🚀 国内流量",
    "DOMAIN-SUFFIX,chuimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,chunyu.mobi,🚀 国内流量",
    "DOMAIN-SUFFIX,cibntv.net,🚀 国内流量",
    "DOMAIN-SUFFIX,cmbchina.com,🚀 国内流量",
    "DOMAIN-SUFFIX,cmbimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,coolapk.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ctrip.com,🚀 国内流量",
    "DOMAIN-SUFFIX,dfcfw.com,🚀 国内流量",
    "DOMAIN-SUFFIX,dji.net,🚀 国内流量",
    "DOMAIN-SUFFIX,docschina.org,🚀 国内流量",
    "DOMAIN-SUFFIX,douban.com,🚀 国内流量",
    "DOMAIN-SUFFIX,doubanio.com,🚀 国内流量",
    "DOMAIN-SUFFIX,douyu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,dxycdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,dytt8.net,🚀 国内流量",
    "DOMAIN-SUFFIX,eastmoney.com,🚀 国内流量",
    "DOMAIN-SUFFIX,eudic.net,🚀 国内流量",
    "DOMAIN-SUFFIX,feng.com,🚀 国内流量",
    "DOMAIN-SUFFIX,fengkongcloud.com,🚀 国内流量",
    "DOMAIN-SUFFIX,frdic.com,🚀 国内流量",
    "DOMAIN-SUFFIX,futu5.com,🚀 国内流量",
    "DOMAIN-SUFFIX,futunn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,gandi.net,🚀 国内流量",
    "DOMAIN-SUFFIX,gcores.com,🚀 国内流量",
    "DOMAIN-SUFFIX,geilicdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,getpricetag.com,🚀 国内流量",
    "DOMAIN-SUFFIX,gifshow.com,🚀 国内流量",
    "DOMAIN-SUFFIX,godic.net,🚀 国内流量",
    "DOMAIN-SUFFIX,heweather.net,🚀 国内流量",
    "DOMAIN-SUFFIX,hicloud.com,🚀 国内流量",
    "DOMAIN-SUFFIX,hongxiu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,hostbuf.com,🚀 国内流量",
    "DOMAIN-SUFFIX,huxiucdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,huya.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ibm.com,🚀 国内流量",
    "DOMAIN-SUFFIX,infinitynewtab.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ithome.com,🚀 国内流量",
    "DOMAIN-SUFFIX,java.com,🚀 国内流量",
    "DOMAIN-SUFFIX,jianguoyun.com,🚀 国内流量",
    "DOMAIN-SUFFIX,jianshu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,jianshu.io,🚀 国内流量",
    "DOMAIN-SUFFIX,jidian.im,🚀 国内流量",
    "DOMAIN-SUFFIX,kaiyanapp.com,🚀 国内流量",
    "DOMAIN-SUFFIX,kaspersky-labs.com,🚀 国内流量",
    "DOMAIN-SUFFIX,keepcdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,kkmh.com,🚀 国内流量",
    "DOMAIN-SUFFIX,lanzous.com,🚀 国内流量",
    "DOMAIN-SUFFIX,luojilab.com,🚀 国内流量",
    "DOMAIN-SUFFIX,maoyan.com,🚀 国内流量",
    "DOMAIN-SUFFIX,maoyun.tv,🚀 国内流量",
    "DOMAIN-SUFFIX,mls-cdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,mobike.com,🚀 国内流量",
    "DOMAIN-SUFFIX,moke.com,🚀 国内流量",
    "DOMAIN-SUFFIX,mubu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,myzaker.com,🚀 国内流量",
    "DOMAIN-SUFFIX,nim-lang-cn.org,🚀 国内流量",
    "DOMAIN-SUFFIX,ntp.org,🚀 国内流量",
    "DOMAIN-SUFFIX,nvidia.com,🚀 国内流量",
    "DOMAIN-SUFFIX,oracle.com,🚀 国内流量",
    "DOMAIN-SUFFIX,plex.tv,🚀 国内流量",
    "DOMAIN-SUFFIX,qidian.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qweather.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qyer.com,🚀 国内流量",
    "DOMAIN-SUFFIX,qyerstatic.com,🚀 国内流量",
    "DOMAIN-SUFFIX,raychase.net,🚀 国内流量",
    "DOMAIN-SUFFIX,ronghub.com,🚀 国内流量",
    "DOMAIN-SUFFIX,ruguoapp.com,🚀 国内流量",
    "DOMAIN-SUFFIX,sankuai.com,🚀 国内流量",
    "DOMAIN-SUFFIX,scomper.me,🚀 国内流量",
    "DOMAIN-SUFFIX,shouqianba.com,🚀 国内流量",
    "DOMAIN-SUFFIX,sm.ms,🚀 国内流量",
    "DOMAIN-SUFFIX,smzdm.com,🚀 国内流量",
    "DOMAIN-SUFFIX,snapdrop.net,🚀 国内流量",
    "DOMAIN-SUFFIX,snwx.com,🚀 国内流量",
    "DOMAIN-SUFFIX,s-reader.com,🚀 国内流量",
    "DOMAIN-SUFFIX,sspai.com,🚀 国内流量",
    "DOMAIN-SUFFIX,subhd.tv,🚀 国内流量",
    "DOMAIN-SUFFIX,takungpao.com,🚀 国内流量",
    "DOMAIN-SUFFIX,teamviewer.com,🚀 国内流量",
    "DOMAIN-SUFFIX,tianyancha.com,🚀 国内流量",
    "DOMAIN-SUFFIX,tophub.today,🚀 国内流量",
    "DOMAIN-SUFFIX,uning.com,🚀 国内流量",
    "DOMAIN-SUFFIX,weather.com,🚀 国内流量",
    "DOMAIN-SUFFIX,weico.cc,🚀 国内流量",
    "DOMAIN-SUFFIX,weidian.com,🚀 国内流量",
    "DOMAIN-SUFFIX,xiachufang.com,🚀 国内流量",
    "DOMAIN-SUFFIX,xiaoka.tv,🚀 国内流量",
    "DOMAIN-SUFFIX,ximalaya.com,🚀 国内流量",
    "DOMAIN-SUFFIX,xinhuanet.com,🚀 国内流量",
    "DOMAIN-SUFFIX,xmcdn.com,🚀 国内流量",
    "DOMAIN-SUFFIX,yangkeduo.com,🚀 国内流量",
    "DOMAIN-SUFFIX,yizhibo.com,🚀 国内流量",
    "DOMAIN-SUFFIX,zhangzishi.cc,🚀 国内流量",
    "DOMAIN-SUFFIX,zhihu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,zhihuishu.com,🚀 国内流量",
    "DOMAIN-SUFFIX,zhimg.com,🚀 国内流量",
    "DOMAIN-SUFFIX,zhuihd.com,🚀 国内流量",
    "DOMAIN,download.jetbrains.com,🚀 国内流量",
    "DOMAIN,images-cn.ssl-images-amazon.com,🚀 国内流量",
    "DOMAIN-SUFFIX,1password.com,🚀 国内流量",
    "DOMAIN-SUFFIX,vultr.com,🚀 国内流量",
    "DOMAIN-SUFFIX,mb3admin.com,🚀 国内流量",
    "DOMAIN-SUFFIX,rixcloud.io,🚀 国内流量",
    "DOMAIN-SUFFIX,tempestapp.io,🚀 国内流量",
    "DOMAIN,mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt1-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt2-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt3-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt4-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt5-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt6-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt7-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt8-mtalk.google.com,🚀 国内流量",
    "DOMAIN,alt9-mtalk.google.com,🚀 国内流量",
    "DOMAIN,captive.apple.com,🚀 国内流量",
    "DOMAIN,time-ios.apple.com,🚀 国内流量",
    "DOMAIN-SUFFIX,gateway.push-apple.com.akadns.net,🚀 国内流量",
    "DOMAIN-SUFFIX,push.apple.com,🚀 国内流量",
    "DOMAIN-KEYWORD,baidu,🚀 国内流量",
    "DOMAIN-SUFFIX,erebor.douban.com,🚀 国内流量",
    // 🚀 OpenAI & Bing
    "DOMAIN-SUFFIX,openai.com,🚀 OpenAI & Bing",
    "DOMAIN-SUFFIX,bing.com,🚀 OpenAI & Bing",
    // 🚀 日本流量
    "GEOIP,JP,🚀 日本流量",
    "DOMAIN-SUFFIX,5ch.net,🚀 日本流量",
    "DOMAIN-SUFFIX,dmm.co.jp,🚀 日本流量",
    "DOMAIN-SUFFIX,dmm.com,🚀 日本流量",
    "DOMAIN-SUFFIX,jp,🚀 日本流量",
    // 🚀 国外流量
    "DOMAIN-KEYWORD,github,🚀 国外流量",
    "DOMAIN-SUFFIX,github.com,🚀 国外流量",
    "DOMAIN-SUFFIX,githubassets.com,🚀 国外流量",
    "DOMAIN-SUFFIX,githubusercontent.com,🚀 国外流量",
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
