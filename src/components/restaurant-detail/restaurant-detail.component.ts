import { Component, Input } from '@angular/core';
import { Restaurant } from '../../components/restaurants/restaurant';
import { ProfileService } from '../../services/profile/profile.service';



@Component({
  selector: 'restaurant-detail',
  templateUrl: 'restaurant-detail.component.html'
})
export class RestaurantDetailComponent {

  @Input()
  private restaurant: Restaurant;

  constructor(private profileService: ProfileService) {
    
  }

  getMoreDetail(): void {

  }

  getPrev(): void {

  }

  select(): void {
    this.profileService.addRestaurant(this.restaurant);
  }

  getNext(): void {

  }
}
