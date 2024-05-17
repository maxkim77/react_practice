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
      // 점의 z축 좌표에 따라 스케일을 계산하여 원근감을 적용함
      const scale = fov / (fov + dot.z);
      // 원근감을 적용한 x좌표를 계산하고, 화면 중앙으로 이동시킴
      const x2d = dot.x * scale + window.innerWidth / 2;
      // 원근감을 적용한 y좌표를 계산하고, 화면 중앙으로 이동시킴
      const y2d = dot.y * scale + window.innerHeight / 2;
      return { x: x2d, y: y2d, scale };
    }

    // 캔버스를 렌더링하는 함수
    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(dot => {
        dot.z -= 4; // 점의 x축좌표를 일정크기만큼 줄여서 앞으로 이동하는 느낌을 줌.
        if (dot.z < -fov) { // 점이 화면을 넘어서면 다시 시작위치로 넘김
          dot.z += window.innerWidth;
        }
        const { x, y, scale } = project(dot); // 좌표의 크기를 계산
        context.fillRect(x, y, scale * 4, scale * 3); // 점을 화면에 그림. 너비와 높이를 scale에 맞춰서 사각형을 그림
      });
      animationFrameId = requestAnimationFrame(render); // 다음 애니메이션 프레임을 요청하여 render함수를 다시호출
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
  let timeoutId; // 마지막으로 설정된 타이머 ID를 저장

  return function (...args) { // 반환된 함수는 여러 인자를 받을 수 있음
    if (timeoutId) clearTimeout(timeoutId); // 이전에 설정된 타이머가 있다면 취소

    // 새로운 타이머를 설정하고, delay 후에 fn을 호출
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

    // 200밀리초동안 추가 이벤트가 발생하지 않으면 setupCanvas를 호출함
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
