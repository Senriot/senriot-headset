export interface IDeviceLog
{
    id?: number;
    generateTime?: Date;
    msgType?: string;
    payload?: any;
    topic?: string;
    deviceId?: number;
    deviceName?: string;
}

export class DeviceLog implements IDeviceLog
{
    constructor(
        public id?: number,
        public generateTime?: Date,
        public msgType?: string,
        public payload?: any,
        public topic?: string,
        public deviceId?: number,
        public deviceName?: string
    )
    {}
}
