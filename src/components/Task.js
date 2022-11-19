import React from "react";

 export const Task = ({ task, onComplete, onDelete }) => {
    const getStyle = () => {
        return {
            textDecoration: task.is_completed ? 'line-through' : 'none',
            margin: '5px',
            backgroundColor: '#ffffff',
            height: 100,
            borderRadius: 5,
            border: 'solid 1px #D1D5DB',
            padding: 10
        }
    }

    const getStyleDeleteButton = () => {
        return {
            float: 'right',
            background: 'red',
            color: 'white',
            border: 'solid 1px #D1D5DB',
            height: 30,
            borderRadius: 5,
            fontWeight: 600,
            cursor: 'pointer'
        }
    }

    return (
        <div style={ getStyle() }>
            <input
                style={{ marginRight: 10 }}
                type="checkbox"
                checked={ task.is_completed }
                onChange={ () => onComplete( task.id ) }
            />
            { task.title }
            <button
                style={ getStyleDeleteButton() }
                onClick={ () => onDelete( task.id ) }
            >
                Delete
            </button>
            <p><b>Due Date: </b>{ task.due_date }</p>
            <p><b>Priority: </b>{ task.priority.name }</p>
        </div>
    )
}
