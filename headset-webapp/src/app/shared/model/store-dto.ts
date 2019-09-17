/* tslint:disable */
import { Address } from './address';

export class Store
{
    createdBy?: string;
    createdDate?: string;
    id?: string;
    immutable?: boolean;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    name?: string;
    remove?: boolean;
    ownerId?: string;
    agencyId?: string;
    provinceAgencyId?: string;
    opIds?: Array<string>;
    isRemove?: boolean;
    contact?: string;
    phone?: string;
    deviceCount?: number;
    selloutCount?: number;
    totalValue?: number;
    isImmutable?: boolean;
    address?: Address;

    constructor()
    {
        this.address = {}
    }
}
