import React from 'react';

export function Label({ htmlFor, children }) {
  return <label htmlFor={htmlFor}>{children}</label>;
}