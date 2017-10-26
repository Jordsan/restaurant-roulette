import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { PreferencesPage } from '../pages/preferences/preferences';
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
        PreferencesPage,
        RouletteComponent,
        RestaurantDetailComponent,
        PreferencesComponent,
        CuisinesComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        SwingModule,
        IonicModule.forRoot(MyApp, {
            platforms: {
                ios: {
                    popoverEnter: "popover-md-pop-in",
                    popoverLeave: "popover-md-pop-out"
                }
            }
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        PreferencesPage,
        RoulettePage,
        ProfilePage,
        CuisinesComponent
    ],
    providers: [
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        StatusBar,
        SplashScreen,
        NativePageTransitions        
    ]
})
export class AppModule { }
