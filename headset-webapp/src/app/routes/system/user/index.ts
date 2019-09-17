import { STColumnTag } from '@delon/abc';

export const userStatus: STColumnTag = {
    0        : { text: '正常', color: '#87d068' },
    1        : { text: '禁用', color: '#f50' },
    2        : { text: '已删除', color: 'geekblue' },
};

export const dictItemState: STColumnTag = {
    1: { text: '启用', color: '#87d068' },
    0: { text: '禁用', color: '#f50' },
};
