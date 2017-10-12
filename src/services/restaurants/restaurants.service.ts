import { Injectable } from '@angular/core';

import { Restaurant } from '../../components/restaurants/restaurant'
import { MockDatabase } from './mock-database'


@Injectable()
export class RestaurantsService {
    private db: MockDatabase;

    private restaurants: Restaurant[];

    constructor() {
        this.db = new MockDatabase();
        this.restaurants = new Array();

        this.restaurants = this.db.getList();
    }

    getAllRestaurants(): Restaurant[] {
        return this.restaurants;
    }

    setRestaurants(list: Restaurant[]): void {
        this.restaurants = list;
    }


}