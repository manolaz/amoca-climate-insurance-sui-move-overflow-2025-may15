import { Box, Heading, Grid, Card, Text, Flex, Button } from "@radix-ui/themes";
import PageLayout from "../components/PageLayout";
import InsuranceCard from "../components/InsuranceCard";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const insuranceProducts = [
    { 
      name: "Business Property Insurance", 
      description: "Covers damage to physical assets including buildings, equipment, furniture, and inventory from covered perils like wind, hail, and fire.",
      details: "Our business property insurance provides protection for your physical assets, offering peace of mind against damage from climate-related events. Coverage includes buildings, inventory, equipment, and furniture.",
      icon: "🏢"
    },
    { 
      name: "Business Interruption Insurance", 
      description: "Helps replace lost income and covers operating expenses if your business is forced to close temporarily due to a covered climate-related event.",
      details: "When disaster strikes and your business must temporarily close, this coverage helps replace lost income and pays for ongoing expenses like rent, utilities, and payroll.",
      icon: "⏱️" 
    },
    { 
      name: "Flood Insurance", 
      description: "Standard business property insurance typically excludes flood damage. This separate policy covers damages specifically caused by flooding events.",
      details: "With increasing flood risks in many areas, this specialized coverage protects against water damage from rising water levels, heavy rain, storm surges, and other flooding events.",
      icon: "🌊"
    },
    { 
      name: "Windstorm Insurance", 
      description: "In areas prone to hurricanes and tornadoes, this specialized coverage protects against damage from high winds and wind-driven rain.",
      details: "Our windstorm insurance provides protection against hurricanes, tornadoes, and other severe wind events that can cause significant damage to business property.",
      icon: "🌪️"
    },
    { 
      name: "Earthquake Insurance", 
      description: "Similar to flood, earthquake damage is usually excluded from standard policies and requires separate coverage, particularly in seismically active regions.",
      details: "For businesses in earthquake-prone areas, this coverage is essential to protect against structural damage and business interruption caused by seismic events.",
      icon: "🏔️"
    },
    { 
      name: "Commercial Auto Insurance", 
      description: "Covers damage to business-owned vehicles caused by natural disasters, protecting your transportation assets from climate risks.",
      details: "If your business relies on vehicles, our commercial auto insurance protects them from damage due to floods, fallen trees, hail, and other climate-related perils.",
      icon: "🚗"
    },
  ];

  return (
    <PageLayout title="Insurance Products">
      <Text as="p" mb="4">
        Our climate insurance products are specifically designed to protect small businesses from the increasing risks associated with climate change. Each product addresses specific vulnerabilities that could impact your business operations.
      </Text>
      
      {insuranceProducts.map((product, index) => (
        <Card key={index} mb="4" style={{ overflow: "visible" }}>
          <Flex>
            <Box p="4" style={{ flex: 1 }}>
              <Flex align="center" gap="2" mb="2">
                <Box style={{ fontSize: '2rem' }}>
                  {product.icon}
                </Box>
                <Heading size="3" style={{ color: "#007a4d" }}>
                  {product.name}
                </Heading>
              </Flex>
              <Text as="p" mb="2">
                {product.details}
              </Text>
              <Text as="p" size="2" style={{ color: "#666" }}>
                {product.description}
              </Text>
            </Box>
            <Box width="200px" p="4" style={{ 
              background: "linear-gradient(135deg, #e6f9f0 0%, #e6f0fa 100%)",
              borderLeft: "1px solid var(--gray-a3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Heading size="2" mb="2" style={{ textAlign: "center" }}>Starting at</Heading>
              <Heading size="4" mb="2" style={{ color: "#007a4d" }}>
                ${(index + 4) * 100}/year
              </Heading>
              <Button size="2" style={{ background: '#0077ff', color: 'white' }}>
                Get Quote
              </Button>
            </Box>
          </Flex>
        </Card>
      ))}
    </PageLayout>
  );
}
