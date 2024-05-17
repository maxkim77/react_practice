// HomePage.jsx
import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import '../assets/HomePage.css';

const HomePage = () => {
  const [messagePosition, setMessagePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const fov = 150;
    let canvas, context;
    let dots = [];
    let animationFrameId;

    // 마우스 움직임 이벤트 핸들러
    function handleMouseMove(event) {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setMessagePosition({ x, y });
    }

    // 점 초기화 함수
    function initDots() {
      const dotsCount = window.innerWidth * window.innerHeight / 5000;
      dots = [];
      for (let i = 0; i < dotsCount; i++) {
        const x = Math.random() * window.innerWidth - window.innerWidth / 2;
        const y = Math.random() * window.innerHeight - window.innerHeight / 2;
        const z = Math.random() * window.innerWidth - window.innerWidth / 2;
        dots.push({ x, y, z });
      }
    }

    // 점을 투영하여 2D 좌표로 변환하는 함수
    function project(dot) {
      const scale = fov / (fov + dot.z);
      const x2d = dot.x * scale + window.innerWidth / 2;
      const y2d = dot.y * scale + window.innerHeight / 2;
      return { x: x2d, y: y2d, scale };
    }

    // 캔버스를 렌더링하는 함수
    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(dot => {
        dot.z -= 4;
        if (dot.z < -fov) {
          dot.z += window.innerWidth;
        }
        const { x, y, scale } = project(dot);
        context.fillRect(x, y, scale * 4, scale * 3);
      });
      animationFrameId = requestAnimationFrame(render);
    }

    // 캔버스를 설정하고 초기화하는 함수
    function setupCanvas() {
      canvas = document.querySelector('.canvas');
      context = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.fillStyle = '#FFF';
      context.globalAlpha = 0.8;
      initDots();
      render();
    }

    // debounce 함수: 이벤트 핸들러의 호출 빈도를 줄임
    function debounce(fn, delay) {
      let timeoutId;
      return function (...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
      };
    }

    const debouncedSetupCanvas = debounce(setupCanvas, 200);

    // 이벤트 리스너 설정
    window.addEventListener('resize', debouncedSetupCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    setupCanvas();

    // 클린업 함수: 애니메이션 프레임과 이벤트 리스너를 정리
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', debouncedSetupCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="cover-screen">
      <Menu />
      <canvas className="canvas"></canvas>
      <div className="cover-content">
        {/* <h1>Welcome to My Shopping Mall</h1> */}
        <p style={{ position: 'absolute', top: `${messagePosition.y}%`, left: `${messagePosition.x}%`, transform: 'translate(-50%, -50%)', fontSize: '50px'}}>
          Whatever you want,<br />We have!
          <img src='src/assets/1.png' alt="Logo" className="floating-logo" />
        </p>
      </div>
    </div>
  );
};

export default HomePage;
