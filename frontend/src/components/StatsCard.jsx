import { Card, CardContent, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import {Chip} from "@mui/material";
export default function StatsCard({
  title,
  value,
  icon,
  color = "#2563EB",
}) {
  return (
    <Card
      sx={{
        height: "100%",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 8,
        },
      }}
    >
        



      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography color="text.secondary">
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: color,
              color: "#fff",
              p: 2,
              borderRadius: "50%",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}