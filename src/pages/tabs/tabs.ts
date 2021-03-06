import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ViewChild } from '@angular/core';

//import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

// import { SuperTabsController } from 'ionic2-super-tabs';
// import { SuperTabs} from 'ionic2-super-tabs';

import { RoulettePage } from '../roulette/roulette';
import { ProfilePage } from '../profile/profile';
import { PreferencesPage } from '../preferences/preferences';

import { Restaurant } from '../../components/restaurants/restaurant';
import { RouletteService } from '../../services/roulette/roulette.service';
import { RestaurantsService } from '../../services/restaurants/restaurants.service';

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    //@ViewChild(SuperTabs) superTabs: SuperTabs;

    roulettePage: any = RoulettePage;
    profilePage: any = ProfilePage;
    preferencesPage: any = PreferencesPage;

    reloadSlides: boolean = false;
    loaded: boolean = false;
    tabIndex: number = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private restaurantsService: RestaurantsService,
        private rouletteService: RouletteService,
        //private nativePageTransitions: NativePageTransitions,
        private events: Events, ) {
        //private superTabsCtrl: SuperTabsController) {

        this.events.subscribe('preferences-change-listener', (value) => {
            this.reloadSlides = value;
        });
    };

    getFilteredRestaurants(): void {
        if (this.loaded) {
            if (this.reloadSlides) {
                this.restaurantsService.generateRestaurants();
                console.log("preference change detected!");

                this.events.publish('reload-slides');
                this.reloadSlides = false;
            }
            else {
                console.log('NO PREF CHANGE');
            }
        }
        else {
            this.loaded = true;
        }

        // for (let restaurant of this.restaurantsService.getFilteredRestaurants()) {
        //     console.log("Filtered Restaurant List: " + restaurant.name);
        // }
    }
}
