import React, { Component } from "react";

import AppHeader from "../app-header";
import TodoList from "../todo-list";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.scss";

export default class App extends Component {
   maxId = 100;

   state = {
      todoData: [
         this.createTodoItem("Drink Coffee"),
         this.createTodoItem("Make Awesome App"),
         this.createTodoItem("Have a lunch"),
      ],
      filter: "all",
      term: "",
   };

   createTodoItem(label) {
      return {
         label,
         important: false,
         done: false,
         id: this.maxId++,
      };
   }

   addItem = (text) => {
      const newItem = this.createTodoItem(text);
      console.log(this.state.todoData);

      this.setState(({ todoData }) => {
         return { todoData: [...todoData, newItem] };
      });
   };

   deleteItem = (id) => {
      this.setState(({ todoData }) => {
         const idx = todoData.findIndex((el) => el.id === id);
         return {
            todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
         };
      });
   };

   toggleProperty = (arr, id, propName) => {
      const idx = arr.findIndex((el) => el.id === id);
      const oldItem = arr[idx];

      const newItem = { ...oldItem, [propName]: !oldItem[propName] };
      return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
   };

   onToggleDone = (id) => {
      this.setState(({ todoData }) => {
         return { todoData: this.toggleProperty(todoData, id, "done") };
      });
   };

   onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
         return { todoData: this.toggleProperty(todoData, id, "important") };
      });
   };

   onFilterChange = (filter) => {
      this.setState({ filter });
   };

   onSearchChange = (term) => {
      this.setState({ term });
   };

   filter(items, filter) {
      switch (filter) {
         case "active":
            return items.filter((item) => !item.done);
         case "done":
            return items.filter((item) => item.done);
         default:
            return items;
      }
   }

   search(items, term) {
      if (term.length === 0) {
         return items;
      }

      return items.filter((item) => {
         return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
      });
   }

   render() {
      const { todoData, filter, term } = this.state;
      const doneCount = todoData.filter((el) => el.done).length;
      const todoCount = todoData.length - doneCount;
      const visibleItems = this.search(this.filter(todoData, filter), term);

      return (
         <div className="todo-app">
            <AppHeader toDo={todoCount} done={doneCount} />

            <div className="search-panel d-flex">
               <SearchPanel onSearchChange={this.onSearchChange} />

               <ItemStatusFilter
                  filter={filter}
                  onFilterChange={this.onFilterChange}
               />
            </div>

            <TodoList
               todos={visibleItems}
               onToggleImportant={this.onToggleImportant}
               onToggleDone={this.onToggleDone}
               onDeleted={this.deleteItem}
            />

            <ItemAddForm onAdded={this.addItem} />
         </div>
      );
   }
}
