"use client";

import React from 'react';
import { InferSelectModel } from "drizzle-orm";
import { feedbacks } from "@/db/schema";
import { ChartContainer } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  TooltipProps,
} from 'recharts';

type Feedback = InferSelectModel<typeof feedbacks>;

interface ChartProps {
  data: Feedback[];
}

const chartConfig = {
  rating: {
    label: 'User Ratings',
    color: '#4CAF50'
  }
};

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="font-semibold">User: {label}</p>
        <p>Rating: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const Chart: React.FC<ChartProps> = ({ data }) => {
  const processedData = React.useMemo(() => {
    return data.map((feedback, index) => ({
      user: feedback.userName || `User ${index + 1}`,
      rating: feedback.rating || 0
    })).slice(0, 20); // Limit to 20 users for better visualization
  }, [data]);

  return (
    <div className="p-2 mt-5">
      <ChartContainer className="w-full h-[400px]" config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 5]} />
            <YAxis 
              type="category" 
              dataKey="user" 
              width={100}
              tickFormatter={(value) => value.length > 10 ? `${value.substr(0, 10)}...` : value}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="rating" fill={chartConfig.rating.color} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default Chart;
