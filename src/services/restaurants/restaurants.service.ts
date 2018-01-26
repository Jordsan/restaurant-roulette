import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from '@ionic-native/geolocation';

import { Restaurant } from '../../components/restaurants/restaurant';
// import { MockDatabase } from './mock-database';


@Injectable()
export class RestaurantsService {
    // private db: MockDatabase;

    restaurants: Restaurant[];

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

    generateRestaurants(): any {
        console.log('gen rest called');
        //filter out non matches?
        //    use methods in file already

        // ensure within distance range

        let restaurantList: Restaurant[] = new Array();
        let queryList: string[] = new Array();
        let query = this.generateQuery();

        this.http.get(query).map(data => data.json()).subscribe(data => {
            for (let entry of data['results']) {
                let finalURL = this.detailsURL + `placeid=${entry.place_id}&key=${this.key}`;
                queryList.push(finalURL)
            }
            Observable.forkJoin(
                this.http.get(queryList[0]).map((res: Response) => res.json()),
                this.http.get(queryList[1]).map((res: Response) => res.json()),
                this.http.get(queryList[2]).map((res: Response) => res.json()),
                this.http.get(queryList[3]).map((res: Response) => res.json()),
                this.http.get(queryList[4]).map((res: Response) => res.json()),
                this.http.get(queryList[5]).map((res: Response) => res.json()),
                this.http.get(queryList[6]).map((res: Response) => res.json()),
                this.http.get(queryList[7]).map((res: Response) => res.json()),
                this.http.get(queryList[8]).map((res: Response) => res.json()),
                this.http.get(queryList[9]).map((res: Response) => res.json()),
                this.http.get(queryList[10]).map((res: Response) => res.json()),
                this.http.get(queryList[11]).map((res: Response) => res.json()),
                this.http.get(queryList[12]).map((res: Response) => res.json()),
                this.http.get(queryList[13]).map((res: Response) => res.json()),
                this.http.get(queryList[14]).map((res: Response) => res.json()),
                this.http.get(queryList[15]).map((res: Response) => res.json()),
                this.http.get(queryList[16]).map((res: Response) => res.json()),
                this.http.get(queryList[17]).map((res: Response) => res.json()),
                this.http.get(queryList[18]).map((res: Response) => res.json()),
                this.http.get(queryList[19]).map((res: Response) => res.json()),
            ).subscribe(data => {
                for (let entry of data) {
                    let detailsObj = entry['result'];
                    let currRestaurant: Restaurant = {
                        id: detailsObj.place_id !== undefined ? detailsObj.place_id : null,
                        name: detailsObj.name !== undefined ? detailsObj.name : null,
                        address: detailsObj.formatted_address !== undefined ? detailsObj.formatted_address : null,
                        phone: detailsObj.formatted_phone_number !== undefined ? detailsObj.formatted_phone_number : null,
                        menu: detailsObj.website !== undefined ? detailsObj.website : null,
                        reviews: detailsObj.reviews !== undefined ? detailsObj.reviews : null,

                        distance: (detailsObj.geometry !== undefined && detailsObj.geometry.location.lat !== undefined && detailsObj.geometry.location.lng !== undefined) ?
                            this.calculateDistance(detailsObj.geometry.location.lat, detailsObj.geometry.location.lng) : null,
                        price: detailsObj.price_level !== undefined ? detailsObj.price_level : null,
                        rating: detailsObj.rating !== undefined ? detailsObj.rating : null,

                        hours: detailsObj.opening_hours !== undefined ? detailsObj.opening_hours.weekday_text : null,
                        open: detailsObj.opening_hours !== undefined ? detailsObj.opening_hours.open_now : null,

                        tags: null,
                        types: detailsObj.types !== undefined ? detailsObj.types : null,
                    }
                    restaurantList.push(currRestaurant);
                }
                this.restaurants = restaurantList;
                this.events.publish('restaurant-generation', restaurantList);
                return restaurantList;
            });
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

    calculateDistance(lat2: number, long2: number) {
        var p = 0.017453292519943295;
        var c = Math.cos;
        var a = 0.5 - c((lat2 - this.lat) * p) / 2 +
            c(this.lat * p) * c(lat2 * p) *
            (1 - c((long2 - this.long) * p)) / 2;

        return 12742 * Math.asin(Math.sqrt(a)) * 0.62137119;
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

    toMeters(input: number): number {
        return input * 1609.344;
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