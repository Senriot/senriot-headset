/* tslint:disable */
import { Address } from './address';
import { User }    from "@core/user/user.model";

export interface Agency
{
    accountAgencyType?: 'DIRECT' | 'AGENCY';
    account?: User;
    address?: Address;
    agencyType?: 'PROVINCE' | 'CITY';
    company?: string;
    contact?: string;
    createdBy?: string;
    createdDate?: string;
    id?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    name?: string;
    phone?: string;
    provinceAgencyId?: string;
}
