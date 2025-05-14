import { Box, Heading, Text, Button, Flex } from "@radix-ui/themes";
import { Link } from "react-router-dom";

interface InsuranceCardProps {
  name: string;
  description: string;
  icon?: string;
  linkTo?: string;
}

export default function InsuranceCard({ 
  name, 
  description, 
  icon, 
  linkTo = "/risk-map" 
}: InsuranceCardProps) {
  return (
    <Box
      style={{
        border: '1.5px solid #0077ff',
        borderRadius: 16,
        background: 'linear-gradient(135deg, #e6f9f0 0%, #e6f0fa 100%)',
        boxShadow: '0 2px 12px 0 rgba(0,119,255,0.07)',
        padding: "var(--space-4)"
      }}
    >
      <Flex align="center" gap="2" style={{ marginBottom: "var(--space-2)" }}>
        {icon && (
          <Box style={{ fontSize: '1.5rem' }}>
            {icon}
          </Box>
        )}
        <Heading
          size="2"
          style={{
            color: "#007a4d",
            fontWeight: 700,
            letterSpacing: 1
          }}
        >
          {name}
        </Heading>
      </Flex>
      <Text as="p" size="2" style={{ color: "#333", marginBottom: "var(--space-3)" }}>
        {description}
      </Text>
      <Link to={linkTo} style={{ textDecoration: 'none' }}>
        <Button size="2" style={{ background: '#0077ff', color: 'white' }}>
          Get Quote
        </Button>
      </Link>
    </Box>
  );
}
