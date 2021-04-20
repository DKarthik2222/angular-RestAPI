import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


const apiUrl = environment.employeeUrl;
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getData(url:any){
    return this.http.get(`${apiUrl}/${url}`);
  }
  postData(url:any, data:any){
    return this.http.post(`${apiUrl}/${url}`, data).toPromise()
  }
  updateData(url:any, data:any){
    return this.http.put(`${apiUrl}/${url}`, data).toPromise()
  }
  deleteData(url:any){
    return this.http.delete(`${apiUrl}/${url}`).toPromise();
  }
}
