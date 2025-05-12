import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class S3ImgUploaderService {
    constructor(http) {
        this.http = http;
        this.ID = 'AKIA4UUDZ7ELYTIWAQWH';
        this.SECRET = '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';
        this.BUCKET_NAME = 'tartibat';
    }
    uploadFile(file) {
        const contentType = file.type;
        const ext = file.name.split('.').pop();
        const bucket = new AWS.S3({
            accessKeyId: this.ID,
            secretAccessKey: this.SECRET,
            region: 'eu-central-1',
        });
        const params = {
            Bucket: this.BUCKET_NAME,
            Key: 'injaz/co/uploaded-' + uuid() + '.' + ext,
            Body: file,
            ACL: 'public-read',
            ContentType: contentType,
        };
        return bucket.upload(params);
    }
    uploadParamsFile(file) {
        const contentType = file.type;
        const ext = file.name.split('.').pop();
        const bucket = new AWS.S3({
            accessKeyId: this.ID,
            secretAccessKey: this.SECRET,
            region: 'ap-south-1',
        });
        const params = {
            Bucket: this.BUCKET_NAME,
            Key: 'uploaded-' + uuid() + '.' + ext,
            Body: file,
            ACL: 'public-read',
            ContentType: contentType,
        };
        let url = bucket.getSignedUrl('putObject', params);
        let options = {
            reportProgress: true,
            observe: 'events',
        };
        return url;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: S3ImgUploaderService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: S3ImgUploaderService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: S3ImgUploaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczMtaW1nLXVwbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9kYWwvc3JjL2xpYi9hd3MvczMtaW1nLXVwbG9hZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssR0FBRyxNQUFNLFNBQVMsQ0FBQztBQUMvQixPQUFPLEVBQUUsRUFBRSxJQUFJLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBSWxDLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNwQyxPQUFFLEdBQUcsc0JBQXNCLENBQUM7UUFDNUIsV0FBTSxHQUFHLDBDQUEwQyxDQUFDO1FBQ3BELGdCQUFXLEdBQUcsVUFBVSxDQUFDO0lBSGMsQ0FBQztJQUl4QyxVQUFVLENBQUMsSUFBUztRQUNsQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzlCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRXZDLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUN4QixXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDcEIsZUFBZSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQzVCLE1BQU0sRUFBRSxjQUFjO1NBQ3ZCLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQ3hCLEdBQUcsRUFBRSxvQkFBb0IsR0FBRyxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRztZQUM5QyxJQUFJLEVBQUUsSUFBSTtZQUNWLEdBQUcsRUFBRSxhQUFhO1lBQ2xCLFdBQVcsRUFBRSxXQUFXO1NBQ3pCLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQVM7UUFDeEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM5QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUV2QyxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDeEIsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BCLGVBQWUsRUFBRSxJQUFJLENBQUMsTUFBTTtZQUM1QixNQUFNLEVBQUUsWUFBWTtTQUNyQixDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBRztZQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVztZQUN4QixHQUFHLEVBQUUsV0FBVyxHQUFHLElBQUksRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQ3JDLElBQUksRUFBRSxJQUFJO1lBQ1YsR0FBRyxFQUFFLGFBQWE7WUFDbEIsV0FBVyxFQUFFLFdBQVc7U0FDekIsQ0FBQztRQUNGLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELElBQUksT0FBTyxHQUFHO1lBQ1osY0FBYyxFQUFFLElBQUk7WUFDcEIsT0FBTyxFQUFFLFFBQVE7U0FDbEIsQ0FBQztRQUVGLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzsrR0FoRFUsb0JBQW9CO21IQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7NEZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSAnYXdzLXNkayc7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUzNJbWdVcGxvYWRlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XG4gIElEID0gJ0FLSUE0VVVEWjdFTFlUSVdBUVdIJztcbiAgU0VDUkVUID0gJ0ZxL25jY2haK0VEanV0QmdlQ0wxSWYybHArdStPNVMzck93M0lDczInO1xuICBCVUNLRVRfTkFNRSA9ICd0YXJ0aWJhdCc7XG4gIHVwbG9hZEZpbGUoZmlsZTogYW55KSB7XG4gICAgY29uc3QgY29udGVudFR5cGUgPSBmaWxlLnR5cGU7XG4gICAgY29uc3QgZXh0ID0gZmlsZS5uYW1lLnNwbGl0KCcuJykucG9wKCk7XG5cbiAgICBjb25zdCBidWNrZXQgPSBuZXcgQVdTLlMzKHtcbiAgICAgIGFjY2Vzc0tleUlkOiB0aGlzLklELFxuICAgICAgc2VjcmV0QWNjZXNzS2V5OiB0aGlzLlNFQ1JFVCxcbiAgICAgIHJlZ2lvbjogJ2V1LWNlbnRyYWwtMScsXG4gICAgfSk7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgQnVja2V0OiB0aGlzLkJVQ0tFVF9OQU1FLFxuICAgICAgS2V5OiAnaW5qYXovY28vdXBsb2FkZWQtJyArIHV1aWQoKSArICcuJyArIGV4dCxcbiAgICAgIEJvZHk6IGZpbGUsXG4gICAgICBBQ0w6ICdwdWJsaWMtcmVhZCcsXG4gICAgICBDb250ZW50VHlwZTogY29udGVudFR5cGUsXG4gICAgfTtcbiAgICByZXR1cm4gYnVja2V0LnVwbG9hZChwYXJhbXMpO1xuICB9XG5cbiAgdXBsb2FkUGFyYW1zRmlsZShmaWxlOiBhbnkpIHtcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IGZpbGUudHlwZTtcbiAgICBjb25zdCBleHQgPSBmaWxlLm5hbWUuc3BsaXQoJy4nKS5wb3AoKTtcblxuICAgIGNvbnN0IGJ1Y2tldCA9IG5ldyBBV1MuUzMoe1xuICAgICAgYWNjZXNzS2V5SWQ6IHRoaXMuSUQsXG4gICAgICBzZWNyZXRBY2Nlc3NLZXk6IHRoaXMuU0VDUkVULFxuICAgICAgcmVnaW9uOiAnYXAtc291dGgtMScsXG4gICAgfSk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBCdWNrZXQ6IHRoaXMuQlVDS0VUX05BTUUsXG4gICAgICBLZXk6ICd1cGxvYWRlZC0nICsgdXVpZCgpICsgJy4nICsgZXh0LFxuICAgICAgQm9keTogZmlsZSxcbiAgICAgIEFDTDogJ3B1YmxpYy1yZWFkJyxcbiAgICAgIENvbnRlbnRUeXBlOiBjb250ZW50VHlwZSxcbiAgICB9O1xuICAgIGxldCB1cmwgPSBidWNrZXQuZ2V0U2lnbmVkVXJsKCdwdXRPYmplY3QnLCBwYXJhbXMpO1xuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgcmVwb3J0UHJvZ3Jlc3M6IHRydWUsXG4gICAgICBvYnNlcnZlOiAnZXZlbnRzJyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHVybDtcbiAgfVxufVxuIl19