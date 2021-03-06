import { Component } from '@angular/core';
import { PopoverController, Events } from 'ionic-angular';

import { CuisinesComponent } from '../menu-content/cuisines.component'

@Component({
    selector: 'preferences',
    templateUrl: 'preferences.component.html'
})
export class PreferencesComponent {

    cuisinesList: string[];
    restaurantTypes: string[];
    priceRange: { lower: number, upper: number } = { lower: 1, upper: 5 };
    distanceRange: number = 25;

    constructor(
        public popoverCntrl: PopoverController,
        private events: Events) {
        this.cuisinesList = new Array();
        this.restaurantTypes = new Array();

        events.subscribe('cuisine-update', (list) => {
            this.cuisinesList = list;
        });
    }

    cuisinesPopover(myEvent) {
        let popover = this.popoverCntrl.create(CuisinesComponent, { 'list': this.cuisinesList });
        popover.present({
            ev: myEvent
        });

        popover.onDidDismiss(() => {
            console.log(this.cuisinesList);
        })
    }

    updatePrice(): void {
        this.events.publish('price-update', this.priceRange);
        this.events.publish('preferences-change-listener', true);        
    }

    updateDistance(): void {
        this.events.publish('distance-update', this.distanceRange);
        this.events.publish('preferences-change-listener', true);        
    }

    updateTypes(preference: string, action: boolean): void {
        if (action) {
            this.restaurantTypes.push(preference);
        }
        else {
            this.restaurantTypes.splice(this.restaurantTypes.indexOf(preference), 1)
        }

        this.events.publish('types-update', this.restaurantTypes);
        this.events.publish('preferences-change-listener', true);        
    }

    getSymbol(num: number): string {
        let answer: string = "";

        for (let i = 0; i < num; i++){
            answer += '$';
        }
        return answer
    }
}
