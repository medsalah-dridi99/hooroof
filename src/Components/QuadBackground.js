import React from "react";
import { Box } from "@mui/material";

const QuadBackground = () => (
  <Box
    sx={{
      width: 1000,
      height: 600,
      position: "relative",
    borderTopRightRadius: 30,
  
      overflow: "hidden", 
    }}
  >
    {/* المثلث العلوي */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#0000cd",
        clipPath: "polygon(0 0, 100% 0, 50% 50%)",
      }}
    />
    {/* المثلث السفلي */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#0000cd",
        clipPath: "polygon(0% 100%, 100% 100%, 50% 50%)",
      }}
    />
    {/* المثلث الأيسر */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#800000",
        clipPath: "polygon(0 0, 0 100%, 50% 50%)",
      }}
    />
    {/* المثلث الأيمن */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#800000",
        clipPath: "polygon(100% 0, 100% 100%, 50% 50%)",
      }}
    />
  </Box>
);

export default QuadBackground;
