import React from 'react'
import LoginNav from '../LoginNav/LoginNav';
import TransactionBanner from '../TransactionBanner/TransactionBanner';
import LineGraph from '../LineGraph/LineGraph';
import LogDetails from '../LogDetails/LogDetails';
import './Dashboard.css';
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import BarGraph from '../BarGraph/BarGraph';
import { formatNum } from '../../App';

const Dashboard = () => {
  return (
    <div className='exp-dashboard'>
      <LoginNav />
      <div className='content'>
        <div className='d-flex justify-content-between'>
          <TransactionBanner title="BALANCE" amount={formatNum(29500)} />
          <TransactionBanner title="INCOME" amount={formatNum(75000)}/>
          <TransactionBanner title="EXPENSE" amount={formatNum(45500)}/>
        </div>
        <div className='d-flex flex-direction-column justify-content-between'>
          <LineGraph />
          <LogDetails />
        </div>
        <div className='d-flex flex-direction-column justify-content-between'>
          <RecentTransactions />
          <BarGraph />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
