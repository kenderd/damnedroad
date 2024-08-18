import { Timestamp } from "firebase/firestore"

export type product = {

id:string,
name:string,
description:string,
creator:string,
price:number,
preview_image:string,
created:Timestamp,


}