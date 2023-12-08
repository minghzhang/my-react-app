import {useState} from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList"
import {initialTasks} from "./data"

let nextId = initialTasks.length;
export default function TaskApp() {
    const [tasks, setTasks] = useState(initialTasks);

    function handleAddTask(text) {
        setTasks([
            ...tasks,
            {
                id: nextId++,
                text: text,
                done: false
            }
        ]);
    }

    function handleChangeTask(task) {
        setTasks(
            tasks.map((t) => {
                if (t.id === task.id) {
                    return task;
                } else {
                    return t;
                }
            })
        );
    }


    function handleDeleteTask(taskId) {
        setTasks(
            tasks.filter((t) => t.id !== taskId)
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


