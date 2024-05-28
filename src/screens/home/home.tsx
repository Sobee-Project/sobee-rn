import {BrandCard, CategoryCard, ProductCard} from '@/components/card';
import {LabelItemList} from '@/components/common';
import {
  useGetBestSellerProductsQuery,
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetDiscountedProductsQuery,
  useGetFeaturedProductsQuery,
  useGetPopularProductsQuery,
  useGetProductsQuery,
} from '@/services';
import {ApplicationScreenProps} from '@/types';
import {APP_CONFIG} from '@/utils';
import React, {useMemo} from 'react';
import {ScrollView} from 'react-native';

const HomeScreen = ({navigation}: ApplicationScreenProps<'Home'>) => {
  const featureProductsQuery = useGetFeaturedProductsQuery();
  const popularProductsQuery = useGetPopularProductsQuery();
  const bestSellerProductsQuery = useGetBestSellerProductsQuery();
  const discountedProductsQuery = useGetDiscountedProductsQuery();
  const allProductsQuery = useGetProductsQuery();
  const categoriesQuery = useGetCategoriesQuery();
  const brandsQuery = useGetBrandsQuery();

  const categories = useMemo(
    () => categoriesQuery.data?.data || [],
    [categoriesQuery],
  );
  const brands = useMemo(() => brandsQuery.data?.data || [], [brandsQuery]);

  const products = useMemo(
    () => [
      {
        label: 'Featured Products',
        isLoading: featureProductsQuery.isLoading,
        data: featureProductsQuery?.data?.data || [],
        isError: featureProductsQuery.isError,
      },
      {
        label: 'Popular Products',
        isLoading: popularProductsQuery.isLoading,
        data: popularProductsQuery?.data?.data || [],
        isError: popularProductsQuery.isError,
      },
      {
        label: 'Best Seller Products',
        isLoading: bestSellerProductsQuery.isLoading,
        data: bestSellerProductsQuery?.data?.data || [],
        isError: bestSellerProductsQuery.isError,
      },
      {
        label: 'Discounted Products',
        isLoading: discountedProductsQuery.isLoading,
        data: discountedProductsQuery?.data?.data || [],
        isError: discountedProductsQuery.isError,
      },
      {
        label: 'All Products',
        isLoading: allProductsQuery.isLoading,
        data: allProductsQuery?.data?.data || [],
        isError: allProductsQuery.isError,
      },
    ],
    [
      featureProductsQuery,
      popularProductsQuery,
      bestSellerProductsQuery,
      discountedProductsQuery,
      allProductsQuery,
    ],
  );

  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={{padding: 20, gap: 20}}
      showsVerticalScrollIndicator={false}>
      <LabelItemList
        isLoading={categoriesQuery.isLoading}
        isError={categoriesQuery.isError}
        label="Categories"
        showNavigation
        onPressNavigation={() => navigation.navigate('Category')}
        data={categories}
        renderItem={({item}) => <CategoryCard category={item} />}
        listProps={{
          horizontal: true,
        }}
      />
      <LabelItemList
        isLoading={brandsQuery.isLoading}
        isError={brandsQuery.isError}
        label="Brands"
        showNavigation
        onPressNavigation={() => navigation.navigate('Brand')}
        data={brands}
        renderItem={({item}) => <BrandCard brand={item} />}
        listProps={{
          horizontal: true,
        }}
      />
      {products.map(({label, isLoading, data}) => (
        <LabelItemList
          key={label}
          isLoading={isLoading}
          data={data}
          label={label}
          renderItem={({item}) => (
            <ProductCard
              product={item}
              style={{
                width: APP_CONFIG.SCREEN.WIDTH / 2 - 26,
              }}
            />
          )}
          listProps={{
            numColumns: 2,
            scrollEnabled: false,
            columnWrapperStyle: {gap: 12},
          }}
        />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
