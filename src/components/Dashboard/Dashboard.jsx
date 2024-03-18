import React from 'react'
import LoginNav from '../LoginNav/LoginNav';
import TransactionBanner from '../TransactionBanner/TransactionBanner';
import LineGraph from '../LineGraph/LineGraph';


const Dashboard = () => {
  return (
    <div>
      <LoginNav />
      <div className='d-flex justify-content-between'>
        <TransactionBanner />
        <TransactionBanner />
        <TransactionBanner />
      </div>
      <div className='d-flex justify-content-between'>
        <LineGraph />
      </div>
    </div>
  )
}

export default Dashboard
