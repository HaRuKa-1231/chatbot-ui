import { KeyValuePair } from './data';

export interface Plugin {
  id: PluginID;
  name: PluginName;
  requiredKeys: KeyValuePair[];
}

export interface PluginKey {
  pluginId: PluginID;
  requiredKeys: KeyValuePair[];
}

export enum PluginID {
  GOOGLE_SEARCH = 'google-search',
  CHAT_DOCUMENT = 'chat-document',
}

export enum PluginName {
  GOOGLE_SEARCH = 'Google Search',
  CHAT_DOCUMENT = 'Chat Document',
}

export const Plugins: Record<PluginID, Plugin> = {
  [PluginID.GOOGLE_SEARCH]: {
    id: PluginID.GOOGLE_SEARCH,
    name: PluginName.GOOGLE_SEARCH,
    requiredKeys: [
      {
        key: 'GOOGLE_API_KEY',
        value: '',
      },
      {
        key: 'GOOGLE_CSE_ID',
        value: '',
      },
    ],
  },
  [PluginID.CHAT_DOCUMENT]: {
    id: PluginID.CHAT_DOCUMENT,
    name: PluginName.CHAT_DOCUMENT,
    requiredKeys: []
  },
};

export const PluginList = Object.values(Plugins);
