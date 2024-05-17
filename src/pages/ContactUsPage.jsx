import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import '../assets/ContactUsPage.css'; // CSS 파일 임포트

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState(''); // 성공 메시지 상태 추가

  useEffect(() => {
    // 세션 스토리지에서 데이터 로드
    const savedFormData = sessionStorage.getItem('contactFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    // 폼 데이터가 변경될 때마다 세션 스토리지에 저장
    sessionStorage.setItem('contactFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 데이터를 처리하는 로직 추가 (예: 서버로 전송)
    console.log('Form submitted:', formData);
    // 폼 제출 후 세션 스토리지에서 데이터 제거
    sessionStorage.removeItem('contactFormData');
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    // 성공 메시지 표시
    setSuccessMessage('Your message has been sent successfully!');
    // 5초 후에 성공 메시지 숨기기
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  return (
    <div className="cover-screen">
      <Menu />
      <div className="page flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">📞 Contact Us</h1>
        <div className="contact-form bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
