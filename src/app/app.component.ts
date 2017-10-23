import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RoulettePage } from '../pages/roulette/roulette';
import { ProfilePage } from '../pages/profile/profile';
import { PreferencesComponent } from '../components/preferences/preferences.component';

import { PreferencesFilterService } from '../services/preferences-filter/preferences-filter.service';
import { RestaurantsService } from '../services/restaurants/restaurants.service';
import { ProfileService } from '../services/profile/profile.service';
import { RouletteService } from '../services/roulette/roulette.service';



@Component({
    templateUrl: 'app.html',
    providers: [PreferencesFilterService, RestaurantsService, ProfileService, RouletteService],
})
export class MyApp {
    rootPage: any = RoulettePage;
    @ViewChild('content') navCtrl: NavController

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private preferencesFilterService: PreferencesFilterService,
    ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }


    getFilteredRestaurants(): void {
        this.preferencesFilterService.filterRestaurants();

        for (let restaurant of this.preferencesFilterService.getFilteredRestaurants()) {
            console.log("Filtered Restaurant List: " + restaurant.name);
        }
    }

    goToProfile(): void {
        this.navCtrl.push(ProfilePage);
    }

}

