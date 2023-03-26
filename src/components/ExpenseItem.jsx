import React from "react";
//RRD imports
import { Link, useFetcher } from "react-router-dom";

//Helpers
import {
  formatCurrency,
  formatDateToLocal,
  getAllMatchingItems,
} from "../helpers";

//HeroIcons
import { TrashIcon } from "@heroicons/react/24/solid";

export const ExpenseItem = ({ expense ,showBudget}) => {
  const fetcher = useFetcher();
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocal(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            sryle={{
              "--accent": budget.color,
            }}
            to={`/budget/${budget.id}`}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            className="btn btn-warning"
            type="submit"
            aria-label={`Delete ${expense.name} expense `}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};
