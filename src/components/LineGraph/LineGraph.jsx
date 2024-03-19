import React from 'react';
import { LineChart } from '@mui/x-charts';
import { Paper, Box } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 500,
    width : 950,
    lineHeight: '60px'
  }));

const lightTheme = createTheme({ palette: { mode: 'light' } });

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

  const incomes = [300, 550, 200, 324, 434, 120, 459, 1000, 786, 656, 455, 900];
  const expenses = [200, 350, 199, 240, 370, 90, 280, 750, 594, 432, 232, 450];
  const balances = [100, 200, 1, 84, 64, 30, 179, 250, 192, 224, 223, 450];

const LineGraph = () => {
  return (
    <div>
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
            <LineChart
                xAxis={[
                    {
                      scaleType: 'band',
                      dataKey: 'month',
                      label: 'Month',
                    },
                  ]}
                series={[
                    { curve: "linear", data: incomes },
                    { curve: "linear", data: expenses },
                    { curve: "linear", data: balances }
                ]}
                width={900}
                height={500}
                dataset={transactionData}
            />
          </Item>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default LineGraph
