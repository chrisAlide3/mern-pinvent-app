import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import HomeImage from "../../assets/inv-img.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "darkblue",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                height: 35,
                width: 35,
                border: "3px solid white",
                borderRadius: "50%",
              }}
            >
              <span style={{ paddingLeft: 9 }}>P</span>
            </Typography>
          </Box>
          <Box>
            <Button
              variant="text"
              color="inherit"
              component={Link}
              to="/register"
            >
              Register
            </Button>
            <Button variant="text" color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button
              variant="text"
              color="inherit"
              component={Link}
              to="/dashboard"
            >
              Dashboard
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Typography variant="h4" gutterBottom>
              Inventory & Stock Management Solution
            </Typography>
            <Typography variant="body1" gutterBottom>
              Inventory system to control and manage products in the warehouse
              in real time and integrated to make it easier to develop your
              business.
            </Typography>
          </Grid>
          <Grid item xs style={{ display: "flex", justifyContent: "flex-end" }}>
            <img src={HomeImage} alt="homepage" width="400px"></img>
          </Grid>
        </Grid>
        <Chip
          label="Free Trial 1 Month"
          variant="outlined"
          sx={{ border: "1px solid", borderRadius: "2px" }}
        />
        <Box sx={{ display: "flex" }}>
          <Typography mt={4} mr={8} variant="h4" gutterBottom>
            14K
          </Typography>
          <Typography mt={4} mr={8} variant="h4" gutterBottom>
            23K
          </Typography>
          <Typography mt={4} variant="h4" gutterBottom>
            500+
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography mt={1} mr={2} variant="body1" gutterBottom>
            Brand Owners
          </Typography>
          <Typography mt={1} mr={5} variant="body1" gutterBottom>
            Active Users
          </Typography>
          <Typography mt={1} variant="body1" gutterBottom>
            Partners
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
