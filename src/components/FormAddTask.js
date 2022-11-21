export const FormAddTask = ({ priorities, isLoading, newTask, onSubmitNewTask, onChangeNewTask }) => {
    const getStyleAddButton = () => {
        return {
            borderRadius: 5,
            height: 30,
            background: isLoading ? '#93C5FD' : '#2563EB',
            color: 'white',
            fontWeight: 600,
            cursor: isLoading ? '' : 'pointer'
        }
    }

    return (
        <div style={{ margin: 20 }}>
            <form onSubmit={ onSubmitNewTask }>
                <input
                    name="title"
                    style={{ borderRadius: 5, marginRight: 5, height: 20 }}
                    type="text"
                    placeholder="Task title"
                    value={ newTask.title }
                    onChange={ onChangeNewTask }
                />
                <input
                    name="dueDate"
                    style={{ borderRadius: 5, marginRight: 5, height: 20 }}
                    type="datetime-local"
                    value={ newTask.dueDate }
                    onChange={ onChangeNewTask }
                />
                <select
                    name="priority"
                    style={{ borderRadius: 5, marginRight: 5, height: 22 }}
                    onChange={ onChangeNewTask }
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
                    style={ getStyleAddButton() }
                    disabled={ isLoading }
                >
                    Add Task
                </button>
            </form>
        </div>
    )
}
