import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Menu } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs'
import { RoulettePage } from '../pages/roulette/roulette';
import { ProfilePage } from '../pages/profile/profile'

import { RestaurantsComponent } from '../components/restaurants/restaurants.component';
import { RouletteComponent } from '../components/roulette/roulette.component';


@NgModule({
  declarations: [
    MyApp,
    RoulettePage,
    ProfilePage,
    TabsPage,
    RestaurantsComponent,
    RouletteComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    RoulettePage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
