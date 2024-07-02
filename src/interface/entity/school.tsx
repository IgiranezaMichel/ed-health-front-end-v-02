import { IAccountHolder } from "./accountholder"

export interface ISchool{
 id?:string
 name:string
 logo:string
 location:string
 accountHolderDto:IAccountHolder
}