import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { getContract } from "../blockchain/contract";

export default function Transfer() {

  const [uid, setUid] = useState("");
  const [receiver, setReceiver] = useState("");

  const initiateTransfer = async () => {

    try {

      const contract = await getContract();

      const tx = await contract.initiateTransfer(
        uid,
        receiver
      );

      toast.info("Transfer Initiated");

      await tx.wait();

      toast.success("Transfer request sent");

    } catch (err) {

      console.log(err);

      toast.error(
        err.reason ||
        err.shortMessage ||
        err.message
      );

    }

  };

  const acceptTransfer = async () => {

    try {

      const contract = await getContract();

      const tx = await contract.acceptTransfer(uid);

      toast.info("Accepting Transfer...");

      await tx.wait();

      toast.success("Transfer Accepted");

    }

    catch(err){

      console.log(err);

      toast.error(
        err.reason ||
        err.shortMessage ||
        err.message
      );

    }

  };

  return (

    <Layout>

      <Paper
        sx={{
          maxWidth:700,
          margin:"30px auto",
          p:4
        }}
      >

        <Typography variant="h4">
          Product Transfer
        </Typography>

        <TextField

          fullWidth

          margin="normal"

          label="Product UID"

          value={uid}

          onChange={(e)=>setUid(e.target.value)}

        />

        <TextField

          fullWidth

          margin="normal"

          label="Receiver Wallet Address"

          value={receiver}

          onChange={(e)=>setReceiver(e.target.value)}

        />

        <Button

          variant="contained"

          fullWidth

          sx={{mt:2}}

          onClick={initiateTransfer}

        >

          Initiate Transfer

        </Button>

        <Divider sx={{my:4}} />

        <Button

          variant="outlined"

          fullWidth

          onClick={acceptTransfer}

        >

          Accept Transfer

        </Button>

      </Paper>

    </Layout>

  );

}