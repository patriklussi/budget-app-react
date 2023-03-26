import React, { useState } from "react";
//Helpers
import {
  editBudget,
  createExpense,
  deleteItem,
  getAllMatchingItems,
} from "../helpers";
//RRD imports
import { redirect, useLoaderData } from "react-router-dom";
//Components
import { BudgetItem } from "../components/BudgetItem";
import { AddExpenseForm } from "../components/AddExpenseForm";
import { Table } from "../components/Table";
import { AddBudgetForm } from "../components/AddBudgetForm";
//Library imports
import { toast } from "react-toastify";

export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });
  if (!budget) {
    throw new Error("The budget youre trying to find doesnt exist");
  }
  return { budget, expenses };
}

export async function budgetAction({ request, params }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "deleteExpense") {
    try {
      deleteItem({ key: "expenses", id: values.expensesId });
      return toast.success("Expense deleted");
    } catch (e) {
      throw new Error("There was a problem deleting your expense");
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
  if (_action === "editBudget") {
    try {
      
      editBudget({
        id: params.id,
        newAmount: values.newBudgetAmount,
        newName: values.newBudget,
      });
      redirect("/");
      return toast.success(`Expense was edited`) , redirect("/");
    } catch (e) {
      throw new Error("Something went wrong while editing your budget");
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  const [toggleEdit, setToggleEdit] = useState(false);
  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span>
        Overview
      </h1>
      <div className="flex-lg">
        {toggleEdit ? (
          <AddBudgetForm setEdit={true} />
        ) : (
          <BudgetItem
            budget={budget}
            showDelete={true}
            showEdit={true}
            setToggleEdit={setToggleEdit}
          />
        )}
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span>
          </h2>
          <Table expenses={expenses} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
