import {useTheme} from '@/context';
import {formatCurrency} from '@/lib';
import {IProduct} from '@/lib/interfaces';
import {ApplicationNavigationProps} from '@/types';
import {APP_CONFIG, FONT_FAMILY, TYPOGRAPHY} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import {Star} from 'lucide-react-native';
import React from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

type ProductCardProps = {
  product: IProduct;
  style?: StyleProp<ViewStyle>;
};

const ProductCard = ({product, style}: ProductCardProps) => {
  const {colors} = useTheme();
  const navigation = useNavigation<ApplicationNavigationProps>();

  const onPress = () => {
    navigation.navigate('ProductDetail', {productId: product._id!});
  };

  return (
    <Pressable
      onPress={onPress}
      style={StyleSheet.flatten([
        {
          minWidth: APP_CONFIG.SCREEN.WIDTH / 3,
          backgroundColor: colors.content.content1,
          borderRadius: 8,
          overflow: 'hidden',
          borderWidth: 0.5,
          borderColor: colors.default.default200,
        },
        style,
      ])}>
      <Image
        source={{uri: product.thumbnail}}
        width={100}
        height={100}
        style={{
          width: '100%',
          height: 140,
        }}
        resizeMode="cover"
      />

      <View style={{padding: 8, justifyContent: 'space-between'}}>
        <Text
          numberOfLines={2}
          style={[
            {
              color: colors.layout.foreground,
              fontSize: 14,
              fontFamily: FONT_FAMILY.medium,
              letterSpacing: 0.5,
              minHeight: 40,
            },
          ]}>
          {product.name}
        </Text>
        <View
          style={[
            styles.row,
            {
              gap: 4,
            },
          ]}>
          <Star
            color={colors.warning.warning500}
            fill={colors.warning.warning500}
            size={14}
          />
          <Text
            style={[
              TYPOGRAPHY.body2,
              {
                color: colors.layout.foreground,
              },
            ]}>
            {product.ratingValue}
          </Text>
        </View>
        <View
          style={[
            styles.row,
            {
              justifyContent: 'space-between',
            },
          ]}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.semiBold,
              color: colors.base.primary,
              fontSize: 16,
            }}>
            {formatCurrency(product.displayPrice)}
          </Text>
          <Text
            style={[
              TYPOGRAPHY.body2,
              {
                color: colors.layout.foreground,
              },
            ]}>
            {product.sold} sold
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
