import { Component } from "@angular/core";
import { LifeDirection } from '../shared/life-direction.model';
import { DirectionsService } from '../services/data.service';
import { Http, Headers } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: "ns-home",
    templateUrl: "./home.component.html",
})
export class HomeComponent {
   directions: LifeDirection[];
   public quote: string = "Default quote";

   constructor(private _directionService: DirectionsService, private http: Http) {
      this._directionService.LifeDirections.subscribe(
         data => this.directions = data
      );
   }

   public Update(item: LifeDirection, value: number): void {
      this._directionService.UpdateData(item,value);
   }
}
