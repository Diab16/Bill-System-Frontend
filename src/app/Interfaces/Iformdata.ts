import { IType } from "../Models/iType";

export interface IFormdata {

  companies: { id: number; name: string ,types:{id:number , name:string}[] }[];
  units: { id: number; name: string }[];

}
