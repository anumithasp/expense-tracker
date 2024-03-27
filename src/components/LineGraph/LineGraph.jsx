import React from 'react';
import { LineChart, axisClasses } from '@mui/x-charts';
import { Paper, Box } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 500,
    lineHeight: '60px',
    '& .css-k69abp-MuiResponsiveChart-container': {
      paddingLeft: '50px'
    },
    fontFamily: 'Poppins'
  }));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const chartSetting = {
  yAxis: [
    {
      label: 'transactions (INR)',
    },
  ],
  width: 875,
  height: 425,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
    paddingLeft: '50px'
  },
};

const transactionData = [
    {
      month: 'Jan'
    },
    {
      month: 'Feb'
    },
    {
      month: 'Mar'
    },
    {
      month: 'Apr'
    },
    {
      month: 'May'
    },
    {
      month: 'Jun'
    },
    {
      month: 'Jul'
    },
    {
      month: 'Aug'
    },
    {
      month: 'Sep'
    },
    {
      month: 'Oct'
    },
    {
      month: 'Nov'
    },
    {
      month: 'Dec'
    }
  ];

const LineGraph = (props) => {

  return (
    <div className='line-graph'>
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
                  <h5>Cash Flow</h5>
              </div>
            </div>
            <LineChart
                margin={{ left: 60 }}
                yAxis= {[
                  {
                    label: 'transactions (INR)',
                  }
                ]}
                xAxis={[
                    {
                      scaleType: 'band',
                      dataKey: 'month',
                      label: 'Month',
                    },
                  ]}
                series={[
                    { curve: "linear", data: props.income, label: "Income" },
                    { curve: "linear", data: props.expense, label: "Expense" },
                    { curve: "linear", data: props.balance, label: "Balance" }
                ]}
                {...chartSetting}
                dataset={transactionData}
            />
          </Item>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default LineGraph
