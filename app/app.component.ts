import { Component } from "@angular/core";
import { DirectionsService } from './services/data.service';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
   constructor(private _directionService: DirectionsService) {}
}
