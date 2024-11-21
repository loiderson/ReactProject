import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import classes from "./AuthenticationTitle.module.css"; // Ensure this file exists and the styles are correct

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    loginService(email, password, rememberMe);
  };

  return (
    <Container size={420} my={40} style={{ position: "relative" }}>
      <div className={classes.background}></div> {/* Background element */}
      <Title ta="center" className={`${classes.title} ${classes.fadeInUp}`}>
        Welcome back!
      </Title>
      {/* Add animation class to the Text component */}
      <Text c="dimmed" size="sm" ta="center" mt={5} className={classes.fadeIn}>
        <span style={{ color: "#fff" }}>Don't have an account yet? </span>
        <Anchor
          size="sm"
          component="button"
          style={{ color: "#00b0ff", textDecoration: "underline" }}
          onMouseEnter={(e) => (e.target.style.color = "#0077cc")}
          onMouseLeave={(e) => (e.target.style.color = "#00b0ff")}
        >
          Create one now!
        </Anchor>
      </Text>
      <Paper
        withBorder
        shadow="xl"
        p={40}
        mt={30}
        radius="md"
        className={`${classes.form} ${classes.slideUp}`}
      >
        {/* Login Form */}
        <form onSubmit={onLogin}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${classes.input} ${classes.fadeIn}`}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${classes.input} ${classes.fadeIn}`}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.currentTarget.checked)}
            />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button
            fullWidth
            mt="xl"
            type="submit"
            className={`${classes.button} ${classes.fadeIn}`}
          >
            {authLoading ? "Loading..." : "Sign in"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
