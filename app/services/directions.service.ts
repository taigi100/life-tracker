import { Injectable } from '@angular/core';
import { LifeDirection } from '../shared/life-direction.model';
import * as fs from 'file-system';
import { ReplaySubject } from 'rxjs';

@Injectable()

export class DirectionsService {

      private _file: fs.File;
      private _fileName: string = "LifeDirectionData.txt";
      private _directions: Array<LifeDirection> = [];
      public LifeDirections: ReplaySubject<Array<LifeDirection>> = new ReplaySubject(1);

      constructor() {
         this.LifeDirections.subscribe(
            data => this._directions = data
         );
      }
      public LoadDirections(): ReplaySubject<Array<LifeDirection>> {
         if (!this._directions || this._directions.length === 0)
            return this.ReadFile();
         else {
            this.LifeDirections.next(this._directions);
            return this.LifeDirections;
         }
      }

      public addDirection(item : LifeDirection): void {
            let documents = fs.knownFolders.documents();
            this._file = documents.getFile(this._fileName);
            this._directions.push(item);
            this.LifeDirections.next(this._directions);
            this._file.writeText(JSON.stringify(this._directions))
               .catch(err => console.log("Failed to save directions data to file due to:" + err));
      }
      private ReadFile(): ReplaySubject<Array<LifeDirection>> {
            if (!fs.File.exists(this._fileName))
               this.LifeDirections.next([]);

            let documents = fs.knownFolders.documents();
            this._file = documents.getFile(this._fileName);

            this._file.readText()
                .then(res => this.LifeDirections.next(<Array<LifeDirection>>JSON.parse(res)))
                .catch(err => { console.log('Failed to read file due to: ' + err); this.LifeDirections.next([]);});

         return this.LifeDirections; // Enabling chaning.
      }
}
