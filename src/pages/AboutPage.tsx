import { Box, Heading, Text, Card, Flex, Grid } from "@radix-ui/themes";
import PageLayout from "../components/PageLayout";

export default function AboutPage() {
  return (
    <PageLayout title="About AMOCA Climate Insurance">
      <Text as="p" mb="4">
        AMOCA Climate Insurance is a blockchain-powered insurance platform specifically designed to help small businesses protect themselves against the growing risks of climate change and extreme weather events.
      </Text>
      
      <Card mb="4">
        <Heading size="3" mb="2">Our Mission</Heading>
        <Text as="p">
          To provide accessible, transparent, and affordable climate insurance solutions for small businesses worldwide, leveraging blockchain technology to create a more resilient business ecosystem in the face of climate change.
        </Text>
      </Card>
      
      <Heading size="3" mb="3">Why Choose AMOCA?</Heading>
      <Grid columns={{ initial: "1", md: "2" }} gap="3" mb="4">
        <Card>
          <Heading size="2" mb="1">Blockchain Transparency</Heading>
          <Text as="p" size="2">
            All policies and claims are recorded on the Sui blockchain, ensuring complete transparency and immutability of your insurance contracts.
          </Text>
        </Card>
        <Card>
          <Heading size="2" mb="1">Parametric Insurance</Heading>
          <Text as="p" size="2">
            Our smart contracts automatically trigger payouts based on verified weather data, eliminating lengthy claims processes.
          </Text>
        </Card>
        <Card>
          <Heading size="2" mb="1">Granular Location Coverage</Heading>
          <Text as="p" size="2">
            Select specific locations at a hexagon level to get precisely the coverage you need for your business locations.
          </Text>
        </Card>
        <Card>
          <Heading size="2" mb="1">Risk-Based Pricing</Heading>
          <Text as="p" size="2">
            Premium costs are calculated based on actual risk assessment using historical climate data and predictive models.
          </Text>
        </Card>
      </Grid>
      
      <Heading size="3" mb="2">How It Works</Heading>
      <Flex direction="column" gap="2" mb="4">
        <Box style={{ position: "relative", paddingLeft: 30 }}>
          <Box style={{ 
            position: "absolute", 
            left: 0, 
            top: 0,
            width: 24, 
            height: 24, 
            borderRadius: "50%", 
            background: "#0077ff", 
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold"
          }}>1</Box>
          <Text as="p" weight="bold">Select Your Location</Text>
          <Text as="p" size="2">Use our interactive map to select the exact locations where your business operates.</Text>
        </Box>
        
        <Box style={{ position: "relative", paddingLeft: 30 }}>
          <Box style={{ 
            position: "absolute", 
            left: 0, 
            top: 0,
            width: 24, 
            height: 24, 
            borderRadius: "50%", 
            background: "#0077ff", 
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold"
          }}>2</Box>
          <Text as="p" weight="bold">Review Climate Risks</Text>
          <Text as="p" size="2">Analyze the specific climate risks for your selected locations, based on historical data and climate models.</Text>
        </Box>
        
        <Box style={{ position: "relative", paddingLeft: 30 }}>
          <Box style={{ 
            position: "absolute", 
            left: 0, 
            top: 0,
            width: 24, 
            height: 24, 
            borderRadius: "50%", 
            background: "#0077ff", 
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold"
          }}>3</Box>
          <Text as="p" weight="bold">Choose Insurance Products</Text>
          <Text as="p" size="2">Select from our range of insurance products designed to address specific climate risks facing your business.</Text>
        </Box>
        
        <Box style={{ position: "relative", paddingLeft: 30 }}>
          <Box style={{ 
            position: "absolute", 
            left: 0, 
            top: 0,
            width: 24, 
            height: 24, 
            borderRadius: "50%", 
            background: "#0077ff", 
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold"
          }}>4</Box>
          <Text as="p" weight="bold">Purchase Policy with Crypto</Text>
          <Text as="p" size="2">Pay for your policy using cryptocurrency through the Sui blockchain for instant coverage activation.</Text>
        </Box>
      </Flex>
      
      <Card>
        <Heading size="3" mb="2">Contact Us</Heading>
        <Text as="p" mb="1">
          Have questions about AMOCA Climate Insurance? We're here to help!
        </Text>
        <Text as="p" size="2">Email: info@amoca.insurance</Text>
        <Text as="p" size="2">Twitter: @AMOCAinsurance</Text>
        <Text as="p" size="2">Discord: discord.gg/amoca</Text>
      </Card>
    </PageLayout>
  );
}
