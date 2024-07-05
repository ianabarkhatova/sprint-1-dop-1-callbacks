import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import {Button} from "./components/Button";


// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

type PropsType = {
    id: number
    title: string
    tasks: Array<TasksType>
    students: Array<string>
    removeTask: (taskId: string, todolistId: number) => void
    changeFilter: (value: FilterValuesType, todolistId: number) => void
    addTask: (title: string, todolistId: number) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void
    removeTodolist: (id: number) => void
    filter: FilterValuesType
    removeAllTasksInOneTodoList: (id: number) => void
}


export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            // addTask();
        }
    }

    const removeTodoListHandler = () => {
        props.removeTodolist(props.id)
    }

    const addTaskHandler = () => {
        props.addTask(title, props.id)
    }

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId, props.id)
    }

    const changeFilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue, props.id)
    }

    const removeAllTasksInOneTodoListHandler = () => {
        props.removeAllTasksInOneTodoList(props.id)
    }


    return <div>

        <div>
            <Button title={'Remove all tasks'} onClick={removeAllTasksInOneTodoListHandler}/>
        </div>


        <h3> {props.title}
            <Button title={'x'} onClick={removeTodoListHandler}/>

        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />

            <Button title={'+'} onClick={addTaskHandler}/>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
                    }

                    return <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button title={'x'} onClick={() => removeTaskHandler(t.taskId)}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button title={'All'} onClick={() => changeFilterHandler('all')}/>
            <Button title={'Active'} onClick={() => changeFilterHandler('active')}/>
            <Button title={'Completed'} onClick={() => changeFilterHandler('completed')}/>
        </div>

        <p></p>
        {
            props.students.map((el) => {
                return (
                    <div>{el}</div>
                )
            })
        }
    </div>
}


