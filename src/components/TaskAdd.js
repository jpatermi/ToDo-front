import React, { useState } from 'react';

export const TaskAdd = ({ priorities, addTask }) => {
    const [ title, setTitle ] = useState('');
    const [ dueDate, setDueDate ] = useState('');
    const [priority, setPriority] = useState('0');

    const handleOnChangeTitle = ( event ) => {
        setTitle(event.currentTarget.value);
    }

    const handleOnChangeDate = ( event ) => {
        setDueDate(event.currentTarget.value);
    }

    const handleOnChangePriority = ( event ) => {
        setPriority(event.currentTarget.value)
    }

    const handleOnSubmit = ( event ) => {
        event.preventDefault();

        if (title.trim() !== '' && dueDate.trim() !== '' && priority !== '0') {
            addTask({
                title,
                dueDate,
                priority,
            });
            setTitle('');
            setDueDate('');
            setPriority('0');
        } else {
            alert('The title or date or priority is empty. All three are required');
        }
    }

    return (
        <div style={{ margin: 20 }}>
            <form onSubmit={ handleOnSubmit }>
                <input
                    style={{ borderRadius: 5, marginRight: 5, height: 20 }}
                    type="text"
                    placeholder="Task title"
                    value={ title }
                    onChange={ handleOnChangeTitle }
                />
                <input
                    style={{ borderRadius: 5, marginRight: 5, height: 20 }}
                    type="datetime-local"
                    value={ dueDate }
                    onChange={ handleOnChangeDate }
                />
                <select
                    style={{ borderRadius: 5, marginRight: 5, height: 22 }}
                    onChange={ handleOnChangePriority }
                >
                    <option value="0"> -- Select priority -- </option>
                    {
                        priorities.map(( priority ) => (
                            <option
                                key={ priority.id }
                                value={ priority.id }
                            >
                                { priority.name }
                            </option>
                        ))
                    }
                </select>
                <button
                    style={{
                        borderRadius: 5,
                        height: 30,
                        background: '#2563EB',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    Add Task
                </button>
            </form>
        </div>
    )
}
