import { Crypto, Currency } from "../types";
export const currencySymbols: { [key: string]: string } = {
  usd: "$",
  eur: "€",
  gbp: "£",
  inr: "₹",
  chf: "CHF",
};

export const getCurrencySymbol = (currency: string): string => {
  return currencySymbols[currency.toLowerCase()] || currency.toUpperCase();
};

const conversionRates: { [key in Currency]: number } = {
  usd: 1,
  eur: 0.95,
  inr: 84.31,
  gbp: 0.8,
  chf: 0.89,
};

export const convertCryptos = (
  cryptos: Crypto[],
  currency: Currency
): Crypto[] => {
  const rate = conversionRates[currency];
  return cryptos.map((crypto) => ({
    ...crypto,
    current_price: crypto.current_price * rate,
    market_cap: crypto.market_cap * rate,
    total_volume: crypto.total_volume * rate,
    high_24h: crypto.high_24h * rate,
    low_24h: crypto.low_24h * rate,
  }));
};
