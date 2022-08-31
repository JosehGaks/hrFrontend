import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, catchError, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { NotFoundError } from '../common/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  headers= new HttpHeaders()
    .set('content-type', 'application/json')

  constructor(@Inject(String) private url :string,private http:HttpClient) { }

  getAll(){
    return this.http.get(this.url).pipe(
      map((res:any) => res),
      catchError(this.handleError)
    )
  }

  getSingle(id:string){
    return this.http.get(this.url+'/'+id).pipe(
      map(res => res),
      catchError(this.handleError)
    )
  }

  create(resource:any){
    console.log(resource)
    return this.http.post(this.url,JSON.stringify(resource),{'headers':this.headers}).pipe(
        map(res => res),
      catchError(this.handleError)
    )
  }

  update(resource:any,id:any){
    return this.http.put(this.url+'/'+id,JSON.stringify(resource),{'headers':this.headers}).pipe(
      map(res => res),
      catchError(this.handleError)
    )
  }

  patchPassword(id:string,resource:any){
    return this.http.patch(this.url+'/'+id,JSON.stringify(resource),{'headers':this.headers}).pipe(
      map(res => res),
      catchError(this.handleError)
    )
  }

  delete(id: any){
    console.log(id)
    return this.http.delete(this.url+'/'+id).pipe(
        map(res => res),
      catchError(this.handleError)
    )
  }


  private handleError(err:HttpErrorResponse){
    if(err.status === 400){
      return throwError(() => new BadInput(err))
    }

    if(err.status === 404){
      return throwError(() => new NotFoundError())
    }

    return throwError(() => new AppError(err))

  }
}
