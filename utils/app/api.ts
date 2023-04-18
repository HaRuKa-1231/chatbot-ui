import { Plugin, PluginID } from '@/types/plugin';
import { MemoryVector } from '@/types/memoryVector';

export const getEndpoint = (plugin: Plugin | null) => {
  if (!plugin) {
    return 'api/chat';
  }
  if (plugin.id === PluginID.CHAT_DOCUMENT) {
    return 'api/chatQA';
  }
  if (plugin.id === PluginID.GOOGLE_SEARCH) {
    return 'api/google';
  }

  return 'api/chat';
};
