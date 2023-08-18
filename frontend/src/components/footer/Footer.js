import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        paddingBottom: 10,
      }}
      component="footer"
    >
      <Typography variant="caption" align="center">
        All Rights Reserved. &copy; 2023
      </Typography>
    </Box>
  );
};

export default Footer;
