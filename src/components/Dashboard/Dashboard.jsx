import React from 'react'
import LoginNav from '../LoginNav/LoginNav';
import TransactionBanner from '../TransactionBanner/TransactionBanner';
import LineGraph from '../LineGraph/LineGraph';
import LogDetails from '../LogDetails/LogDetails';


const Dashboard = () => {
  return (
    <div>
      <LoginNav />
      <div className='d-flex justify-content-between'>
        <TransactionBanner />
        <TransactionBanner />
        <TransactionBanner />
      </div>
      <div className='d-flex flex-direction-column justify-content-between'>
        <LineGraph />
        <LogDetails />
      </div>
    </div>
  )
}

export default Dashboard
