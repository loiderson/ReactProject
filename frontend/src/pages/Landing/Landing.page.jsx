import React from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Image,
  Group,
  Divider,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./Landing.module.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.landing}>
      <Container size="md" className={classes.hero}>
        <div className={classes.heroContent}>
          <Title order={1} align="center" className={classes.title}>
            Capture. Share. Inspire.
          </Title>
          <Text size="lg" align="center" className={classes.description}>
            Uploadz is the ultimate platform for photographers to showcase their
            work. Share your photos, connect with a creative community, and get
            inspired by stunning visuals from around the world.
          </Text>
          <Group position="center" className={classes.buttonGroup}>
            <Button
              size="lg"
              style={{ backgroundColor: "#228be6", color: "#fff" }}
              onClick={() => navigate("/register")}
              className={classes.button}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              style={{
                color: "#228be6",
                borderColor: "#228be6",
              }}
              onClick={() => navigate("/login")}
              className={classes.button}
            >
              Log In
            </Button>
          </Group>
        </div>
        <Divider my="lg" />
        <Group position="center" spacing="md" className={classes.imageGroup}>
          {/* <Image
            src="https://via.placeholder.com/300x200"
            alt="Example photo 1"
            radius="md"
            className={classes.image}
          />
          <Image
            src="https://via.placeholder.com/300x200"
            alt="Example photo 2"
            radius="md"
            className={classes.image}
          />
          <Image
            src="https://via.placeholder.com/300x200"
            alt="Example photo 3"
            radius="md"
            className={classes.image}
          /> */}
        </Group>
      </Container>
    </div>
  );
};

export default Landing;
