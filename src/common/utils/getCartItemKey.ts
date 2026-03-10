import type { CartItemType } from '@/common/types';

export const getCartItemKey = ({ id, type, size }: Pick<CartItemType, 'id' | 'type' | 'size'>) =>
  `${id}-${type}-${size}`;
