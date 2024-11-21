import React from "react";
import classes from "./Navbar.module.css";
import CameraLogo from "./CameraLogo";
import { Container, Group, Burger, Drawer, Stack, Text } from "@mantine/core";
import useLinks from "./useLinks";
import { DrawerContext } from "../../Contexts/drawerContext";

const Navbar = () => {
  const { opened, toggle } = React.useContext(DrawerContext);
  const [items] = useLinks();

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/* Logo and "Uploadz" text */}
        <Group gap="xs" align="center">
          <CameraLogo />
          <Text size="lg" weight={600} color="dark">
            Uploadz
          </Text>
        </Group>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Burger hiddenFrom="xs" opened={opened} onClick={toggle} />
        <Drawer
          withCloseButton={true}
          opened={opened}
          size="100%"
          onClose={toggle}
        >
          <Stack>{items}</Stack>
        </Drawer>
      </Container>
    </header>
  );
};

export default Navbar;
