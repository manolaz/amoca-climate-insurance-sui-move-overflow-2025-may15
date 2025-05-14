import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, useMapEvents } from "react-leaflet";
import * as h3 from "h3-js";
import "leaflet/dist/leaflet.css";
import { Box, Heading, TextField, Button, Flex, Text, Card, Badge, Checkbox, Tabs, Grid } from "@radix-ui/themes";

// Coordinates for Nha Trang, Vietnam
const NHA_TRANG_COORDS = [12.2388, 109.1967];
const HEX_EDGE_LENGTH_KM = 1; // 1km edge
const H3_RESOLUTION = 8; // ~1km edge length

// Risk levels by region (simplified mock data)
const MOCK_RISK_DATA = {
  flood: {
    high: ["Asia Pacific", "South Asia"],
    medium: ["North America", "Europe"],
    low: ["Africa", "Middle East"]
  },
  wildfire: {
    high: ["North America", "Australia"],
    medium: ["Europe", "Asia Pacific"],
    low: ["South Asia", "Africa"]
  },
  windstorm: {
    high: ["Asia Pacific", "North America"],
    medium: ["Europe", "Africa"],
    low: ["South Asia", "Middle East"]
  },
  earthquake: {
    high: ["Asia Pacific", "South America"],
    medium: ["North America", "Europe"],
    low: ["Africa", "Middle East"]
  }
};

// Insurance types and base pricing
const INSURANCE_TYPES = [
  { 
    id: "property", 
    name: "Business Property Insurance", 
    description: "Covers damage to physical assets including buildings and equipment",
    basePrice: 500
  },
  { 
    id: "interruption", 
    name: "Business Interruption", 
    description: "Helps replace lost income if your business closes temporarily",
    basePrice: 450
  },
  { 
    id: "flood", 
    name: "Flood Insurance", 
    description: "Coverage for damages caused by flooding",
    basePrice: 600
  },
  { 
    id: "windstorm", 
    name: "Windstorm Insurance", 
    description: "Protection from hurricanes and tornadoes",
    basePrice: 550
  },
  { 
    id: "earthquake", 
    name: "Earthquake Insurance", 
    description: "Coverage for seismic activity damage",
    basePrice: 700
  },
  { 
    id: "auto", 
    name: "Commercial Auto Insurance", 
    description: "Covers business vehicles damaged by disasters",
    basePrice: 400
  }
];

function getHexagons(center, radiusKm = 5) {
  // Get all hexagons within a radius (in km) of the center
  const h3Center = h3.geoToH3(center[0], center[1], H3_RESOLUTION);
  // Approximate: 1km per ring
  const rings = Math.ceil(radiusKm / 1);
  return [h3Center, ...h3.kRing(h3Center, rings).filter(h => h !== h3Center)];
}

function HexagonSelector({ hexagons, selectedHexagons, setSelectedHexagons, selectionMode }) {
  useMapEvents({
    click: (e: any) => {
      if (!selectionMode) return;
      
      // Convert click to H3 index
      const { lat, lng } = e.latlng;
      const clickedHex = h3.geoToH3(lat, lng, H3_RESOLUTION);
      
      // Toggle selection
      if (selectedHexagons.includes(clickedHex)) {
        setSelectedHexagons((prev: string[]) => prev.filter(h => h !== clickedHex));
      } else {
        setSelectedHexagons((prev: string[]) => [...prev, clickedHex]);
      }
    }
  });

  return (
    <>
      {hexagons.map(h3Index => {
        const boundary = h3.h3ToGeoBoundary(h3Index, true).map(([lat, lng]) => [lat, lng]);
        const isSelected = selectedHexagons.includes(h3Index);
        
        return (
          <Polygon
            key={h3Index}
            positions={boundary}
            pathOptions={{
              color: isSelected ? "#ff4500" : "#ffd700", // orange when selected, gold otherwise
              weight: isSelected ? 3 : 2,
              fillOpacity: isSelected ? 0.4 : 0.25,
              fillColor: isSelected ? "#ff8c00" : "#0077ff" // darker orange fill when selected
            }}
          />
        );
      })}
    </>
  );
}

