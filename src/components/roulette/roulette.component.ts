import { Component } from '@angular/core';
import { Restaurant } from '../../components/restaurants/restaurant';
import { RouletteService } from '../../services/roulette/roulette.service';


@Component({
  selector: 'roulette',
  templateUrl: 'roulette.component.html'
})
export class RouletteComponent {


  /*

  for when making the actual restaurant display when you play the game
    have there be a quick summary page with a next button or an ok? button
    quick stats about the restaurant perhaps? brief overview / distance, price, etc

  */
  displayedRestaurant: Restaurant;

  constructor(private rouletteService: RouletteService) {
    
  }

  

  setDisplayedRestaurant(restaurant: Restaurant): void {
    this.displayedRestaurant = restaurant;
  }

  generateRestaurant(): void {
    this.setDisplayedRestaurant(this.rouletteService.chooseRestaurant());
  }

  selectDisplayedRestaurant(): void {
    
  }

}
