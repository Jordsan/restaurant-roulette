import { Component, ViewChild, OnInit, ViewEncapsulation, ViewChildren, QueryList } from '@angular/core';
import { Events } from 'ionic-angular';
import { Restaurant } from '../../components/restaurants/restaurant';
import { RouletteService } from '../../services/roulette/roulette.service';
import { ProfileService } from '../../services/profile/profile.service';

import {
    Direction,
    StackConfig,
    Stack,
    Card,
    ThrowEvent,
    DragEvent,
    SwingStackComponent,
    SwingCardComponent
} from 'angular2-swing';

@Component({
    selector: 'roulette',
    templateUrl: 'roulette.component.html',
})
export class RouletteComponent {

    @ViewChild('swingStack') swingStack: SwingStackComponent;
    @ViewChildren('cardStack') swingCards: QueryList<SwingCardComponent>;

    recommendedRestaurants: Restaurant[];
    stackList: Restaurant[];

    selectedRestaurant: Restaurant;
    displayedRestaurant: Restaurant;
    removedRestaurant: Restaurant;

    stackConfig: StackConfig;

    firstPlay: boolean = true;
    showPlayButton: boolean = true;
    swipeCount: number = 0;

    constructor(private rouletteService: RouletteService,
        private profileService: ProfileService,
        private events: Events) {

        this.stackList = new Array();
        this.events.subscribe('restaurant-recommend', (list) => {
            this.recommendedRestaurants = list;
            this.stackList = this.recommendedRestaurants.slice(0).reverse();
            this.displayedRestaurant = this.recommendedRestaurants[0];

            console.log("Stack List: ");
            console.log(this.stackList);
        });
        this.events.subscribe('restaurant-more-detail', (data) => {
            this.displayedRestaurant = data;
            this.getMoreDetail(this.displayedRestaurant);
            console.log('test');
        });
        this.events.subscribe('reload-slides', () => {
            if (!this.firstPlay) {
                this.generateRestaurants();
                console.log("--- reloaded slides ---");
            }
        });

        this.stackConfig = {
            throwOutConfidence: (offsetX, offsetY, element) => {
                return Math.min(Math.max(Math.abs(offsetX) / (element.offsetWidth / 2.0), Math.abs(offsetY) / (element.offsetHeight / 2.5)), 1);
            },
            transform: (element, x, y, r) => {
                this.onItemMove(element, x, y, r);
            },
            throwOutDistance: (d) => {
                return 600;
            },
            allowedDirections: [Direction.LEFT, Direction.RIGHT, Direction.UP]
        };
    }

    ngAfterViewInit() {
        this.swingStack.throwin.subscribe((event: DragEvent) => {
            event.target.style.background = '#ffffff';
        });

    }

    onItemMove(element, x, y, r) {
        var color = '';
        var abs = Math.abs(x);
        let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
        /*
        let hexCode = this.decimalToHex(min, 2);

        if (x < 0) {
            color = '#FF' + hexCode + hexCode;
        } else {
            color = '#' + hexCode + 'FF' + hexCode;
        }

        //element.style.background = color;
        */
        element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
    }

    decimalToHex(d, padding) {
        var hex = Number(d).toString(16);
        padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

        while (hex.length < padding) {
            hex = "0" + hex;
        }

        return hex;
    }

    swipeCard(swipe: boolean) {
        if (this.stackList.length > 0) {
            this.removedRestaurant = this.stackList.pop();
            if (swipe) {
                //this.recentCard = 'You liked: ' + removedCard.email;
                console.log("Swipe right - " + swipe);
            }
            else {
                //this.recentCard = 'You disliked: ' + removedCard.email;
                console.log("Swipe left - " + swipe);
            }
            console.log(this.stackList);
            this.swipeCount++;
            if (this.swipeCount === this.recommendedRestaurants.length) {
                this.showPlayButton = true;
            }
            this.displayedRestaurant = this.recommendedRestaurants[this.swipeCount];
        }
    }

    selectCard(restaurant: Restaurant): void {
        if (this.stackList.length > 0) {
            this.selectedRestaurant = this.stackList.pop();
            this.swipeCount++;
            if (this.swipeCount === this.recommendedRestaurants.length) {
                this.showPlayButton = true;
            }
            this.displayedRestaurant = this.recommendedRestaurants[this.swipeCount];
            console.log(restaurant);

            this.profileService.addRestaurant(restaurant);
        }
    }

    getMoreDetail(restaurant: Restaurant): void {
        console.log("more detail");
    }

    generateRestaurants(): void {
        this.showPlayButton = false;
        this.rouletteService.chooseRestaurants();

        this.swipeCount = 0;
        this.firstPlay = false;
    }

}
