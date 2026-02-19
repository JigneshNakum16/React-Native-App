// Navigation Type Definitions
export type RootStackParamList = {
  Main: undefined;
  Details: { productId: string; productName?: string };
  ProductModal: { productId: string };
};

export type MainTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  CartTab: undefined;
  ProfileTab: undefined;
};

export type DrawerParamList = {
  MainTabs: undefined;
  About: undefined;
  Settings: undefined;
  Help: undefined;
};
