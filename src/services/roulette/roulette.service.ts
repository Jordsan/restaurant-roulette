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





    // IDEA FOR CHOOSING RESTAURANTS:
    // every restaurant has an associated probability
    // choose restaurant with highest probability, then suggest the next highest, etc...
    // probability is even for all restaurants if no recents
    //      -> maybe this will change if you can rank how badly you want certain preferences to affect shit, etc
    // if recents restaurants list exists:
    //      -> enhance probability of choosing a restaurant if it has a lot of tag matches with the
    //           tags that are the most common 5 tags among the recent restaurants list


    // maybe assign positive integer points to each restaurant
    // for each tag match with a preference, +1 point?
    // for each tag match with top 5? tags of recents = +1 point?

    // make new map? for top 5?

    // differentiate parts of chooseRestaurant() into own methods?

    // set master and recent lists outside of chooseRestaurant function?

    // maybe do the scoring in an order like this or something:
    //   - first pass through = set scores based on just preferences
    //   - second pass through add to scores based on recent restaurants' tags
    //   - add in other probability factors?


    // more than 5 top tags?


    logMapElements(value, key, map) {
        console.log(`MAP: [${key}] = ${value}`);
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