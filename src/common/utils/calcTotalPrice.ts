import type { CartItemType } from '@/common/types';

export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, item) => {
    return sum + item.price * item.count;
  }, 0);
};
