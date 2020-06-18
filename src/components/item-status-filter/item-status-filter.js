import React, { Component } from "react";

import "./item-status-filter.scss";

export default class ItemStatusFilter extends Component {
   buttons = [
      { name: "all", label: "All" },
      { name: "active", label: "Active" },
      { name: "done", label: "Done" },
   ];

   render() {
      const { filter, onFilterChange } = this.props;

      const buttons = this.buttons.map(({ name, label }) => {
         const isActiveBtn = filter === name;
         const classNames = isActiveBtn ? "btn-info" : "btn-outline-secondary";

         return (
            <button
               key={name}
               type="button"
               onClick={() => onFilterChange(name)}
               className={`btn ${classNames}`}>
               {label}
            </button>
         );
      });
      return <div className="btn-group">{buttons}</div>;
   }
}
