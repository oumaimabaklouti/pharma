import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CertifService {

  apiUrl = environment.apiUrl
  

  constructor(private httpClient:HttpClient ) {
   }
   addcertif(certif:any):Observable<any>{
    return this.httpClient.post(`${this.apiUrl}/certif/nouveau`,certif)
  }
  getAllCertif():Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/certif/all`)
  }
  getCertif(id:string):Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/certif/${id}`)
  }
  updateCertif(id:string,certif:any):Observable<any>{
    return this.httpClient.put(`${this.apiUrl}/certif/modifier/${id}`,certif)
  }
  deleteCertif(id:string):Observable<any>{
    return this.httpClient.delete<any>(`${this.apiUrl}/certif/${id}`)
  }
}
