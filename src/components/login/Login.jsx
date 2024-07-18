import {useState} from 'react';
import {useNavigate} from "react-router-dom"; // Asegúrate de crear este archivo y agregarlo al proyecto
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import 'primeflex/primeflex.css';
import './Login.css';

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Lógica de autenticación
        console.log('Usuario:', username, 'Contraseña:', password);
        navigate("/dashboard")
    };

    return (
        <div className="login-container">
            <Card title="Iniciar Sesión" className="login-card">
                <form onSubmit={handleLogin} className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="username">Usuario</label>
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                                   required/>
                    </div>
                    <div className="p-field">
                        <label htmlFor="password">Contraseña</label>
                        <InputText id="password" type="password" value={password}
                                   onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <Button type="submit" label="Iniciar Sesión" className="p-mt-2"/>
                </form>
            </Card>
        </div>
    );
};

export default Login;
