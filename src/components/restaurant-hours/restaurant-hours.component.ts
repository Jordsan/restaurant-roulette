import { Component } from '@angular/core';
import { Events, NavParams} from 'ionic-angular';


@Component({
    selector: 'restaurant-hours',
    templateUrl: 'restaurant-hours.component.html'
})
export class RestaurantHoursComponent {

    hours: string[];

    constructor(private navParams: NavParams, private events: Events) {
        this.hours = new Array();
        this.hours = this.navParams.get('list');
    }

}
