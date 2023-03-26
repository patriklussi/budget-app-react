import React from 'react'
//assets 
import logomark from "../assets/logomark.svg";

//rrd imports
import { Form, NavLink } from 'react-router-dom';

//lib imports 
import { TrashIcon } from '@heroicons/react/24/solid'
export const Nav = ({userName}) => {
  return (
    <nav>
       <NavLink
        to="/"
        aria-label="Go To Home"
       >
       <img src={logomark} alt="" height={30} />
       <span >HomeBudget</span>
       </NavLink>
       {
        userName && (
            <Form
            method="post"
            action="logout" 
            onSubmit={(e) => {
                if(!confirm("Delete user and all data?")){
                    e.preventDefault(); 
                }
            }}
            >
                <button type="submit" className='btn btn--warning'>
                    <span>Delete user</span>
                    <TrashIcon width={20} />
                </button>
            </Form>
        )
       }
    </nav>
  )
}
