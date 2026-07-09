import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Box,
  IconButton,
} from "@mui/material";

import {
  Dashboard,
  Inventory2,
  AddBox,
  AssignmentInd,
  FactCheck,
  Science,
  LocalShipping,
  Description,
  TravelExplore,
  QrCodeScanner,
} from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
//import GenerateQR from "../pages/GenerateQR";
import VerifyQR from "../pages/VerifyQR";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ScienceIcon from "@mui/icons-material/Science";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DescriptionIcon from "@mui/icons-material/Description";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function Sidebar({

    collapsed,

    setCollapsed

}) {
  //const [collapsed, setCollapsed] = useState(false);
  const drawerWidth = 260;
  const collapsedWidth = 80;
  const selectedWidth = collapsed ? collapsedWidth : drawerWidth;
  const menus = [
    { text: "Dashboard", path: "/" },
    { text: "Create Product", path: "/create-product" },
    { text: "Products", path: "/products" },
    { text: "Assign Roles", path: "/roles" },
    { text: "Quality Check", path: "/quality-check" },
    { text: "Inspection", path: "/inspection" },
    { text: "Transfer", path: "/transfer" },
    { text: "Documents", path: "/documents" },
    { text: "Track Product", path: "/track-product" },
    { text: "Generate QR", path: "/generate-qr" },
    { text: "Verify QR", path: "/verify-qr" },
    {
    text: "Recall Product",
    path: "/recall",
    icon: <WarningAmberIcon />,
},
  ];
  return (
  
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: collapsed ? collapsedWidth : drawerWidth,
          transition: "0.3s",
          overflowX: "hidden",
          background: "#1E293B",
          color: "#fff",
          borderRight: "none",
        },
      }}
    >

      <Box
          sx={{
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: 2,
        }}
      >
        {!collapsed && (
          <Typography
            variant="h6"
            fontWeight="bold"
          >
            SCM
          </Typography>
        )}

        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{ color: "white" }}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
    

        <List>

          {menus.map((item) => (

            <ListItemButton

              key={item.text}

              component={NavLink}

              to={item.path}

              sx={{

                mx:1,

                my:0.5,

                borderRadius:2,

                color:"white",

                "&.active":{

                  background:"#2563EB"

                },

                "&:hover":{

                  background:"#334155"

                }

              }}

            >

              <ListItemIcon sx={{color:"white"}}>

                {item.icon}

              </ListItemIcon>

              {!collapsed &&

              <ListItemText

              primary={item.text}

              />

              }

            </ListItemButton>

          ))}

        </List>




      {/* <List>
        <ListItemButton component={NavLink} to="/">
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/create-product">
          <ListItemText primary="Create Product" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/products">
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/roles">
          <ListItemText primary="Assign Roles" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/quality-check">
          <ListItemText primary="Quality Check" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/inspection">
          <ListItemText primary="Inspection" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/transfer">
          <ListItemText primary="Transfer" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/documents">
          <ListItemText primary="Documents" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/track-product">
          <ListItemText primary="Track Product" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/generate-qr">
          <ListItemText primary="Generate QR" />
        </ListItemButton>

        <ListItemButton component={NavLink} to="/verify-qr">
            <ListItemIcon>
                <QrCodeScannerIcon />
            </ListItemIcon>
            <ListItemText primary="Verify QR" />
        </ListItemButton>

        
      </List> */}
    </Drawer>
  );
}