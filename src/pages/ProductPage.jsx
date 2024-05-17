// ProductPage.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Menu from './Menu';
import Cart, { CartContext } from './Cart';
import Pagination from './Pagination';
import '../assets/HomePage.css';
import '../assets/ProductPage.css';

const ProductPage = () => {
    // 제품, 로딩 상태, 현재 페이지, 총 제품 수를 관리하기 위한 상태 변수
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const productsPerPage = 8; // 페이지당 표시할 제품 수

    // CartContext를 사용하여 addToCart 함수 가져오기
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    // 컴포넌트가 마운트되거나 currentPage가 변경될 때마다 데이터를 가져오기 위한 useEffect 훅
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // 데이터를 가져오는 동안 로딩 상태로 설정
            try {
                const limit = productsPerPage;
                const skip = (currentPage - 1) * productsPerPage;
                const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
                const data = await response.json();
                setProducts(data.products); // 가져온 제품 목록 설정
                setTotalProducts(data.total); // 총 제품 수 설정
            } catch (error) {
                // 오류 발생 시 처리 (현재는 조용히 처리)
            } finally {
                setIsLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
            }
        };
        fetchData();
    }, [currentPage]); // currentPage가 변경될 때마다 fetchData 실행

    // 페이지 번호를 변경하고 URL을 업데이트하는 함수
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`?page=${pageNumber}`);
    };

    return (
        <div className="cover-screen">
            <Menu />
            <Cart />
            <div>
                <div style={{ height: '100px' }}></div>
                <h1>🛍️Products</h1>
                {isLoading ? (
                    <p>Loading...</p> // 로딩 중일 때 표시할 내용
                ) : (
                    <>
                        <ul className="product-list">
                            {products.map(product => (
                                <li key={product.id} className="product-item">
                                    <Link to={`/products/${product.id}`}>
                                        <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: 'auto' }} />
                                        <h3>{product.title}</h3>
                                        <p>{product.description}</p>
                                        <p>Price: ${product.price}</p>
                                    </Link>
                                    <button onClick={() => addToCart(product)}>Add to Cart</button> {/* 장바구니에 추가 버튼 */}
                                </li>
                            ))}
                        </ul>
                        <Pagination
                            currentPage={currentPage}
                            totalProducts={totalProducts}
                            productsPerPage={productsPerPage}
                            paginate={paginate} // 페이지네이션 기능 전달
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
