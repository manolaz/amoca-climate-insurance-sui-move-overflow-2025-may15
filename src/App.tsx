import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
// import HomePage from "./pages/HomePage";
import RiskMapPage from "./pages/RiskMapPage";
import ProductsPage from "./pages/ProductsPage";
import ClaimsPage from "./pages/ClaimsPage";
import AboutPage from "./pages/AboutPage";
import WorldmapSelector from "./WorldmapSelector";

function App() {
  const currentAccount = useCurrentAccount();

  const insuranceProducts = [
    { name: "Business Property Insurance", description: "Covers damage to physical assets like buildings, equipment, and inventory." },
    { name: "Business Interruption Insurance", description: "Replaces lost income and covers expenses during temporary closure due to covered events." },
    { name: "Flood Insurance", description: "Provides coverage for flood damage, often excluded from standard policies." },
    { name: "Windstorm Insurance", description: "Specific coverage for damage from hurricanes and tornadoes." },
    { name: "Earthquake Insurance", description: "Separate coverage for earthquake-related damage." },
    { name: "Commercial Auto Insurance", description: "Covers damage to business-owned vehicles from natural disasters." },
  ];

  return (
    <BrowserRouter>
      <Box style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <Box style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={
              <>
                <Flex
                  position="sticky"
                  px="4"
                  py="2"
                  justify="between"
                  style={{
                    borderBottom: "1px solid var(--gray-a2)",
                  }}
                >
                  <Box>
                    <Heading>AMOCA Climate Insurance</Heading>
                  </Box>

                  <Box>
                    <ConnectButton />
                  </Box>
                </Flex>
                <Container>
                  <Container
                    mt="5"
                    pt="2"
                    px="4"
                    style={{ background: "var(--gray-a2)", minHeight: 500 }}
                  >
                    {currentAccount ? (
                      <>
                        <Box>
                          <Heading size="4" mb="2">Welcome to AMOCA</Heading>
                          <p>Your connected address: {currentAccount.address}</p>
                        </Box>
                        <Box mt="4">
                          <Heading size="3" mb="3">Explore Our Climate Insurance Products</Heading>
                          <Flex direction="column" gap="3">
                            {insuranceProducts.map(product => (
                              <Box
                                key={product.name}
                                p="4"
                                style={{
                                  border: '1.5px solid #0077ff',
                                  borderRadius: 16,
                                  background: 'linear-gradient(135deg, #e6f9f0 0%, #e6f0fa 100%)',
                                  boxShadow: '0 2px 12px 0 rgba(0,119,255,0.07)'
                                }}
                              >
                                <Heading
                                  size="2"
                                  mb="1"
                                  style={{
                                    color: "#007a4d",
                                    fontWeight: 700,
                                    letterSpacing: 1
                                  }}
                                >
                                  {product.name}
                                </Heading>
                                <Text as="p" size="2" style={{ color: "#b8860b" }}>
                                  {product.description}
                                </Text>
                              </Box>
                            ))}
                          </Flex>
                        </Box>
                        <Box mt="6">
                          <Heading
                            size="3"
                            mb="3"
                            style={{
                              color: "#0077ff",
                              fontWeight: 700,
                              letterSpacing: 1
                            }}
                          >
                            Select a Region on the Map
                          </Heading>
                          <Text as="p" size="2" mb="2" style={{ color: "#007a4d" }}>
                            The world is divided into hexagons (1km edge). Start with Nha Trang, Vietnam, or search for another location by name or code.
                          </Text>
                          <WorldmapSelector />
                        </Box>
                      </>
                    ) : (
                      <Heading>Please connect your wallet to use AMOCA.</Heading>
                    )}
                  </Container>
                </Container>
              </>
            } />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/risk-map" element={<RiskMapPage />} />
            <Route path="/claims" element={<ClaimsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
