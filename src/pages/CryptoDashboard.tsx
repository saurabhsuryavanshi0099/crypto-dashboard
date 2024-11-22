import React, { useState, useEffect, Suspense } from "react";
import {
  Container,
  Typography,
  Paper,
  Alert,
  Button,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CryptoList from "../components/CryptoList";
import CurrencySelector from "../components/CurrencySelector";
import RecentSearches from "../components/RecentSearches";
import { fetchCryptos, fetchCryptoDetails } from "../services/api";
import { Crypto, Currency } from "../types";
import { getCurrencySymbol } from "../utils/currencyUtils";
import CircularProgress from "@mui/material/CircularProgress";

const CryptoDetails = React.lazy(() => import("../components/CryptoDetails"));

const CryptoDashboard: React.FC = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [currency, setCurrency] = useState<Currency>("usd");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<Crypto[]>(
    JSON.parse(localStorage.getItem("recentSearches") || "[]")
  );

  const fetchCryptoData = async (currentCurrency: Currency) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchCryptos(currentCurrency);
      setCryptos(data);

      const persistedSelection =
        selectedCrypto &&
        data.find((crypto) => crypto.id === selectedCrypto.id);

      if (persistedSelection) {
        setSelectedCrypto(persistedSelection);
      } else if (data.length > 0) {
        setSelectedCrypto(data[0]);
      } else {
        setSelectedCrypto(null);
      }
    } catch (err) {
      console.error("Error fetching cryptos:", err);
      setError("Failed to fetch cryptocurrency data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData(currency);
  }, [currency]);

  const handleCryptoSelect = (crypto: Crypto) => {
    console.log("crypto", crypto);
    const selectedCryptoDetails = cryptos?.filter(
      (item) => item.id === crypto.id
    )[0];
    setSelectedCrypto(selectedCryptoDetails);
    const updatedSearches = [
      crypto,
      ...recentSearches.filter((item) => item.id !== crypto.id),
    ].slice(0, 10);

    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    if (selectedCrypto) {
      fetchCryptoDetails(selectedCrypto.id, newCurrency).then(
        setSelectedCrypto
      );
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Crypto Dashboard
      </Typography>

      <CurrencySelector
        currency={currency}
        onCurrencyChange={handleCurrencyChange}
      />

      {error && (
        <Alert
          severity="error"
          sx={{ mt: 2 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => fetchCryptoData(currency)}
            >
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {loading ? (
        <Typography align="center" sx={{ mt: 20 }}>
          <CircularProgress />
        </Typography>
      ) : (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 5 }} display="flex" flexDirection="column">
            <CryptoList
              cryptos={cryptos}
              onSelect={handleCryptoSelect}
              currency={currency}
              selectedCrypto={selectedCrypto}
            />
          </Grid>

          {selectedCrypto && (
            <Suspense fallback={<div>Loading...</div>}>
              <CryptoDetails
                selectedCrypto={selectedCrypto}
                currency={currency}
              />
            </Suspense>
          )}
          <Grid size={{ xs: 12, md: 3 }} display="flex" flexDirection="column">
            <RecentSearches
              searches={recentSearches}
              onSearchSelect={handleCryptoSelect}
              selectedCrypto={selectedCrypto}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CryptoDashboard;
