import React from 'react';
import type { LayoutProps } from '../../../types';
import './Layout.scss';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout__container">
        {children}
      </div>
    </div>
  );
};

export default Layout;