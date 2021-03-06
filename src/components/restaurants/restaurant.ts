export interface Review {
    author_name: string;
    author_url: string;
    language: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
}

export interface Restaurant {
    id: string;
    name: string;
    address: string;
    phone: string;
    menu: string;
    reviews: Review[];

    distance: number;
    price: number;
    rating: number;
    
    hours: string[];
    open: boolean;

    tags: string[];
    types: string[];

}
