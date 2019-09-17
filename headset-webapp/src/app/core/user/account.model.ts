import { IMenu } from "@shared/model/menu.model";

export class Account
{
    constructor(
        public activated: boolean,
        public authorities: string[],
        public email: string,
        public userName: string,
        public langKey: string,
        public nickName: string,
        public login: string,
        public imageUrl: string,
        public menus: Array<IMenu>
    )
    {
    }
}
