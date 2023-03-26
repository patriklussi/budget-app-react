import React from "react";
//RRD imports
import { useLoaderData } from "react-router-dom";
 
//Helpers imports
import { deleteItem, fetchData } from "../helpers";

//Library imports
import { toast } from "react-toastify";

//Component imports
import { Table } from "../components/Table";

//loader
export function expensesLoader() {
  const expenses = fetchData("expenses");
 
  return { expenses };
}

//Action
export async function expensesAction({request}){
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "deleteExpense") {
    try {
      deleteItem({key:"expenses",id:values.expensesId})
      return toast.success("Expense deleted");
    } catch (e) {
      throw new Error("There was a problem deleting your expense");
    }
  }
}

export const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
          <Table expenses={expenses}/>
        </div>
      ) : (
        <p>No expenses to show</p>
      )}
    </div>
  );
};
