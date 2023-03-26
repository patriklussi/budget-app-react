import React from "react";

// rrd imports
import { useLoaderData, Outlet } from "react-router-dom";

//Helper functions
import { fetchData } from "../helpers";
//Loader

//assets
import wave from "../assets/wave.svg";

//Components
import { Nav } from "../components/Nav";

export function mainLoader() {
  const userName = fetchData("username");
  console.log(userName);
  return { userName };
}

export const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
        <Nav userName={userName} />
      <main>
        <Outlet />
      </main>

      <img src={wave} />
    </div>
  );
};
