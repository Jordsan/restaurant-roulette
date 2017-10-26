import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { PreferencesFilterService } from '../../services/preferences-filter/preferences-filter.service';


export class Pair {

    public cuisine: String;
    public active: boolean;

    constructor(cuisine: String, active: boolean) {
        this.cuisine = cuisine;
        this.active = active;
    }
}

@Component({
    selector: 'cuisines',
    templateUrl: 'cuisines.component.html'
})
export class CuisinesComponent {

    private cuisineList: Pair[];
    private preferencesList: string[];

    constructor(public navParams: NavParams, public events: Events) {
        this.cuisineList = new Array();
        this.preferencesList = new Array();
        this.preferencesList = this.navParams.get('list');
        console.log(this.preferencesList);

        this.cuisineList.push(new Pair("American", false));
        this.cuisineList.push(new Pair("Chinese", false));
        this.cuisineList.push(new Pair("French", false));
        this.cuisineList.push(new Pair("Greek", false));
        this.cuisineList.push(new Pair("Indian", false));
        this.cuisineList.push(new Pair("Italian", false));
        this.cuisineList.push(new Pair("Japanese", false));
        this.cuisineList.push(new Pair("Korean", false));
        this.cuisineList.push(new Pair("Mediterranean", false));
        this.cuisineList.push(new Pair("Mexican", false));
        this.cuisineList.push(new Pair("Vietnamese", false));

        for (let i = 0; i < this.cuisineList.length; i++) {
            for (let preference of this.preferencesList) {
                if (this.cuisineList[i].cuisine === preference) {
                    this.cuisineList[i].active = true;
                }
            }
        }
    }

    updateCuisines(preference: string, action: boolean): void {
        if (action) {
            this.preferencesList.push(preference);
        }
        else {
            this.preferencesList.splice(this.preferencesList.indexOf(preference), 1)
        }

        this.events.publish('cuisine-update', this.preferencesList);
        this.events.publish('preferences-change-listener', true);
    }

}
