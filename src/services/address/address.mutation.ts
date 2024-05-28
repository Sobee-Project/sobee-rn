import {QUERY_KEY} from '@/constants';
import {
  CreateAddressFormSchema,
  UpdateAddressFormSchema,
} from '@/lib/form-schema';
import {IAddress} from '@/lib/interfaces';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {addressService} from './address.service';

export const useCreateAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateAddressFormSchema) => {
      const res = await addressService.createAddress(data);
      if (res.data.success) {
        queryClient.setQueryData(
          [QUERY_KEY.ADDRESS.GET_ALL],
          (oldData: IAddress[]) => [...oldData, res.data.data],
        );
      }
      return res.data;
    },
  });
};

export const useUpdateAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateAddressFormSchema) => {
      const res = await addressService.updateAddress(data._id, data);
      if (res.data.success) {
        queryClient.setQueryData(
          [QUERY_KEY.ADDRESS.GET_ALL],
          (oldData: IAddress[]) => {
            const index = oldData.findIndex(item => item._id === data._id);
            oldData[index] = res.data.data;
            return [...oldData];
          },
        );
      }
      return res.data;
    },
  });
};

export const useDeleteAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await addressService.deleteAddress(id);
      if (res.data.success) {
        queryClient.setQueryData(
          [QUERY_KEY.ADDRESS.GET_ALL],
          (oldData: IAddress[]) => oldData.filter(item => item._id !== id),
        );
      }
      return res.data;
    },
  });
};

export const useSetDefaultAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await addressService.setDefaultAddress(id);
      if (res.data.success) {
        queryClient.setQueryData(
          [QUERY_KEY.ADDRESS.GET_ALL],
          (oldData: IAddress[]) => {
            const index = oldData.findIndex(item => item._id === id);
            oldData.forEach(item => (item.isDefault = false));
            oldData[index].isDefault = true;
            return [...oldData];
          },
        );
      }
      return res.data;
    },
  });
};
