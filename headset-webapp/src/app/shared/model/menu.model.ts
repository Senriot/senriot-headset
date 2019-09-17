import {IEntity} from "@shared/model/entity";

export const enum MenuType {
  MENU = 'MENU',
  BUTTON = 'BUTTON'
}

export interface IMenu extends IEntity {
  id?: string;
  acl?: string[];
  disabled?: boolean;
  externalLink?: string;
  hide?: boolean;
  hideInBreadcrumb?: boolean;
  i18N?: string;
  icon?: string;
  isGroup?: boolean;
  link?: string;
  linkExact?: boolean;
  text?: string;
  remark?: string;
  sortOrder?: number;
  status?: number;
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  roles?: number[];
  selected?: boolean;
  parentId?: string;
  children?: Menu[];
}

export class Menu implements IMenu {
  constructor(
    public id?: string,
    public acl?: string[],
    public disabled?: boolean,
    public externalLink?: string,
    public hide?: boolean,
    public hideInBreadcrumb?: boolean,
    public i18N?: string,
    public icon?: string,
    public isGroup?: boolean,
    public link?: string,
    public linkExact?: boolean,
    public text?: string,
    public remark?: string,
    public sortOrder?: number,
    public status?: number,
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public roles?: number[],
    public parentId?: string,
    public selected?: boolean,
    public children?: Menu[]
  ) {
    this.children = [];
    this.status = 1;
    this.disabled = this.disabled || false;
    this.hide = this.hide || false;
    this.hideInBreadcrumb = this.hideInBreadcrumb || false;
    this.isGroup = this.isGroup || false;
    this.linkExact = this.linkExact || false;
  }
}
