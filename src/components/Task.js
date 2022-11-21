import { Loading } from "./Loading";

export const Task = ({ task, onComplete, onDelete, isLoading, idTaskSelected }) => {
    const getStyle = () => {
        return {
            textDecoration: task.is_completed ? 'line-through' : 'none',
            margin: '5px',
            backgroundColor: isLoading ? '#F3F4F6' : '#ffffff',
            height: 100,
            borderRadius: 5,
            border: 'solid 1px #D1D5DB',
            padding: 10,
        }
    }

    const getStyleDeleteButton = () => {
        return {
            float: 'right',
            background: isLoading ? '#FCA5A5' : 'red',
            color: 'white',
            border: 'solid 1px #D1D5DB',
            height: 30,
            borderRadius: 5,
            fontWeight: 600,
            cursor: isLoading ? '' : 'pointer'
        }
    }

    return (
        <div style={ getStyle() }>
            { (isLoading && task.id === idTaskSelected) && <Loading/> }

            <input
                style={{ marginRight: 10 }}
                type="checkbox"
                checked={ task.is_completed }
                onChange={ () => onComplete(task.id) }
                disabled={ isLoading }
            />

            { task.title }

            <button
                style={ getStyleDeleteButton() }
                onClick={ () => onDelete(task.id) }
                disabled={ isLoading }
            >
                Delete
            </button>

            <p><b>Due Date: </b>{ task.due_date }</p>

            <p><b>Priority: </b>{ task.priority.name }</p>
        </div>
    )
}
