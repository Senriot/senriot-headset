export interface IAuthority {
  id?: number;
  roleName?: string;
}

export class Authority implements IAuthority {
  constructor(public id?: number, public roleName?: string) {}
}
