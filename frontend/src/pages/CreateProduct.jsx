import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { getContract } from "../blockchain/contract";

const CreateProduct = () => {
  const [form, setForm] = useState({
    uid: "",
    name: "",
    batchNo: "",
    description: "",
    manufactureDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };



  const createProduct = async () => {
    try {
      setLoading(true);

      console.log("1. Getting contract...");
      const contract = await getContract();

      console.log("2. Contract:", contract.target);

      const manufactureTimestamp = Math.floor(
        new Date(form.manufactureDate).getTime() / 1000
      );

      console.log("3. Sending transaction...");

      const tx = await contract.createProduct(
        form.uid,
        form.name,
        form.batchNo,
        form.description,
        manufactureTimestamp
      );

      console.log("4. Transaction hash:", tx.hash);

      console.log("5. Waiting for mining...");

      const receipt = await tx.wait();

      console.log("6. Receipt:", receipt);

      toast.success("Product created!");
    } catch (err) {
      console.log("========== FULL ERROR ==========");
      console.log(err);
      console.log("message:", err.message);
      console.log("shortMessage:", err.shortMessage);
      console.log("reason:", err.reason);
      console.log("code:", err.code);
      console.log("info:", err.info);
      console.log("data:", err.data);
      console.log("===============================");

      toast.error(err.shortMessage || err.message);
    }
  }

  // const createProduct = async () => {
  //   try {
  //     setLoading(true);

  //     const contract = await getContract();

  //     const manufactureTimestamp = Math.floor(
  //       new Date(form.manufactureDate).getTime() / 1000
  //     );

  //     console.log("Contract:", contract.target);

  //     const tx = await contract.createProduct(
  //       form.uid,
  //       form.name,
  //       form.batchNo,
  //       form.description,
  //       manufactureTimestamp
  //     );

  //     toast.info("Transaction submitted...");

  //     await tx.wait();

  //     toast.success("Product created successfully!");

  //     setForm({
  //       uid: "",
  //       name: "",
  //       batchNo: "",
  //       description: "",
  //       manufactureDate: "",
  //     });
  //   } catch (err) {
  //     console.error(err);

  //     toast.error(
  //       err.reason ||
  //       err.shortMessage ||
  //       err.message
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Layout>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 700,
          margin: "30px auto",
          padding: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
        >
          Create Product
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField
            label="Product UID"
            name="uid"
            value={form.uid}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Batch Number"
            name="batchNo"
            value={form.batchNo}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            value={form.description}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Manufacture Date"
            type="date"
            name="manufactureDate"
            value={form.manufactureDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <Button
            variant="contained"
            size="large"
            onClick={createProduct}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </Box>
      </Paper>
    </Layout>
  );
};

export default CreateProduct;