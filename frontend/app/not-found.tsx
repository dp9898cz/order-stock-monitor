"use client";
import React from "react";

const Error404: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Stránka nenalezena</h1>
            <p className="text-lg">Tato URL adresa neexistuje.</p>
        </div>
    );
};

export default Error404;
