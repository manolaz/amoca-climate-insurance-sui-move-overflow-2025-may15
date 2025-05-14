import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading, Button } from "@radix-ui/themes";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const currentAccount = useCurrentAccount();
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
      position="sticky"
      px="4"
      py="2"
      justify="between"
      align="center"
      style={{
        borderBottom: "1px solid var(--gray-a2)",
        background: "linear-gradient(90deg, #004d2e 0%, #006647 100%)",
      }}
    >
      <Flex align="center" gap="4">
        <Box>
          <Heading size="5" style={{ color: "#ffffff" }}>
            AMOCA
          </Heading>
        </Box>
        
        <Flex as="nav" gap="3">
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
