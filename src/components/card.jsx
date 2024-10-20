      // src/components/card.jsx
      export function Card({ children, className, ...props }) {
        return <div className={`card ${className}`} {...props}>{children}</div>
      }
   
      export function CardHeader({ children, ...props }) {
        return <div className="card-header" {...props}>{children}</div>
      }
   
      export function CardTitle({ children, ...props }) {
        return <h2 className="card-title" {...props}>{children}</h2>
      }
   
      export function CardContent({ children, ...props }) {
        return <div className="card-content" {...props}>{children}</div>
      }
