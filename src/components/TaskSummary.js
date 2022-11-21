export const TaskSummary = ({ completedCount, pendingCount }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <p style={{ color: 'blue', fontWeight: 600 }}>
                { `Total tasks: ${pendingCount + completedCount}` }
            </p>

            <p style={{ color: 'green', fontWeight: 600 }}>{
                `Completed: ${completedCount}` }
            </p>

            <p style={{ color: 'orange', fontWeight: 600 }}>
                { `Pending: ${pendingCount}` }
            </p>
        </div>
    )
}