import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PreferencesFilterService } from '../../services/preferences-filter/preferences-filter.service';

@Component({
  selector: 'page-preferences',
  templateUrl: 'preferences.html',
})
export class PreferencesPage {

  chinesePreference: boolean = false;
  mexicanPreference: boolean = false;
  italianPreference: boolean = false;
  americanPreference: boolean = false;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private preferencesFilterService: PreferencesFilterService
  ) {
  }

  updatePreferences(preference: string, status: boolean): void {
    this.preferencesFilterService.updatePreferences(preference, status);
    console.log(this.preferencesFilterService.getPreferencesList());
  }

  ionViewDidLoad(){
  }
}
