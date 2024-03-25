import React, { useEffect, useState } from 'react'
import LoginNav from '../LoginNav/LoginNav';
import TransactionBanner from '../TransactionBanner/TransactionBanner';
import LineGraph from '../LineGraph/LineGraph';
import CategoricalExpenses from '../CategoricalExpenses/CategoricalExpenses';
import './Dashboard.css';
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import BarGraph from '../BarGraph/BarGraph';
import { formatNum } from '../../App';
import axios from 'axios';

const Dashboard = () => {
  const [summary, setSummary] = useState([]);
  const [catExpenses, setCatExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0.0);

  const dashReload = () => {
    getSummary();
    getCategoricalExpenses();
  }
  
  const [headers, setHeaders] = useState(
    {
      "Authorization" : "Bearer " + sessionStorage.getItem("token")
    }
  )

  const getSummary = () => {
    axios.get("http://localhost:8080/monthlysummary?userId=" + sessionStorage.getItem("id"),{headers:headers}).then(
        (response)=>{
          if(response.data.code === 200) {
            setSummary(JSON.parse(response.data.summary));
            var expenseObj = JSON.parse(response.data.summary).filter((value) => value.title === "Expense");
            expenseObj.length > 0 && setTotalExpense(expenseObj[0].amount);
          }
        }).catch((err)=> {
          console.log(err);
      })
  }

  const getCategoricalExpenses = () => {
    axios.get("http://localhost:8080/categoricalexpenses?userId=" + sessionStorage.getItem("id"),{headers:headers}).then(
        (response)=>{
          if(response.data.code === 200) {
            setCatExpenses(response.data.categoricalExpenses);
          }
        }).catch((err)=> {
          console.log(err);
      })
  }

  useEffect(() => {
    getSummary();
    getCategoricalExpenses();
  }, [])

  return (
    <div className='exp-dashboard'>
      <LoginNav dashReload={dashReload}/>
      <div className='content'>
        <div className='first-row d-flex justify-content-between'>
          {summary.map((trans) => (
            <div className={`${trans.title.toLowerCase()}${'-tran'}`}>
              <TransactionBanner  title={trans.title.toUpperCase()} amount={formatNum(trans.amount)} />
            </div>
          ))}
        </div>
        <div className='second-row d-flex flex-direction-column justify-content-between'>
          <div className='line-graph'>
            <LineGraph />
          </div>
          <div className='log-details'>
            <CategoricalExpenses data={catExpenses} totalExpense={totalExpense}/>
          </div>
        </div>
        <div className='third-row d-flex flex-direction-column justify-content-between'>
          <div className='recent-trans'>
            <RecentTransactions />
          </div>
          <div className='bargraph'>
            <BarGraph />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
