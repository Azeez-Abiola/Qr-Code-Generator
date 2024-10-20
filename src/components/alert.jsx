import React from 'react';

export function Alert({ children, variant }) {
  return (
    <div className={`alert ${variant}`}>
      {children}
    </div>
  );
}

export function AlertTitle({ children }) {
  return <h4 className="alert-title">{children}</h4>;
}

export function AlertDescription({ children }) {
  return <p className="alert-description">{children}</p>;
}