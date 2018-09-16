import { Injectable } from '@angular/core';
import { LifeDirection } from '../shared/life-direction.model';
import { dayData } from '../shared/day.model';
import * as fs from 'file-system';
import { ReplaySubject } from 'rxjs';
import { LifeData } from '../shared/life-data.model';

@Injectable()
export class DirectionsService {

      private _file: fs.File;
      private _fileName: string = "LifeDirectionData.txt";
      private _directions: LifeDirection[] = [];
      private _fullData: LifeData = <LifeData>{};
      public LifeDirections: ReplaySubject<LifeDirection[]> = new ReplaySubject(1);

      constructor() {
         this.InitialiseFullData();
         this.ReadFile();
         // this.LifeDirections.subscribe(data => this._fullData.total = data);
      }

      public UpdateData(item: LifeDirection, value: number) {
         //TODO: check if those exist, watch for possiblity of error.
         this._fullData.total[this._fullData.total.indexOf(item)].score += value;
         this._fullData.today.stats[this._fullData.total.indexOf(item)].score += value; /// really bad workaround?
         this.SaveData();
      }

      public EndDay(data : LifeDirection[]): void {
         // Push today to days, clean today, record total.
         this._fullData.today.endDate = new Date();
         if (this._fullData.days.push)
            this._fullData.days.push(this._fullData.today);
         else
            this._fullData.days = [this._fullData.today];
         this._fullData.currentDay++;
         this._fullData.today.day = this._fullData.currentDay;
         this._fullData.today.startDate = new Date();
         this._fullData.today.endDate = null;
         this._fullData.today.stats.forEach( (item) => item.score = 0 );
         this.SaveData();
      }

      public getLifeDirections(): LifeDirection[] {
         return this._fullData.total; //TODO: same as the one under.
      }

      public getDays(): dayData[] {
         // return array for days - for graph usage.
         return this._fullData.days; //TODO: Evaluate possibility of this being called before getting fulldata from file.
      }

      public addLifeDirection(item: LifeDirection): void {
         this._fullData.today.stats.push(item);
         this._fullData.total.push(item);
         this.LifeDirections.next(this._fullData.total);
         this.SaveData();
      }

      private SaveData(): void {
         console.log("Saving: " + JSON.stringify(this._fullData));
         let documents = fs.knownFolders.documents();
         this._file = documents.getFile(this._fileName);

         this._file.writeText(JSON.stringify(this._fullData))
            .catch(err => console.log("Failed to save directions data to file due to:" + err));
      }

      private ReadFile(): void {
            if (!fs.File.exists(this._fileName))
               this.LifeDirections.next([]);

            let documents = fs.knownFolders.documents();
            this._file = documents.getFile(this._fileName);

            this._file.readText()
                .then(res => {
                   this._fullData = JSON.parse(res);
                   this.LifeDirections.next(this._fullData.total);
                })
                .catch(err => { console.log('Failed to read file due to: ' + err); this.LifeDirections.next([]);});

         //return this.LifeDirections; // Enabling chaning.
      }

      private InitialiseFullData(): void {
         this._fullData.today = <dayData>{}; // new day
         this._fullData.today.stats = new Array<LifeDirection>(); // new stats
         this._fullData.days = new Array<dayData>();
         this._fullData.today.startDate = new Date();
         this._fullData.total = new Array<LifeDirection>();
         this._fullData.currentDay = 0;
      }
}
