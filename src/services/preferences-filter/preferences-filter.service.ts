import { Injectable } from '@angular/core'; 
import { Subject } from 'rxjs/Subject';


import { Restaurant } from '../../components/restaurants/restaurant'
import { RestaurantsService } from '../restaurants/restaurants.service'


@Injectable()
export class PreferencesFilterService {
    
    private filteredRestaurantsSubject = new Subject<Restaurant[]>();
    public filteredRestaurantsStream$ = this.filteredRestaurantsSubject.asObservable(); 

    private filteredRestaurants: Restaurant[];
    private preferencesList: string[];

    constructor(private restaurantsService: RestaurantsService){
        this.preferencesList = new Array();
        this.filteredRestaurants = new Array();
    }

    broadcastListChange(list: Restaurant[]): void{
        this.filteredRestaurantsSubject.next(list);
    }

    filterRestaurants(): void {
        let tempList = this.restaurantsService.getAllRestaurants().filter((restaurant: Restaurant) =>{
            for(let tag of restaurant.tags){
                if (this.preferencesList.includes(tag)){
                    return true;
                }
            }
            return false;
        }); 
        this.filteredRestaurants =  tempList;
        this.broadcastListChange(tempList);
    }

   

    updatePreferences(preference: string, action: boolean): void {
        if (action){
            this.preferencesList.push(preference);
        }
        else {
            this.preferencesList.splice(this.preferencesList.indexOf(preference), 1)
        }
    }

    addPreference(input: string): void {
        this.preferencesList.push(input);
    }

    
    getPreferencesList(): string[] {
        return this.preferencesList;
    }

    getFilteredRestaurants(): Restaurant[] {
        return this.filteredRestaurants;
    }

}