import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BoardsNew from './routes/boards/new/BoardsNew';
import BoardsDetail from './routes/boards/new/BoardsDetail';

// Router
const pageList = createBrowserRouter([
  { path: '/', element: <App /> }, // 임시로 지정
  { path: '/boards/new', element: <BoardsNew /> },
  { path: '/boards/detail', element: <BoardsDetail /> },
]);

// 화면 표시
const root = ReactDOM.createRoot(
  document.getElementById('root') as ReactDOM.Container,
);
root.render(<RouterProvider router={pageList} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
