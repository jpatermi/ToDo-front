export const Loading = () => {
    const getStyle = () => {
        return {
            margin: 'auto',
            textAlign: 'center',
            position: "absolute",
            border: '1px solid #D1D5DB',
            background: '#9CA3AF',
            width: '48%',
            paddingTop: 10,
            paddingBottom: 10,
            fontWeight: 600,
            borderRadius: 5
        }
    }

    return (
        <div style={ getStyle() }>
            ...Loading
        </div>
    )
}