import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Restaurant } from '../../components/restaurants/restaurant';

import { PreferencesFilterService } from '../../services/preferences-filter/preferences-filter.service';
import { ProfileService } from '../../services/profile/profile.service';
import { RouletteService } from '../../services/roulette/roulette.service';


@Component({
    selector: 'page-roulette',
    templateUrl: 'roulette.html',
})
export class RoulettePage implements OnInit {

    restaurants: Restaurant[];

    constructor(private navCtrl: NavController,
        private navParams: NavParams,
        private preferencesFilterService: PreferencesFilterService,
        private profileService: ProfileService,
        private rouletteService: RouletteService) {

    }

    ngOnInit(): void {
        this.preferencesFilterService.filteredRestaurantsStream$
            .subscribe(list => {
                this.restaurants = list;
            });
    }

    test() {
        for (let restaurant of this.restaurants) {
            console.log("roulette test: " + restaurant.name);
        }
    }

    ionViewDidLoad() {
    }
}
