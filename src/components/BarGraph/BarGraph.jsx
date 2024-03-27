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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const valueFormatter = (value) => `${value} INR`;

const BarGraph = (props) => {
  var data = [];
  var counter = 0;
  for(var i = 0; i < 12; i++) {
    if (props.income[i] === 0 && props.expense[i] === 0) {
      counter++;
    }
    var obj = {
      income: props.income[i],
      expense: props.expense[i],
      month: months[i]
    }
    data[i] = obj;
  }
  if (counter == 12)
    data = [];

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
            {data.length === 0 && <p>No data available to display</p>} 
            {data.length > 0 &&
            <BarChart className='bar-chart'
              margin={{ left: 60 }}
              dataset={data}
              xAxis={[{ scaleType: 'band', dataKey: 'month', label: "Month" }]}
              series={[
                { dataKey: 'income', label: 'Income', valueFormatter },
                { dataKey: 'expense', label: 'Expense', valueFormatter },
              ]}
              {...chartSetting}
            />}
          </Item>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default BarGraph

