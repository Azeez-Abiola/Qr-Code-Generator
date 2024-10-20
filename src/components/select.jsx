   // src/components/select.jsx
   export function Select({ children, ...props }) {
    return <select {...props}>{children}</select>
  }

  export function SelectTrigger({ children, ...props }) {
    return <div {...props}>{children}</div>
  }

  export function SelectValue({ children, ...props }) {
    return <span {...props}>{children}</span>
  }

  export function SelectContent({ children, ...props }) {
    return <div {...props}>{children}</div>
  }

  export function SelectItem({ children, ...props }) {
    return <option {...props}>{children}</option>
  }
