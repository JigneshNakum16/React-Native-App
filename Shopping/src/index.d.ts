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

export type RootStackParamList = {
  HomeTab: undefined;
  CartTab: undefined;
  WishlistTab: undefined;
  ProfileTab: undefined;
  Details: { product: Product };
  Home: undefined;
  Cart: undefined;
  Wishlist: undefined;
  Profile: undefined;
};
