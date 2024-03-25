import React from 'react';
import { BarChart, axisClasses } from '@mui/x-charts';
import { Box, Paper, ThemeProvider, createTheme, styled } from '@mui/material';
import './BarGraph.css';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 400,
  lineHeight: '60px'
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const chartSetting = {
  yAxis: [
    {
      label: 'transactions (INR)',
    },
  ],
  width: 800,
  height: 350,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
    paddingLeft: '50px'
  },
};
const dataset = [
  {
    income: 590,
    expense: 280,
    month: 'Jan',
  },
  {
    income: 600,
    expense: 450,
    month: 'Feb',
  },
  {
    income: 200,
    expense: 160,
    month: 'Mar',
  },
  {
    income: 1040,
    expense: 400,
    month: 'Apr',
  },
  {
    income: 1500,
    expense: 700,
    month: 'May',
  },
  {
    income: 1250,
    expense: 500,
    month: 'June',
  },
  {
    income: 750,
    expense: 250,
    month: 'July',
  },
  {
    income: 120,
    expense: 20,
    month: 'Aug',
  },
  {
    income: 475,
    expense: 115,
    month: 'Sept',
  },
  {
    income: 392,
    expense: 390,
    month: 'Oct',
  },
  {
    income: 1570,
    expense: 1000,
    month: 'Nov',
  },
  {
    income: 590,
    expense: 280,
    month: 'Dec',
  },
];

const valueFormatter = (value) => `${value} INR`;

const BarGraph = () => {
  return (
    <div className='bar-graph'>
      <ThemeProvider theme={lightTheme}>
        <Box
        sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: 'background.default',
            display: 'grid',
            width: '100%'
        }}
        >
          <Item key={1} elevation={1}>
            <div className='header'>
              <div className='heading px-3'>
                  <h5>Income vs Expense</h5>
              </div>
            </div>
            <BarChart className='bar-chart'
              margin={{ left: 60 }}
              dataset={dataset}
              xAxis={[{ scaleType: 'band', dataKey: 'month', label: "Month" }]}
              series={[
                { dataKey: 'income', label: 'Income', valueFormatter },
                { dataKey: 'expense', label: 'Expense', valueFormatter },
              ]}
              {...chartSetting}
            />
          </Item>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default BarGraph

