import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useTheme} from '@/context';
import {
  BrandDetailScreen,
  BrandScreen,
  CartScreen,
  CategoryDetailScreen,
  CategoryScreen,
  ChatScreen,
  CheckoutScreen,
  FavoriteScreen,
  LoginScreen,
  MainScreen,
  OnboardingScreen,
  OrderContactScreen,
  OrderDetailScreen,
  OrderRefundScreen,
  OrderReviewScreen,
  OrderScreen,
  ProductDetailScreen,
  RegisterScreen,
  SplashScreen,
  VoucherDetailScreen,
} from '@/screens';
import SettingsScreen from '@/screens/settings/settings';
import type {ApplicationStackParamList} from '@/types/navigation';
import {FONT_FAMILY, FONT_SIZE, navigationRef} from '@/utils';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  const initialRouteName: keyof ApplicationStackParamList = 'Splash';
  const {colors, theme} = useTheme();

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        theme={{
          colors: {
            background: colors.layout.background,
            card: colors.base.primary,
            primary: colors.base.primary,
            text: colors.layout.foreground,
            border: colors.layout.divider,
            notification: colors.base.danger,
          },
          dark: theme === 'dark',
        }}>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {
              color: colors.white,
              fontFamily: FONT_FAMILY.semiBold,
              fontSize: FONT_SIZE.h6,
            },
            headerTintColor: colors.white,
          }}
          initialRouteName={initialRouteName}>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
          <Stack.Group navigationKey="Auth">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
          </Stack.Group>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Favorite" component={FavoriteScreen} />
          <Stack.Screen name="Brand" component={BrandScreen} />
          <Stack.Screen name="BrandDetail" component={BrandDetailScreen} />
          <Stack.Screen name="Category" component={CategoryScreen} />
          <Stack.Screen
            name="CategoryDetail"
            component={CategoryDetailScreen}
          />
          <Stack.Screen name="VoucherDetail" component={VoucherDetailScreen} />
          <Stack.Screen name="Order" component={OrderScreen} />
          <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
          <Stack.Screen name="Contact" component={OrderContactScreen} />
          <Stack.Screen name="Refund" component={OrderRefundScreen} />
          <Stack.Screen name="Review" component={OrderReviewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.base.primary}
      />
    </>
  );
}

export default ApplicationNavigator;
