export const OrderByDate = ({ onOrderByDate, isLoading }) => {
    const getStyleButton = () => {
        return {
            borderRadius: 5,
            height: 35,
            background: isLoading ? '#93C5FD' : '#2563EB',
            color: 'white',
            fontWeight: 600,
            cursor: isLoading ? '' : 'pointer',
            marginLeft: 5
        }
    }

    return (
        <button
            disabled={ isLoading }
            onClick={ onOrderByDate }
            style={ getStyleButton() }
        >
            Order by date
        </button>
    )
}
