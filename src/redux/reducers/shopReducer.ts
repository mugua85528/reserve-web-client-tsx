import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

export interface ShopState {
  shopName: string;
  description: string;
  openTime: number;
  closeTime: number;
  service: serviceType[];
}

type serviceType = {
  name: string;
  price: number;
};

const initialState: ShopState = {
  shopName: "",
  description: "",
  openTime: 0,
  closeTime: 24,
  service: [],
};

const shopReducer = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShopState: (state, action: PayloadAction<ShopState>) => {
      state.shopName = action.payload.shopName;
      state.description = action.payload.description;
      state.openTime = action.payload.openTime;
      state.closeTime = action.payload.closeTime;
      state.service = action.payload.service;
    },
  },
});

export const { setShopState } = shopReducer.actions;

export const seleteShop = (state: RootState) => state.shop;

export default shopReducer.reducer;
