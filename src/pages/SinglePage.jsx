// SinglePage.jsx
import React, { useState, useEffect } from 'react'; // useEffect 추가
import { useParams, Link } from "react-router-dom";

const SinglePage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!res.ok) {
        // throw new Error('Failed to fetch product details');
      }
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      // setError(err.message);  // 에러 메시지를 설정하되 출력하지 않음
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 한 번만 fetchProduct 함수를 호출합니다.
  useEffect(() => {
    fetchProduct();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 호출되도록 함

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.images[0]} alt={product.title} style={{ width: '100%' }} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <Link to="/products" className="blue-button">Go back to Products</Link> {/* 파란색 버튼 스타일을 적용 */}
    </div>
  );
};

export default SinglePage;
