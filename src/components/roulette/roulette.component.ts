import { Component } from '@angular/core';
import { Restaurant } from '../../components/restaurants/restaurant';
import { RouletteService } from '../../services/roulette/roulette.service';
import { ProfileService } from '../../services/profile/profile.service';



@Component({
  selector: 'roulette',
  templateUrl: 'roulette.component.html'
})
export class RouletteComponent {

  displayedRestaurant: Restaurant;

  constructor(private rouletteService: RouletteService,
              private profileService: ProfileService) {
    
  }


  setDisplayedRestaurant(restaurant: Restaurant): void {
    this.displayedRestaurant = restaurant;
  }

  generateRestaurant(): void {
    this.setDisplayedRestaurant(this.rouletteService.chooseRestaurant());
  }

  selectDisplayedRestaurant(restaurant: Restaurant): void {
    console.log("ADDING: " + restaurant.name);
    this.profileService.addRestaurant(restaurant);
  }

}
