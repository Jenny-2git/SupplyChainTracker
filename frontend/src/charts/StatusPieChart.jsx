import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const COLORS = [
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#3B82F6"
];

export default function StatusPieChart({ stats }) {

    const data = [

        {
            name: "Approved",
            value: stats.approved
        },

        {
            name: "Inspection",
            value: stats.inspection
        },

        {
            name: "Rejected",
            value: stats.rejected
        },

        {
            name: "Delivered",
            value: stats.delivered
        }

    ];

    return (

        <ResponsiveContainer
            width="100%"
            height={320}
        >

            <PieChart>

                <Pie

                    data={data}

                    dataKey="value"

                    outerRadius={120}

                >

                    {data.map((entry, index) => (

                        <Cell
                            key={index}
                            fill={COLORS[index]}
                        />

                    ))}

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </ResponsiveContainer>

    );

}