import {
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

export default function BlockchainInfo({
  network,
  wallet,
  contract,
  chainId,
  latestBlock,
}) {

  return (

    <Card sx={{ mt: 3 }}>

      <CardContent>

        <Typography variant="h6" gutterBottom>
          Blockchain Information
        </Typography>

        <Grid container spacing={2}>

          <Grid item xs={6}>
            <Typography fontWeight="bold">
              Network
            </Typography>

            <Typography>
              {network}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography fontWeight="bold">
              Chain ID
            </Typography>

            <Typography>
              {chainId}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Connected Wallet
            </Typography>

            <Typography sx={{ wordBreak: "break-all" }}>
              {wallet}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Contract Address
            </Typography>

            <Typography sx={{ wordBreak: "break-all" }}>
              {contract}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Latest Block
            </Typography>

            <Typography>
              {latestBlock}
            </Typography>
          </Grid>

        </Grid>

      </CardContent>

    </Card>

  );

}