// import Layout from "../components/Layout";
// import { useState } from "react";
// import {ScanQRCode , QRCodeCanvas} from "qrcode.react";

// import {
//     Typography,
//     TextField,
//     Card,
//     CardContent,
//     Button
// } from "@mui/material";

// export default function GenerateQR(){

//     const [uid,setUID]=useState("");

//     return(
//         <Layout>

//             <Typography variant="h4" gutterBottom>
//                 Generate Product QR
//             </Typography>

//             <Card>

//                 <CardContent>

//                     <TextField
//                         fullWidth
//                         label="Product UID"
//                         value={uid}
//                         onChange={(e)=>setUID(e.target.value)}
//                     />

//                     <br/><br/>

//                     {uid &&

//                     <QRCodeCanvas
//                         value={uid}
//                         size={250}
//                     />

//                     }

//                 </CardContent>

//             </Card>

//         </Layout>
//     )

// }