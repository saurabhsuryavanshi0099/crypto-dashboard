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
