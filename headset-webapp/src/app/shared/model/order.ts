/* tslint:disable */
import { DeviceUserBind } from './device-user-bind';

export interface Order {
  id?: string;
  ordersId?: string;
  orderType?: 'weixin' | 'alipay';
  paymentSystemOrderId?: string;
  amount?: number;
  createAt?: number;
  opName?: string;
  provinceAgencyId?: string;
  agencyId?: string;
  agencyName?: string;
  agencyBonus?: number;
  staffId?: string;
  qrUserId?: string;
  qrUserName?: string;
  qrUserBonus?: number;
  storeId?: string;
  storeName?: string;
  withdrawNickName?: string;
  city?: string;
  province?: string;
  deviceUsers?: Array<DeviceUserBind>;
  qrDeviceUsers?: Array<DeviceUserBind>;
  status?: number;
  deviceId?: string;
  deviceName?: string;
  type?: number;
  wxOpenIds?: Array<string>;
  withdraw?: number;
  name?: string;
}
