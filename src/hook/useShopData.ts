import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  followShop,
  getSingleShop,
  unfollowShop,
} from "../services/ShopServices/ShopService";

// Query: Single shop
export const useShop = (id: string) =>
  useQuery({
    queryKey: ["shop", id],
    queryFn: () => getSingleShop(id),
    staleTime: 5 * 60 * 1000, // 5 mins
  });

// Mutation: Follow Shop
export const useFollowShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      customerId,
      shopId,
    }: {
      customerId: string;
      shopId: string;
    }) => followShop(customerId, shopId),
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ["shop", shopId] });
    },
  });
};

// Mutation: Unfollow Shop
export const useUnfollowShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      customerId,
      shopId,
    }: {
      customerId: string;
      shopId: string;
    }) => unfollowShop(customerId, shopId),
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ["shop", shopId] });
    },
  });
};
