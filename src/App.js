import { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import './App.css';
import { TaskList, TaskAdd, Loading, Summary } from "./components";

export const App = () => {
    const [tasks, setTasks] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const onComplete = async ( id ) => {
        try {
            setIsLoading(true);

            let task = tasks.filter(( task ) => {
                return task.id === Number(id);
            });

            task = task[0];
            task = { ...task, is_completed: ! task.is_completed };

            await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${id}`, task);

            const updatedTasks = tasks.map(( task ) => {
                return task.id === Number(id) ?
                    { ...task, is_completed: !task.is_completed } :
                    { ...task };
            });

            setTasks(updatedTasks);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async ( id ) => {
        try {
            setIsLoading(true);

            await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`)

            const remainingTasks = [...tasks].filter(( task ) => {
                return task.id !== Number(id);
            });

            setTasks(remainingTasks);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const addTask = async (newTask) => {
        setIsLoading(true);

        const { title, dueDate, priority } = newTask;
        const task = {
            title,
            due_date: dueDate,
            priority_id: priority,
        };

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, task);
            setTasks([...tasks, data]);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    const onOrderByDate = () => {
        const orderlyTasks = [...tasks].sort(function (a, b) {
            return (new Date(a.due_date) - new Date(b.due_date));
        })

        setTasks(orderlyTasks);
    }

    const getTasksAndPriorities = async () => {
        try {
            setIsLoading(true);

            const priorities = await axios.get(`${process.env.REACT_APP_API_URL}/priorities`);
            setPriorities(priorities.data);

            const tasks = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`);
            setTasks(tasks.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const [ completedCount, pendingCount ] = useMemo(() => {
        return [
            (tasks.filter((task) => task.is_completed)).length,
            (tasks.filter((task) => ! task.is_completed)).length
        ]
    }, [tasks]);

    useEffect(() => {
        getTasksAndPriorities();
    }, []);

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center' }}>ToDo List for Braintly</h1>
            { isLoading && <Loading /> }
            <TaskAdd
                priorities={ priorities }
                addTask={ addTask }
            />

            <TaskList
                tasks={ tasks }
                onComplete={ onComplete }
                onDelete={ onDelete }
            />
            {! isLoading &&
                <Summary
                    completedCount={ completedCount }
                    pendingCount={ pendingCount }
                    onOrderByDate={ onOrderByDate }
                />
            }
        </div>
    )
}
