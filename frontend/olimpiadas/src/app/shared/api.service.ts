import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import { HomeModel } from '../home/home.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  postHomeDetails(homeModelObj: HomeModel) {
    throw new Error('Method not implemented.');
  }

  constructor(private http : HttpClient) { }

  postAtleta(data : any){
    return this.http.post<any>("http://localhost:3000/atletas", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getAtleta(data : any){
    return this.http.get<any>("http://localhost:3000/atletas/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateAtleta(data : any,id: number){
    return this.http.put<any>("http://localhost:3000/atletas/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteAtleta(id : number){
    return this.http.delete<any>("http://localhost:3000/atletas/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
 
}
