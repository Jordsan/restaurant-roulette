import { Restaurant } from '../../components/restaurants/restaurant'
import { Injectable } from '@angular/core'; 


export class MockDatabase {
    private list: Restaurant[]

    constructor(){
        this.list = new Array();
        this.list.push({ id: 1, name: "Chinese", tags: ["chinesePreference", "lowCost", "close"] });
        this.list.push({ id: 2, name: "Mexican", tags: ["mexicanPreference", "lowCost", "far"] });
        this.list.push({ id: 3, name: "Italian", tags: ["italianPreference", "highCost", "close"] });
        this.list.push({ id: 4, name: "American", tags: ["americanPreference", "highCost", "far"] });

    }

    getList(): Restaurant[] {
        return this.list;
    }
}
