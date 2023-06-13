export const SearchBar = (props) => {

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            padding: '3em',

            alignItems: 'center',
            backgroundColor: '#ccc'
        },
        bar: {
            width: '450px',
            padding: '10px',
            borderRadius: '4px 0 0 4px',
            border: '1px solid #333'
        },
        searchButton: {
            padding: '10px',
            borderRadius: '0 4px 4px 0',
            width: '100px',
            border: '1px solid #333',
            cursor: 'pointer'
        }
    }

    return (
        <div style={styles.container}>
            <input style={styles.bar} type="text" placeholder="Search.." name="search" />
            <button style={styles.searchButton} type="submit">Search</button>
        </div>
    )
}

export default SearchBar
