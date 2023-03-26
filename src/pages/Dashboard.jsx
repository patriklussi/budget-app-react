import React from "react";
// rrd imports
import { Link,  useLoaderData } from "react-router-dom";
//Helper functions
import { createBudget, fetchData, waait, createExpense, deleteItem } from "../helpers";
//Loader

//Components
import { Intro } from "../components/Intro";
import { AddBudgetForm } from "../components/AddBudgetForm";
import { AddExpenseForm } from "../components/AddExpenseForm";
import { BudgetItem } from "../components/BudgetItem";
import { Table } from "../components/Table";
//Library
import { toast } from "react-toastify";

//Action
export async function dashboardAction({ request }) {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "newUser") {
    try {
      localStorage.setItem("username", JSON.stringify(values.userName));
      return toast.success("Account has been added");
    } catch (e) {
      throw new Error("There was a problem creating your account");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created");
    } catch (e) {
      throw new Error("There was a problem creating your budget");
    }
  }
  
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense");
    }
  }
  if (_action === "deleteExpense") {
    try {
      deleteItem({key:"expenses",id:values.expensesId})
      return toast.success("Expense deleted");
    } catch (e) {
      throw new Error("There was a problem deleting your expense");
    }
  }
  
}

export function dashboardLoader() {
  const userName = fetchData("username");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  console.log(userName);
  return { userName, budgets, expenses };
}

export const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                    {expenses && expenses.length > 0 && (
                      <div className="grid-medium">
                        <h2>Recent Expenses</h2>
                        <Table 
                        expenses={expenses.sort((a,b)=> b.createdAt - a.createdAt).slice(0,8)}/>
                     
                      </div>
                    )}
                       {expenses?.length > 8 &&  (
                          <Link 
                            to="expenses"
                            className="btn btn--dark"
                          >
                          View all expenses
                          </Link>
                        )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to finanical freedom</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
