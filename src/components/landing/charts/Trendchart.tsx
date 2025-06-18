import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot, // Used for the "Election Fraud" annotation point
  Label,
} from 'recharts';
//import { useTheme } from './ThemeContext'; // Assuming you have a ThemeContext for dark/light mode

// Define the shape of your data
interface ChartData {
  month: string;
  visitors: number;
}

const ElectionFraudTrendChart: React.FC = () => {
  //const { theme } = useTheme(); // Use theme context for dynamic colors
const theme="dark"
  // Inferred data based on the image's line shape and annotation
  // The 'visitors' values are made up to replicate the visual trend
  const data: ChartData[] = [
    { month: 'Jan', visitors: 15000 },
    { month: 'Feb', visitors: 12000 },
    { month: 'Mar', visitors: 18000 }, // Inferred
    { month: 'Apr', visitors: 25000 }, // Peak for "Election Fraud"
    { month: 'May', visitors: 16000 },
    { month: 'Jun', visitors: 20000 },
  ];

  // Find the data point for the "Election Fraud" annotation
  // In this inferred data, it's the peak in April
  const electionFraudPoint = data.find(item => item.month === 'Apr');

  // Define colors based on the theme
  const textColor = theme === 'dark' ? '#cbd5e1' : '#475569'; // slate-300 or slate-600
  const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0'; // slate-700 or slate-200
  const lineColor = '#60a5fa'; // blue-400, consistent

  return (
    <div className="w-full relative h-64 md:h-80 lg:h-96 bg-gray-900 rounded-lg p-4 shadow-lg flex items-center justify-center ">
      
      <div className='absolute left-1/2'><h3>Timelines
        </h3></div>
      <ResponsiveContainer width="100%" height="100%" className="!w-full ">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="month" stroke={textColor} />
          <YAxis stroke={textColor}>
            <Label
              value="Total Visitors"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: 'middle', fill: textColor }}
            />
          </YAxis>
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff', // bg-gray-800 or bg-white
              borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb', // gray-600 or gray-200
              color: textColor,
              borderRadius: '0.375rem', // rounded-md
            }}
            itemStyle={{ color: textColor }}
          />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke={lineColor}
            strokeWidth={2}
            activeDot={{ r: 8 }}
            animationDuration={1500} // Animation for the line drawing
          />

          {/* Annotation for "Election Fraud" */}
          {electionFraudPoint && (
            <ReferenceDot
              x={electionFraudPoint.month}
              y={electionFraudPoint.visitors}
              r={7} // Radius of the dot
              fill="#ef4444" // Red color for the dot (red-500)
              stroke="#b91c1c" // Darker red border
              isFront
            >
              <Label
                value=""
                position="top"
                offset={10} // Distance from the dot
                style={{
                  fill: '#ef4444', // Red text color
                  fontWeight: 'bold',
                  fontSize: '0.875rem', // text-sm
                }}
              />
            </ReferenceDot>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ElectionFraudTrendChart;