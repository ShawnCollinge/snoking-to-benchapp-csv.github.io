import React from "react";

import "./App.css";

import { Nav } from "./Nav";
import { TeamGettingPage } from "./TeamGettingPage";

export const App = () => {
    return (
        <>
            <Nav />
            <div style={{ maxWidth: "1100px", margin: " auto " }}>
                <TeamGettingPage />
            </div>
        </>
    );
};
