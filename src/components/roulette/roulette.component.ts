import { Component, ViewChild, OnInit, ViewEncapsulation, ViewChildren, QueryList } from '@angular/core';
import { Slides, Events } from 'ionic-angular';
import { Restaurant } from '../../components/restaurants/restaurant';
import { RouletteService } from '../../services/roulette/roulette.service';
import { ProfileService } from '../../services/profile/profile.service';

import {
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

    //@ViewChild(Slides) slides: Slides;

    @ViewChild('swingStack') swingStack: SwingStackComponent;
    @ViewChildren('cardStack') swingCards: QueryList<SwingCardComponent>;
    
    recommendedRestaurants: Restaurant[];
    stackList: Restaurant[];
    displayedRestaurant: Restaurant;
    removedRestaurant: Restaurant;

    stackConfig: StackConfig;

    constructor(private rouletteService: RouletteService,
        private profileService: ProfileService,
        private events: Events) {
        
        this.stackList = new Array ();
        events.subscribe('restaurant-recommend', (list) => {
            this.recommendedRestaurants = list;
        });
        events.subscribe('restaurant-more-detail', (data) => {
            this.displayedRestaurant = data;
            this.selectCard(this.displayedRestaurant);
        });

    
        this.stackConfig = {
            throwOutConfidence: (offsetX, offsetY, element) => {
                return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
            },
            transform: (element, x, y, r) => {
                this.onItemMove(element, x, y, r);
            },
            throwOutDistance: (d) => {
                return 700;
            }
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
    }   

    selectCard(restaurant: Restaurant): void {
        console.log(restaurant);
    }

    generateRestaurant(): void {
        this.rouletteService.chooseRestaurants();

        this.stackList = this.recommendedRestaurants.slice(0).reverse();

        console.log("Recommended Restaurants: ");
        console.log(this.recommendedRestaurants);
        console.log("Stack List: " );
        console.log(this.stackList);
    }


    swipeNext(): void {
        console.log("Next");
    }

    swipePrev(): void {
        console.log("Prev");
    }
}
