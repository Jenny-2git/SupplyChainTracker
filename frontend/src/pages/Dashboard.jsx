import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import StatsCard from "../components/StatsCard";

import { Grid } from "@mui/material";

import { getContract } from "../blockchain/contract";

export default function Dashboard() {

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

            <Grid container spacing={3}>

                <Grid size={{xs:12,md:4}}>
                    <StatsCard
                        title="Products"
                        value={stats.total}
                    />
                </Grid>

                <Grid size={{xs:12,md:4}}>
                    <StatsCard
                        title="Approved"
                        value={stats.approved}
                    />
                </Grid>

                <Grid size={{xs:12,md:4}}>
                    <StatsCard
                        title="Inspection"
                        value={stats.inspection}
                    />
                </Grid>

                <Grid size={{xs:12,md:6}}>
                    <StatsCard
                        title="Rejected"
                        value={stats.rejected}
                    />
                </Grid>

                <Grid size={{xs:12,md:6}}>
                    <StatsCard
                        title="Delivered"
                        value={stats.delivered}
                    />
                </Grid>

            </Grid>

        </Layout>

    );

}