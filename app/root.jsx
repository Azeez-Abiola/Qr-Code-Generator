// app/root.jsx
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
  } from "@remix-run/react";
  
  export default function Root() {
    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          <title>My App</title>
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
  