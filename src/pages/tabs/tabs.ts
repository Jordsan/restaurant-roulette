import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PreferencesPage } from '../preferences/preferences';
import { RoulettePage } from '../roulette/roulette';
import { ProfilePage } from '../profile/profile';

import { Restaurant } from '../../components/restaurants/restaurant';
import { RestaurantsService } from '../../services/restaurants/restaurants.service';
import { PreferencesFilterService } from '../../services/preferences-filter/preferences-filter.service';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  preferencesPage: any = PreferencesPage;
  roulettePage: any = RoulettePage;
  profilePage: any = ProfilePage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private restaurantsService: RestaurantsService,
    private preferencesFilterService: PreferencesFilterService,
    private profileService: ProfileService)
  {};


  getFilteredRestaurants(): void {
    this.preferencesFilterService.filterRestaurants();

    for (let restaurant of this.preferencesFilterService.getFilteredRestaurants()) {
      console.log(restaurant.name);
    }
  }

  test():void {
    for (let restaurant of this.profileService.getRecentsList()) {
      console.log(restaurant.name);
    }
  }


}
