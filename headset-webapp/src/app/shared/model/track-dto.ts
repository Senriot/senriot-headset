/* tslint:disable */
import { FileInfo } from './file-info';

export interface Track
{
    createdBy?: string;
    createdDate?: string;
    id?: number;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    name?: string;
    fileInfo?: FileInfo;
    remark?: string;
    disabled?: boolean;
    userId?: number;
    userName?: string;
}
