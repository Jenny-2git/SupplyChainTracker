import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { getContract } from "../blockchain/contract";

export default function Inspection() {

  const [uid, setUid] = useState("");

  const [packaging, setPackaging] = useState(25);
  const [labeling, setLabeling] = useState(25);
  const [temperature, setTemperature] = useState(25);
  const [physicalCondition, setPhysicalCondition] = useState(25);
  const [remarks, setRemarks] = useState("");

  const total =
    Number(packaging) +
    Number(labeling) +
    Number(temperature) +
    Number(physicalCondition);

  const submitInspection = async () => {

    try {

      const contract = await getContract();

      const tx = await contract.inspectionResult(

        uid,

        Number(packaging),

        Number(labeling),

        Number(temperature),

        Number(physicalCondition),

        remarks

      );

      toast.info("Transaction Submitted");

      await tx.wait();

      if (total === 100)
        toast.success("Product Approved");

      else
        toast.error("Product Rejected");

    // } catch (err) {

    //   console.log(err);

    //   toast.error(
    //     err.reason ||
    //     err.shortMessage ||
    //     err.message
    //   );

    //}

  } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("Reason:", err.reason);
      console.log("Short:", err.shortMessage);
      console.log("Info:", err.info);
      console.log("Data:", err.data);

      toast.error(err.shortMessage || err.message);
    }

  };

  return (

    <Layout>

      <Paper
        sx={{
          maxWidth:700,
          margin:"30px auto",
          padding:4
        }}
      >

        <Typography
          variant="h4"
          mb={3}
        >
          Inspection
        </Typography>

        <TextField
          fullWidth
          label="Product UID"
          value={uid}
          onChange={(e)=>setUid(e.target.value)}
          margin="normal"
        />

        <Grid container spacing={2} mt={1}>

          <Grid item xs={6}>
            <TextField
              type="number"
              fullWidth
              label="Packaging (0-25)"
              value={packaging}
              onChange={(e)=>setPackaging(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="number"
              fullWidth
              label="Labeling (0-25)"
              value={labeling}
              onChange={(e)=>setLabeling(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="number"
              fullWidth
              label="Temperature (0-25)"
              value={temperature}
              onChange={(e)=>setTemperature(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="number"
              fullWidth
              label="Physical Condition (0-25)"
              value={physicalCondition}
              onChange={(e)=>setPhysicalCondition(e.target.value)}
            />
          </Grid>

        </Grid>

        <TextField
          fullWidth
          multiline
          rows={3}
          margin="normal"
          label="Inspection Remarks"
          value={remarks}
          onChange={(e)=>setRemarks(e.target.value)}
        />

        <Typography variant="h6" mt={2}>
          Total Score : {total}/100
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt:3 }}
          onClick={submitInspection}
        >
          Submit Inspection
        </Button>

      </Paper>

    </Layout>

  );

}