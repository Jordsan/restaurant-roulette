import { Component } from '@angular/core';

import { PreferencesFilterService } from '../../services/preferences-filter/preferences-filter.service';


export class Pair {

  public cuisine: String;
  public active: boolean;

  constructor (cuisine: String, active: boolean){
    this.cuisine = cuisine;
    this.active = active;
  }
}

@Component({
  selector: 'cuisines',
  templateUrl: 'cuisines.component.html'
})
export class CuisinesComponent {

  private cuisineList: Pair[];

  constructor(private preferencesFilterService: PreferencesFilterService) {
    this.cuisineList = new Array();

    this.cuisineList.push(new Pair("American", false));
    this.cuisineList.push(new Pair("Chinese", false));
    this.cuisineList.push(new Pair("French", false));
    this.cuisineList.push(new Pair("Greek", false));
    this.cuisineList.push(new Pair("Mexican", false));
    this.cuisineList.push(new Pair("Italian", false));
    this.cuisineList.push(new Pair("Indian", false));
    this.cuisineList.push(new Pair("Japanese", false));
    this.cuisineList.push(new Pair("Mediterranean", false));
    this.cuisineList.push(new Pair("Vietnamese", false));
  }

  updatePreferences(preference: string, status: boolean): void {
    this.preferencesFilterService.updatePreferences(preference, status);
    console.log(this.preferencesFilterService.getPreferencesList());
  }

}
