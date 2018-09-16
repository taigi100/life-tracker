import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptHttpModule } from "nativescript-angular/http";

import { HomeComponent } from "./home/home.component";
import { DirectionsService } from "./services/data.service";
import { AddDirComponent } from "./add-direction/add-direction.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AddDirComponent
    ],
    providers: [
      DirectionsService
   ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
