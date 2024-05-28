import {NavigationProp} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';

export type ApplicationStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  Onboarding: undefined;
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
  Product: {productId: string; name: string};
  Search: undefined;
  Notifications: undefined;
  Category: undefined;
  CategoryDetail: {categoryId: string; name: string};
  Brand: undefined;
  BrandDetail: {brandId: string; name: string};
  Checkout: {cartItems: any[]};
  Order: undefined;
  OrderDetail: {orderId: string};
  Address: undefined;
  Payment: undefined;
  Settings: undefined;
  Chat: undefined;
  Contact: {orderId: string};
  Refund: {orderId: string};
  Review: {orderId: string};
  Voucher: undefined;
  VoucherDetail: {voucherId: string};
  ProductDetail: {productId: string};
  ProductReview: {productId: string};
  Favorite: undefined;
};

/**
 * @example
 * type Props = ApplicationScreenProps<'Onboarding'>;
 */
export type ApplicationScreenProps<T extends keyof ApplicationStackParamList> =
  StackScreenProps<ApplicationStackParamList, T>;

/**
 * @example
 * const navigation = useNavigation<ApplicationNavigationProps>();
 */
export type ApplicationNavigationProps =
  NavigationProp<ApplicationStackParamList>;
