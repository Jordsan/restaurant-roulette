import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Restaurant } from '../../components/restaurants/restaurant';
import { ProfileService } from '../../services/profile/profile.service';


@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    private recentRestaurants: Restaurant[];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private profileService: ProfileService) {
        this.recentRestaurants = this.profileService.getRecentsList();
    }

    ionViewDidLoad(): void {
        this.profileService.recentRestaurantsStream$
            .subscribe(list => {
                this.recentRestaurants = list;
            });
    }

}
