import { Component, Input, OnInit } from '@angular/core';
import { PopoverController, Events } from 'ionic-angular';
import { Restaurant } from '../../components/restaurants/restaurant';
import { ProfileService } from '../../services/profile/profile.service';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { RestaurantHoursComponent } from '../restaurant-hours/restaurant-hours.component'
import { RestaurantReviewsComponent } from '../restaurant-reviews/restaurant-reviews.component'


@Component({
    selector: 'restaurant-detail',
    templateUrl: 'restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

    @Input()
    private restaurant: Restaurant;

    private symbol: string = "";
    private dateNum: number = -1;

    private selectedView: string = "overview";

    private avgRating: number;

    constructor(private profileService: ProfileService, private events: Events,
        private popoverCntrl: PopoverController, private iab: InAppBrowser) {
    }

    ngOnInit(): void {
        for (var i = 0; i < this.restaurant.price; i++) {
            this.symbol += "$";
        }

        this.dateNum = new Date().getDay();

        if (this.dateNum > 0) {
            this.dateNum -= 1;
        }
        else if (this.dateNum == 0) {
            this.dateNum = 6;
        }

        this.avgRating = this.restaurant.rating;
    }

    hoursPopover(myEvent) {
        let popover = this.popoverCntrl.create(RestaurantHoursComponent, { 'hoursList': this.restaurant.hours },
            { cssClass: 'restaurant-hours-popover' });
        popover.present({
            //ev: myEvent
        });

        popover.onDidDismiss(() => {

        })
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

    getAvgStarCount(): number[] {
        let num = Math.round(this.avgRating * 2) / 2;
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
}
