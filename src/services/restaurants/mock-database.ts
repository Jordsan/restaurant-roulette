import { Restaurant } from '../../components/restaurants/restaurant'

export class MockDatabase {
    private list: Restaurant[]

    constructor() {
        this.list = new Array();
        this.list.push({
            id: 0,
            name: "Chinese Restaurant",
            tags: ["Chinese"],
            types: ["take-out", "sit-down", "delivery"],
            distance: 1,
            price: 1,
            address: "438 Penfield Rd, Fairfield, CT 06824",
            hours: [
                "Monday: 11:30 AM – 1:00 AM",
                "Tuesday: 11:30 AM – 1:00 AM",
                "Wednesday: 11:30 AM – 1:00 AM",
                "Thursday: 11:30 AM – 1:00 AM",
                "Friday: 11:30 AM – 2:00 AM",
                "Saturday: 11:30 AM – 2:00 AM",
                "Sunday: 11:30 AM – 11:00 PM"
            ],
            open: true,
            rating: 3.5,
            phone: "203-727-3656",
            menu: "http://www.thisisatestmenu.com/menu",
            reviews: [
                {
                    "author_name": "Marcel Music",
                    "rating": 5,
                    "relative_time_description": "6 months ago",
                    "text": "Fast service and delicious food ! The atmosphere was quaint and it's located in a great area. I was especially pleased with my server Faith! She was so friendly and efficient! She really knew what she was doing and even though it was busy she kept up with the rush And always came to the table with a friendly smile and amazing attitude! I highly recommend colony for lunch or dinner, with a staff like that why would you not want to go!",
                },
                {
                    "author_name": "Andrew Hutter",
                    "rating": 4,
                    "relative_time_description": "3 months ago",
                    "text": "The pizza is very good, but the pies are small, and expensive for what they are. I would not recommend taking them home to eat because it altars the texture and flavor the pies. It's a great stop for kids who go to school downtown to get a quick bite to eat with friends.",
                },
                {
                    "author_name": "Noelle Cleary",
                    "rating": 5,
                    "relative_time_description": "4 months ago",
                    "text": "The most addictive ordinary pizza you'll ever have. Great beer on tap. TVs everywhere. Heaving most nights but well worth the wait. Staff is friendly and helpful.",
                },
                {
                    "author_name": "Steve Cobb",
                    "rating": 5,
                    "relative_time_description": "a month ago",
                    "text": "Great pizza and atmosphere to grab some food and have good conversation with friends and family",
                },
                {
                    "author_name": "Jennifer Johnson",
                    "rating": 4,
                    "relative_time_description": "2 months ago",
                    "text": "I come here for the salad pizza. Their hot oil is pretty good out you like a kick.",
                }
            ]
        });
        this.list.push({
            id: 1,
            name: "Mexican Restaurant",
            tags: ["Mexican"],
            types: ["sit-down", "counter-service"],
            distance: 2,
            price: 2,
            address: "438 Penfield Rd, Fairfield, CT 06824",
            hours: [
                "Monday: 11:30 AM – 1:00 AM",
                "Tuesday: 11:30 AM – 1:00 AM",
                "Wednesday: 11:30 AM – 1:00 AM",
                "Thursday: 11:30 AM – 1:00 AM",
                "Friday: 11:30 AM – 2:00 AM",
                "Saturday: 11:30 AM – 2:00 AM",
                "Sunday: 11:30 AM – 11:00 PM"
            ],
            open: true,
            rating: 4.5,
            phone: "203-727-3656",
            menu: "http://www.thisisatestmenu.com/menu",
            reviews: [
                {
                    "author_name": "Marcel Music",
                    "rating": 5,
                    "relative_time_description": "6 months ago",
                    "text": "Fast service and delicious food ! The atmosphere was quaint and it's located in a great area. I was especially pleased with my server Faith! She was so friendly and efficient! She really knew what she was doing and even though it was busy she kept up with the rush And always came to the table with a friendly smile and amazing attitude! I highly recommend colony for lunch or dinner, with a staff like that why would you not want to go!",
                },
                {
                    "author_name": "Andrew Hutter",
                    "rating": 4,
                    "relative_time_description": "3 months ago",
                    "text": "The pizza is very good, but the pies are small, and expensive for what they are. I would not recommend taking them home to eat because it altars the texture and flavor the pies. It's a great stop for kids who go to school downtown to get a quick bite to eat with friends.",
                },
                {
                    "author_name": "Noelle Cleary",
                    "rating": 5,
                    "relative_time_description": "4 months ago",
                    "text": "The most addictive ordinary pizza you'll ever have. Great beer on tap. TVs everywhere. Heaving most nights but well worth the wait. Staff is friendly and helpful.",
                },
                {
                    "author_name": "Steve Cobb",
                    "rating": 5,
                    "relative_time_description": "a month ago",
                    "text": "Great pizza and atmosphere to grab some food and have good conversation with friends and family",
                },
                {
                    "author_name": "Jennifer Johnson",
                    "rating": 4,
                    "relative_time_description": "2 months ago",
                    "text": "I come here for the salad pizza. Their hot oil is pretty good out you like a kick.",
                }
            ]
        });
        this.list.push({
            id: 2,
            name: "Italian Restaurant",
            tags: ["Italian"],
            types: ["sit-down", "counter-service"],
            distance: 5.5,
            price: 3,
            address: "438 Penfield Rd, Fairfield, CT 06824",
            hours: [
                "Monday: 11:30 AM – 1:00 AM",
                "Tuesday: 11:30 AM – 1:00 AM",
                "Wednesday: 11:30 AM – 1:00 AM",
                "Thursday: 11:30 AM – 1:00 AM",
                "Friday: 11:30 AM – 2:00 AM",
                "Saturday: 11:30 AM – 2:00 AM",
                "Sunday: 11:30 AM – 11:00 PM"
            ],
            open: true,
            rating: 5.0,
            phone: "203-727-3656",
            menu: "http://www.thisisatestmenu.com/menu",
            reviews: [
                {
                    "author_name": "Marcel Music",
                    "rating": 5,
                    "relative_time_description": "6 months ago",
                    "text": "Fast service and delicious food ! The atmosphere was quaint and it's located in a great area. I was especially pleased with my server Faith! She was so friendly and efficient! She really knew what she was doing and even though it was busy she kept up with the rush And always came to the table with a friendly smile and amazing attitude! I highly recommend colony for lunch or dinner, with a staff like that why would you not want to go!",
                },
                {
                    "author_name": "Andrew Hutter",
                    "rating": 4,
                    "relative_time_description": "3 months ago",
                    "text": "The pizza is very good, but the pies are small, and expensive for what they are. I would not recommend taking them home to eat because it altars the texture and flavor the pies. It's a great stop for kids who go to school downtown to get a quick bite to eat with friends.",
                },
                {
                    "author_name": "Noelle Cleary",
                    "rating": 5,
                    "relative_time_description": "4 months ago",
                    "text": "The most addictive ordinary pizza you'll ever have. Great beer on tap. TVs everywhere. Heaving most nights but well worth the wait. Staff is friendly and helpful.",
                },
                {
                    "author_name": "Steve Cobb",
                    "rating": 5,
                    "relative_time_description": "a month ago",
                    "text": "Great pizza and atmosphere to grab some food and have good conversation with friends and family",
                },
                {
                    "author_name": "Jennifer Johnson",
                    "rating": 4,
                    "relative_time_description": "2 months ago",
                    "text": "I come here for the salad pizza. Their hot oil is pretty good out you like a kick.",
                }
            ]
        });
        this.list.push({
            id: 3,
            name: "American Restaurant",
            tags: ["American"],
            types: ["counter-service", "sit-down"],
            distance: 3.5,
            price: 2,
            address: "438 Penfield Rd, Fairfield, CT 06824",
            hours: [
                "Monday: 11:30 AM – 1:00 AM",
                "Tuesday: 11:30 AM – 1:00 AM",
                "Wednesday: 11:30 AM – 1:00 AM",
                "Thursday: 11:30 AM – 1:00 AM",
                "Friday: 11:30 AM – 2:00 AM",
                "Saturday: 11:30 AM – 2:00 AM",
                "Sunday: 11:30 AM – 11:00 PM"
            ],
            open: false,
            rating: 2.2,
            phone: "203-727-3656",
            menu: "http://www.thisisatestmenu.com/menu",
            reviews: [
                {
                    "author_name": "Marcel Music",
                    "rating": 5,
                    "relative_time_description": "6 months ago",
                    "text": "Fast service and delicious food ! The atmosphere was quaint and it's located in a great area. I was especially pleased with my server Faith! She was so friendly and efficient! She really knew what she was doing and even though it was busy she kept up with the rush And always came to the table with a friendly smile and amazing attitude! I highly recommend colony for lunch or dinner, with a staff like that why would you not want to go!",
                },
                {
                    "author_name": "Andrew Hutter",
                    "rating": 4,
                    "relative_time_description": "3 months ago",
                    "text": "The pizza is very good, but the pies are small, and expensive for what they are. I would not recommend taking them home to eat because it altars the texture and flavor the pies. It's a great stop for kids who go to school downtown to get a quick bite to eat with friends.",
                },
                {
                    "author_name": "Noelle Cleary",
                    "rating": 5,
                    "relative_time_description": "4 months ago",
                    "text": "The most addictive ordinary pizza you'll ever have. Great beer on tap. TVs everywhere. Heaving most nights but well worth the wait. Staff is friendly and helpful.",
                },
                {
                    "author_name": "Steve Cobb",
                    "rating": 5,
                    "relative_time_description": "a month ago",
                    "text": "Great pizza and atmosphere to grab some food and have good conversation with friends and family",
                },
                {
                    "author_name": "Jennifer Johnson",
                    "rating": 4,
                    "relative_time_description": "2 months ago",
                    "text": "I come here for the salad pizza. Their hot oil is pretty good out you like a kick.",
                }
            ]
        });
        this.list.push({
            id: 4,
            name: "Mikes Restaurant",
            tags: ["Italian"],
            types: ["take-out", "counter-service", "sit-down"],
            distance: 1.2,
            price: 2,
            address: "438 Penfield Rd, Fairfield, CT 06824",
            hours: [
                "Monday: 11:30 AM – 1:00 AM",
                "Tuesday: 11:30 AM – 1:00 AM",
                "Wednesday: 11:30 AM – 1:00 AM",
                "Thursday: 11:30 AM – 1:00 AM",
                "Friday: 11:30 AM – 2:00 AM",
                "Saturday: 11:30 AM – 2:00 AM",
                "Sunday: 11:30 AM – 11:00 PM"
            ],
            open: false,
            rating: 4.8,
            phone: "203-727-3656",
            menu: "http://www.thisisatestmenu.com/menu",
            reviews: [
                {
                    "author_name": "Marcel Music",
                    "rating": 5,
                    "relative_time_description": "6 months ago",
                    "text": "Fast service and delicious food ! The atmosphere was quaint and it's located in a great area. I was especially pleased with my server Faith! She was so friendly and efficient! She really knew what she was doing and even though it was busy she kept up with the rush And always came to the table with a friendly smile and amazing attitude! I highly recommend colony for lunch or dinner, with a staff like that why would you not want to go!",
                },
                {
                    "author_name": "Andrew Hutter",
                    "rating": 4,
                    "relative_time_description": "3 months ago",
                    "text": "The pizza is very good, but the pies are small, and expensive for what they are. I would not recommend taking them home to eat because it altars the texture and flavor the pies. It's a great stop for kids who go to school downtown to get a quick bite to eat with friends.",
                },
                {
                    "author_name": "Noelle Cleary",
                    "rating": 5,
                    "relative_time_description": "4 months ago",
                    "text": "The most addictive ordinary pizza you'll ever have. Great beer on tap. TVs everywhere. Heaving most nights but well worth the wait. Staff is friendly and helpful.",
                },
                {
                    "author_name": "Steve Cobb",
                    "rating": 5,
                    "relative_time_description": "a month ago",
                    "text": "Great pizza and atmosphere to grab some food and have good conversation with friends and family",
                },
                {
                    "author_name": "Jennifer Johnson",
                    "rating": 4,
                    "relative_time_description": "2 months ago",
                    "text": "I come here for the salad pizza. Their hot oil is pretty good out you like a kick.",
                }
            ]
        });
        this.list.push({
            id: 5,
            name: "Archies Restaurant",
            tags: ["American"],
            types: ["sit-down", "take-out"],
            distance: 2,
            price: 2,
            address: "438 Penfield Rd, Fairfield, CT 06824",
            hours: [
                "Monday: 11:30 AM – 1:00 AM",
                "Tuesday: 11:30 AM – 1:00 AM",
                "Wednesday: 11:30 AM – 1:00 AM",
                "Thursday: 11:30 AM – 1:00 AM",
                "Friday: 11:30 AM – 2:00 AM",
                "Saturday: 11:30 AM – 2:00 AM",
                "Sunday: 11:30 AM – 11:00 PM"
            ],
            open: true,
            rating: 3.7,
            phone: "203-727-3656",
            menu: "http://www.thisisatestmenu.com/menu",
            reviews: [
                {
                    "author_name": "Marcel Music",
                    "rating": 5,
                    "relative_time_description": "6 months ago",
                    "text": "Fast service and delicious food ! The atmosphere was quaint and it's located in a great area. I was especially pleased with my server Faith! She was so friendly and efficient! She really knew what she was doing and even though it was busy she kept up with the rush And always came to the table with a friendly smile and amazing attitude! I highly recommend colony for lunch or dinner, with a staff like that why would you not want to go!",
                },
                {
                    "author_name": "Andrew Hutter",
                    "rating": 4,
                    "relative_time_description": "3 months ago",
                    "text": "The pizza is very good, but the pies are small, and expensive for what they are. I would not recommend taking them home to eat because it altars the texture and flavor the pies. It's a great stop for kids who go to school downtown to get a quick bite to eat with friends.",
                },
                {
                    "author_name": "Noelle Cleary",
                    "rating": 5,
                    "relative_time_description": "4 months ago",
                    "text": "The most addictive ordinary pizza you'll ever have. Great beer on tap. TVs everywhere. Heaving most nights but well worth the wait. Staff is friendly and helpful.",
                },
                {
                    "author_name": "Steve Cobb",
                    "rating": 5,
                    "relative_time_description": "a month ago",
                    "text": "Great pizza and atmosphere to grab some food and have good conversation with friends and family",
                },
                {
                    "author_name": "Jennifer Johnson",
                    "rating": 4,
                    "relative_time_description": "2 months ago",
                    "text": "I come here for the salad pizza. Their hot oil is pretty good out you like a kick.",
                }
            ]
        });
        this.list.push({
            id: 6,
            name: "Garden Catering Restaurant",
            tags: ["American"],
            types: ["counter-service", "take-out"],
            distance: 24,
            price: 1,
            address: "438 Penfield Rd, Fairfield, CT 06824",
            hours: [
                "Monday: 11:30 AM – 1:00 AM",
                "Tuesday: 11:30 AM – 1:00 AM",
                "Wednesday: 11:30 AM – 1:00 AM",
                "Thursday: 11:30 AM – 1:00 AM",
                "Friday: 11:30 AM – 2:00 AM",
                "Saturday: 11:30 AM – 2:00 AM",
                "Sunday: 11:30 AM – 11:00 PM"
            ],
            open: true,
            rating: 3.2,
            phone: "203-727-3656",
            menu: "http://www.thisisatestmenu.com/menu",
            reviews: [
                {
                    "author_name": "Marcel Music",
                    "rating": 5,
                    "relative_time_description": "6 months ago",
                    "text": "Fast service and delicious food ! The atmosphere was quaint and it's located in a great area. I was especially pleased with my server Faith! She was so friendly and efficient! She really knew what she was doing and even though it was busy she kept up with the rush And always came to the table with a friendly smile and amazing attitude! I highly recommend colony for lunch or dinner, with a staff like that why would you not want to go!",
                },
                {
                    "author_name": "Andrew Hutter",
                    "rating": 4,
                    "relative_time_description": "3 months ago",
                    "text": "The pizza is very good, but the pies are small, and expensive for what they are. I would not recommend taking them home to eat because it altars the texture and flavor the pies. It's a great stop for kids who go to school downtown to get a quick bite to eat with friends.",
                },
                {
                    "author_name": "Noelle Cleary",
                    "rating": 5,
                    "relative_time_description": "4 months ago",
                    "text": "The most addictive ordinary pizza you'll ever have. Great beer on tap. TVs everywhere. Heaving most nights but well worth the wait. Staff is friendly and helpful.",
                },
                {
                    "author_name": "Steve Cobb",
                    "rating": 5,
                    "relative_time_description": "a month ago",
                    "text": "Great pizza and atmosphere to grab some food and have good conversation with friends and family",
                },
                {
                    "author_name": "Jennifer Johnson",
                    "rating": 4,
                    "relative_time_description": "2 months ago",
                    "text": "I come here for the salad pizza. Their hot oil is pretty good out you like a kick.",
                }
            ]
        });
        this.list.push({
            id: 7,
            name: "Duchess Fast Food Restaurant",
            tags: ["American"],
            types: ["drive-through", "counter-service"],
            distance: 2,
            price: 1,
            address: "438 Penfield Rd, Fairfield, CT 06824",
            hours: [
                "Monday: 11:30 AM – 1:00 AM",
                "Tuesday: 11:30 AM – 1:00 AM",
                "Wednesday: 12:34 AM – 12:34 AM",
                "Thursday: 11:30 AM – 1:00 AM",
                "Friday: 11:30 AM – 2:00 AM",
                "Saturday: 11:30 AM – 2:00 AM",
                "Sunday: 11:30 AM – 11:00 PM"
            ],
            open: false,
            rating: 2.3,
            phone: "203-727-3656",
            menu: "http://www.thisisatestmenu.com/menu",
            reviews: [
                {
                    "author_name": "Marcel Music",
                    "rating": 5,
                    "relative_time_description": "6 months ago",
                    "text": "Fast service and delicious food ! The atmosphere was quaint and it's located in a great area. I was especially pleased with my server Faith! She was so friendly and efficient! She really knew what she was doing and even though it was busy she kept up with the rush And always came to the table with a friendly smile and amazing attitude! I highly recommend colony for lunch or dinner, with a staff like that why would you not want to go!",
                },
                {
                    "author_name": "Andrew Hutter",
                    "rating": 4,
                    "relative_time_description": "3 months ago",
                    "text": "The pizza is very good, but the pies are small, and expensive for what they are. I would not recommend taking them home to eat because it altars the texture and flavor the pies. It's a great stop for kids who go to school downtown to get a quick bite to eat with friends.",
                },
                {
                    "author_name": "Noelle Cleary",
                    "rating": 5,
                    "relative_time_description": "4 months ago",
                    "text": "The most addictive ordinary pizza you'll ever have. Great beer on tap. TVs everywhere. Heaving most nights but well worth the wait. Staff is friendly and helpful.",
                },
                {
                    "author_name": "Steve Cobb",
                    "rating": 5,
                    "relative_time_description": "a month ago",
                    "text": "Great pizza and atmosphere to grab some food and have good conversation with friends and family",
                },
                {
                    "author_name": "Jennifer Johnson",
                    "rating": 4,
                    "relative_time_description": "2 months ago",
                    "text": "I come here for the salad pizza. Their hot oil is pretty good out you like a kick.",
                }
            ]
        });
    }

    getList(): Restaurant[] {
        return this.list;
    }
}
