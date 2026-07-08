import {

    BarChart,

    Bar,

    XAxis,

    Tooltip,

    ResponsiveContainer,

    CartesianGrid

} from "recharts";

export default function QualityBarChart({

    stats

}){

    const data=[

        {

            name:"Approved",

            value:stats.approved

        },

        {

            name:"Inspection",

            value:stats.inspection

        },

        {

            name:"Rejected",

            value:stats.rejected

        },

        {

            name:"Delivered",

            value:stats.delivered

        }

    ];

    return(

        <ResponsiveContainer
            width="100%"
            height={320}
        >

            <BarChart
                data={data}
            >

                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis
                    dataKey="name"
                />

                <Tooltip/>

                <Bar
                    dataKey="value"
                    radius={[8,8,0,0]}
                />

            </BarChart>

        </ResponsiveContainer>

    );

}