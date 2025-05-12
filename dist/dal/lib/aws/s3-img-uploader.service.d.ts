import { HttpClient } from '@angular/common/http';
import * as AWS from 'aws-sdk';
import * as i0 from "@angular/core";
export declare class S3ImgUploaderService {
    private http;
    constructor(http: HttpClient);
    ID: string;
    SECRET: string;
    BUCKET_NAME: string;
    uploadFile(file: any): AWS.S3.ManagedUpload;
    uploadParamsFile(file: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<S3ImgUploaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<S3ImgUploaderService>;
}
