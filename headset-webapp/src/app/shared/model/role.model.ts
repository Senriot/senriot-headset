export interface IRole {
  id?: string;
  name?: string;
  roleName?: string;
  description?: string;
  sortOrder?: number;
  status?: number;
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  menus?: string[];
}

export class Role implements IRole {
  constructor(
    public id?: string,
    public name?: string,
    public roleName?: string,
    public description?: string,
    public sortOrder?: number,
    public status?: number,
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public menus?: string[]
  ) {
  }
}
