import React from "react";
import { List, AutoSizer, ListRowRenderer } from "react-virtualized";
import { Paper, Typography, Box, Avatar } from "@mui/material";
import { getCurrencySymbol } from "../utils/currencyUtils";
import { Crypto } from "../types";

interface CryptoListProps {
  cryptos: Crypto[];
  onSelect: (crypto: Crypto) => void;
  currency: string;
  selectedCrypto: Crypto | null;
}

const CryptoList: React.FC<CryptoListProps> = ({
  cryptos,
  onSelect,
  currency,
  selectedCrypto,
}) => {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    const crypto = cryptos[index];
    const isSelected = selectedCrypto?.id === crypto.id;

    return (
      <Box
        key={key}
        style={style}
        sx={{
          borderBottom: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          backgroundColor: isSelected ? "#f0f0f0" : "transparent",
          "&:hover": { backgroundColor: "#f0f0f0" },
        }}
        onClick={() => onSelect(crypto)}
      >
        <Avatar
          src={crypto.image}
          alt={`${crypto.name} logo`}
          sx={{ width: 40, height: 40 }}
          slotProps={{
            img: {
              loading: "lazy",
              onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = "https://via.placeholder.com/40";
              },
            },
          }}
        />
        <Typography variant="body1">
          {crypto.name} ({crypto.symbol.toUpperCase()})
        </Typography>
        <Box>
          <Typography variant="body1" fontWeight="bold">
            {getCurrencySymbol(currency)}
            {crypto.current_price.toLocaleString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Current Price
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Paper sx={{ mt: 3, p: 2, height: "400px", overflowY: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Top Cryptocurrencies
      </Typography>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={cryptos.length}
            rowHeight={65}
            rowRenderer={rowRenderer}
            overscanRowCount={5}
            style={{ alignItems: "center" }}
          />
        )}
      </AutoSizer>
    </Paper>
  );
};

export default CryptoList;
