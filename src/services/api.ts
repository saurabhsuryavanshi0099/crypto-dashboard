import axios from "axios";
import { Crypto } from "../types";

const API_URL = "https://api.coingecko.com/api/v3";

export const fetchCryptos = async (currency: string): Promise<Crypto[]> => {
  const response = await axios.get(`${API_URL}/coins/markets`, {
    params: {
      vs_currency: currency,
      order: "market_cap_desc",
      per_page: 50,
      page: 1,
    },
  });
  return response.data;
};

export const fetchCryptoDetails = async (
  id: string,
  currency: string
): Promise<Crypto> => {
  const response = await axios.get(`${API_URL}/coins/markets`, {
    params: { ids: id, vs_currency: currency },
  });
  return response.data[0];
};
