import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';

import { Restaurant } from './restaurant';

import { PreferencesFilterService } from '../../services/preferences-filter/preferences-filter.service';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'restaurants',
  templateUrl: 'restaurants.component.html',
})
export class RestaurantsComponent implements OnInit {

  private restaurants: Restaurant[];

  constructor(
    private preferencesFilterService: PreferencesFilterService,
    private profileService: ProfileService
  ) { 
  }

  ngOnInit(): void {
    this.preferencesFilterService.filteredRestaurantsStream$
      .subscribe(list => {
        this.restaurants = list;
      });
  }

  test() {
    for (let restaurant of this.restaurants) {
      console.log("rest test: " + restaurant.name);
    }
  }

  selectRestaurant(restaurant: Restaurant): void {
    console.log("ADDING: " + restaurant.name);
    this.profileService.addRestaurant(restaurant);
  }

}
