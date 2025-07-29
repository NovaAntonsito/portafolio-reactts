import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

interface RouterProps {
  children: React.ReactNode;
}

const Router: React.FC<RouterProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={children} />
        <Route path="/#:section" element={children} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;