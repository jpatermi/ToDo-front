import React from "react";
import { Task } from "./Task";

export const TaskList = ({ tasks, onComplete, onDelete }) => {
    return (
        <div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {
                    tasks.map(( task ) => (
                        <li key={ task.id }>
                            <Task
                                task={ task }
                                onComplete={ onComplete }
                                onDelete={ onDelete }
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
