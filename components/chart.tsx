"use client";

import React, { useState, useEffect } from 'react';
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
  rating: { label: 'User Ratings', color: '#4CAF50' }
};

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { user, rating, message } = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow max-w-xs">
        <p className="font-bold">{user}</p>
        <p>Rating: {rating}</p>
        <p className="mt-2 text-sm">Message: {message}</p>
      </div>
    );
  }
  return null;
};

const Chart: React.FC<ChartProps> = ({ data }) => {
  const [chartWidth, setChartWidth] = useState(1000);
  const [chartHeight, setChartHeight] = useState(500);

  const processedData = React.useMemo(() => {
    return data
      .map((feedback, index) => ({
        user: feedback.userName || `User ${index + 1}`,
        rating: feedback.rating !== null ? feedback.rating : null,
        message: feedback.message || 'No message provided'
      }))
      .filter(item => item.rating !== null);
  }, [data]);

  useEffect(() => {
    const updateDimensions = () => {
      const userCount = processedData.length;
      const newWidth = Math.max(1000, userCount * 50);  // 50px per user, minimum 1000px
      setChartWidth(newWidth);
      setChartHeight(Math.min(window.innerHeight * 0.7, 500));  // 70% of viewport height, max 500px
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [processedData]);

  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          layout="horizontal"
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          width={chartWidth}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="user"
            type="category"
            interval={0}
            tick={({ x, y, payload }) => (
              <g transform={`translate(${x},${y})`}>
                <text 
                  x={0} 
                  y={0} 
                  dy={16} 
                  textAnchor="middle" 
                  fill="#666"
                >
                  {payload.value}
                </text>
              </g>
            )}
            height={100}
          />
          <YAxis
            type="number" 
            domain={[0, 5]} 
            ticks={[0, 1, 2, 3, 4, 5]}
            label={{ value: 'Rating', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="rating" 
            fill={chartConfig.rating.color} 
            name={chartConfig.rating.label}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default Chart;