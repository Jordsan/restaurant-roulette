import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RoulettePage } from '../roulette/roulette';
import { ProfilePage } from '../profile/profile';
import { PreferencesPage } from '../preferences/preferences';

import { Restaurant } from '../../components/restaurants/restaurant';
import { PreferencesFilterService } from '../../services/preferences-filter/preferences-filter.service';
import { RouletteService } from '../../services/roulette/roulette.service';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    rootPage: any = this;
    roulettePage: any = RoulettePage;
    profilePage: any = ProfilePage;
    preferencesPage: any = PreferencesPage;

    mySelectedIndex: number;

    constructor(public navCtrl: NavController, public navParams: NavParams,
            private preferencesFilterService: PreferencesFilterService,
            private rouletteService: RouletteService) {
        this.mySelectedIndex = navParams.data.tabIndex || 1;
    };

    getFilteredRestaurants(): void {
        this.preferencesFilterService.filterRestaurants();
        if (this.checkPreferencesChange()){
            
        }

        for (let restaurant of this.preferencesFilterService.getFilteredRestaurants()) {
            console.log("Filtered Restaurant List: " + restaurant.name);
        }
    }

    checkPreferencesChange(): boolean {
        return true;
    }
}
