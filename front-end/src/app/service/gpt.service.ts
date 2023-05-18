import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom, lastValueFrom, Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class GPTService{

    private generate_endpoint: string = 'http://localhost:8080/api/v1/generate';
    private validate_endpoint: string = 'http://localhost:8080/api/v1/validate';

    constructor(private http: HttpClient){}

    async generate(topic: string){
        const body = { topic: topic };
        let headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
        const targetWord = await lastValueFrom(this.http.post<any>(this.generate_endpoint, body, { headers }));
        return targetWord;
    }

    async validate(word: string){
        const body = { word: word };
        let headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
        const response = await firstValueFrom(this.http.post<any>(this.validate_endpoint, body, {headers}));
        return response;
    }

}
