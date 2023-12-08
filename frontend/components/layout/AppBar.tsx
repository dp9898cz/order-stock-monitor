import React from "react";
import ThemeChanger from "./ThemeChanger";

const AppBar = () => {
    return (
        <div className="navbar bg-base-100 text-base-content">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                </div>
                <a className="link no-underline font-bold normal-case text-xl">Objednávkový systém</a>
            </div>
            <div className="navbar-center flex">
                <ul className="menu menu-horizontal px-1 text-base-content">
                    <li>
                        <a>Produkty</a>
                    </li>
                    <li>
                        <a>Objednávky</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <ThemeChanger />
            </div>
        </div>
    );
};

export default AppBar;
