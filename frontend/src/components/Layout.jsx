import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

export default function Layout({children}){

    return(

        <>

            <Navbar/>

            <Sidebar/>

            <Box
                sx={{
                    ml: "240px",
                    mt: "64px",
                    p: 3
                }}
            >
                {children}
            </Box>



        </>

    );

}