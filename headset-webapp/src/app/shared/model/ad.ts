/* tslint:disable */
export class Ad
{
    id?: string;
    name?: string;
    type?: number;
    online?: boolean;
    urls?: string[];
    size?: number;
    repeat?: boolean;
    createdDate?: string;

    constructor()
    {
        this.online = false;
        this.urls = [];
        this.repeat = true;
        this.type = 1
    }
}
