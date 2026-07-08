import { useState } from "react";
import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const drawerWidth = 260;
const collapsedWidth = 80;

export default function Layout({ children }) {

    const [collapsed, setCollapsed] = useState(false);

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <Navbar
                collapsed={collapsed}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,

                    ml: collapsed
                        ? `${collapsedWidth}px`
                        : `${drawerWidth}px`,

                    mt: "72px",

                    p: 4,

                    background: "#F5F7FA",

                    minHeight: "100vh",

                    transition: ".3s"
                }}
            >

                {children}

            </Box>

        </Box>

    );

}