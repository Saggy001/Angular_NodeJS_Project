import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginPayload, RegistePayload, User } from "./user-interface";

@Injectable({providedIn: "root"})
export class AuthService{
    constructor(private http : HttpClient){}

    registerUser(data: RegistePayload): Observable<{message: string}>{
        return this.http.post<{message: string}>(environment.apiUrl+"/auth/register", data);
    }

    checkEmailExistance(email : string): Observable<{data?: boolean,message?: string}>{
        return this.http.get<{data?: boolean,message?: string}>
        (environment.apiUrl+"/auth/check-email-exist/"+email);
    }

    loginUser(data: LoginPayload): Observable<{message: string, token?: string}>{
        return this.http.post<{message: string, token?: string}>
        (environment.apiUrl+ "/auth/login",data);
    }

    getUsers():Observable<{data?: RegistePayload[],message?: string}>{
        return this.http.get<{data?: RegistePayload[] ,message?: string}>
        (environment.apiUrl+"/auth/users");
    }

    forgetpassword(email: string): Observable<{message: string}>{
        return this.http.post<{message: string}>
        (environment.apiUrl+"/auth/forget/"+email, "");
    }

    getUser(token: string): Observable<{email : string}>{
        return this.http.get<{email: string}>(environment.apiUrl+"/auth/users/"+token);
    }

    checkTokenValid(token : string): Observable<{message?: string, result?: string}>{
        return this.http.get<{message?: string, result?: string}>
        (environment.apiUrl+"/auth/check-token-valid/"+token);
    }

    resetPassword(data : {password:string}, token : string): Observable<{message: string}>{
        return this.http.post<{message: string}>
        (environment.apiUrl+"/auth/reset-password/"+token, data);
    }

    myCredentials(): Observable<{data: User}>{
        return this.http.get<{data: User}>(environment.apiUrl+ "/auth/me");
    }

    logout(): Observable<{message: string}>{
        return this.http.post<{message: string}>(environment.apiUrl+"/auth/logout","");
    }
}