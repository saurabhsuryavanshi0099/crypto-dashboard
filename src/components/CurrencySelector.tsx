import React from "react";
import { MenuItem, Select, Typography, Box } from "@mui/material";
import { Currency } from "../types";

interface CurrencySelectorProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  currency,
  onCurrencyChange,
}) => {
  const currencies: Currency[] = ["usd", "eur", "gbp", "inr", "chf"];

  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Typography variant="body1">Select Currency:</Typography>
      <Select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value as Currency)}
        sx={{ minWidth: 150 }}
      >
        {currencies.map((cur) => (
          <MenuItem key={cur} value={cur}>
            {cur.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default CurrencySelector;
