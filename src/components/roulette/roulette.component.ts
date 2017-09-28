import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Restaurant } from '../../components/restaurants/restaurant';
import { RouletteService } from '../../services/roulette/roulette.service';
import { ProfileService } from '../../services/profile/profile.service';



@Component({
  selector: 'roulette',
  templateUrl: 'roulette.component.html',
})
export class RouletteComponent implements OnInit{

  @ViewChild(Slides) slides: Slides;
  
  displayedRestaurant: Restaurant;
  recommendedRestaurants: Restaurant[];

  constructor(private rouletteService: RouletteService,
              private profileService: ProfileService) {    
  }

  ngOnInit(): void {
    this.rouletteService.recommendedRestaurantsStream$
      .subscribe(list => {
        this.recommendedRestaurants = list;
    });
    //this.slides.freeMode = true;
    //this.slides.autoHeight = true;
    //this.slides._wrapper = 

  }

  generateRestaurant(): void {
    this.rouletteService.chooseRestaurants();
    console.log("Recommended Restaurants: " );
    console.log(this.recommendedRestaurants);
  }


  swipeNext(): void {
    console.log("Next");
  }

  swipePrev(): void {
    console.log("Prev");
  }
}
