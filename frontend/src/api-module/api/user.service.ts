/**
 * Footprint API
 * API for calculating your Carbon footprint
 *
 * OpenAPI spec version: 0.1.0
 * Contact: apiteam@codefor.nl
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';


import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class UserService {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Logs user into the system
     * 
     * @param username The user name for login
     * @param password The password for login in clear text
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public loginUser(username: string, password: string, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public loginUser(username: string, password: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public loginUser(username: string, password: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public loginUser(username: string, password: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (username === null || username === undefined) {
            throw new Error('Required parameter username was null or undefined when calling loginUser.');
        }

        if (password === null || password === undefined) {
            throw new Error('Required parameter password was null or undefined when calling loginUser.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (username !== undefined && username !== null) {
            queryParameters = queryParameters.set('username', <any>username);
        }
        if (password !== undefined && password !== null) {
            queryParameters = queryParameters.set('password', <any>password);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<string>(`${this.basePath}/user/login`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Logs out current logged in user session
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public logoutUser(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public logoutUser(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public logoutUser(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public logoutUser(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/user/logout`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
