// @ts-ignore
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs/operators';

@Injectable()
export class HttpService {
	private timeoutAux:number = 60000;

	constructor(
		private http: HttpClient,
	) {
	}

	/**
	 * Get http request
	 * @param url
	 * @param params
	 * @param responseType
	 * @param headersAux
	 * @param timeoutReq
	 * @returns
	 */
	public get(url: string): Promise<any> {
		let r:any = this.http.get(url);
    r = r.pipe(timeout(this.timeoutAux));
    return r.toPromise();
	}

	/**
	 * Post http request
	 * @param url
	 * @param body
	 * @param headers
	 * @param responseType
	 * @param timeoutReq
	 * @returns
	 */
	public post(url: string, body:any = null): Promise<any> {
		let r:any = this.http.post(url, body);
    r = r.pipe(timeout(this.timeoutAux));
    return r.toPromise();
	}

	/**
	 * Put http request
	 * @param url
	 * @param body
	 * @param headers
	 * @param timeoutReq
	 * @returns
	 */
	public put(url: string, body:any = null): Promise<any> {
		let r:any = this.http.put(url, body);
    r = r.pipe(timeout(this.timeoutAux));
    return r.toPromise();
	}

	/**
	 * Delete http request
	 * @param url
	 * @param params
	 * @param headers
	 * @param timeoutReq
	 * @returns
	 */
	public delete(url: string): Promise<any> {
		let r:any = this.http.delete(url);
    r = r.pipe(timeout(this.timeoutAux));
    return r.toPromise();
	}

}
