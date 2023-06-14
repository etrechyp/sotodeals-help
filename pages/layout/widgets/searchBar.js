import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('searching...');

    router.push(`/search?q=${searchTerm}`);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          style={styles.bar}
          type="text"
          placeholder="Search.."
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button style={styles.searchButton} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
