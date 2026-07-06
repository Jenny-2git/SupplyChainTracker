import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { getContract } from "../blockchain/contract";

export default function AssignRoles() {

  const [wallet, setWallet] = useState("");

  const [role, setRole] = useState(1);

  const assignRole = async () => {

    try {

      const contract = await getContract();

      const tx = await contract.assignRole(
        wallet,
        Number(role)
      );

      toast.info("Transaction Submitted");

      await tx.wait();

      toast.success("Role Assigned Successfully");

      setWallet("");

      setRole(1);

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
          maxWidth:600,
          margin:"40px auto",
          padding:4
        }}
      >

        <Typography
          variant="h4"
          gutterBottom
        >
          Assign Participant Role
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          gap={3}
        >

          <TextField

            label="Wallet Address"

            value={wallet}

            onChange={(e)=>setWallet(e.target.value)}

            fullWidth

          />

          <TextField

            select

            label="Role"

            value={role}

            onChange={(e)=>setRole(e.target.value)}

          >

            <MenuItem value={1}>
              Manufacturer
            </MenuItem>

            <MenuItem value={2}>
              Inspector
            </MenuItem>

            <MenuItem value={3}>
              Distributor
            </MenuItem>

            <MenuItem value={4}>
              Warehouse
            </MenuItem>

            <MenuItem value={5}>
              Retailer
            </MenuItem>

          </TextField>

          <Button

            variant="contained"

            size="large"

            onClick={assignRole}

          >

            Assign Role

          </Button>

        </Box>

      </Paper>

    </Layout>

  );

}