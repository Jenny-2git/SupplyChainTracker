import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Layout from "../components/Layout";
import { getContract } from "../blockchain/contract";

export default function Products() {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const contract = await getContract();

      const products = await contract.getAllProducts();

      const data = products.map((p) => ({
        id: Number(p.id),
        uid: p.uid,
        name: p.name,
        batch: p.batchNo,
        owner: p.currentOwner,
        score: Number(p.qualityScore),
        status: Number(p.status),
      }));

      setRows(data);

    } catch (err) {
      console.log(err);
    }
  }

  const statusChip = (status) => {

    const labels = [
      "Created",
      "Quality",
      "Inspection",
      "Approved",
      "Distributor",
      "Warehouse",
      "Retailer",
      "Delivered",
      "Rejected",
    ];

    return (
      <Chip
        label={labels[status]}
        color={
          status === 3
            ? "success"
            : status === 2
            ? "warning"
            : status === 8
            ? "error"
            : "primary"
        }
      />
    );
  };

  const columns = [

    { field: "uid", headerName: "UID", flex: 1 },

    { field: "name", headerName: "Name", flex: 1 },

    { field: "batch", headerName: "Batch", flex: 1 },

    { field: "score", headerName: "Score", width: 100 },

    {
      field: "status",
      headerName: "Status",
      width: 170,
      renderCell: (params) => statusChip(params.value),
    },

  ];

  return (
    <Layout>

      <Typography
        variant="h4"
        mb={2}
      >
        Products
      </Typography>

      <Paper sx={{ height: 600 }}>

        <DataGrid
          rows={rows}
          columns={columns}
        />

      </Paper>

    </Layout>
  );
}