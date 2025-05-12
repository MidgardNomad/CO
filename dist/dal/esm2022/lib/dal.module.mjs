import { NgModule } from '@angular/core';
import { DALComponent } from './dal.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment'; // Adjust the path based on your project structure
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { CoursesService } from './services/courses.service';
import { HttpClientModule } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire/compat";
export class DALModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DALModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: DALModule, declarations: [DALComponent], imports: [i1.AngularFireModule, AngularFireAuthModule,
            HttpClientModule], exports: [FormsModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DALModule, providers: [CoursesService], imports: [AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFireAuthModule,
            HttpClientModule, FormsModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DALModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DALComponent],
                    imports: [
                        AngularFireModule.initializeApp(environment.firebaseConfig),
                        AngularFireAuthModule,
                        HttpClientModule
                    ],
                    exports: [FormsModule],
                    providers: [CoursesService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2RhbC9zcmMvbGliL2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDLENBQUMsa0RBQWtEO0FBQzdHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7OztBQVl4RCxNQUFNLE9BQU8sU0FBUzsrR0FBVCxTQUFTO2dIQUFULFNBQVMsaUJBVEwsWUFBWSxtQ0FHekIscUJBQXFCO1lBQ3JCLGdCQUFnQixhQUVSLFdBQVc7Z0hBR1YsU0FBUyxhQUZULENBQUMsY0FBYyxDQUFDLFlBTHpCLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO1lBQzNELHFCQUFxQjtZQUNyQixnQkFBZ0IsRUFFUixXQUFXOzs0RkFHVixTQUFTO2tCQVZyQixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDNUIsT0FBTyxFQUFFO3dCQUNQLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO3dCQUMzRCxxQkFBcUI7d0JBQ3JCLGdCQUFnQjtxQkFDakI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO29CQUN0QixTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7aUJBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERBTENvbXBvbmVudCB9IGZyb20gJy4vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvY29tcGF0JztcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JzsgLy8gQWRqdXN0IHRoZSBwYXRoIGJhc2VkIG9uIHlvdXIgcHJvamVjdCBzdHJ1Y3R1cmVcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVBdXRoTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9jb21wYXQvYXV0aCc7XG5pbXBvcnQgeyBDb3Vyc2VzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY291cnNlcy5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0RBTENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBBbmd1bGFyRmlyZU1vZHVsZS5pbml0aWFsaXplQXBwKGVudmlyb25tZW50LmZpcmViYXNlQ29uZmlnKSxcbiAgICBBbmd1bGFyRmlyZUF1dGhNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbRm9ybXNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtDb3Vyc2VzU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIERBTE1vZHVsZSB7fVxuIl19