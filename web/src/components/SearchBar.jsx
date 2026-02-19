import { useEffect, useState } from 'react';
import '../styles/searchbar.css';

const SearchBar = ({ initialValue = '', onSearch }) => {
  const [term, setTerm] = useState(initialValue);

  useEffect(() => {
    setTerm(initialValue);
  }, [initialValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch?.(term.trim());
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search products"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
