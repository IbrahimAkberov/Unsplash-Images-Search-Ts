
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import './SearchImages.css';

interface Image {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

const SearchImages: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const accessKey = 'cl_LPO4ZOKG4c56ImIlUmlOEZMzyRpPlWA4UTaKINfU';

  const searchImages = async (newPage: number = 1) => {
    const url = `https://api.unsplash.com/search/photos?page=${newPage}&query=${query}&client_id=${accessKey}`;

    try {
      const response = await axios.get(url);
      setImages(response.data.results);
      setTotalPages(response.data.total_pages);
      setPage(newPage);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    searchImages(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      searchImages(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      searchImages(page + 1);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for images"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
      <div className="image-grid">
        {images.map((image) => (
          <img key={image.id} src={image.urls.small} alt={image.alt_description} className="image-item" />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={page === 1} className="pagination-button">
          
<span>&#8678;</span>
          </button >
          <span className="pagination-info">Page {page} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={page === totalPages} className="pagination-button">
          
          <span>&#8680;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchImages;
