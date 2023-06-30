import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Header from './components/header';
import { ToastContainer } from 'react-toastify';

import Register from './pages/auth/register';
import Login from './pages/auth/login';
import { UserProvider } from './contexts/userContext';
import Creator from './pages/creator';
import Topics from './pages/topics';
import CreatorArticles from './pages/creator/articles';
import Trails from './pages/trails';
import Contents from './pages/contents';
import { ArticlePage } from './pages/article';
import Footer from './components/footer';
import User from './pages/creator/user';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topicos" element={<Topics />} />
          <Route path="/trilhas/:id" element={<Trails />} />
          <Route path="/conteudos/:id" element={<Contents />} />
          <Route path="/artigo/:id" element={<ArticlePage />} />
          <Route path="/artigos-criador" element={<CreatorArticles />} />
          <Route path="/criador" element={<Creator />} />
          <Route path="/editar-artigo/:id" element={<Creator />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usuario" element={<User />} />

        </Routes>

        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
