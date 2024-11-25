import React, { useState, useMemo, Suspense } from "react";
import {
  Container,
  Typography,
  Alert,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CryptoList from "../components/CryptoList";
import CurrencySelector from "../components/CurrencySelector";
import RecentSearches from "../components/RecentSearches";
import { useQuery } from "@tanstack/react-query";
import { fetchCryptos } from "../services/api";
import { Crypto, Currency } from "../types";

const CryptoDetails = React.lazy(() => import("../components/CryptoDetails"));

const CryptoDashboard: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>("usd");
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [recentSearches, setRecentSearches] = useState<Crypto[]>(() =>
    JSON.parse(localStorage.getItem("recentSearches") || "[]")
  );

  // React Query to fetch cryptocurrencies
  const {
    data: cryptos = [],
    isLoading: cryptosLoading,
    isError: cryptosError,
    refetch: refetchCryptos,
  } = useQuery({
    queryKey: ["cryptos", currency],
    queryFn: fetchCryptos,
    staleTime: 30 * 1000,
  });

  // Handle data updates
  React.useEffect(() => {
    if (cryptos.length > 0) {
      if (!selectedCrypto) {
        setSelectedCrypto(cryptos[0]);
      } else {
        const updatedSelection = cryptos.find(
          (crypto: Crypto) => crypto.id === selectedCrypto.id
        );
        setSelectedCrypto(updatedSelection || cryptos[0]);
      }
    }
  }, [cryptos, selectedCrypto]);

  const convertedCryptos = useMemo(() => cryptos, [cryptos]);

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };

  const handleCryptoSelect = (crypto: Crypto) => {
    setSelectedCrypto(crypto);

    const updatedSearches = [
      crypto,
      ...recentSearches.filter((item) => item.id !== crypto.id),
    ].slice(0, 10);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
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

      {cryptosError && (
        <Alert
          severity="error"
          sx={{ mt: 2 }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => refetchCryptos()}
            >
              Retry
            </Button>
          }
        >
          Failed to fetch cryptocurrency data. Please try again.
        </Alert>
      )}

      {cryptosLoading ? (
        <Typography align="center" sx={{ mt: 20 }}>
          <CircularProgress />
        </Typography>
      ) : (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Crypto List Section */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box display="flex" flexDirection="column" width="100%">
              <CryptoList
                cryptos={convertedCryptos}
                onSelect={handleCryptoSelect}
                currency={currency}
                selectedCrypto={selectedCrypto}
                refetchCryptos={refetchCryptos}
              />
            </Box>
          </Grid>

          {/* Crypto Details Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            {selectedCrypto && (
              <Suspense fallback={<CircularProgress />}>
                <CryptoDetails
                  selectedCrypto={selectedCrypto}
                  currency={currency}
                />
              </Suspense>
            )}
          </Grid>

          {/* Recent Searches Section */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box display="flex" flexDirection="column" width="100%">
              <RecentSearches
                searches={recentSearches}
                onSearchSelect={handleCryptoSelect}
                selectedCrypto={selectedCrypto}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CryptoDashboard;
