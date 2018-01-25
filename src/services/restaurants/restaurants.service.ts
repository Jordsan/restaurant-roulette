import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from '@ionic-native/geolocation';

import { Restaurant } from '../../components/restaurants/restaurant';
// import { MockDatabase } from './mock-database';


@Injectable()
export class RestaurantsService {
    // private db: MockDatabase;

    private restaurants: Restaurant[];

    private filteredRestaurants: Restaurant[];
    private cuisinesList: string[];
    private restaurantTypes: string[];
    private priceRange: { lower: number, upper: number } = { lower: 1, upper: 5 };
    private distanceRange: number = 25;

    private baseURL: string = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    private detailsURL: string = 'https://maps.googleapis.com/maps/api/place/details/json?';

    private key: string = 'AIzaSyDI0Kc6bbpWPIq9uCtSAd9xqvPucbViy-k';
    private lat: number;
    private long; number;

    constructor(private geolocation: Geolocation, private events: Events, private http: Http) {
        // this.db = new MockDatabase();
        this.restaurants = new Array();

        // this.restaurants = this.db.getList();

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

    generateRestaurants(): void {
        //filter out non matches?
        //    use methods in file already

        // ensure within distance range

        let restaurantList: Restaurant[] = new Array();
        let query = this.generateQuery();

        this.http.get(query).map(data => data.json()).subscribe(data => {
            for (let entry of data['results']) {
                let finalURL = this.detailsURL + `placeid=${entry.place_id}&key=${this.key}`;
                this.http.get(finalURL).subscribe(details => {
                    // console.log(details.json());
                    let detailsObj = details.json()['result'];
                    // console.log(detailsObj);
                    let currRestaurant: Restaurant = {
                        id: detailsObj.place_id !== undefined ? detailsObj.place_id : null,
                        name: detailsObj.name !== undefined ? detailsObj.name : null,
                        address: detailsObj.formatted_address !== undefined ? detailsObj.formatted_address : null,
                        phone: detailsObj.formatted_phone_number !== undefined ? detailsObj.formatted_phone_number : null,
                        menu: detailsObj.website !== undefined ? detailsObj.website : null,
                        reviews: detailsObj.reviews !== undefined ? detailsObj.reviews : null,

                        distance: (detailsObj.geometry.location.lat !== undefined && detailsObj.geometry.location.lng !== undefined) ? 
                            this.calculateDistance(detailsObj.geometry.location.lat, detailsObj.geometry.location.lng) : null,
                        price: detailsObj.price_level !== undefined ? detailsObj.price_level : null,
                        rating: detailsObj.rating !== undefined ? detailsObj.rating : null,

                        hours: detailsObj.opening_hours.weekday_text !== undefined ? detailsObj.opening_hours.weekday_text : null,
                        open: detailsObj.opening_hours.open_now !== undefined ? detailsObj.opening_hours.open_now : null,

                        tags: null,
                        types: detailsObj.types !== undefined ? detailsObj.types : null,
                    }
                    this.restaurants.push(currRestaurant);
                });
            }
        });
    }

    generateQuery(): string {
        let query: string = '';
        let keywords: string = '';

        if (this.cuisinesList.length === 0) {
            query = `${this.baseURL}` +
                `location=${this.lat},${this.long}` +
                `&radius=${this.toMeters(this.distanceRange)}` +
                // `&rankby=distance` +
                `&minprice=${this.priceRange.lower - 1}` +
                `&maxprice=${this.priceRange.upper - 1}` +
                `&keyword=American%20OR%20Chinese%20OR%20French%20OR%20Greek%20OR%20` +
                `Indian%20OR%20Italian%20OR%20Japanese%20OR%20Korean%20OR%20` +
                `Mediterranean%20OR%20Mexican%20OR%20Vietnamese` +
                `&type=restaurant` +
                `&key=${this.key}`;
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
            query = `${this.baseURL}` +
                `location=${this.lat},${this.long}` +
                `&radius=${this.toMeters(this.distanceRange)}` +
                // `&rankby=distance` +
                `&minprice=${this.priceRange.lower - 1}` +
                `&maxprice=${this.priceRange.upper - 1}` +
                `&keyword=${keywords}` +
                `&type=restaurant` +
                `&key=${this.key}`;
        }

        return query;
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

    calculateDistance(lat2: number, long2: number) {
        var p = 0.017453292519943295;
        var c = Math.cos;
        var a = 0.5 - c((lat2 - this.lat) * p) / 2 +
            c(this.lat * p) * c(lat2 * p) *
            (1 - c((long2 - this.long) * p)) / 2;

        return 12742 * Math.asin(Math.sqrt(a)) * 0.62137119;
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