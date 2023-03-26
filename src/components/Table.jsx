import React from 'react'

//Components
import { ExpenseItem } from './ExpenseItem';

export const Table = ({expenses,showBudget = true}) => {

    const tableNames = ["Name","Amount","Date",showBudget ? "budget" : "",""];
  return (
    <div className='table'>
        <table>
            <thead>
                <tr>
                  {tableNames.map((i,index)=>(
                    <th key={index}>{i}</th>
                  ))}
                </tr>
            </thead>
            <tbody>
               {expenses.map((expense)=>(
                <tr key={expense.id}>
                    <ExpenseItem expense={expense} showBudget={showBudget}/>
                </tr>
               ))}
            </tbody>
        </table>
    </div>
  )
}
