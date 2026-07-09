import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {getContract} from "../blockchain/contract";
import { QRCodeCanvas } from "qrcode.react";
import { CONTRACT_ADDRESS } from "../blockchain/contract";
import { useSearchParams } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
const statusMap = [
  "Created",
  "Quality Checking",
  "Inspection",
  "Approved",
  "Distributor",
  "Warehouse",
  "Retailer",
  "Delivered",
  "Rejected",
];

export default function TrackProduct() {
  const [uid, setUid] = useState("");

  const [product, setProduct] = useState(null);
  const [history, setHistory] = useState([]);
  const [reports, setReports] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const [recall, setRecall] = useState(false);
  const qrData = product
    ? JSON.stringify({
        uid: product.uid,
        name: product.name,
        batch: product.batchNo,
        contract: CONTRACT_ADDRESS,
        network: "Ganache",
        version: "1.0",
      })
    : "";

  useEffect(() => {
    const scannedUID = searchParams.get("uid");

    if (scannedUID && scannedUID !== uid) {
      setUid(scannedUID);
    }
  }, [searchParams, uid]);

  // useEffect(() => {
  //   if (uid) {
  //     fetchProduct();
  //   }
  // }, [uid]);

  const fetchProduct = async () => {
    if (!uid) return;

    try {
      setLoading(true);
      setError("");

      const contract = await getContract();

      const p = await contract.getProduct(uid);

      setProduct(p);

      if (p.isRecalled) {
          setRecall(true);
      } else {
          setRecall(false);
      }
      const h = await contract.getProductHistory(uid);
      const q = await contract.getQualityReports(uid);
      const d = await contract.getDocuments(uid);

      setProduct(p);
      setHistory(h);
      setReports(q);
      setDocuments(d);
    } catch (err) {
      console.error(err);
      setError("Product not found.");
      setProduct(null);
      setHistory([]);
      setReports([]);
      setDocuments([]);
    } finally {

      setLoading(false);
    }

  


  };



  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Track Product
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              label="Enter Product UID"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              sx={{ height: "56px" }}
              onClick={fetchProduct}
            >
              Track
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {loading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}



      {product && (
        <Card sx={{ mt: 3 }}>
          <CardContent>

            <Typography variant="h5" gutterBottom>
              Product Details
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={12} md={6}>
                <Typography>
                  <b>UID:</b> {product.uid}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography>
                  <b>Name:</b> {product.name}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography>
                  <b>Batch:</b> {product.batchNo}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography>
                  <b>Description:</b> {product.description}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography>
                  <b>Manufacturer:</b>
                  <br />
                  {product.manufacturer}
                </Typography>
              </Grid>

              <Grid>
                <Typography variant="h5" gutterBottom>
                  Product QR Code
                </Typography>

                <QRCodeCanvas
                  value={qrData}
                  size={220}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography>
                  <b>Current Owner:</b>
                  <br />
                  {product.currentOwner}
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography>
                  <b>Quality Score</b>
                </Typography>

                <Chip
                  color={
                    Number(product.qualityScore) === 100
                      ? "success"
                      : "warning"
                  }
                  label={product.qualityScore.toString()}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography>
                  <b>Status</b>
                </Typography>

                <Chip
                  color="primary"
                  label={statusMap[Number(product.status)]}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography>
                  <b>Inspection Required</b>
                </Typography>

                <Chip
                  color={
                    product.inspectionRequired
                      ? "error"
                      : "success"
                  }
                  label={
                    product.inspectionRequired
                      ? "YES"
                      : "NO"
                  }
                />
              </Grid>

            </Grid>

          </CardContent>
        </Card>
      )}

      {history.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>

            <Typography variant="h5" gutterBottom>
              Product History
            </Typography>

            {history.map((item, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  borderLeft: "6px solid #1976d2",
                }}
              >
                <Typography fontWeight="bold">
                  {item.action}
                </Typography>

                <Typography variant="body2">
                  Actor:
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ wordBreak: "break-all" }}
                >
                  {item.actor}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  {new Date(
                    Number(item.timestamp) * 1000
                  ).toLocaleString()}
                </Typography>
              </Paper>
            ))}

          </CardContent>
        </Card>
      )}

      {reports.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>

            <Typography variant="h5" gutterBottom>
              Quality Reports
            </Typography>

            {reports.map((report, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }}>

                <Grid container spacing={2}>

                  <Grid item xs={6}>
                    Packaging
                  </Grid>

                  <Grid item xs={6}>
                    {report.packaging.toString()}/25
                  </Grid>

                  <Grid item xs={6}>
                    Labeling
                  </Grid>

                  <Grid item xs={6}>
                    {report.labeling.toString()}/25
                  </Grid>

                  <Grid item xs={6}>
                    Temperature
                  </Grid>

                  <Grid item xs={6}>
                    {report.temperature.toString()}/25
                  </Grid>

                  <Grid item xs={6}>
                    Physical
                  </Grid>

                  <Grid item xs={6}>
                    {report.physicalCondition.toString()}/25
                  </Grid>

                  <Grid item xs={6}>
                    Total
                  </Grid>

                  <Grid item xs={6}>
                    <Chip
                      color={
                        Number(report.totalScore) === 100
                          ? "success"
                          : "warning"
                      }
                      label={report.totalScore.toString()}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    Remarks:
                    <br />
                    {report.remarks}
                  </Grid>

                </Grid>

              </Paper>
            ))}

          </CardContent>
        </Card>
      )}

      {documents.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>

            <Typography variant="h5" gutterBottom>
              Uploaded Documents
            </Typography>

            {documents.map((doc, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }}>

                <Typography>
                  <b>File:</b> {doc.fileName}
                </Typography>

                <Typography>
                  <b>CID:</b>
                </Typography>

                <Typography
                  sx={{
                    wordBreak: "break-all",
                    color: "blue",
                  }}
                >
                  {doc.ipfsCID}
                </Typography>

                <Typography>
                  Uploaded:
                  {" "}
                  {new Date(
                    Number(doc.uploadedAt) * 1000
                  ).toLocaleString()}
                </Typography>

              </Paper>
            ))}

          </CardContent>
        </Card>
      )}

      {history.length > 0 && (

      <Card sx={{ mt: 3 }}>

      <CardContent>

      <Typography
      variant="h5"
      gutterBottom
      >

      Product Journey

      </Typography>

      <Timeline position="alternate">

      {history.map((item,index)=>(

      <TimelineItem key={index}>

      <TimelineOppositeContent color="text.secondary">

      {new Date(
      Number(item.timestamp)*1000
      ).toLocaleString()}

      </TimelineOppositeContent>

      <TimelineSeparator>

      <TimelineDot
      color={
      item.action.includes("Approved")
      ? "success"
      : item.action.includes("Inspection")
      ? "warning"
      : item.action.includes("Rejected")
      ? "error"
      : "primary"
      }
      />

      {index!==history.length-1 &&

      <TimelineConnector/>

      }

      </TimelineSeparator>

      <TimelineContent>

      <Typography
      fontWeight="bold"
      >

      {item.action}

      </Typography>

      <Typography
      variant="body2"
      sx={{wordBreak:"break-all"}}
      >

      {item.actor}

      </Typography>

      </TimelineContent>

      </TimelineItem>

      ))}

      </Timeline>

      </CardContent>

      </Card>

      )}

      {product?.isRecalled && (

      <Alert

      severity="error"

      sx={{ mb:3 }}

      >

      <b> PRODUCT RECALLED</b>

      <br/>

      Reason:

      {product.recallReason}

      </Alert>

      )}

      {documents.length > 0 && (

      <Card sx={{ mt:3 }}>

      <CardContent>

      <Typography
      variant="h5"
      gutterBottom
      >

      Documents

      </Typography>

      {documents.map((doc,index)=>(

      <Paper
      key={index}
      sx={{ p:2, mb:2 }}
      >

      <Typography>

      <b>Name:</b> {doc.fileName}

      </Typography>

      <Typography>

      <b>CID:</b>

      </Typography>

      <Typography
      variant="caption"
      sx={{ wordBreak:"break-all" }}
      >

      {doc.ipfsCID}

      </Typography>
      <Chip
      color="success"
      label="Verified on Blockchain"
      sx={{ ml: 1 }}
      />

      <Button

      sx={{ mt:2 }}

      variant="contained"

      href={`https://gateway.pinata.cloud/ipfs/${doc.ipfsCID}`}

      target="_blank"

      >

      Open Document

      </Button>

      </Paper>

      ))}

      </CardContent>

      </Card>

      )}



    </Layout>
  );
  
}