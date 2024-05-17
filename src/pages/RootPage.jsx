import React, { useState } from 'react'

const RootPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleClickAPICall = async() => {
      try {
        setIsLoading(true);
        const fetchedData = await 
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((res) => res.products);       
        setProducts([...fetchedData]);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }  
    };
  
  
    return (
    <>
    <button onClick={handleClickAPICall}>GPT API Call</button>
    {products.length === 0 ? (
      <div>데이터가 없습니다.</div>
    ) : (products.map((v, index) => {
      return (<div key={index} >
        <h1>{v.title}</h1>
        <p>{v.description}</p>
      </div>)
    }))}
    
    <div>isLoading :{isLoading ? "loading..":"fin"}</div>
    </>
    );
}

export default RootPage;