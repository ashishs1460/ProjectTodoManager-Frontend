import { User } from "./user";

export interface AuthenticationResponse{
    user:User
    token:string;
}