import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./RatingGraph.css";

const RatingGraph = ({ data }) => {
  const formattedData = data
    ?.map((entry) => ({
      ...entry,
      timestamp: new Date(entry.timestamp),
    }))
    .sort((a, b) => a.timestamp - b.timestamp); // Ensure data is sorted by date

  if (!formattedData || formattedData.length === 0) {
    return <p>No rating data to display.</p>;
  }

  return (
    <div className="rating-graph-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(date) =>
              new Date(date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "2-digit",
              })
            }
            minTickGap={20}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(value) =>
              `Date: ${new Date(value).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}`
            }
          />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#0074cc"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingGraph;
