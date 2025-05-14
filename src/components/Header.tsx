import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Flex, Heading, Button } from "@radix-ui/themes";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Insurance Products", path: "/products" },
    { name: "Risk Map", path: "/risk-map" },
    { name: "Claims", path: "/claims" },
    { name: "About", path: "/about" }
  ];

  return (
    <Flex
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid var(--gray-a2)",
        background: "linear-gradient(90deg, #004d2e 0%, #006647 100%)",
        paddingLeft: "var(--space-4)",
        paddingRight: "var(--space-4)",
        paddingTop: "var(--space-2)",
        paddingBottom: "var(--space-2)"
      }}
      justify="between"
      align="center"
    >
      <Flex align="center" gap="4">
        <Box>
          <Heading size="5" style={{ color: "#ffffff" }}>
            AMOCA
          </Heading>
        </Box>
        
        <Flex gap="3" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              style={{ textDecoration: 'none' }}
            >
              <Button 
                variant={location.pathname === item.path ? "solid" : "ghost"} 
                style={{ 
                  color: location.pathname === item.path ? "#ffffff" : "#d0e8dd",
                  background: location.pathname === item.path ? "rgba(255,255,255,0.2)" : "transparent"
                }}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </Flex>
      </Flex>

      <Box>
        <ConnectButton />
      </Box>
    </Flex>
  );
}
