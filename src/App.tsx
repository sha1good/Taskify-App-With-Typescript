import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

// let name: string;
// let age: number;
// let isStudent: boolean;
// let hobbies: string[];
// let role: [number,string]; role=[2,"hello"]//tuple

//  type Person ={
//    name: string,
//     age?: number
//  }

// let person:Person ={
//   name: "Sheriff",
//   age: 22
// }

// let lotsOfPeople: Person[]

//  type Person ={
//    name: string,
//     age?: number
//  }

//  interface Hammed extends Person{
//   professsions: string
//  }

//  let sheriff: Hammed ={
//    professsions: "programmer",
//    name: "Hammed"
//  }

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  // console.log(todos);
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log(result);

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let add,
      activeTodos = todos,
      completeTodos = completedTodos;

    if (source.droppableId === "TodosList123") {
      add = activeTodos[source.index];
      activeTodos.splice(source.index, 1);
      // console.log("if")
    } else {
      add = completeTodos[source.index];
      completeTodos.splice(source.index, 1);
      //console.log("else")
    }

    if (destination.droppableId === "TodosList123") {
      activeTodos.splice(destination.index, 0, { ...add, isDone: false });
      // console.log("if destination")
    } else {
      completeTodos.splice(destination.index, 0, { ...add, isDone: true });
      //console.log("else destination")
    }
    setCompletedTodos(completeTodos);
    setTodos(activeTodos);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
