import React, { useState } from "react";
import Layout from "../components/Layout";
import { getContract } from "../blockchain/contract";
import { uploadToIPFS } from "../blockchain/ipfs";

import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

const documentTypes = [
  { value: 0, label: "Invoice" },
  { value: 1, label: "Certificate" },
  { value: 2, label: "Image" },
  { value: 3, label: "Other" },
];

export default function UploadDocuments() {
  const [uid, setUid] = useState("");
  const [type, setType] = useState(0);
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadDocument = async () => {
    if (!uid || !file) {
      setMessage("Please enter UID and select a file.");
      return;
    }

    try {
      setLoading(true);

      const cid = await uploadToIPFS(file);

      const contract = await getContract();

      const tx = await contract.uploadDocument(
        uid,
        type,
        file.name,
        cid
      );

      await tx.wait();

      setMessage("Document uploaded successfully!");

      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    }

    setLoading(false);
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Upload Product Document
      </Typography>

      <Card>
        <CardContent>

          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="Product UID"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />

          <TextField
            select
            fullWidth
            sx={{ mb: 2 }}
            label="Document Type"
            value={type}
            onChange={(e) => setType(Number(e.target.value))}
          >
            {documentTypes.map((doc) => (
              <MenuItem
                key={doc.value}
                value={doc.value}
              >
                {doc.label}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="outlined"
            component="label"
            sx={{ mb: 2 }}
          >
            Choose File

            <input
              hidden
              type="file"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
            />
          </Button>

          {file && (
            <Typography sx={{ mb: 2 }}>
              {file.name}
            </Typography>
          )}

          <Box>

            <Button
              variant="contained"
              onClick={uploadDocument}
            >
              Upload
            </Button>

          </Box>

          {loading && (
            <CircularProgress sx={{ mt: 2 }} />
          )}

          {message && (
            <Alert sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}

        </CardContent>
      </Card>
    </Layout>
  );
}