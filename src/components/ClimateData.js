import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
    'https://gyjbkzxtsxbpwjmbvilm.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amJrenh0c3hicHdqbWJ2aWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNDgzMzYsImV4cCI6MjA1NTgyNDMzNn0.7leWFkGhmI8Wo71P87K7xsNGJAmTRQ7mIeL_FO6wzx0' // 🔒 Replace with a secure environment variable
);

const ClimateData = () => {
    const [ndviData, setNdviData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('climate_data')
                    .select('month, bomet->ndvi') // ✅ Select month & NDVI from bomet
                    .eq('year', 2002) // ✅ Filter year = 2002
                    .order('month', { ascending: true }); // ✅ Order by month

                if (error) throw error;

                // ✅ Format data for Recharts
                const formattedData = data.map((item) => ({
                    month: `M${item.month}`, // Convert month to "M1", "M2", ..., "M12"
                    ndvi: item.ndvi ?? 0, // Ensure ndvi is valid (fallback to 0)
                }));

                console.log("✅ NDVI Data:", formattedData);
                setNdviData(formattedData);
            } catch (err) {
                console.error("❌ Fetch Error:", err.message);
                setErrorMessage("Failed to fetch NDVI data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>NDVI Data (Bomet, 2002)</h2>

            {loading && <p>Loading...</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ndviData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 1]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="ndvi" stroke="#82ca9d" strokeWidth={2} dot={{ r: 5 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ClimateData;
