import React, { useEffect, useState } from "react";
import "./Product.css";
import { Select } from "antd";
import ProComp from "../../Components/product/ProComp";
import { Skeleton } from "antd";
import { useLocation } from "react-router-dom";

const Product = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("gender");
  const categories = new URLSearchParams(search).get("categories");
  const keyword = new URLSearchParams(search).get("keyword");
  const [prevQuery, setPrevQuery] = useState(query);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ products: [], productLength: 0, totalPage: 0 });

  useEffect(() => {
    if (prevQuery !== query) {
      setPage(1);
    }

    // Simulate fetch with static data
    const fetchProducts = () => {
      setLoading(true);
      setTimeout(() => {
        // Simulate loading time and data
        setData({
          products: [
            // Add some static product data for demonstration
            { id: 1, title: "Sample Product 1", price: 100, image: "/assets/sample1.jpg" },
            { id: 2, title: "Sample Product 2", price: 150, image: "/assets/sample2.jpg" }
          ],
          productLength: 2,
          totalPage: 1
        });
        setLoading(false);
      }, 1000);
    };

    fetchProducts();
    setPrevQuery(query);
  }, [keyword, query, page, prevQuery, categories]);

  const sortOptions = [
    { label: "Better Discount", value: "discount" },
    { label: "Customer Ratings", value: "rating" },
    { label: "Price low to high", value: "asc" },
    { label: "Price high to low", value: "desc" },
  ];

  return (
    <div className="productCon">
      <div className="proContainer">
        <p className="proNavigation">
          <span>Home /</span> {query}
        </p>
        <p className="proCount">
          Products - <span>{data.productLength} items</span>
        </p>
        <div className="proSort">
          <div>
            <Select
              size="large"
              placeholder="Sort By"
              style={{
                width: 200,
                border: "1px solid gray",
                color: "black",
                borderRadius: "8px",
                outline: "none",
              }}
              options={sortOptions}
            />
          </div>
        </div>
      </div>
      <div className="proBox">
        <div className="proFilters"></div>
        {loading ? (
          <div className="proGrid">
            {Array.from({ length: 20 }).map((_, i) => (
              <div className="proSkeleton" key={i}>
                <Skeleton active />
              </div>
            ))}
          </div>
        ) : (
          <div className="proGrid">
            {data.products.map((pro, i) => (
              <ProComp product={pro} key={i} />
            ))}
          </div>
        )}
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <button>{page}</button>
        <button
          disabled={page === Math.ceil(data.totalPage) || data.products.length < 20}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
