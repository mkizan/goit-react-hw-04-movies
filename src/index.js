import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'modern-normalize/modern-normalize.css';
import App from './App';

// const App = lazy(() => import('./App'));

ReactDOM.render(
  <React.StrictMode>
    {/* <Suspense fallback={<p>loading...</p>}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </Suspense> */}
  </React.StrictMode>,
  document.getElementById('root'),
);
