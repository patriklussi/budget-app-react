import React from "react";

//Helpers
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";
//RRD Imports
import { Form, Link } from "react-router-dom";
//Library imports
import { BanknotesIcon, PencilSquareIcon,TrashIcon } from "@heroicons/react/24/outline";


export const BudgetItem = ({ budget, showDelete = false,showEdit = false,setToggleEdit }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);
  console.log(color);
  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)}</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)}spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      {showDelete ? (
        <div className="flex-sm" style={{justifyContent:"flex-start"}}>
          <Form method="post"
          action="delete"
          onSubmit={(e)=>{
            if(!confirm("Are you sure you want to permanently delete this budget")){
              e.preventDefault();
            }
          }}
          > 
          <button type="submit" className="btn">
            <span>Delete budget</span>
            <TrashIcon width={20}/>
          </button>
          </Form>

          {
            showEdit && (
      
                <button onClick={()=>{setToggleEdit((prevState) => !prevState)}} className="btn" type="submit">
                  <span>Edit budget</span>
                  <PencilSquareIcon width={20}/>
                </button>
       
            )
          }
        </div>
      ) : (
        <div className="flex-small">
          <Link to={`/budget/${id}`} className="btn">
            <span>View details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};
