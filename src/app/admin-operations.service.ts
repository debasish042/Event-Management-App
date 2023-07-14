import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AdminOperationsService {
  constructor(private http: HttpClient) {}

  public getAdminDetails(): Observable<any> {
    return this.http.get('http://localhost:3000/admin');
  }
  public updateAdminDetails(admin: any): Observable<any> {
    return this.http.put('http://localhost:3000/admin', admin);
  }
  public getAllEmployees(): Observable<any> {
    return this.http.get('http://localhost:3000/employees');
  }
  public getEmployeeById(id:number):Observable<any>{
    return this.http.get('http://localhost:3000/employees/'+id);
  }
  public addEmployee(employee:any):Observable<any>{
    return this.http.post('http://localhost:3000/employees',employee);
  }
  public updateEmployee(employee:any):Observable<any>{
    return this.http.put('http://localhost:3000/employees/'+employee.id,employee);

  }
  public deleteEmployee(id:number):Observable<any>{
    return this.http.delete('http://localhost:3000/employees/'+id);
  }
}
