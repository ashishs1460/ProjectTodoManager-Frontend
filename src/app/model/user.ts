import { Project } from "./project";

export interface User{
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    projects: Project[];

}