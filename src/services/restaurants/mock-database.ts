import { Restaurant } from '../../components/restaurants/restaurant'
import { Injectable } from '@angular/core'; 


export class MockDatabase {
    private list: Restaurant[]

    constructor(){
        this.list = new Array();
        this.list.push({ id: 0, name: "Chinese", tags: ["chinese-preference", "low-cost", "close"] });
        this.list.push({ id: 1, name: "Mexican", tags: ["mexican-preference", "low-cost", "far"] });
        this.list.push({ id: 2, name: "Italian", tags: ["italian-preference", "high-cost", "close"] });
        this.list.push({ id: 3, name: "American", tags: ["american-preference", "high-cost", "far"] });

        this.list.push({ id: 4, name: "Mikes", tags: ["italian-preference", "low-cost", "close", "short-stay"] });
        this.list.push({ id: 5, name: "Archies", tags: ["american-preference", "high-cost", "close", "sit-down"] });
        this.list.push({ id: 6, name: "Garden", tags: ["american-preference", "high-cost", "far", "to-go"] });
        this.list.push({ id: 7, name: "Duchess", tags: ["american-preference", "high-cost", "far", "drive-through"] });
        

    }

    getList(): Restaurant[] {
        return this.list;
    }
}
