import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/products";
import ProductComponent from "./ProductComponent";

const ProductPage = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const [page, setPage] = useState("1");
  const [pageSize, setPageSize] = useState("12");
  const fetchProducts = async () => {
    const response = await axios
      .get(
        `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`
      )
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize]);
  function goToPreviousPage() {
    setPage((page) => page - 1);
  }
  const getPaginationGroup = () => {
    let start = Math.floor((page - 1) / 10) * 10;
    return new Array(10).fill().map((_, idx) => start + idx + 1);
  };
  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setPage(pageNumber);
  }
  function goToNextPage() {
    setPage((page) => page + 1);
  }
  function handleChange(e) {
    setPageSize(e.target.value);
  }
  return (
    <div className="ui grid container">
      <ProductComponent />
      <div className="pagination row">
        <div className="col">
          <p>Page Number:</p>
          {/* previous button */}
          <button
            onClick={goToPreviousPage}
            className={`prev ${page === 1 ? "disabled" : ""}`}
          >
            prev
          </button>
          {/* show page numbers */}
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${page === item ? "active" : null}`}
            >
              <span>{item}</span>
            </button>
          ))}
          {/* next button */}
          <button
            onClick={goToNextPage}
            className={`next ${page === 10 ? "disabled" : ""}`}
          >
            next
          </button>
        </div>
        <div className="col">
          <p>Page Size:</p>
          <input type="number" value={pageSize} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
