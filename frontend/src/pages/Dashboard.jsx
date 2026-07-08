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

import {
Card,
CardContent
} from "@mui/material";

import ProductTable from "../components/ProductTable";
import { Stack, Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import {CONTRACT_ADDRESS} from "../blockchain/contract";

export default function Dashboard() {
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState({

        total:0,

        approved:0,

        inspection:0,

        rejected:0,

        delivered:0

    });

    useEffect(()=>{

        loadDashboard();

    },[]);

    async function loadDashboard(){

        const contract = await getContract();

        const products = await contract.getAllProducts();
        setProducts(
            products.map((p, index) => ({
                id: index,
                uid: p.uid,
                name: p.name,
                batch: p.batchNo,
                score: Number(p.totalScore),
                status: Number(p.status),
            }))
        );

        try{

            const contract = await getContract();

            const result = await contract.getDashboardStats();

            setStats({

                total:Number(result[0]),

                approved:Number(result[1]),

                inspection:Number(result[2]),

                rejected:Number(result[3]),

                delivered:Number(result[4])

            });

        }
        catch(err){

            console.log(err);

        }

    }

    return(

        <Layout>

            <Grid
                container
                spacing={3}
                sx={{ mt:1 }}
            >

                <Grid size={{xs:12,lg:6}}>

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

                            <Grid size={{xs:12,lg:6}}>

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

            <Grid size={{ xs: 12 }}>

            <Card>

            <CardContent>

            <Typography
            variant="h6"
            mb={2}
            >

            Recent Products

            </Typography>

            <ProductTable
            rows={products}
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

            </CardContent>

            </Card>
            
            <Grid container spacing={3}>

                <Grid size={{xs:12,md:4}}>
                    <StatsCard
                        title="Products"
                        value={stats.total}
                        icon={<Inventory2Icon />}
                        color="#2563EB"
                    />
                </Grid>

                <Grid size={{xs:12,md:4}}>
                    <StatsCard
                        title="Approved"
                        value={stats.approved}
                        icon={<CheckCircleIcon />}
                        color="#16A34A"
                    />
                </Grid>

                <Grid size={{xs:12,md:4}}>
                    <StatsCard
                        title="Inspection"
                        value={stats.inspection}
                        icon={<WarningAmberIcon />}
                        color="#F59E0B"
                    />
                </Grid>

                <Grid size={{xs:12,md:6}}>
                    <StatsCard
                        title="Rejected"
                        value={stats.rejected}
                        color="#DC2626"
                    />
                </Grid>

                <Grid size={{xs:12,md:6}}>
                    <StatsCard
                        title="Delivered"
                        value={stats.delivered}
                        color="#0EA5E9"
                    />
                </Grid>

            </Grid>

        </Layout>

    );

}