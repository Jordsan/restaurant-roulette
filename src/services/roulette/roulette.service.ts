import { Injectable } from '@angular/core';
import { Restaurant } from '../../components/restaurants/restaurant';

import { ProfileService } from '../profile/profile.service'
import { PreferencesFilterService } from '../preferences-filter/preferences-filter.service'


@Injectable()
export class RouletteService {

    private recentRestaurants: Restaurant[];
    private masterFilteredList: Restaurant[];
    private restaurants: Restaurant[];

    constructor(
        private preferencesFilterService: PreferencesFilterService,
        private profileService: ProfileService
    ) {
        this.restaurants = new Array();
        this.masterFilteredList = new Array();
        this.recentRestaurants = new Array();
    }



    // differentiate parts of chooseRestaurant() into own methods?

    // set master and recent lists outside of chooseRestaurant function?

    // maybe do the scoring in an order like this or something:
    //   - first pass through = set scores based on just preferences
    //   - second pass through add to scores based on recent restaurants' tags
    //   - add in other probability factors?


    // IF YOU DENY -> NEGATIVE PROBABILITY


    // NEED TO MAKE THE LIST JUST BE SET GLOBALLY AND THEN RUN THROUGH THE LIST ONE BY ONE POPPING
    // OFF THE NEXT ELEMENT
    //   -> right now it will just keep re-appending the list of data so its not working properly yet


    logMapElements(value, key, map) {
        console.log(`MAP: [${key}] = ${value}`);
    }

    logRestaurantScore(value, key, map) {
        console.log(`MAP: [${key.name}] = ${value}`);
    }



    chooseRestaurant(): Restaurant {
        this.masterFilteredList = this.preferencesFilterService.getFilteredRestaurants();
        this.recentRestaurants = this.profileService.getRecentsList();

        for (let restaurant of this.masterFilteredList) {
            console.log("  - component master test: " + restaurant.name);
        }
        for (let restaurant of this.recentRestaurants) {
            console.log("  - component recents test: " + restaurant.name);
        }

        if (this.recentRestaurants.length > 0) {
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

            for (let restaurant of this.masterFilteredList){
                for (let tag of restaurant.tags){
                    for (let topTag of topTags){
                        if (tag == topTag){
                            if (restaurantScoreMap.has(restaurant)){
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

            console.log(this.restaurants);

            return this.restaurants.reverse().pop();

        }
        else if (this.masterFilteredList.length == 0) {
            console.log("do something about this eventually");
        }
        else {
            let randomIndex = Math.floor(Math.random() * (this.masterFilteredList.length));
            console.log("Index: " + randomIndex);
            console.log("Restaurant: \n  id: " + this.masterFilteredList[randomIndex].id
                + "\n  name: " + this.masterFilteredList[randomIndex].name);
            return this.masterFilteredList[randomIndex];
        }
    }

}