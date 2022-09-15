import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn : "root"})
export class BroadcastService {
    public selected: BehaviorSubject<string>;

    constructor() {
        this.selected = new BehaviorSubject<string>("home");
    }
}