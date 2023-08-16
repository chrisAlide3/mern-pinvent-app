import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Container maxWidth="sm" sx={{ paddingTop: "100px" }}>
      <Card variant="outlined">
        <Box textAlign={"center"}>
          <CardContent>
            <PersonAddAltIcon fontSize="large" color="disabled" />
            <Typography variant="h4" color="orange" gutterBottom>
              Register
            </Typography>

            <Box component="form" mt={2}>
              <TextField
                id="name"
                name="name"
                label="name"
                required
                fullWidth
                autoFocus
                variant="filled"
                margin="normal"
              />
              <TextField
                id="email"
                type="email"
                name="email"
                label="email"
                required
                fullWidth
                variant="filled"
                margin="normal"
              />
              <TextField
                id="password"
                type="password"
                name="password"
                label="password"
                required
                fullWidth
                variant="filled"
                margin="normal"
              />
              <TextField
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                required
                fullWidth
                variant="filled"
              />
            </Box>
          </CardContent>
        </Box>
        <CardActions>
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </CardActions>
        <Box textAlign={"center"} mt={1}>
          <Button variant="text" size="small" component={Link} to="/">
            Home
          </Button>
          <Typography variant="overline" sx={{ color: "grey" }}>
            Already have an account?
          </Typography>
          <Button variant="text" size="small" component={Link} to="/login">
            Login
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default Register;
