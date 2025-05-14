import { Container, Box, Heading } from "@radix-ui/themes";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function PageLayout({ children, title, subtitle }: PageLayoutProps) {
  return (
    <Container>
      <Box
        mt="5"
        pt="2"
        px="4"
        pb="6"
        style={{ 
          background: "linear-gradient(135deg, var(--gray-a2) 0%, var(--gray-a1) 100%)", 
          minHeight: 600,
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)"
        }}
      >
        {title && (
          <Heading size="4" mb={subtitle ? "1" : "4"} style={{ color: "#007a4d" }}>
            {title}
          </Heading>
        )}
        {subtitle && (
          <Heading size="2" mb="4" style={{ color: "#666", fontWeight: "normal" }}>
            {subtitle}
          </Heading>
        )}
        {children}
      </Box>
    </Container>
  );
}
