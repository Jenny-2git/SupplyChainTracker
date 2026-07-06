import {
    AppBar,
    Toolbar,
    Typography,
    Box
} from "@mui/material";

import { useWallet } from "../context/WalletContext";

export default function Navbar(){

    const {wallet}=useWallet();

    return(

        <AppBar
            position="fixed"
            sx={{
                ml: "240px",
                width: "calc(100% - 240px)"
            }}
        >

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{flexGrow:1}}
                >
                    Decentralized Supply Chain
                </Typography>

                <Box>

                    {wallet?.slice(0,6)}
                    ...
                    {wallet?.slice(-4)}

                </Box>

            </Toolbar>

        </AppBar>

    );

}