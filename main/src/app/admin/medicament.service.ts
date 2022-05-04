import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
export interface medicaments{
  nom:string
  description:string
  quantite:string
  heuresdeprise:string
}
@Injectable({
  providedIn: 'root'
})
export class MedicamentService {
  apiUrl = environment.apiUrl
  

  constructor(private httpClient:HttpClient ) {
   }
   addMedicament(medicament:any):Observable<any>{
    return this.httpClient.post(`${this.apiUrl}/medicament/nouveau`,medicament)
  }
  getAllMedicaments():Observable<any>{
    return this.httpClient.get<any>(`${this.apiUrl}/medicament/all`)
  }
  getmedicament(id:string):Observable<medicaments>{
    return this.httpClient.get<medicaments>(`${this.apiUrl}/medicament/${id}`)
  }
  updateMedicament(id:string,medicament:any):Observable<any>{
    return this.httpClient.put(`${this.apiUrl}/medicament/modifier/${id}`,medicament)
  }
  deleteMedicament(id:string):Observable<medicaments>{
    return this.httpClient.delete<medicaments>(`${this.apiUrl}/medicament/${id}`)
  }

}
