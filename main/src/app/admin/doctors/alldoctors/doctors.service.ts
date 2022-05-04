import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Doctors } from "./doctors.model";
import { HttpClient } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DoctorsService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<Doctors[]> = new BehaviorSubject<Doctors[]>([]);
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    super();
  }
  addDoctor(doctor:any):Observable<any>{
    return this.httpClient.post(`${this.apiUrl}/docteur/nouveau`,doctor)
  }
  getAllDoctors():Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/docteur/all`)
  }
  getDoctor(id:string):Observable<Doctors>{
    return this.httpClient.get<Doctors>(`${this.apiUrl}/docteur/${id}`)
  }
  updateDoctor(id:string,doctor:any):Observable<any>{
    return this.httpClient.put(`${this.apiUrl}/docteur/modifier/${id}`,doctor)
  }
  deleteDoctor(id:string):Observable<Doctors>{
    return this.httpClient.delete<Doctors>(`${this.apiUrl}/docteur/${id}`)
  }



}