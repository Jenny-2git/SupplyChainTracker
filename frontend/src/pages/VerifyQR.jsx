import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { QrReader } from "react-qr-reader";
import Layout from "../components/Layout";

import {
  Card,
  CardContent,
  Typography,
  Alert,
  Button,
} from "@mui/material";

export default function VerifyQR() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [scanned, setScanned] = useState(false);
  
  const handleResult = (result, err) => {
    if (result && !scanned) {
        setScanned(true);
      try {
        setScanned(true);

        const data = JSON.parse(result?.text);

        navigate(`/track-product?uid=${data.uid}`);
      } catch (e) {
        setError("Invalid QR Code");
        setScanned(false);
      }
    }

    if (err) {
      // Ignore camera scan errors while waiting
    }
  };

  return (
    <Layout>

      <Typography variant="h4" gutterBottom>
        Verify Product QR
      </Typography>

      <Card>
        <CardContent>

          {!scanned ? (
            <QrReader
                constraints={{ facingMode: "environment" }}
                onResult={handleResult}
                style={{ width: "100%" }}
            />
            ) : (
            <Alert severity="success">
                QR Code scanned successfully. Redirecting...
            </Alert>
            )}

        </CardContent>
      </Card>

      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={() => {
            setScanned(false);
            setError("");
        }}
    >
        Scan Another QR
    </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

    </Layout>
  );
}