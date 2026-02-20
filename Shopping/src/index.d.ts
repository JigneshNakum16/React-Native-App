export interface Product {
    id: string;
    name: string;
    imageUrl: string;
    originalPrice: number;
    discountPrice: number;
    offerPercentage: number;
    rating: number;
    ratingCount: number;
    tags: string[];
    category: string;
    description: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
}
