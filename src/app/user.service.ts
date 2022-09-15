import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, UserInterface } from "./user-interface";
import { UserCountInterface } from "./get-filter-user-model";
import { environment } from "src/environments/environment";

@Injectable({providedIn: "root"})
export class UserService{

    constructor(private http: HttpClient ) { }

    getUser(id:number) : Observable<{message?: string, data?: User}> {
        return this.http.get<{message?: string, data?: User}>
        (environment.apiUrl+"/users/"+id);
    }

    getUsers(sortBy:string, sortDir:string, search:string, page:number):
    Observable<UserCountInterface>{
        return this.http.get<UserCountInterface>(environment.apiUrl+"/users", { params : {sortBy , sortDir , search, page}});
    }

    deleteUser(id: number) : Observable<{}>{
        return this.http.delete(environment.apiUrl+"/users/"+id);
    }

    createUser(user : FormData) : Observable<{message: string}>{
        return this.http.post<{message: string}>(environment.apiUrl+"/users/", user);
    }

    updateUser(user: FormData) : Observable<{message: string}> {
        return this.http.put<{message: string}>(environment.apiUrl+"/users", user);
    }
    updateUserWithId(id: number,user: FormData) : Observable<{message: string}> {
        return this.http.put<{message: string}>(environment.apiUrl+"/users/"+id, user);
    }
}