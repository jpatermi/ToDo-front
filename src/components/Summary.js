import React from "react";

export const Summary = ({ completedCount, pendingCount, onOrderByDate }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <button
                onClick={ onOrderByDate }
                style={{
                    borderRadius: 5,
                    height: 35,
                    background: '#2563EB',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}
            >
                Order by date
            </button>
            <p style={{ color: 'green', fontWeight: 600 }}>{ `Completed: ${completedCount}` }</p>
            <p style={{ color: 'orange', fontWeight: 600 }}>{ `Pending: ${pendingCount}` }</p>
        </div>
    )
}