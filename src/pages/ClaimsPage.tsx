import { Box, Card, Heading, Text, TextField, Button, Flex, TextArea, Select } from "@radix-ui/themes";
import PageLayout from "../components/PageLayout";
import { useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";

export default function ClaimsPage() {
  const currentAccount = useCurrentAccount();
  const [claimType, setClaimType] = useState("");
  
  const mockPolicies = [
    { id: "POL-1234", type: "Business Property", location: "Nha Trang, Vietnam", premium: "$1,250/year", status: "Active" },
    { id: "POL-5678", type: "Flood Insurance", location: "Ho Chi Minh City, Vietnam", premium: "$850/year", status: "Active" }
  ];

  return (
    <PageLayout title="Claims Management">
      {!currentAccount ? (
        <Box p="4" style={{ textAlign: "center" }}>
          <Heading size="3" mb="2">Please Connect Your Wallet</Heading>
          <Text as="p">You need to connect your wallet to access your insurance policies and submit claims.</Text>
        </Box>
      ) : (
        <Flex gap="4" direction={{ initial: "column", md: "row" }}>
          <Box style={{ flex: 1 }}>
            <Heading size="3" mb="3">Your Active Policies</Heading>
            {mockPolicies.map(policy => (
              <Card key={policy.id} mb="3">
                <Flex justify="between" align="center" mb="2">
                  <Heading size="2">{policy.type}</Heading>
                  <Text size="1" style={{ 
                    background: "#e6f9f0", 
                    padding: "2px 8px", 
                    borderRadius: 4, 
                    color: "#007a4d" 
                  }}>
                    {policy.status}
                  </Text>
                </Flex>
                <Text as="p" size="2">Policy ID: {policy.id}</Text>
                <Text as="p" size="2">Location: {policy.location}</Text>
                <Text as="p" size="2">Premium: {policy.premium}</Text>
                <Button size="1" mt="2" variant="soft">View Details</Button>
              </Card>
            ))}
          </Box>

          <Box style={{ flex: 1 }}>
            <Card>
              <Heading size="3" mb="3">Submit a New Claim</Heading>
              <form onSubmit={e => e.preventDefault()}>
                <Flex direction="column" gap="3">
                  <Box>
                    <Text as="label" size="2" mb="1" style={{ display: "block" }}>
                      Select Policy
                    </Text>
                    <Select.Root defaultValue="">
                      <Select.Trigger placeholder="Choose policy" />
                      <Select.Content>
                        {mockPolicies.map(policy => (
                          <Select.Item key={policy.id} value={policy.id}>
                            {policy.type} - {policy.id}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  </Box>
                  <Box>
                    <Text as="label" size="2" mb="1" style={{ display: "block" }}>
                      Claim Type
                    </Text>
                    <Select.Root value={claimType} onValueChange={setClaimType}>
                      <Select.Trigger placeholder="Select claim type" />
                      <Select.Content>
                        <Select.Item value="property">Property Damage</Select.Item>
                        <Select.Item value="flood">Flood Damage</Select.Item>
                        <Select.Item value="wind">Wind Damage</Select.Item>
                        <Select.Item value="interruption">Business Interruption</Select.Item>
                        <Select.Item value="other">Other</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Box>
                  <Box>
                    <Text as="label" size="2" mb="1" style={{ display: "block" }}>
                      Date of Incident
                    </Text>
                    <TextField type="date" />
                  </Box>
                  <Box>
                    <Text as="label" size="2" mb="1" style={{ display: "block" }}>
                      Description
                    </Text>
                    <TextArea placeholder="Describe what happened and the damage incurred..." />
                  </Box>
                  <Box>
                    <Text as="label" size="2" mb="1" style={{ display: "block" }}>
                      Estimated Damage Value ($)
                    </Text>
                    <TextField type="number" placeholder="0.00" />
                  </Box>
                  <Button mt="2" style={{ background: "#0077ff" }}>
                    Submit Claim
                  </Button>
                </Flex>
              </form>
            </Card>
          </Box>
        </Flex>
      )}
    </PageLayout>
  );
}
