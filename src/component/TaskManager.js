import {useState} from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList"
import {initialTasks} from "./data"
import {useReducer} from 'react';
import tasksReducer from "./TaskReducer"

let nextId = initialTasks.length;
export default function TaskApp() {

    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    function handleAddTask(text) {
        dispatch(
            {
                type: 'added',
                id: nextId++,
                text: text
            }
        );

    }

    function handleChangeTask(task) {
        dispatch(
            {
                type: 'changed',
                task: task
            }
        );
    }


    function handleDeleteTask(taskId) {
        dispatch(
            {
                type: "deleted",
                id: taskId
            }
        );
    }


    return (
        <>
            <h1>Prague itinerary</h1>
            <AddTask onAddTask={handleAddTask}/>
            <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask}/>
        </>
    );


}


