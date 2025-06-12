import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// Left Side Notification Component
const LeftNotification = ({ message, type, isVisible }) => {
  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div
      className={`fixed left-6 top-1/2 -translate-y-1/2 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg transform transition-all duration-500 z-50 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
    >
      <span className="font-medium">{message}</span>
    </div>
  );
};

// Mock RevealOnScroll component for demo
const RevealOnScroll = ({ children }) => (
  <div className="opacity-100 transform translate-y-0 transition-all duration-700">
    {children}
  </div>
);

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: 'success',
  });

  const formRef = useRef();

  const showNotification = (message, type = 'success') => {
    setNotification({ isVisible: true, message, type });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.init({
      publicKey: import.meta.env.EMAILJS_PUBLIC_KEY || 'iAUGS2OIFin09cTNd',
    });

    emailjs
      .sendForm('service_uyxx0qp', 'template_nm6516t', formRef.current)
      .then((result) => {
        alert('Message Sent!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        alert('Oops! Something went wrong. Please try again.');
      });
    // Simulate form submission for demo
    setTimeout(() => {
      showNotification('Message Sent!', 'success');
      setFormData({ name: '', email: '', message: '' });
    }, 500);
  };

  return (
    <>
      <LeftNotification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
      />

      <section
        id="contact"
        className="min-h-screen flex items-center justify-center py-20 bg-slate-900"
      >
        <RevealOnScroll>
          <div className="px-4 w-full min-w-[300px] md:w-[500px] sm:w-2/3 p-6">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
              Get In Touch
            </h2>
            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                  placeholder="Name..."
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                  placeholder="example@gmail.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
                  placeholder="Your Message..."
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              >
                Send Message
              </button>
            </form>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
};
