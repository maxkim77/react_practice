// src/pages/Menu.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// 메뉴를 표시하는 컴포넌트
const Menu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 관리하는 상태

  // 컴포넌트가 마운트될 때 실행되는 효과
  useEffect(() => {
    // 쿠키에서 인증 토큰을 찾아서 로그인 상태를 결정
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1];

    if (token) {
      setIsLoggedIn(true); // 토큰이 존재하면 로그인 상태로 설정
    }
  }, []);

  return (
    <div className="menu-bar">
      <Link to="/">Home</Link> | {/* 홈으로 이동하는 링크 */}
      <Link to="/products"> Products</Link> | {/* 제품 목록으로 이동하는 링크 */}
      {isLoggedIn ? ( // 로그인 상태에 따라 메뉴 표시
        <Link to="/mypage"> Mypage </Link> // 로그인된 경우 마이페이지로 이동하는 링크
      ) : (
        <Link to="/login"> Login </Link> // 로그인되지 않은 경우 로그인 페이지로 이동하는 링크
      )} | 
      <Link to="/about"> About Us</Link> | {/* 회사 정보 페이지로 이동하는 링크 */}
      <Link to="/contact"> Contact</Link> {/* 연락처 페이지로 이동하는 링크 */}
    </div>
  );
};

export default Menu;
/*
    username: 'kminchelle', // 사용자 이름
    password: '0lelplR', // 비밀번호
*/
