import { Restaurant } from '../../components/restaurants/restaurant'

export class MockDatabase {
    private list: Restaurant[]

    constructor() {
        this.list = new Array();
        this.list.push({
            id: 0,
            name: "Chinese",
            tags: ["Chinese"],
            types: ["take-out", "sit-down", "delivery"],
            distance: 1,
            price: 1
        });
        this.list.push({
            id: 1,
            name: "Mexican",
            tags: ["Mexican"],
            types: ["sit-down", "counter-service"],
            distance: 2,
            price: 2
        });
        this.list.push({
            id: 2,
            name: "Italian",
            tags: ["Italian"],
            types: ["sit-down", "counter-service"],
            distance: 5.5,
            price: 3
        });
        this.list.push({
            id: 3,
            name: "American",
            tags: ["American"],
            types: ["counter-service", "sit-down"],
            distance: 3.5,
            price: 2
        });

        this.list.push({
            id: 4,
            name: "Mikes",
            tags: ["Italian"],
            types: ["take-out", "counter-service", "sit-down"],
            distance: 1.2,
            price: 2
        });
        this.list.push({
            id: 5,
            name: "Archies",
            tags: ["American"],
            types: ["sit-down", "take-out"],
            distance: 2,
            price: 2
        });
        this.list.push({
            id: 6,
            name: "Garden",
            tags: ["American"],
            types: ["counter-service", "take-out"],
            distance: 24,
            price: 1
        });
        this.list.push({
            id: 7,
            name: "Duchess",
            tags: ["American"],
            types: ["drive-through", "counter-service"],
            distance: 2,
            price: 1
        });


    }

    getList(): Restaurant[] {
        return this.list;
    }
}
