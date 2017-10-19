import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { RoulettePage } from '../pages/roulette/roulette';
import { ProfilePage } from '../pages/profile/profile';

import { PreferencesFilterService } from '../services/preferences-filter/preferences-filter.service';
import { RestaurantsService } from '../services/restaurants/restaurants.service';

import { RouletteComponent } from '../components/roulette/roulette.component';
import { RestaurantDetailComponent } from '../components/restaurant-detail/restaurant-detail.component';
import { PreferencesComponent } from '../components/preferences/preferences.component';
import { CuisinesComponent } from '../components/menu-content/cuisines.component';


@NgModule({
    declarations: [
        MyApp,
        RoulettePage,
        ProfilePage,
        TabsPage,
        RouletteComponent,
        RestaurantDetailComponent,
        PreferencesComponent,
        CuisinesComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        SwingModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        RoulettePage,
        ProfilePage,
        CuisinesComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        PreferencesFilterService,
        RestaurantsService,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
    ]
})
export class AppModule { }
