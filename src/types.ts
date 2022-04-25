export interface ClashProxy {
  name: string;
}

export interface ClashProxyGroup {
  name: string;
  type: string;
  proxies: string[];
}

export interface ClashProfile extends Record<string, unknown> {
  proxies: ClashProxy[];
  "proxy-groups": ClashProxyGroup[];
  rules: string[];
}

export type ClashProfileParser = (yamlProfile: string) => string;
