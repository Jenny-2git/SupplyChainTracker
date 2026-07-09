import { useState } from "react";
import Layout from "../components/Layout";
import { getContract } from "../blockchain/contract";

import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function RecallProduct() {

  const [uid, setUid] = useState("");

  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  async function recall() {

    if (!uid || !reason) {

      setError("Please fill all fields.");

      return;

    }

    try {

      setLoading(true);

      setError("");

      setSuccess("");

      const contract = await getContract();

      const tx = await contract.recallProduct(
        uid,
        reason
      );

      await tx.wait();

      setSuccess("Product recalled successfully.");

      setUid("");

      setReason("");

    }

    catch(err){

      console.error(err);

      setError(err.reason || "Recall failed.");

    }

    setLoading(false);

  }

  return (

    <Layout>

      <Typography
        variant="h4"
        gutterBottom
      >
        Recall Product
      </Typography>

      <Alert
        severity="warning"
        sx={{ mb:3 }}
      >

        Recalling a product marks it as unsafe.
        Consumers scanning the QR code will immediately
        see that the product has been recalled.

      </Alert>

      <Card>

        <CardContent>

          <TextField

            fullWidth

            label="Product UID"

            sx={{ mb:3 }}

            value={uid}

            onChange={(e)=>setUid(e.target.value)}

          />

          <TextField

            fullWidth

            multiline

            rows={5}

            label="Recall Reason"

            sx={{ mb:3 }}

            value={reason}

            onChange={(e)=>setReason(e.target.value)}

          />

          <Box>

            <Button

              variant="contained"

              color="error"

              startIcon={<WarningAmberIcon/>}

              disabled={loading}

              onClick={recall}

            >

              {

                loading

                ?

                "Recalling..."

                :

                "Recall Product"

              }

            </Button>

          </Box>

          {

            success &&

            <Alert
              severity="success"
              sx={{ mt:3 }}
            >

              {success}

            </Alert>

          }

          {

            error &&

            <Alert
              severity="error"
              sx={{ mt:3 }}
            >

              {error}

            </Alert>

          }

        </CardContent>

      </Card>

    </Layout>

  );

}