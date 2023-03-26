import React from "react";
//RRD imports
import { useRouteError, Link, useNavigate } from "react-router-dom";

//Library imports
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log("error", error);
  return (
    <div className="error">
      <h1>Uh oh! We got a problem</h1>
      <p>{error.msg || error.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark" 
        onClick={() => navigate(-1)}
        >
          <ArrowUturnLeftIcon width={20} />
          <span>Go back</span>
        </button>
        <Link to="/" className="btn btn--dark">
          <HomeIcon width={20} />
          <span>Go home</span>
        </Link>
      </div>
    </div>
  );
};
