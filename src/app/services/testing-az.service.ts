import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TestingAZService {
//Retrieve URL from API for security purposes
  private ApiURLs = 'http://localhost:7112/api/Function1';



  constructor(private httpC: HttpClient) { 
     
  }

  CallCompVisionFunction(imageURL: string): Observable<any> {
    try {
      const headers= new HttpHeaders()
      .set('imageURL', imageURL).set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
      //Retrieve URL from API for security purposes
      return this.httpC.get<any>('http://localhost:7112/api/FunctionComputerVision',{headers})
    } catch (error) {
      return of(null);
    }
  }

 CallDallE(prompt: string) : Observable<any> {

  try {
       const headers= new HttpHeaders()
      .set('prompt', prompt).set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

      //For Below call, the CORS Allowed Origins must be updated at the AZ Portal Function configuration to either only some endpoints or * for all origins.
      //Retrieve URL from API for security purposes
      let callh = this.httpC.get<any>('https://affromportal.azurewebsites.net/api/PromptReviewGEN', {headers});

      return callh;
    
  } catch (error) {

    return of(null);
  }
 }

  TestAzFN() : Observable<any>{
     const httpOptions ={
    headers: new HttpHeaders({
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'X-Requested-With': 'XMLHttpRequest'
      })
  };
    //alert("Reach call BackEnd")
    return this.httpC.get<any>('http://localhost:7112/api/Function1');
    
  }
}
