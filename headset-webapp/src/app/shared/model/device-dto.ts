/* tslint:disable */
import { City } from "@shared/model/city";

export class Device
{

    /**
     * 激活时间
     */
    activeDate?: string;
    createdBy?: string;
    createdDate?: string;

    /**
     * 设备ID
     */
    deviceId: string;

    /**
     * 设备名称
     */
    deviceName: string;

    /**
     * 设备秘钥
     */
    deviceSecret?: string;

    /**
     * 设备的固件版本号。
     */
    firmwareVersion?: string;
    id?: string;

    /**
     * 最后IP地址
     */
    ipAddress?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;

    /**
     * 最后在线时间
     */
    onlineDate?: string;

    /**
     * 产品Key
     */
    productKey?: string;

    /**
     * 设备状态。取值： ONLINE：设备在线。 OFFLINE：设备离线。 UNACTIVE：设备未激活。 DISABLE：设备已禁用。
     */
    status?: string;
    storeId?: string;
    storeName?: string;
    province?: City;
    city?: City;
    district?: City;
    address?: string;

    managers?: number[];
    
    bookCategories?:number[];

    constructor()
    {
        this.status = "UNACTIVE";
    }
}

export class DeviceStatistics
{
    activeCount: number;
    deviceCount: number;
    onlineCount: number;

    constructor()
    {
        this.activeCount = 0;
        this.deviceCount = 0;
        this.onlineCount = 0;
    }
}
