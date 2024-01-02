import React, {ChangeEvent, useRef, useState} from "react";
import Button from "./Button";
import {FilterValueType} from "./App";
import {styled} from "styled-components";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    filterValue: FilterValueType
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filterValue: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
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
    }
    // const onKeyPressHandler = () => {
    //     if (event.key === "Enter") {
    //         addTaskHandler()
    //     }
    // }


    const mapedTasks = props.tasks.map((task) => {
        const removeTaskHandler = () => {
            props.removeTask(task.id)
        }
        return (
            <li key={task.id} className={task.isDone ? "task-done" : "task"}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={(e) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked)
                    }}
                />
                <span>{task.title}</span>
                <Button title='X' onClickHandler={removeTaskHandler}></Button>
                {/*<button onClick={() => props.removeTask(task.id)}>X</button>*/}
            </li>
        )
    })

    return (
        <div className="App">
            <div className="todolist">
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={title}
                        onChange={onChangeInputHandler}
                        onKeyPress={(event) => {
                        if (event.key === "Enter") {
                        addTaskHandler()
                    }}}
                    />
                    <Button title="+" onClickHandler={addTaskHandler}/>
                </div>
                <Wrapper>
                    <ul>
                        {mapedTasks}
                    </ul>
                </Wrapper>
                <div>
                    <Button classes={props.filterValue === "all" ? "btn-active" : ""} title="All"
                            onClickHandler={() => props.changeTodolistFilter("all")}/>
                    <Button classes={props.filterValue === "active" ? "btn-active" : ""} title="Active"
                            onClickHandler={() => props.changeTodolistFilter("active")}/>
                    <Button classes={props.filterValue === "completed" ? "btn-active" : ""} title="Completed"
                            onClickHandler={() => props.changeTodolistFilter("completed")}/>
                </div>
            </div>
        </div>

    );
}

export default Todolist

const Wrapper = styled.div`
  display: flex;
  font-size: 20px;

`
