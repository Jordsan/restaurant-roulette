import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from '@ionic-native/geolocation';

import { Restaurant } from '../../components/restaurants/restaurant';
import { MockDatabase } from './mock-database';


@Injectable()
export class RestaurantsService {
    private db: MockDatabase;

    private restaurants: Restaurant[];

    private filteredRestaurants: Restaurant[];
    private cuisinesList: string[];
    private restaurantTypes: string[];
    private priceRange: { lower: number, upper: number } = { lower: 1, upper: 5 };
    private distanceRange: number = 25;

    private baseURL: string = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    private key: string = 'AIzaSyDI0Kc6bbpWPIq9uCtSAd9xqvPucbViy-k';
    private lat: number;
    private long; number;

    constructor(private geolocation: Geolocation, private events: Events, private http: Http) {
        this.db = new MockDatabase();
        this.restaurants = new Array();

        this.restaurants = this.db.getList();

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

    ngOnInit() {
        this.getLocation();
    }

    getAllRestaurants(): Restaurant[] {
        return this.restaurants;
    }

    test(): void {
        for (let query of this.generateQueries()) {
            console.log(query);
            this.http.get(query)
                .subscribe(data => {
                    console.log('my data: ', data.json());
                });
        }
    }

    generateQueries(): string[] {
        let queryList: string[] = new Array();
        let keywords: string = '';

        if (this.cuisinesList.length === 0) {
            queryList.push(`${this.baseURL}` +
                `location=${this.lat},${this.long}` +
                `&radius=${this.toMeters(this.distanceRange)}` +
                `&minprice=${this.priceRange.lower - 1}` +
                `&maxprice=${this.priceRange.upper - 1}` +
                `&type=restaurant` +
                `&key=${this.key}`);
        }
        else {
            for (let i = 0; i < this.cuisinesList.length; i++) {
                if (i < this.cuisinesList.length - 1) {
                    keywords += this.cuisinesList[i] + '%20OR%20';
                }
                else {
                    keywords += this.cuisinesList[i];
                }
            }
            queryList.push(`${this.baseURL}` +
                `location=${this.lat},${this.long}` +
                `&radius=${this.toMeters(this.distanceRange)}` +
                `&minprice=${this.priceRange.lower - 1}` +
                `&maxprice=${this.priceRange.upper - 1}` +
                `&keyword=${keywords}` +
                `&type=restaurant` +
                `&key=${this.key}`);
        }

        return queryList;
    }

    toMeters(input: number): number {
        return input * 1609.344;
    }

    getLocation(): void {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
            this.long = resp.coords.longitude;
            console.log(this.lat, this.long);
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    broadcastListChange(list: Restaurant[]): void {
        this.events.publish('restaurant-filter', list);
    }

    filterRestaurants(): void {
        console.log("dist: " + this.distanceRange);
        console.log("price: ");
        console.log(this.priceRange);
        console.log("types: ");
        console.log(this.restaurantTypes);
        let tempList = this.getAllRestaurants().filter((restaurant: Restaurant) => {
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
            if (pass) {
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
            if (pass) {
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
            this.filteredRestaurants = this.getAllRestaurants();
            this.broadcastListChange(this.getAllRestaurants());
            console.log(this.getAllRestaurants());
        }
    }

    getFilteredRestaurants(): Restaurant[] {
        if (this.filteredRestaurants.length > 0) {
            return this.filteredRestaurants;
        }
        else {
            return this.getAllRestaurants();
        }
    }

    getCuisinesList(): string[] {
        return this.cuisinesList;
    }

    getRestaurantTypes(): string[] {
        return this.restaurantTypes;
    }

    getPriceRange(): { lower: number, upper: number } {
        return { lower: this.priceRange.lower, upper: this.priceRange.upper };
    }

    getDistanceRange(): number {
        return this.distanceRange;
    }

}