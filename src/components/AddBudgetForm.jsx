// React imports
import React, { useRef, useEffect } from "react";

//RRD imports
import { Form, useFetcher } from "react-router-dom";

//Icons
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

export const AddBudgetForm = ({setEdit,setToggleEdit}) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();
  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);
  return (
    <div className="form-wrapper">
    { setEdit ? <h2 className="h3">Edit budget</h2> : <h2 className="h3">Create budgets</h2>}
      <fetcher.Form ref={formRef} method="post"  className="grid-sm">
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            ref={focusRef}
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
          />
        </div>
      { setEdit ?  <input type="hidden" name="_action" value="editBudget" /> :   <input type="hidden" name="_action" value="createBudget" />}
        <button disabled={isSubmitting} type="submit" className="btn btn--dark">
          {isSubmitting ? (
            <span>Submitting</span>
          ) : (
            <>
            
             { setEdit ? <span>Edit budget</span> : <span>Create budget</span>}
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};
