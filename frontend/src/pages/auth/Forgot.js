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
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TextField from "@mui/material/TextField";

const Forgot = () => {
  return (
    <Container maxWidth="sm" sx={{ paddingTop: "100px" }}>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ textAlign: "center" }}>
            <MailOutlineIcon fontSize="large" color="disabled" />
            <Typography variant="h4" color="orange" gutterBottom>
              Forgot Password
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
          </Box>
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" fullWidth>
            Get Reset Email
          </Button>
        </CardActions>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="text" size="small" component={Link} to="/">
            Home
          </Button>
          <Button variant="text" size="small" component={Link} to="/login">
            Login
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default Forgot;
