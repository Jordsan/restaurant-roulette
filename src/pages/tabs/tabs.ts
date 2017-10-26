import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

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

    reloadSlides: boolean = false;
    loaded: boolean = false;
    tabIndex: number = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private preferencesFilterService: PreferencesFilterService,
        private rouletteService: RouletteService,
        private nativePageTransitions: NativePageTransitions,
        private events: Events) {

        this.events.subscribe('preferences-change-listener', (value) => {
            this.reloadSlides = value;
        });
    };

    getFilteredRestaurants(): void {
        this.preferencesFilterService.filterRestaurants();
        if (this.reloadSlides) {
            console.log("preference change detected!");

            this.events.publish('reload-slides');
            this.reloadSlides = false;
        }
        else {
            console.log('NO PREF CHANGE');
        }

        for (let restaurant of this.preferencesFilterService.getFilteredRestaurants()) {
            console.log("Filtered Restaurant List: " + restaurant.name);
        }
    }

    getAnimationDirection(index): string {
        var currentIndex = this.tabIndex;

        this.tabIndex = index;

        switch (true) {
            case (currentIndex < index):
                return ('left');
            case (currentIndex > index):
                return ('right');
        }
    }

    transition(e): void {
        let options: NativeTransitionOptions = {
            direction: this.getAnimationDirection(e.index),
            duration: 250,
            slowdownfactor: -1,
            slidePixels: 0,
            iosdelay: 20,
            androiddelay: 0,
            fixedPixelsTop: 0,
            fixedPixelsBottom: 48
        };

        if (!this.loaded) {
            this.loaded = true;
            return;
        }

        this.nativePageTransitions.slide(options);
    }
}
