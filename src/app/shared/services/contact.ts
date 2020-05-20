import { DatePipe } from '@angular/common';

export class Contact {
    id:number;
    createdAt:DatePipe;
    phone:string;
    name:string;
    imgUrl:string;
    items: Array<any>;
}
