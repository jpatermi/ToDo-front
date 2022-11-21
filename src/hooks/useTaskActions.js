import { useState, useEffect, useMemo } from 'react';
import axios from "axios";

export const useTaskActions = () => {
    const [tasks, setTasks] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [idTaskSelected, setIdTaskSelected] = useState(0);
    const [ newTask, setNewTask ] = useState({
        title: '',
        dueDate: '',
        priority: '0'
    });

    const completeTask = async ( id ) => {
        try {
            setIdTaskSelected(id);
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

    const deleteTask = async ( id ) => {
        try {
            setIdTaskSelected(id);
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
        if (newTask.title.trim() !== '' && newTask.dueDate.trim() !== '' && newTask.priority !== '0') {
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
        } else {
            alert('The title or date or priority is empty. All three are required');
        }
    }

    const orderTaskByDate = () => {
        const orderlyTasks = [...tasks].sort(function (a, b) {
            return (new Date(a.due_date) - new Date(b.due_date));
        })

        setTasks(orderlyTasks);
    }

    const handleChangeNewTask = ( event ) => {
        const name = event.currentTarget.name

        setNewTask({
            ...newTask,
            [name]: event.currentTarget.value
        });
    }

    const handleSubmitNewTask = async ( event ) => {
        event.preventDefault();

        if (newTask.title.trim() !== '' && newTask.dueDate.trim() !== '' && newTask.priority !== '0') {
            await addTask(newTask);

            setNewTask({
                title: '',
                dueDate: '',
                priority: '0'
            })
        } else {
            alert('The title or date or priority is empty. All three are required');
        }
    }

    const [ completedCount, pendingCount ] = useMemo(() => {
        return [
            (tasks.filter((task) => task.is_completed)).length,
            (tasks.filter((task) => ! task.is_completed)).length
        ]
    }, [tasks]);

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

    useEffect(() => {
        getTasksAndPriorities();
    }, []);

    return {
        tasks,
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
        newTask
    }
}