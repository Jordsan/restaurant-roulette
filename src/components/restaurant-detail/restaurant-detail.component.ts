import { Component, Input, OnInit } from '@angular/core';
import { Events } from 'ionic-angular';
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

    constructor(private profileService: ProfileService, private events: Events) {
        
    }

    ngOnInit(): void {
        for (var i = 0; i < this.restaurant.price; i++){
            this.symbol += "$";
        }
    }

    getMoreDetail(): void {
        this.events.publish('restaurant-more-detail', this.restaurant);
    }
}
