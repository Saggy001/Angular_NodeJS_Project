export interface UserInterface { 
    id: number; 
    name: string; 
    age: number; 
    image: string; 
    email: string; 
 }

 export interface User{ 
    id: number; 
    name: string; 
    age: number|null; 
    image: string; 
    email: string;
    dob: string; 
 }

 export interface RegistePayload {
     email: string;
     password: string;
     name?: string;
 }

 export interface LoginPayload {
     email: string;
     password: string;
 }