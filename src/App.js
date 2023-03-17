import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./App.css";
import "./pagination.css";
import "./general.css";
import "./footer.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUserData = (limit, skip) => {
    Promise.all([
      fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,thumbnail`),
      fetch(`https://dummyjson.com/products?limit=0&skip=0`)
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        if (Array.isArray(data1.products)) {
          setUsers(data1.products);
          setTotalPages(Math.ceil(data2.total / limit));
        }
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    const limit = 10;
    const skip = (currentPage - 1) * limit;
    fetchUserData(limit, skip);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handleForwardClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={number === currentPage ? "active" : ""}>
            <a href="#/" onClick={() => handlePageChange(number)}>
              {number}
            </a>
          </li>
        ))}
        {currentPage < totalPages &&
          <li>
            <a href="#/" onClick={handleForwardClick}>
              &raquo;
            </a>
          </li>
        }
      </ul>
    );
  }

  return (
      <div className="every-product">
        <ul>
          <div className="products-e">
            {users.map(user => (
              <li className="products" key={user.id}>                
            <div className="product-picture">
              <Link to={'Item/' + user.id}><img src={user.thumbnail} alt={user.title}/></Link>
            </div>
            <div className="product-details">
              <Link to={'Item/' + user.id}><div className="product-title">{user.title}
            </div></Link>
            <div className="product-price">
              ${user.price}
            </div>
            <div className="button-style">
              <Link to={'Item/' + user.id}><button class="details-button">More Details</button></Link>
              <button class="buy-button">Buy</button>
            </div>
            
    
            </div>            
              </li>
            ))}
          </div>
        </ul>
      <div className="pagination-container">
        {renderPagination()}
      </div>
      </div>
  

  );
};




export default App;