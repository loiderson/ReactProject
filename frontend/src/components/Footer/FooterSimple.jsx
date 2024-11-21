import { Container, Group, Anchor, Text } from "@mantine/core";
import CameraLogo from "../misc/CameraLogo"; // Ensure the import is correct
import classes from "./FooterSimple.module.css"; // Correct import path

// Links for the footer
const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];

export function FooterSimple() {
  // Map through the links to generate the Anchor elements
  const items = links.map((link) => (
    <Anchor
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
      color="dimmed" // Fixing 'c' to 'color'
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logoSection}>
          <CameraLogo />
          <Text className={classes.brandName}>Uploadz</Text>
        </div>
        <Group className={classes.links}>{items}</Group>
      </Container>

      {/* Footer bottom section */}
      <div className={classes.footerBottom}>
        <Text className={classes.footerText}>Created by Jacob Lloyd</Text>
        <Text className={classes.footerText}>
          <span className={classes.phone}>📞</span> 604.363.7701
        </Text>
        <Text className={classes.footerText}>✉️ jlloyderson@gmail.com</Text>
      </div>
    </div>
  );
}
