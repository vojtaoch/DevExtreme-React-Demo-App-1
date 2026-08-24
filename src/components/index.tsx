import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from '../App';

export { default as Header } from './header/Header';
export { default as Footer } from './footer/Footer';
export { default as LoginForm } from './login-form/LoginForm';
export { default as ResetPasswordForm } from './reset-password-form/ResetPasswordForm';
export { default as CreateAccountForm } from './create-account-form/CreateAccountForm';
export { default as ChangePasswordForm } from './change-password-form/ChangePasswordForm';
export { default as SideNavigationMenu } from './side-navigation-menu/SideNavigationMenu';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
