import StatusPieChart from "../charts/StatusPieChart";
import QualityBarChart from "../charts/QualityBarChart";

import {
Card,
CardContent,
Typography
} from "@mui/material";

<Grid
    container
    spacing={3}
    sx={{ mt:1 }}
>

<Grid size={{xs:12,lg:6}}>

<Card>

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