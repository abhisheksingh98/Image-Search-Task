import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="logo-wrapper">
      <Link to="/">
        <span className="logo__text">IMAGE   SEARCH</span>
      </Link>
    </div>
  );
}
