import {QUERY_KEY} from '@/constants';
import {
  CreateOrderFormSchema,
  UpdateOrderItemQuantityFormSchema,
} from '@/lib/form-schema';
import {IOrder} from '@/lib/interfaces';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {orderService} from './order.service';

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (order: CreateOrderFormSchema) => {
      const res = await orderService.createOrder(order);
      if (res.data.success) {
        queryClient.setQueryData(
          [QUERY_KEY.ORDER.GET_ALL],
          (oldData: IOrder[]) => [...oldData, res.data.data],
        );
      }
      return res.data;
    },
  });
};

export const useRemoveOrderItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await orderService.removeOrderItem(id);
      if (res.data.success) {
        queryClient.setQueryData(
          [QUERY_KEY.ORDER.GET_ITEMS],
          (oldData: IOrder[]) => oldData.filter(item => item._id !== id),
        );
      }
      return res.data;
    },
  });
};

export const useUpdateOrderItemQuantityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateOrderItemQuantityFormSchema) => {
      const res = await orderService.updateOrderItemQuantity(
        data._id,
        data.quantity,
      );
      if (res.data.success) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.ORDER.GET_ITEMS],
        });
      }
      return res.data;
    },
  });
};
