import { STColumnBadge, STColumnTag } from '@delon/abc';

export const deviceStatus: STColumnBadge  = {
  'DISABLE' : { text: '禁用', color: 'error' },
  'ONLINE'  : { text: '在线', color: 'processing' },
  'UNACTIVE': { text: '未激活', color: 'default' },
  'OFFLINE' : { text: '离线', color: 'warning' },
};
// 0:空闲，1：播放中 2：暂停  8：禁用 -1：异常
export const channelStatus: STColumnBadge = {
  0: { text: '空闲', color: 'default' },
  1: { text: '播放中', color: 'processing' },
  2: { text: '暂停', color: 'warning' },
  8: { text: '禁用', color: 'error' },
};

export const logStatus: STColumnTag = {
  Status      : { text: '设备上下线', color: '#87d068' },
  PropertyPost: { text: '属性上报', color: '#32bbd0' },
  EventPost   : { text: '事件上报', color: '#d0a14b' },
  Lifecycle   : { text: '生命周期', color: '#d07682' },
  Downlink    : { text: '下发数据', color: '#39d085' },
};
