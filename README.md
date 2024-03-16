# AllInOne repo : Career Officer 


## Development server commands

ng build dal --watch --preserve-symlinks

ng g application x

ng g library x

ng new my-workspace --createApplication=false

ng generate application my-app1
ng generate application my-app2

ng serve my-app1


ng new my-workspace --createApplication=false
ng new my-workspace --create-application=false
ng new my-workspace --create-application=false

ng new my-workspace --create-application=false
cd my-workspace
ng generate application my-app1
ng generate application my-app2

ng build dal --watch --preserve-symlinks







ng generate library my-shared-library
ng serve my-app1
ng build my-app1



ng build my-app1
ng build my-app2


ng generate library my-shared-library

ng build my-shared-library

"my-shared-library": {
  "root": "projects/my-shared-library",
  "sourceRoot": "projects/my-shared-library/src",
  "projectType": "library",
  "prefix": "lib",
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-ng-packagr:build",
      "options": {
        "tsConfig": "projects/my-shared-library/tsconfig.lib.json",
        "project": "projects/my-shared-library/ng-package.json"
      }
    }
  }
}



