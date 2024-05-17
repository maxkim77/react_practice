// ProductPage.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Menu from './Menu';
import Cart, { CartContext } from './Cart';
import Pagination from './Pagination';
import '../assets/HomePage.css';
import '../assets/ProductPage.css';

const ProductPage = () => {
    const [products, setProducts] = useState([]); // 상품 목록 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 상태
    const [totalProducts, setTotalProducts] = useState(0); // 전체 상품 수 상태
    const productsPerPage = 8; // 페이지당 상품 수
    const { addToCart } = useContext(CartContext); // CartContext에서 addToCart 함수 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션 훅
    const location = useLocation(); // 현재 URL의 쿼리 파라미터 가져오기

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search); // URL의 쿼리 파라미터 파싱
        const page = parseInt(queryParams.get('page'), 10) || 1; // 페이지 번호 가져오기
        setCurrentPage(page); // 현재 페이지 상태 설정
    }, []); 
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // 데이터 로딩 시작
            try {
                const limit = productsPerPage; // 페이지당 상품 수 설정
                const skip = (currentPage - 1) * productsPerPage; // 페이지 스킵 설정
                const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`); // 상품 데이터 가져오기
                const data = await response.json(); // JSON 데이터 파싱
                setProducts(data.products); // 상품 목록 상태 설정
                setTotalProducts(data.total); // 전체 상품 수 상태 설정
            } catch (error) {
                // 오류 처리 (현재는 조용히 처리)
            } finally {
                setIsLoading(false); // 데이터 로딩 종료
            }
        };
        fetchData(); // 데이터 가져오기 함수 호출
    }, [currentPage]); // currentPage가 변경될 때마다 실행

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber); // 현재 페이지 상태 업데이트
        navigate(`?page=${pageNumber}`); // URL 쿼리 파라미터 업데이트
    };

    return (
        <div className="cover-screen">
            <Menu />
            <Cart />
            <div>
                <div style={{ height: '100px' }}></div>
                <h1>🛍️Products</h1>
                {isLoading ? (
                    <p>Loading...</p> // 로딩 중일 때 표시
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
                                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                                </li>
                            ))}
                        </ul>
                        <Pagination
                            currentPage={currentPage} // 현재 페이지 번호
                            totalProducts={totalProducts} // 전체 상품 수
                            productsPerPage={productsPerPage} // 페이지당 상품 수
                            paginate={paginate} // 페이지네이션 함수
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
