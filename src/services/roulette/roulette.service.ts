import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { Restaurant } from '../../components/restaurants/restaurant';

import { ProfileService } from '../profile/profile.service';
import { RestaurantsService } from '../restaurants/restaurants.service';


@Injectable()
export class RouletteService {

    private recentRestaurants: Restaurant[];
    private masterFilteredList: Restaurant[];
    private restaurants: Restaurant[];

    constructor(
        private restaurantsService: RestaurantsService,
        private profileService: ProfileService,
        private events: Events
    ) {
        this.restaurants = new Array();
        this.masterFilteredList = new Array();
        this.recentRestaurants = new Array();
    }



    // maybe do the scoring in an order like this or something:
    //   - first pass through = set scores based on just preferences
    //   - second pass through add to scores based on recent restaurants' tags
    //   - add in other probability factors?


    // IF YOU DENY -> NEGATIVE PROBABILITY
    //  LIKE BUTTON


    // add in preference for to allow for repeat locations? or only keep it to unique locations?

    //instead of reversing after, make it reversed initially in the original for loops
    // --> PERFORMANCE


    // RIGHT NOW WHEN YOU REACH THE END OF THE LIST IT REGENERATES SAME LIST

    // make it regenerate list on every first "play"
    //  - right now regenerates list when every the menu is closed / list runs out of next restaurants
    //  --> doesn't regenerate list when you are cycling through list
    //  --> regenerate list if you select a restaurant?
    //      --> maybe not because could be bad for performance?


    logMapElements(value, key, map) {
        console.log(`MAP: [${key}] = ${value}`);
    }

    logRestaurantScore(value, key, map) {
        console.log(`MAP: [${key.name}] = ${value}`);
    }

    broadcastListChange(list: Restaurant[]): void {
        this.events.publish('restaurant-recommend', list);
    }

    chooseRestaurants(): void {
        this.masterFilteredList = this.restaurantsService.getFilteredRestaurants();
        this.recentRestaurants = this.profileService.getRecentsList();

        if (this.recentRestaurants.length > 0) {
            this.recommendRestaurants();
        }
        else {
            this.broadcastListChange(this.masterFilteredList);
        }
    }

    recommendRestaurants(): void {
        this.restaurants = new Array();
        for (let restaurant of this.masterFilteredList) {
            console.log("  - component master test: " + restaurant.name);
        }
        for (let restaurant of this.recentRestaurants) {
            console.log("  - component recents test: " + restaurant.name);
        }
        let tagsMap: Map<string, number> = new Map<string, number>();
        let restaurantScoreMap: Map<Restaurant, number> = new Map<Restaurant, number>();

        //create map of tags with # of occurences in recents
        for (let restaurant of this.recentRestaurants) {
            for (let tag of restaurant.tags) {
                if (tagsMap.has(tag)) {
                    tagsMap.set(tag, tagsMap.get(tag) + 1);
                }
                else {
                    tagsMap.set(tag, 1);
                }
            }
            for (let type of restaurant.types) {
                if (tagsMap.has(type)) {
                    tagsMap.set(type, tagsMap.get(type) + 1);
                }
                else {
                    tagsMap.set(type, 1);
                }
            }
        }
        tagsMap.forEach(this.logMapElements);

        let topTags: Array<string> = new Array();
        let tempMax: number = 0;
        let tempKey: string;

        for (let i = 0; i < 10; i++) {
            for (let entry of Array.from(tagsMap.entries())) {
                let key = entry[0];
                let value = entry[1];

                if (!(topTags.includes(key))) {
                    if (value > tempMax) {
                        tempKey = key;
                        tempMax = value;
                    }
                }
            }
            topTags.push(tempKey);
            tempKey = "";
            tempMax = 0;
        }
        console.log(topTags);

        for (let restaurant of this.masterFilteredList) {
            for (let tag of restaurant.tags) {
                for (let topTag of topTags) {
                    if (tag == topTag) {
                        if (restaurantScoreMap.has(restaurant)) {
                            restaurantScoreMap.set(restaurant, restaurantScoreMap.get(restaurant) + 1)
                            console.log("SETTING KEY: " + restaurant.name + " [" + restaurantScoreMap.get(restaurant) + "]");
                            console.log("   tag-match: " + topTag)
                        }
                        else {
                            restaurantScoreMap.set(restaurant, 1);
                            console.log("CREATING KEY: " + restaurant.name + " [1]");
                            console.log("   tag-match: " + topTag)
                        }
                    }
                }
            }
            for (let type of restaurant.types) {
                for (let topTag of topTags) {
                    if (type == topTag) {
                        if (restaurantScoreMap.has(restaurant)) {
                            restaurantScoreMap.set(restaurant, restaurantScoreMap.get(restaurant) + 1)
                            console.log("SETTING KEY: " + restaurant.name + " [" + restaurantScoreMap.get(restaurant) + "]");
                            console.log("   tag-match: " + topTag)
                        }
                        else {
                            restaurantScoreMap.set(restaurant, 1);
                            console.log("CREATING KEY: " + restaurant.name + " [1]");
                            console.log("   tag-match: " + topTag)
                        }
                    }
                }
            }
        }

        restaurantScoreMap.forEach(this.logRestaurantScore);

        tempMax = 0;
        let tempRestaurant: Restaurant;

        for (let i = 0; i < restaurantScoreMap.size; i++) {
            for (let entry of Array.from(restaurantScoreMap.entries())) {
                let key = entry[0];
                let value = entry[1];

                if (!(this.restaurants.includes(key))) {
                    if (value > tempMax) {
                        tempRestaurant = key;
                        tempMax = value;
                    }
                }
            }
            this.restaurants.push(tempRestaurant);
            tempRestaurant = null;
            tempMax = 0;
        }

        this.broadcastListChange(this.restaurants);
    }

}