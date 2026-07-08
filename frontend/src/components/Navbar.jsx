import {

    AppBar,

    Toolbar,

    Typography,

    Box,

    Avatar,

    Chip,

    IconButton,

    Tooltip

} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useWallet } from "../context/WalletContext";

const drawerWidth = 260;
const collapsedWidth = 80;

export default function Navbar({

    collapsed

}) {

    const { wallet } = useWallet();

    return (

        <AppBar

            elevation={0}

            position="fixed"

            sx={{

                background: "#ffffff",

                color: "#111827",

                ml: collapsed
                    ? `${collapsedWidth}px`
                    : `${drawerWidth}px`,

                width: collapsed
                    ? `calc(100% - ${collapsedWidth}px)`
                    : `calc(100% - ${drawerWidth}px)`,

                borderBottom: "1px solid #E5E7EB",

                transition: ".3s"

            }}

        >

            <Toolbar>

                <Typography

                    variant="h5"

                    fontWeight="bold"

                    sx={{

                        flexGrow: 1,

                        color: "#1E293B"

                    }}

                >

                    Supply Chain Manager

                </Typography>

                <Chip

                    label="Ganache"

                    color="success"

                    sx={{ mr: 2 }}

                />

                <Tooltip title="Notifications">

                    <IconButton>

                        <NotificationsNoneIcon />

                    </IconButton>

                </Tooltip>

                <Tooltip title="Theme">

                    <IconButton>

                        <LightModeIcon />

                    </IconButton>

                </Tooltip>

                <Box

                    sx={{

                        display: "flex",

                        alignItems: "center",

                        ml: 3,

                        gap: 2

                    }}

                >

                    <Avatar>

                        S

                    </Avatar>

                    <Box>

                        <Typography

                            fontWeight="bold"

                        >

                            Manufacturer

                        </Typography>

                        <Typography

                            variant="caption"

                        >

                            {wallet?.slice(0,6)}

                            ...

                            {wallet?.slice(-4)}

                        </Typography>

                    </Box>

                </Box>

            </Toolbar>

        </AppBar>

    );

}