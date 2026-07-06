import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          mt: "64px",
        },
      }}
    >
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/create-product">
          <ListItemText primary="Create Product" />
        </ListItemButton>

        <ListItemButton component={Link} to="/products">
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton component={Link} to="/roles">
          <ListItemText primary="Assign Roles" />
        </ListItemButton>

        <ListItemButton component={Link} to="/quality-check">
          <ListItemText primary="Quality Check" />
        </ListItemButton>

        <ListItemButton component={Link} to="/inspection">
          <ListItemText primary="Inspection" />
        </ListItemButton>

        <ListItemButton component={Link} to="/transfer">
          <ListItemText primary="Transfer" />
        </ListItemButton>

        <ListItemButton component={Link} to="/documents">
          <ListItemText primary="Documents" />
        </ListItemButton>

        <ListItemButton component={Link} to="/track-product">
          <ListItemText primary="Track Product" />
        </ListItemButton>

        
      </List>
    </Drawer>
  );
}