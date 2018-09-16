import { Component } from "@angular/core";
import { LifeDirection } from '../shared/life-direction.model';
import { DirectionsService } from '../services/data.service';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    moduleId: module.id,
    selector: "ns-addDir",
    templateUrl: "./add-direction.component.html",
})
export class AddDirComponent {
   constructor(private _directionService: DirectionsService, private _router:RouterExtensions) {
   }

   public Add(text: string): void {
      console.log('Trying to add:' + text);
      this._directionService.addLifeDirection(<LifeDirection>{name: text, score: 0});
      this._router.back();
   }
}
