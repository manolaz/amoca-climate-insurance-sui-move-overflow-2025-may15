import { Box, Heading, Text, Flex, Card, Grid, Button } from "@radix-ui/themes";
import InsuranceCard from "../components/InsuranceCard";
import PageLayout from "../components/PageLayout";
import { useCurrentAccount } from "@mysten/dapp-kit";

export default function HomePage() {
  const currentAccount = useCurrentAccount();
  
  const insuranceProducts = [
    { 
      name: "Business Property Insurance", 
      description: "Covers damage to physical assets like buildings, equipment, and inventory.",
      icon: "🏢"
    },
    { 
      name: "Business Interruption Insurance", 
      description: "Replaces lost income and covers expenses during temporary closure due to covered events.",
      icon: "⏱️"
    },
    { 
      name: "Flood Insurance", 
      description: "Provides coverage for flood damage, often excluded from standard policies.",
      icon: "🌊"
    },
    { 
      name: "Windstorm Insurance", 
      description: "Specific coverage for damage from hurricanes and tornadoes.",
      icon: "🌪️"
    },
    { 
      name: "Earthquake Insurance", 
      description: "Separate coverage for earthquake-related damage.",
      icon: "🏔️"
    },
    { 
      name: "Commercial Auto Insurance", 
      description: "Covers damage to business-owned vehicles from natural disasters.",
      icon: "🚗"
    },
  ];

  return (
    <PageLayout>
      <Card mb="4" p="4" style={{ background: "linear-gradient(135deg, #e6f0fa 0%, #d1e9ff 100%)" }}>
        <Flex gap="4">
          <Box style={{ flex: 1 }}>
            <Heading size="5" mb="2" style={{ color: "#0077ff" }}>
              AMOCA Climate Insurance
            </Heading>
            <Heading size="3" mb="2" style={{ color: "#007a4d", fontWeight: 500 }}>
              Protecting Small Businesses from Climate Risks
            </Heading>
            <Text as="p" mb="4">
              Small businesses are particularly vulnerable to climate change impacts. 
              AMOCA provides affordable, blockchain-based insurance solutions
              specifically designed to protect your business against natural disasters.
            </Text>
            {currentAccount && (
              <Text size="2" style={{ color: "#666" }}>
                Connected wallet: {currentAccount.address}
              </Text>
            )}
          </Box>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <img 
              src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=3270&auto=format&fit=crop" 
              alt="Climate Impact" 
              style={{ 
                maxWidth: 300,
                borderRadius: 10,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }}
            />
          </Box>
        </Flex>
      </Card>

      <Box>
        <Heading size="3" mb="3">
          Our Insurance Products
        </Heading>
        <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3">
          {insuranceProducts.map(product => (
            <InsuranceCard
              key={product.name}
              name={product.name}
              description={product.description}
              icon={product.icon}
            />
          ))}
        </Grid>
      </Box>
    </PageLayout>
  );
}
