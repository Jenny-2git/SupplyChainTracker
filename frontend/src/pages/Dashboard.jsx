import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatsCard from "../components/StatsCard";
import { Grid } from "@mui/material";
import { getContract } from "../blockchain/contract";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Box, Typography, Chip } from "@mui/material";
import StatusPieChart from "../charts/StatusPieChart";
import QualityBarChart from "../charts/QualityBarChart";
import { connectWallet } from "../blockchain/web3";
import {
Card,
CardContent
} from "@mui/material";
import BlockchainInfo from "../components/BlockchainInfo";
import ProductTable from "../components/ProductTable";
import { Stack, Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import {CONTRACT_ADDRESS} from "../blockchain/contract";
import RecentActivity from "../components/RecentActivity";
import { TextField } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";


export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [blockchain, setBlockchain] = useState({
        network: "",
        wallet: "",
        chainId: "",
        latestBlock: 0,
    });
    const [stats, setStats] = useState({

        total:0,

        approved:0,

        inspection:0,

        rejected:0,

        delivered:0,

        recalled:0

    });

    useEffect(()=>{

        loadDashboard();

    },[]);




        

    async function loadDashboard(){

        const { provider, address } = await connectWallet();
        const contract = await getContract();
        const network = await provider.getNetwork();
        const latestBlock = await provider.getBlockNumber();

        setBlockchain({
            network: network.name === "unknown" ? "Ganache" : network.name,
            wallet: address,
            chainId: Number(network.chainId),
            latestBlock,
        });

        const createdEvents = await contract.queryFilter(
        contract.filters.ProductCreated()
        );
      

        const recentEvents = createdEvents
            .slice(-5)
            .reverse()
            .map((event) => ({
                title: "Product Created",
                description: event.args.uid,
            }));

        setEvents(recentEvents);

        

        console.log("Products:", products);
        console.log("Length:", products.length);


        try{

            //const contract = await getContract();
            // const createdEvents = await contract.queryFilter(
            // contract.filters.ProductCreated()
            // );
            const products = await contract.getAllProducts();

            console.log("Products:", products);
            console.log("Length:", products.length);

            const uids = await contract.getAllProductUIDs();
            const productList = await Promise.all(
                products.map(uid =>
                    contract.getProduct(uid)
                )
            );

            setProducts(
                productList.map((p, index) => ({
                    id: index,
                    uid: p.uid,
                    name: p.name,
                    batch: p.batchNo,
                    score: Number(p.qualityScore),
                    status: Number(p.status),
                }))
            );

        
            const result = await contract.getProductStats();
            
            
         
            setStats({

                total:Number(result[0]),

                approved:Number(result[1]),

                inspection:Number(result[2]),

                rejected:Number(result[3]),

                delivered:Number(result[4]),

                recalled:Number(result[5])


            });
           

            }
            catch(err){

                console.log(err);

            }

        }
        const filteredProducts = products.filter((product) => {

        const keyword = search.toLowerCase();

        return (

            product.uid.toLowerCase().includes(keyword) ||

            product.name.toLowerCase().includes(keyword) ||

            product.batch.toLowerCase().includes(keyword)

        );

    });


    return(

        <Layout>

            <Grid
                container
                spacing={3}
                sx={{ mt:1 }}
            >

                <Grid item={{xs:12,lg:6}}>

                    <Card>
                        <Box
                            sx={{
                                mb: 4,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                            >
                            <Box>
                                <Typography variant="h4" fontWeight="bold">
                                Supply Chain Dashboard
                                </Typography>

                                <Typography color="text.secondary">
                                Monitor products, quality inspections and blockchain activity
                                </Typography>
                            </Box>

                            <Chip
                                color="success"
                                label={`Updated ${new Date().toLocaleTimeString()}`}
                            />
                        </Box>

                        <CardContent>

                            <Typography
                                variant="h6"
                                mb={2}
                                >

                                Product Status

                            </Typography>

                            <StatusPieChart
                            stats={stats}
                            />

                                </CardContent>

                            </Card>

                            </Grid>

                            <Grid item xs={12} lg={6}>

                            <Card>

                            <CardContent>

                            <Typography
                            variant="h6"
                            mb={2}
                            >

                            Quality Overview

                            </Typography>

                            <QualityBarChart
                            stats={stats}
                            />

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

            <Grid item={{ xs: 12 }}>

            <Card>

            <CardContent>

            <Typography
            variant="h6"
            mb={2}
            >

            Recent Products

            </Typography>

            <TextField
                fullWidth
                label="Search by UID, Product or Batch"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mb: 2 }}
            />

            <ProductTable
                rows={filteredProducts}
            />

            </CardContent>

            </Card>

            </Grid>

            <Card>

            <CardContent>

            <Typography
            variant="h6"
            mb={2}
            >

            Quick Actions

            <BlockchainInfo
                network={blockchain.network}
                wallet={blockchain.wallet}
                contract={CONTRACT_ADDRESS}
                chainId={blockchain.chainId}
                latestBlock={blockchain.latestBlock}
            />

            </Typography>

            <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            >

            <Button
            variant="contained"
            startIcon={<AddBoxIcon />}
            >

            Create Product

            </Button>

            <Button
            variant="outlined"
            startIcon={<TravelExploreIcon />}
            >

            Track Product

            </Button>

            <Button
            variant="outlined"
            startIcon={<QrCodeScannerIcon />}
            >

            Verify QR

            </Button>

            </Stack>
            <RecentActivity events={events} />

            </CardContent>

            </Card>
            
            <Grid container spacing={3}>

                <Grid item xs={12} lg={6}>
                    <StatsCard
                        title="Products"
                        value={stats.total}
                        icon={<Inventory2Icon />}
                        color="#2563EB"
                    />
                </Grid>

                <Grid item xs={12} lg={6}>
                    <StatsCard
                        title="Approved"
                        value={stats.approved}
                        icon={<CheckCircleIcon />}
                        color="#16A34A"
                    />
                </Grid>

                <Grid item xs={12} lg={6}>
                    <StatsCard
                        title="Inspection"
                        value={stats.inspection}
                        icon={<WarningAmberIcon />}
                        color="#F59E0B"
                    />
                </Grid>

                <Grid item xs={12} lg={6}>
                    <StatsCard
                        title="Rejected"
                        value={stats.rejected}
                        color="#DC2626"
                    />
                </Grid>

                <Grid item xs={12} lg={6}>
                    <StatsCard
                        title="Delivered"
                        value={stats.delivered}
                        color="#0EA5E9"
                    />
                </Grid>

                <Grid item={{xs:12,md:6}}>

                <StatsCard

                title="Recalled"

                value={stats.recalled}

                icon={<ReportProblemIcon/>}

                color="#B91C1C"

                />

                </Grid>

            </Grid>

        </Layout>

    );
    

}



































