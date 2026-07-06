import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";

export default function ProductTable({ rows }) {

    const columns = [

        {
            field: "uid",
            headerName: "UID",
            flex: 1,
        },

        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },

        {
            field: "batch",
            headerName: "Batch",
            flex: 1,
        },

        {
            field: "score",
            headerName: "Score",
            width: 100,
        },

        {
            field: "status",
            headerName: "Status",
            width: 180,

            renderCell: (params) => {

                const statusNames = [

                    "Created",

                    "Quality",

                    "Inspection",

                    "Approved",

                    "Distributor",

                    "Warehouse",

                    "Retailer",

                    "Delivered",

                    "Rejected"

                ];

                const colors = {

                    2: "warning",

                    3: "success",

                    8: "error"

                };

                return (

                    <Chip

                        label={statusNames[params.value]}

                        color={colors[params.value] || "primary"}

                    />

                );

            }

        }

    ];

    return (

        <DataGrid

            rows={rows}

            columns={columns}

            pageSizeOptions={[5,10,20]}

        />

    );

}