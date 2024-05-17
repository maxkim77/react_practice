import React, { createContext, useState, useEffect, useContext } from 'react';
import '../assets/Cart.css';

// CartContext 생성
export const CartContext = createContext();

// CartProvider 컴포넌트: CartContext를 제공하는 컴포넌트
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]); // 카트 아이템 상태 변수

    // 컴포넌트가 마운트될 때 로컬 스토리지에서 카트 아이템을 가져와 상태를 설정
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
    }, []);

    // 카트에 상품을 추가하는 함수
    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || []; // 로컬 스토리지에서 카트 정보 가져오기
        const itemIndex = cart.findIndex(item => item.id === product.id); // 동일한 상품 찾기

        if (itemIndex > -1) { // 동일한 상품이 이미 있는 경우 수량 증가
            cart[itemIndex].quantity += 1;
        } else { // 새로운 상품인 경우 카트에 추가
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart)); // 로컬 스토리지에 카트 정보 저장
        setCartItems(cart); // 카트 상태 업데이트
    };

    // 카트에서 상품을 제거하는 함수
    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId); // 제거할 상품을 제외한 새로운 카트 배열 생성
        setCartItems(updatedCart); // 카트 상태 업데이트
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // 업데이트된 카트 정보를 로컬 스토리지에 저장
    };

    // CartContext.Provider로 상태와 함수를 자식 컴포넌트들에게 제공
    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Cart 컴포넌트: 카트 아이템을 보여주는 컴포넌트
const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext); // CartContext에서 상태와 함수 가져오기

    return (
        <div className="cart">
            <h2>🛒 Cart</h2> {/* 장바구니 헤더 */}
            <ul>
                {cartItems.map(item => (
                    <li key={item.id} className="cart-item">
                        <img src={item.thumbnail} alt={item.title} style={{ width: '80px', height: '80px' }} /> {/* 상품 이미지 */}
                        <div>
                            <p>{item.title}</p> {/* 상품 제목 */}
                            <p>Quantity: {item.quantity}</p> {/* 상품 수량 */}
                            <button onClick={() => removeFromCart(item.id)}>Remove</button> {/* 상품 제거 버튼 */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
