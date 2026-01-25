import { useState, useEffect } from 'react';

export const useGreeting = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) {
        setGreeting('Selamat pagi, selamat datang di portofolio saya!');
      } else if (hour >= 12 && hour < 16) {
        setGreeting('Selamat siang, selamat datang di portofolio saya!');
      } else if (hour >= 16 && hour < 19) {
        setGreeting('Selamat sore, selamat datang di portofolio saya!');
      } else {
        setGreeting('Selamat malam, selamat datang di portofolio saya!');
      }
    };

    updateGreeting();
    
    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return greeting;
};