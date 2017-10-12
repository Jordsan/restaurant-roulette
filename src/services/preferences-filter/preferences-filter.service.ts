import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';


import { Restaurant } from '../../components/restaurants/restaurant'
import { RestaurantsService } from '../restaurants/restaurants.service'


@Injectable()
export class PreferencesFilterService {

    private filteredRestaurantsSubject = new Subject<Restaurant[]>();
    public filteredRestaurantsStream$ = this.filteredRestaurantsSubject.asObservable();

    private filteredRestaurants: Restaurant[];
    private preferencesList: string[];

    constructor(private events: Events, private restaurantsService: RestaurantsService) {
        this.preferencesList = new Array();
        this.filteredRestaurants = new Array();

        events.subscribe('cuisine-update', (list) => {
            this.preferencesList = list;
        })
    }

    broadcastListChange(list: Restaurant[]): void {
        this.filteredRestaurantsSubject.next(list);
    }

    filterRestaurants(): void {
        let tempList = this.restaurantsService.getAllRestaurants().filter((restaurant: Restaurant) => {
            for (let tag of restaurant.tags) {
                if (this.preferencesList.includes(tag)) {
                    return true;
                }
            }
            return false;
        });
        this.filteredRestaurants = tempList;
        if (tempList.length > 0) {
            this.broadcastListChange(tempList);
        }
        else {
            this.filteredRestaurants = this.restaurantsService.getAllRestaurants();
            this.broadcastListChange(this.restaurantsService.getAllRestaurants());
            console.log("hit");
            console.log(this.restaurantsService.getAllRestaurants());
        }

    }

    getFilteredRestaurants(): Restaurant[] {
        return this.filteredRestaurants;
    }

}