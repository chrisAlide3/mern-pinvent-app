import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import Button from "@mui/material/Button";

const Header = () => {
  const getUserName = async () => {
    try {
      const user = await axios.get("http:localhost:5000/profile");
      return user.name;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px",
        }}
      >
        <Typography variant="h4">
          <span>Welcome, </span>
          {/* <span style={{ color: "orange" }}>{getUserName}</span> */}
          <span style={{ color: "orange" }}>Christian</span>
        </Typography>
        <Button
          variant="contained"
          color="error"
          size="small"
          sx={{ maxHeight: "40px" }}
        >
          Logout
        </Button>
      </Box>
      <hr />
    </>
  );
};

export default Header;
