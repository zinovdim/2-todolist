import React, {ChangeEvent, useRef, useState} from "react";
import Button from "./Button";
import {FilterValueType} from "./App";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filterValue: FilterValueType) => void
    addTask: (title:string) => void
}

const Todolist = (props: TodolistPropsType) => {


    // const taskTitleInput = useRef<HTMLInputElement>(null)
    const [title, setTitle] = useState("")
    // console.log(title)
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')

        // if (currentTarget.value) {
        //     const newTaskTitle = taskTitleInput.current.value
        //     addTask(title)
        //     taskTitleInput.current.value = ""
        // }
    }


    return (
        <div className="App">
            <div className="todolist">
                <h3>{props.title}</h3>
                <div>
                    <input value={title} onChange={onChangeInputHandler}/>
                    <Button title="+" onClickHandler={addTaskHandler}/>
                </div>

                <ul>
                    {props.tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={() => props.removeTask(task.id)}>X</button>
                            </li>
                        )
                    })}

                </ul>
                <div>
                    <Button title="All" onClickHandler={() => props.changeTodolistFilter("all")}/>
                    <Button title="Active" onClickHandler={() => props.changeTodolistFilter("active")}/>
                    <Button title="Completed" onClickHandler={() => props.changeTodolistFilter("completed")}/>
                </div>
            </div>
        </div>

    );
}

export default Todolist