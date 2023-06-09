//React imports

import React, { useRef,useEffect } from "react";

//RRD import
import { useFetcher } from "react-router-dom";


//Library imports 
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef();
  const focusRef = useRef();
  useEffect(() => {
   if(!isSubmitting){
    formRef.current.reset();
    focusRef.current.focus()
   }
  }, [isSubmitting]);
  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add new{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>{" "}
        Expense
      </h2>

      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 3.50"
              required
            />
          </div>
        </div>

        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budgets) => (
                <option value={budgets.id} key={budgets.id}>
                  {budgets.name}
                </option>
              ))}
          </select>
        </div>
        <input  type="hidden" name="_action" value="createExpense" />
        <button disabled={isSubmitting} type="submit" className="btn btn--dark">
          {isSubmitting ? (
            <span>Submitting</span>
          ) : (
            <>
            
              <span>Add expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};
