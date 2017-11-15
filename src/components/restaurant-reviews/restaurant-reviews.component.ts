import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Review } from '../../components/restaurants/restaurant';
import { ThemeableBrowser, 
         ThemeableBrowserOptions, 
         ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
    selector: 'restaurant-reviews',
    templateUrl: 'restaurant-reviews.component.html'
})
export class RestaurantReviewsComponent {

    reviews: Review[];

    constructor(private navParams: NavParams, private themeableBrowser: ThemeableBrowser, private iab: InAppBrowser) {
        this.reviews = new Array();
        this.reviews = this.navParams.get('reviewsList');
    }

    getStarCount(rating: number): number[] {
        let num = Math.round(rating * 2) / 2;
        let stars = new Array();

        for (let i = 0; i < 5; i++) {
            if (num > 0) {
                if (num > 1) {
                    stars.push(1);
                    num -= 1;
                }
                else {
                    if (num === 1) {
                        stars.push(1);
                        num -= 1;
                    }
                    else {
                        stars.push(0.5);
                        num -= .5;
                    }
                }
            }
            else {
                stars.push(0);
            }
        }

        return stars;
    }

    openUserProfile(input: string): void {
        this.iab.create(input, '_blank', {});
    }

    // openUserProfile(input: string) {
    //     console.log(input);

    //     // https://ionicframework.com/docs/native/themeable-browser/
    //     const options: ThemeableBrowserOptions = {
    //         toolbar: {
    //             height: 44,
    //             color: '#3573bbff'
    //         },
    //         title: {
    //             color: '#ffffffff',
    //             showPageTitle: true,
    //             staticText: 'Academy Browser'
    //         },
    //         backButton: {
    //             wwwImage: 'assets/img/back.png',
    //             align: 'left',
    //             event: 'backPressed'
    //         },
    //         forwardButton: {
    //             wwwImage: 'assets/img/forward.png',
    //             align: 'left',
    //             event: 'forwardPressed'
    //         },
    //         closeButton: {
    //             wwwImage: 'assets/img/close.png',
    //             align: 'left',
    //             event: 'closePressed'
    //         },
    //     }; 

    //     const browser: ThemeableBrowserObject = this.themeableBrowser.create(input, '_blank', options);

    //     // browser.on('closePressed').subscribe(data => {
    //     //     browser.close();
    //     // })
    // }



}
