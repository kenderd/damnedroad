import { Timestamp } from "firebase/firestore"

export type product = {

id:string,
name:string,
description:string,
creator:string,
price:number,
preview_image:string,
product:string
created:Timestamp,
contract_product_id:number,
product_file_name:string,


}