import { Address } from "@shared/model/address";

export interface IUser
{
    activated: boolean;
    address?: Address;
    authorities?: Array<string>;
    birthday?: string;
    createdBy?: string;
    createdDate?: string;
    deleted?: boolean;
    email?: string;
    id?: string;
    imageUrl?: string;
    inviteId?: string;
    langKey?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    login?: string;
    userName?: string;
    phone?: string;
    sex?: number;
    sortOrder?: number;
    status?: number;
    nickName?: string;
    wxOpenId?: string;
    isDeleted?: boolean;
}

export class User implements IUser
{
    constructor()
    {
        this.status = 0;
        this.sex = 1
    }

    activated: boolean;
    address: Address;
    authorities: Array<string>;
    birthday: string;
    createdBy: string;
    createdDate: string;
    deleted: boolean;
    email: string;
    id: string;
    imageUrl: string;
    inviteId: string;
    isDeleted: boolean;
    langKey: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    login: string;
    nickName: string;
    phone: string;
    sex: number;
    sortOrder: number;
    status: number;
    userName: string;
    wxOpenId: string;
}
