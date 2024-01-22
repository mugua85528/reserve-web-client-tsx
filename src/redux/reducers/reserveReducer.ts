import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { PURGE } from "redux-persist";

export interface ReserverState {
  year: number;
  month: number;
  date: number;
  day: number;
  time: string;
  ms: number;
  service: string;
  price: number;
  seletedDate: string;
  format: string;
}

// 儲存服務與價格方法的型別
type ServiceType = Pick<ReserverState, "service" | "price">;
// 儲存日期方法的型別
type DateType = Omit<ReserverState, "service" | "price" | "time">;
// 儲存時間方法的型別
type TimeType = Pick<ReserverState, "time">;

const initialState: ReserverState = {
  year: 0,
  month: 0,
  date: 0,
  day: 0,
  time: "0",
  ms: 0,
  service: "尚未選取",
  price: 0,
  seletedDate: "",
  format: "",
};

const reserveReducer = createSlice({
  name: "reserve",
  initialState,
  reducers: {
    setService: (state, action: PayloadAction<ServiceType>) => {
      state.service = action.payload.service;
      state.price = action.payload.price;
    },
    setDate: (state, action: PayloadAction<DateType>) => {
      state.year = action.payload.year;
      state.month = action.payload.month;
      state.date = action.payload.date;
      state.day = action.payload.day;
      state.ms = action.payload.ms;
      state.seletedDate = action.payload.seletedDate;
      state.format = action.payload.format;
    },
    setTime: (state, action: PayloadAction<TimeType>) => {
      state.time = action.payload.time;
    },
    clearReserver: (state) => {
      state = initialState;
    },
    extraReducers: (state, builder: any) => {
      builder.addCase(PURGE, () => {
        state = initialState;
        return state;
      });
    },
  },
});

export const { setService, setDate, setTime, clearReserver } =
  reserveReducer.actions;

export const selectReserve = (state: RootState) => state.reserve;

export default reserveReducer.reducer;
