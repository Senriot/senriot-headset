export const enum OrderType {
  WEIXIN = 'WEIXIN',
  ALIPAY = 'ALIPAY'
}

export interface IOrder {
  id?: number;
  amount?: number;
  opName?: string;
  orderType?: OrderType;
  ordersId?: string;
  paymentSystemOrderId?: string;
  provinceAgencyId?: string;
  status?: string;
  type?: string;
  withdraw?: number;
  withdrawNickName?: string;
  createdBy?: string;
  createdDate?: Date;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public amount?: number,
    public opName?: string,
    public orderType?: OrderType,
    public ordersId?: string,
    public paymentSystemOrderId?: string,
    public provinceAgencyId?: string,
    public status?: string,
    public type?: string,
    public withdraw?: number,
    public withdrawNickName?: string,
    public createdBy?: string,
    public createdDate?: Date
  ) {}
}
