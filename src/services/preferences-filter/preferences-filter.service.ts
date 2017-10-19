import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { Restaurant } from '../../components/restaurants/restaurant';
import { RestaurantsService } from '../restaurants/restaurants.service';


@Injectable()
export class PreferencesFilterService {

    private filteredRestaurants: Restaurant[];
    private cuisinesList: string[];
    private restaurantTypes: string[];
    private priceRange: {lower: number, upper: number} = { lower: 1, upper: 5};
    private distanceRange: number = 25;

    constructor(private events: Events, private restaurantsService: RestaurantsService) {
        this.cuisinesList = new Array();
        this.filteredRestaurants = new Array();
        this.restaurantTypes = new Array();

        events.subscribe('cuisine-update', (list) => {
            this.cuisinesList = list;
        });

        events.subscribe('price-update', (range) => {
            this.priceRange = range;
        });

        events.subscribe('distance-update', (range) => {
            this.distanceRange = range;
        });
        events.subscribe('types-update', (list) => {
            this.restaurantTypes = list;
        });
    }

    broadcastListChange(list: Restaurant[]): void {
        this.events.publish('restaurant-filter', list);
    }

    filterRestaurants(): void {
        console.log("dist: " + this.distanceRange);
        console.log("price: ");
        console.log(this.priceRange);
        console.log("types: " );
        console.log(this.restaurantTypes);
        let tempList = this.restaurantsService.getAllRestaurants().filter((restaurant: Restaurant) => {
            let pass = false;
            for (let tag of restaurant.tags) {
                if (this.cuisinesList.includes(tag)) {
                    pass = true;
                    break;
                }
                else {
                    pass = false;
                }
            }
            if (pass){
                for (let type of restaurant.types) {
                    if (this.restaurantTypes.includes(type)) {
                        pass = true;
                        break;
                    }
                    else {
                        pass = false;
                    }
                }
            }
            if (pass){
                if (restaurant.distance <= this.distanceRange &&
                    restaurant.price >= this.priceRange.lower &&
                    restaurant.price <= this.priceRange.upper) {
                    pass = true;
                }
                else { 
                    pass = false;
                }
            }
            return pass;
        });

        this.filteredRestaurants = tempList;
        if (tempList.length > 0) {
            this.broadcastListChange(tempList);
        }
        else {
            console.log("no restaurants made it through the filters, entire list returned");
            this.filteredRestaurants = this.restaurantsService.getAllRestaurants();
            this.broadcastListChange(this.restaurantsService.getAllRestaurants());
            console.log(this.restaurantsService.getAllRestaurants());
        }
    }

    getFilteredRestaurants(): Restaurant[] {
        if (this.filteredRestaurants.length > 0) {
            return this.filteredRestaurants;            
        }
        else {
            return this.restaurantsService.getAllRestaurants();
        }
    }

}