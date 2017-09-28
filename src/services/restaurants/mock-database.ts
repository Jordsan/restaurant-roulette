import { Restaurant } from '../../components/restaurants/restaurant'

export class MockDatabase {
    private list: Restaurant[]

    constructor(){
        this.list = new Array();
        this.list.push({ id: 0, name: "Chinese", tags: ["Chinese", "low-cost", "close"] });
        this.list.push({ id: 1, name: "Mexican", tags: ["American", "low-cost", "far"] });
        this.list.push({ id: 2, name: "Italian", tags: ["Italian", "high-cost", "close"] });
        this.list.push({ id: 3, name: "American", tags: ["American", "high-cost", "far"] });

        this.list.push({ id: 4, name: "Mikes", tags: ["Italian", "low-cost", "close", "short-stay"] });
        this.list.push({ id: 5, name: "Archies", tags: ["American", "high-cost", "close", "sit-down"] });
        this.list.push({ id: 6, name: "Garden", tags: ["American", "high-cost", "far", "to-go"] });
        this.list.push({ id: 7, name: "Duchess", tags: ["American", "high-cost", "far", "drive-through"] });
        

    }

    getList(): Restaurant[] {
        return this.list;
    }
}
