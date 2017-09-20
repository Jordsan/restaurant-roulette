import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Restaurant } from '../../components/restaurants/restaurant';


@Injectable()
export class ProfileService {
    private recentRestaurantsSubject = new Subject<Restaurant[]>();
    public recentRestaurantsStream$ = this.recentRestaurantsSubject.asObservable();

    private recentRestaurants: Restaurant[];

    constructor() {
        this.recentRestaurants = new Array();
    }

    broadcastListChange(list: Restaurant[]): void {
        this.recentRestaurantsSubject.next(list);
    }

    addRestaurant(restaurant: Restaurant): void{
        this.recentRestaurants.push(restaurant);
        this.broadcastListChange(this.recentRestaurants);
    }

    getRecentsList(): Restaurant[] {
        return this.recentRestaurants;
    }
}