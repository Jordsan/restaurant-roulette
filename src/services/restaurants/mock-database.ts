import { Restaurant } from '../../components/restaurants/restaurant'

export class MockDatabase {
    private list: Restaurant[]

    constructor() {
        this.list = new Array();
        this.list.push({
            id: 0,
            name: "Chinese",
            tags: ["Chinese", "low-cost", "close"],
            type: ["take-out", "sit-down"]
        });
        this.list.push({
            id: 1,
            name: "Mexican",
            tags: ["Mexican", "low-cost", "far"],
            type: ["sit-down", "counter-service"]
        });
        this.list.push({
            id: 2,
            name: "Italian",
            tags: ["Italian", "high-cost", "close"],
            type: ["sit-down", "counter-service"]
        });
        this.list.push({
            id: 3,
            name: "American",
            tags: ["American", "high-cost", "far"],
            type: ["counter-service", "sit-down"]
        });

        this.list.push({
            id: 4,
            name: "Mikes",
            tags: ["Italian", "low-cost", "close", "short-stay"],
            type: ["take-out", "counter-service", "sit-down"]
        });
        this.list.push({
            id: 5,
            name: "Archies",
            tags: ["American", "high-cost", "close", "sit-down"],
            type: ["sit-down", "take-out"]
        });
        this.list.push({
            id: 6,
            name: "Garden",
            tags: ["American", "high-cost", "far", "to-go"],
            type: ["counter-service", "take-out"]
        });
        this.list.push({
            id: 7,
            name: "Duchess",
            tags: ["American", "high-cost", "far", "drive-through"],
            type: ["drive-thru", "counter-service"]
        });


    }

    getList(): Restaurant[] {
        return this.list;
    }
}
