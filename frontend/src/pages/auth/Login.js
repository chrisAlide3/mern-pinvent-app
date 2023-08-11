import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import TextField from "@mui/material/TextField";

const Login = () => {
  return (
    <Container maxWidth="sm" sx={{ paddingTop: "100px" }}>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ textAlign: "center" }}>
            <LoginIcon fontSize="large" color="disabled" />
            <Typography variant="h4" color="orange" gutterBottom>
              Login
            </Typography>
          </Box>
          <Box component="form" mt={2}>
            <TextField
              id="email"
              type="email"
              name="email"
              label="eMail"
              variant="filled"
              fullWidth
              required
              autoFocus
              margin="normal"
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              variant="filled"
              fullWidth
              required
              margin="normal"
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </CardActions>
        <Button
          variant="text"
          size="small"
          component={Link}
          to="/forgot"
          sx={{ paddingLeft: "10px" }}
        >
          Forgot Password?
        </Button>
        <Box textAlign={"center"}>
          <Button variant="text" size="small" component={Link} to="/">
            Home
          </Button>
          <Typography variant="overline" sx={{ color: "grey" }}>
            Don't have an account?
          </Typography>
          <Button variant="text" size="small" component={Link} to="/register">
            Register
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;
