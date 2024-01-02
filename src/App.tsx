import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"

function App() {

    console.log(v1())
    const [tasks, setTasks] = React.useState<Array<TasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "ES6", isDone: false},
        ])

    const [filterValue, setFilterValue] = useState<FilterValueType>("all")

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const addTask = (title:string) => {
        const newTask: TasksType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const nextState: Array<TasksType> = [newTask, ...tasks]
        setTasks(nextState)
    }

    const changeTaskStatus = (taskID: string, newIsDoneValue: boolean) => {
        const nextState: Array<TasksType> = tasks.map(el => el.id === taskID ? {...el, isDone: newIsDoneValue} : el)
        setTasks(nextState)
    }

    const changeTodolistFilter = (filterValue:FilterValueType) => {
        setFilterValue(filterValue)
    }

    const getFilteredTasks = (tasks: Array<TasksType>, filterValue: FilterValueType): Array<TasksType> => {

        return filterValue === "active"
            ? tasks.filter(t => t.isDone === false)
            : filterValue === "completed"
                ? tasks.filter(t => t.isDone === true)
                : tasks
    }



    const filteredTasks = getFilteredTasks(tasks, filterValue)
    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredTasks}
                filterValue={filterValue}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus = {changeTaskStatus}
            />
            {/*<Todolist title="What to buy" tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
