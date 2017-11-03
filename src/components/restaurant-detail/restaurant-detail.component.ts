import { Component, Input, OnInit } from '@angular/core';
import { PopoverController, Events } from 'ionic-angular';
import { Restaurant } from '../../components/restaurants/restaurant';
import { ProfileService } from '../../services/profile/profile.service';

import { RestaurantHoursComponent } from '../restaurant-hours/restaurant-hours.component'


@Component({
    selector: 'restaurant-detail',
    templateUrl: 'restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

    @Input()
    private restaurant: Restaurant;

    private symbol: string = "";
    private dateNum: number = -1;

    constructor(private profileService: ProfileService, private events: Events, 
        private popoverCntrl: PopoverController) {
        
    }

    ngOnInit(): void {
        for (var i = 0; i < this.restaurant.price; i++){
            this.symbol += "$";
        }

        this.dateNum = new Date().getDay();

        if (this.dateNum > 0){
            this.dateNum -= 1;
        }
        else if (this.dateNum == 0) {
            this.dateNum = 6;
        }
    }

    hoursPopover(myEvent) {
        let popover = this.popoverCntrl.create(RestaurantHoursComponent, { 'list': this.restaurant.hours },
            {cssClass: 'restaurant-hours-popover'});
        popover.present({
            //ev: myEvent
        });

        popover.onDidDismiss(() => {
            console.log(this.restaurant.hours);
        })
    }

    getStarCount(rating: number): number[]{
        let num = Math.round(rating * 2) / 2;
        let stars = new Array();

        for (let i = 0; i < 5; i++){
            if (num > 0){
                if (num > 1) {
                    stars.push(1);
                    num -= 1;
                }
                else {
                    if (num === 1){
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
}
