import './App.css';

import { TaskList, FormAddTask, Loading, TaskSummary, OrderByDate } from "./components";
import { useTaskActions } from "./hooks/useTaskActions";

export const App = () => {
    const { tasks,
        priorities,
        isLoading,
        completeTask,
        deleteTask,
        orderTaskByDate,
        completedCount,
        pendingCount,
        idTaskSelected,
        handleSubmitNewTask,
        handleChangeNewTask,
        newTask } = useTaskActions();

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center' }}>ToDo List for Braintly</h1>
            { (isLoading && idTaskSelected === 0) && <Loading /> }
            <FormAddTask
                isLoading={ isLoading }
                priorities={ priorities }
                onSubmitNewTask={ handleSubmitNewTask }
                onChangeNewTask={ handleChangeNewTask }
                newTask={ newTask }
            />

            {
                tasks.length > 0 && <OrderByDate
                    isLoading={ isLoading }
                    onOrderByDate={ orderTaskByDate }
                 />
            }

            <TaskList
                tasks={ tasks }
                isLoading={ isLoading }
                idTaskSelected={ idTaskSelected }
                onComplete={ completeTask }
                onDelete={ deleteTask }
            />

            {
                ( ! isLoading || idTaskSelected !== 0) &&
                <TaskSummary
                    completedCount={ completedCount }
                    pendingCount={ pendingCount }
                />
            }
        </div>
    )
}
