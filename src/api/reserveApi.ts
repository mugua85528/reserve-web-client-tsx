import axios from "axios";
// const API_URL = "http://127.0.0.1:8080/api/";
const API_URL = "https://sideprojectreserveweb.onrender.com/api/";

export interface ReserveState {
  year: number;
  month: number;
  date: number;
  day: string;
  time: string;
  ms: number;
  service: string;
  price: number;
  name: string;
  phone: string;
  gender: string;
  email: string;
  textarea: string;
  terms: boolean;
}

class ReserverService {
  reserve(allData: ReserveState) {
    return axios.post(API_URL + "reserve", allData);
  }

  search(phoneNumber: string) {
    return axios.get(API_URL + "search/" + phoneNumber);
  }

  getreserved() {
    return axios.get(API_URL + "after");
  }

  getShopData() {
    return axios.get(API_URL + "shop");
  }
}

export default new ReserverService();
