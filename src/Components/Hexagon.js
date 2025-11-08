import React from "react";
import { Box, Typography } from "@mui/material";

const Hexagon = ({letter,bg="#fff8dc"}) => (
  <Box
    sx={{
      width: 100,
      height: 100,
      backgroundColor: bg,
      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
      transition: "transform 0.2s ease-in-out", 
     "&:hover": {
        backgroundColor: "#f0e68c", 
      },
    }}
  >
    <Typography
      sx={{
        fontWeight: "bold",
        fontSize: 50,
        color: "black",
      }}
    >
      {letter}
    </Typography>
  </Box>
);

export default Hexagon;
