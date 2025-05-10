"use client"
import React, { useState, useEffect, ReactNode } from 'react';
import Loader from './Loader';

interface LoadingLayoutProps {
  children: ReactNode;
}

const LoadingLayout: React.FC<LoadingLayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // This simulates the website loading process
    // You can adjust the timeout to match your needs
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Show loader for 2 seconds

    // Alternatively, if i use window.onload to ensure everything is loaded
    // window.onload = () => setLoading(false);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default LoadingLayout;