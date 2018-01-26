import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Geolocation } from '@ionic-native/geolocation';

import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { ThemeableBrowserMock } from '@ionic-native-mocks/themeable-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { InAppBrowserMock } from '@ionic-native-mocks/in-app-browser';

import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';


// import { SuperTabsModule } from 'ionic2-super-tabs';


import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { PreferencesPage } from '../pages/preferences/preferences';
import { RoulettePage } from '../pages/roulette/roulette';
import { ProfilePage } from '../pages/profile/profile';

// import { RestaurantsService } from '../services/restaurants/restaurants.service';

import { RouletteComponent } from '../components/roulette/roulette.component';
import { RestaurantDetailComponent } from '../components/restaurant-detail/restaurant-detail.component';
import { PreferencesComponent } from '../components/preferences/preferences.component';
import { CuisinesComponent } from '../components/menu-content/cuisines.component';
import { RestaurantHoursComponent } from '../components/restaurant-hours/restaurant-hours.component';
import { RestaurantReviewsComponent } from '../components/restaurant-reviews/restaurant-reviews.component';


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
        CuisinesComponent,
        RestaurantHoursComponent,
        RestaurantReviewsComponent
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
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        PreferencesPage,
        RoulettePage,
        ProfilePage,
        CuisinesComponent,
        RestaurantHoursComponent,
        RestaurantReviewsComponent
    ],
    providers: [
        Geolocation,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        StatusBar,
        SplashScreen,
        //NativePageTransitions,
        //{ provide: ThemeableBrowser, useClass: ThemeableBrowserMock },
        InAppBrowser
        //{ provide: InAppBrowser, useClass: InAppBrowserMock }
    ]
})
export class AppModule { }
