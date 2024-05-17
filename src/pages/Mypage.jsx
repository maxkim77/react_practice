// src/pages/Mypage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from './Menu'; // 필요 시 메뉴 컴포넌트를 import

const Mypage = () => {
  const [username, setUsername] = useState(''); // 사용자 이름 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  useEffect(() => {
    const fetchUserData = async () => {
      // 쿠키에서 authToken 추출
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))
        ?.split('=')[1];

      if (!token) {
        // 토큰이 없으면 로그인 페이지로 리디렉션
        navigate('/login');
        return;
      }

      try {
        // 사용자 데이터 가져오기
        const response = await fetch('https://dummyjson.com/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUsername(data.username); // 사용자 이름 설정
        } else {
          // 실패 시 로그인 페이지로 리디렉션
          navigate('/login');
        }
      } catch (err) {
        // 에러 발생 시 로그인 페이지로 리디렉션
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]); // 컴포넌트가 마운트될 때와 navigate가 변경될 때마다 실행

  const handleLogout = () => {
    // 쿠키에서 토큰 삭제
    document.cookie = 'authToken=; Max-Age=0; path=/';
    // 로그인 페이지로 리디렉션
    navigate('/login');
  };

  return (
    <div>
      <Menu /> {/* 필요 시 메뉴 컴포넌트를 추가 */}
      <h1>Welcome to My Page, {username}</h1> {/* 사용자 이름 표시 */}
      <p>This is your personal page after login.</p>
      <button onClick={handleLogout}>Logout</button> {/* 로그아웃 버튼 */}
    </div>
  );
};

export default Mypage;
