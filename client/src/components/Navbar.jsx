import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { SiStudyverse } from "react-icons/si";


function Navbar() {
  return (
    <>
      <Box sx={{ display: "flex",height:"50px" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#2F70CB",
            padding: "15px",
            boxShadow: "none",
            height:"2.5rem"
          }}
        >
          <Toolbar style={{ padding: "0px", minHeight: "0px" }}>
              <SiStudyverse size={25} style={{color:"#fff"}}/>
            <Box sx={{ paddingLeft: "1em" }}>
              <Typography style={{fontSize:20,fontFamily:"Poppins"}}>
                QRS Training Platform
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
