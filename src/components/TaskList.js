import { Task } from "./Task";

export const TaskList = ({ tasks, onComplete, onDelete, isLoading, idTaskSelected }) => {
    return (
        <div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {
                    tasks.map(( task ) => (
                        <li key={ task.id }>
                            <Task
                                task={ task }
                                isLoading={ isLoading }
                                idTaskSelected={ idTaskSelected }
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
