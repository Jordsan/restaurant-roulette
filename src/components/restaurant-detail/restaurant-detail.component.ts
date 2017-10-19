import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../../components/restaurants/restaurant';
import { ProfileService } from '../../services/profile/profile.service';



@Component({
    selector: 'restaurant-detail',
    templateUrl: 'restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

    @Input()
    private restaurant: Restaurant;

    private symbol: string = "";

    constructor(private profileService: ProfileService) {
        
    }

    ngOnInit(): void {
        for (var i = 0; i < this.restaurant.price; i++){
            this.symbol += "$";
        }
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