export default function WorldmapSelector() {
  const [center, setCenter] = useState(NHA_TRANG_COORDS);
  const [hexagons, setHexagons] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedHexagons, setSelectedHexagons] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState<string[]>([]);
  const [regionRisk, setRegionRisk] = useState<string>("medium");
  const [businessSize, setBusinessSize] = useState<string>("small");

  useEffect(() => {
    // Show hexes in a 5km radius around center
    setHexagons(getHexagons(center, 5));
  }, [center]);

  async function handleSearch() {
    setSearching(true);
    setError(null);
    try {
      // Use OpenStreetMap Nominatim API for geocoding
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        search
      )}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setCenter([lat, lon]);
      } else {
        setError("Location not found.");
      }
    } catch (e) {
      setError("Error searching location.");
    }
    setSearching(false);
  }

  // Get region information based on coordinates
  const getRegionInfo = (coords) => {
    // This would be replaced with actual API calls in production
    // Simple mock logic for demo
    const lat = coords[0];
    const lon = coords[1];
    
    if (lat > 0 && lon > 0) return "Asia Pacific";
    if (lat > 0 && lon < 0) return "North America";
    if (lat < 0 && lon > 0) return "Australia";
    if (lat < 0 && lon < 0) return "South America";
    return "Europe";
  };

  // Calculate risk level for a region
  const calculateRiskLevel = (region, riskType) => {
    if (MOCK_RISK_DATA[riskType].high.includes(region)) return "High";
    if (MOCK_RISK_DATA[riskType].medium.includes(region)) return "Medium";
    return "Low";
  };
  
  // Calculate insurance cost based on selection
  const calculateInsuranceCost = () => {
    if (selectedHexagons.length === 0 || selectedInsurance.length === 0) return 0;
    
    const areaCoverage = selectedHexagons.length;
    const regionMultiplier = regionRisk === "high" ? 1.5 : regionRisk === "medium" ? 1.2 : 1;
    const sizeFactor = businessSize === "large" ? 2.0 : businessSize === "medium" ? 1.5 : 1.0;
    
    return selectedInsurance.reduce((total, insuranceId) => {
      const insurance = INSURANCE_TYPES.find(i => i.id === insuranceId);
      return total + (insurance ? insurance.basePrice * areaCoverage * regionMultiplier * sizeFactor / 10 : 0);
    }, 0).toFixed(2);
  };

  // Get current region based on center
  const currentRegion = getRegionInfo(center);

  return (
    <Box
      style={{
        background: "linear-gradient(135deg, #e6f9f0 0%, #e6f0fa 100%)",
        borderRadius: 16,
        boxShadow: "0 4px 24px 0 rgba(0,64,128,0.07)",
        padding: 24,
        border: "1px solid #b3e6cc",
        maxWidth: 900,
        margin: "0 auto"
      }}
    >
      <Heading
        size="4"
        mb="2"
        style={{
          color: "#007a4d",
          fontWeight: 700,
          letterSpacing: 1
        }}
      >
        AMOCA Climate Insurance - Area Selector
      </Heading>
      <Flex gap="2" mb="2" align="center">
        <TextField
          placeholder="Search country, state, city, or code..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleSearch();
          }}
          style={{
            borderColor: "#0077ff",
            background: "#f7fff9",
            color: "#007a4d"
          }}
        />
        <Button
          onClick={handleSearch}
          disabled={searching || !search}
          style={{
            background: "linear-gradient(90deg, #0077ff 0%, #00c853 100%)",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 8,
            border: "none",
            boxShadow: "0 2px 8px 0 rgba(0,119,255,0.08)"
          }}
        >
          {searching ? "Searching..." : "Search"}
        </Button>
      </Flex>
      {error && (
        <Box
          mb="2"
          style={{
            color: "#b8860b",
            background: "#fffbe6",
            border: "1px solid #ffe066",
            borderRadius: 8,
            padding: "8px 12px"
          }}
        >
          {error}
        </Box>
      )}
      
      <Flex gap="2" mb="3">
        <Button 
          onClick={() => setSelectionMode(!selectionMode)}
          style={{
            background: selectionMode ? "#ff4500" : "#0077ff",
            color: "#fff"
          }}
        >
          {selectionMode ? "Exit Selection Mode" : "Select Hexagons for Coverage"}
        </Button>
        {selectedHexagons.length > 0 && (
          <Button variant="soft" onClick={() => setSelectedHexagons([])}>
            Clear Selection ({selectedHexagons.length})
          </Button>
        )}
      </Flex>

      <MapContainer
        center={center as [number, number]}
        zoom={13}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: 12,
          border: "2px solid #0077ff",
          marginTop: 12,
          boxShadow: "0 2px 12px 0 rgba(0,119,255,0.07)"
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <HexagonSelector 
          hexagons={hexagons} 
          selectedHexagons={selectedHexagons}
          setSelectedHexagons={setSelectedHexagons}
          selectionMode={selectionMode}
        />
      </MapContainer>
      
      <Tabs.Root defaultValue="risk">
        <Tabs.List mt="4">
          <Tabs.Trigger value="risk">Climate Risk Assessment</Tabs.Trigger>
          <Tabs.Trigger value="coverage">Coverage Selection</Tabs.Trigger>
          <Tabs.Trigger value="summary">Insurance Summary</Tabs.Trigger>
        </Tabs.List>
        
        <Tabs.Content value="risk">
          <Card mt="3" style={{ padding: "var(--space-3)" }}>
            <Heading size="3" mb="2">Climate Risk Profile: {currentRegion}</Heading>
            <Text mb="2">Selected area: {selectedHexagons.length} hexagons (~{selectedHexagons.length} sq km)</Text>
            
            <Grid columns="2" gap="2" mt="3">
              <Box>
                <Heading size="2" mb="1">Flood Risk</Heading>
                <Badge color={calculateRiskLevel(currentRegion, "flood") === "High" ? "red" : calculateRiskLevel(currentRegion, "flood") === "Medium" ? "orange" : "green"}>
                  {calculateRiskLevel(currentRegion, "flood")}
                </Badge>
              </Box>
              <Box>
                <Heading size="2" mb="1">Wildfire Risk</Heading>
                <Badge color={calculateRiskLevel(currentRegion, "wildfire") === "High" ? "red" : calculateRiskLevel(currentRegion, "wildfire") === "Medium" ? "orange" : "green"}>
                  {calculateRiskLevel(currentRegion, "wildfire")}
                </Badge>
              </Box>
              <Box>
                <Heading size="2" mb="1">Windstorm Risk</Heading>
                <Badge color={calculateRiskLevel(currentRegion, "windstorm") === "High" ? "red" : calculateRiskLevel(currentRegion, "windstorm") === "Medium" ? "orange" : "green"}>
                  {calculateRiskLevel(currentRegion, "windstorm")}
                </Badge>
              </Box>
              <Box>
                <Heading size="2" mb="1">Earthquake Risk</Heading>
                <Badge color={calculateRiskLevel(currentRegion, "earthquake") === "High" ? "red" : calculateRiskLevel(currentRegion, "earthquake") === "Medium" ? "orange" : "green"}>
                  {calculateRiskLevel(currentRegion, "earthquake")}
                </Badge>
              </Box>
            </Grid>
          </Card>
        </Tabs.Content>
        
        <Tabs.Content value="coverage">
          <Card mt="3" style={{ padding: "var(--space-3)" }}>
            <Heading size="3" mb="2">Select Insurance Coverage</Heading>
            <Text mb="3">Choose the coverage types needed for your business in this area:</Text>
            
            <Flex direction="column" gap="2">
              {INSURANCE_TYPES.map((insurance) => (
                <Box key={insurance.id} p="2" style={{ background: "#f5f9ff", borderRadius: 8 }}>
                  <Flex align="center" justify="between">
                    <Flex gap="2" align="center">
                      <Checkbox 
                        checked={selectedInsurance.includes(insurance.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedInsurance(prev => [...prev, insurance.id]);
                          } else {
                            setSelectedInsurance(prev => prev.filter(id => id !== insurance.id));
                          }
                        }}
                      />
                      <div>
                        <Text weight="bold">{insurance.name}</Text>
                        <Text size="1" color="gray">{insurance.description}</Text>
                      </div>
                    </Flex>
                    <Text>${insurance.basePrice}/km²</Text>
                  </Flex>
                </Box>
              ))}
            </Flex>
            
            <Box mt="3">
              <Heading size="2" mb="1">Business Size</Heading>
              <Flex gap="2">
                <Button 
                  variant={businessSize === "small" ? "solid" : "soft"} 
                  onClick={() => setBusinessSize("small")}
                >
                  Small
                </Button>
                <Button 
                  variant={businessSize === "medium" ? "solid" : "soft"} 
                  onClick={() => setBusinessSize("medium")}
                >
                  Medium
                </Button>
                <Button 
                  variant={businessSize === "large" ? "solid" : "soft"} 
                  onClick={() => setBusinessSize("large")}
                >
                  Large
                </Button>
              </Flex>
            </Box>
          </Card>
        </Tabs.Content>
        
        <Tabs.Content value="summary">
          <Card mt="3" style={{ padding: "var(--space-3)" }}>
            <Heading size="3" mb="2">Insurance Summary</Heading>
            <Box p="3" style={{ background: "#eaf7f2", borderRadius: 8 }}>
              <Flex justify="between" mb="2">
                <Text weight="bold">Region:</Text>
                <Text>{currentRegion}</Text>
              </Flex>
              <Flex justify="between" mb="2">
                <Text weight="bold">Coverage Area:</Text>
                <Text>{selectedHexagons.length} hexagons (~{selectedHexagons.length} sq km)</Text>
              </Flex>
              <Flex justify="between" mb="2">
                <Text weight="bold">Business Size:</Text>
                <Text style={{ textTransform: 'capitalize' }}>{businessSize}</Text>
              </Flex>
              <Flex justify="between" mb="2">
                <Text weight="bold">Coverage Types:</Text>
                <Text>{selectedInsurance.length} selected</Text>
              </Flex>
              <Box mt="3" p="2" style={{ background: "#ffffff", borderRadius: 6 }}>
                {selectedInsurance.map(id => {
                  const insurance = INSURANCE_TYPES.find(i => i.id === id);
                  return insurance ? (
                    <Flex key={id} justify="between" mb="1">
                      <Text size="2">{insurance.name}</Text>
                      <Text size="2">${(insurance.basePrice * selectedHexagons.length / 10).toFixed(2)}</Text>
                    </Flex>
                  ) : null;
                })}
                <Box mt="2" pt="2" style={{ borderTop: "1px solid #e6e8eb" }}>
                  <Flex justify="between">
                    <Text weight="bold">Estimated Monthly Premium:</Text>
                    <Text weight="bold" style={{ color: "#007a4d" }}>
                      ${calculateInsuranceCost()}
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </Box>
            
            <Flex mt="3" justify="end">
              <Button 
                disabled={selectedHexagons.length === 0 || selectedInsurance.length === 0}
                style={{
                  background: "linear-gradient(90deg, #007a4d 0%, #00a86b 100%)",
                  color: "#fff",
                  fontWeight: 600
                }}
              >
                Get Full Quote
              </Button>
            </Flex>
          </Card>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
