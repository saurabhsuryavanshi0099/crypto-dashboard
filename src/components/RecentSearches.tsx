import React from "react";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { Crypto } from "../types";

interface RecentSearchesProps {
  searches: Crypto[];
  onSearchSelect: (crypto: Crypto) => void;
  selectedCrypto: Crypto | null;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({
  searches,
  onSearchSelect,
  selectedCrypto,
}) => {
  return (
    <Paper sx={{ mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recent Searches
      </Typography>
      <List style={{ height: "400px", overflowY: "auto" }}>
        {searches.map((crypto, index) => (
          <ListItem
            key={index}
            component="div"
            onClick={() => onSearchSelect(crypto)}
            sx={{ borderBottom: "1px solid #eee", cursor: "pointer" }}
          >
            <ListItemText
              primary={crypto.name}
              secondary={`Symbol: ${crypto.symbol.toUpperCase()}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RecentSearches;
