import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import { getCurrencySymbol } from "../utils/currencyUtils";
import { Crypto } from "../types";

interface CryptoDetailsProps {
  selectedCrypto: Crypto;
  currency: string;
}

const CryptoDetails: React.FC<CryptoDetailsProps> = ({
  selectedCrypto,
  currency,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: { xs: 0, md: 3 },
        p: 2,
        height: { xs: "auto", md: "auto" },
        backgroundColor: "#e3f2fd",
        borderRadius: "10px",
      }}
    >
      {/* Header with Name and Logo */}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h5" gutterBottom>
          {selectedCrypto.name} ({selectedCrypto.symbol.toUpperCase()})
        </Typography>
        <img
          src={selectedCrypto?.image}
          alt={`${selectedCrypto.name} logo`}
          style={{ width: 60, height: 60, borderRadius: "50%" }}
        />
      </Box>
      <Box mt={2}>
        <Typography>
          <strong>Price:</strong> {getCurrencySymbol(currency)}{" "}
          {selectedCrypto.current_price.toLocaleString()}{" "}
          {currency.toUpperCase()}
        </Typography>
        <Typography>
          <strong>Market Cap:</strong>{" "}
          {selectedCrypto.market_cap.toLocaleString()}
        </Typography>
        <Typography>
          <strong>Market Cap Rank:</strong> #{selectedCrypto.market_cap_rank}
        </Typography>
        <Typography>
          <strong>24h Change:</strong>{" "}
          {selectedCrypto.price_change_percentage_24h.toFixed(2)}%
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography>
          <strong>24h High:</strong> {getCurrencySymbol(currency)}{" "}
          {selectedCrypto.high_24h.toLocaleString()}
        </Typography>
        <Typography>
          <strong>24h Low:</strong> {getCurrencySymbol(currency)}{" "}
          {selectedCrypto.low_24h.toLocaleString()}
        </Typography>
        <Typography>
          <strong>Total Volume (24h):</strong>{" "}
          {selectedCrypto.total_volume.toLocaleString()}
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography>
          <strong>Circulating Supply:</strong>{" "}
          {selectedCrypto.circulating_supply.toLocaleString()}{" "}
          {selectedCrypto.symbol.toUpperCase()}
        </Typography>
        <Typography>
          <strong>Total Supply:</strong>{" "}
          {selectedCrypto.total_supply
            ? selectedCrypto.total_supply.toLocaleString()
            : "Not Available"}
        </Typography>
        <Typography>
          <strong>Max Supply:</strong>{" "}
          {selectedCrypto.max_supply
            ? selectedCrypto.max_supply.toLocaleString()
            : "Not Available"}
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography>
          <strong>All-Time High (ATH):</strong> {getCurrencySymbol(currency)}{" "}
          {selectedCrypto.ath.toLocaleString()}
          <Typography variant="caption" color="text.secondary">
            on {new Date(selectedCrypto.ath_date).toLocaleDateString()}
          </Typography>
        </Typography>
        <Typography>
          <strong>ATH Change:</strong>{" "}
          {selectedCrypto.ath_change_percentage.toFixed(2)}%
        </Typography>
        <Typography>
          <strong>All-Time Low (ATL):</strong> {getCurrencySymbol(currency)}{" "}
          {selectedCrypto.atl.toLocaleString()}
          <Typography variant="caption" color="text.secondary">
            on {new Date(selectedCrypto.atl_date).toLocaleDateString()}
          </Typography>
        </Typography>
        <Typography>
          <strong>ATL Change:</strong>{" "}
          {selectedCrypto.atl_change_percentage.toFixed(2)}%
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="caption" color="text.secondary">
          <strong>Last Updated:</strong>{" "}
          {new Date(selectedCrypto.last_updated).toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CryptoDetails;
