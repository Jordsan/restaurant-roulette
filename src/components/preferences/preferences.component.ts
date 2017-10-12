import { Component } from '@angular/core';
import { PopoverController, Events } from 'ionic-angular';

import { CuisinesComponent } from '../menu-content/cuisines.component'

@Component({
    selector: 'preferences',
    templateUrl: 'preferences.component.html'
})
export class PreferencesComponent {

    preferencesList: string[];

    constructor(
        public popoverCntrl: PopoverController,
        private events: Events) {
        this.preferencesList = new Array();

        events.subscribe('cuisine-update', (list) => {
            this.preferencesList = list;
        });
    }

    cuisinesPopover(myEvent) {
        let popover = this.popoverCntrl.create(CuisinesComponent, { 'list': this.preferencesList });
        popover.present({
            ev: myEvent
        });

        popover.onDidDismiss(() => {
            console.log(this.preferencesList);
        })
    }

}
