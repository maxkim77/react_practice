import React, { useState } from 'react';
import $ from 'jquery'; // jQuery 가져오기
import axios from 'axios'; // axios 가져오기

const RootPage = () => {
  const [products, setProducts] = useState([]);

  /* XMLHttpRequest (XHR)를 사용하여 API 호출
    직접적인 네트워크 요청을 보낼 수 있는 가장 기본적인 방법입니다.
    대부분의 브라우저에서 지원함
  */
  const handleXHRCall = () => {
    const xhr = new XMLHttpRequest(); // 새로운 XMLHttpRequest 객체 생성
    xhr.open('GET', 'https://dummyjson.com/products', true); // 요청 메서드 mehtod, url, async여부
    //http요청이완료되었을때.
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) { // 성공적인 응답 처리
        const data = JSON.parse(xhr.responseText).products; // 응답 데이터 파싱
        setProducts(data); // 상태 업데이트
      }
    };
    xhr.send(); // 요청 전송
  };

  /*jQuery의 Ajax를 사용하여 API 호출 
    jQuery 라이브러리를 사용하여 네트워크 요청을보냄
    ajax 메서드를 사용하면 간결하게 네트워크 요청을 보낼 수 있음
    내부적으로 XMLHttpRequest(XHR)를 사용하여 비동기 HTTP 요청을 처리
    XML(eXtensible Markup Language)은 데이터를 저장하고 전달하기 위해 설계된 마크업 언어
  */
  const handleAjaxCall = () => {
    $.ajax({
      url: 'https://dummyjson.com/products', // 요청 URL
      method: 'GET', // HTTP 메서드
      success: (response) => { // 성공적인 응답 처리
        setProducts(response.products); // 상태 업데이트
      }
    });
  };

  /* Fetch API를 사용하여 API 호출
  최신 JavaScript 표준인 fetch API를 사용하여 네트워크 요청을 보냅니다.
Promise 기반으로 작동하며, 간단하고 직관적인 사용법을 제공합니다.
JSON 응답을 자동으로 파싱할 수 있습니다.
  */
  const handleFetchAPICall = () => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json()) // 응답 데이터 파싱
      .then(data => {
        setProducts(data.products); // 상태 업데이트
      });
  };


  /* axios를 사용하여 API 호출
    axios 라이브러리를 사용하여 네트워크 요청을 보냅니다.
    요청 및 응답 인터셉터, 요청 취소, 타임아웃 설정 등 강력한 기능을 제공합니다.
  */
  const handleAxiosCall = async () => {
    axios.get('https://dummyjson.com/products')
      .then(response => { // 성공적인 응답 처리
        setProducts(response.data.products); // 상태 업데이트
      })
      // .catch(error => {
      //   console.error('There was an error!', error);
      // });
  };

  return (
    <>
      <button onClick={handleXHRCall}>XHR API Call</button>
      <button onClick={handleAjaxCall}>Ajax API Call</button>
      <button onClick={handleFetchAPICall}>Fetch API Call</button>
      <button onClick={handleAxiosCall}>Axios API Call</button>

      {products.length === 0 ? (
        <div>데이터가 없습니다.</div>
      ) : (
        products.map((v, index) => (
          <div key={index}>
            <h1>{v.title}</h1>
            <p>{v.description}</p>
          </div>
        ))
      )}
    </>
  );
};

export default RootPage;
