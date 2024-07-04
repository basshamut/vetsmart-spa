import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import 'primeflex/primeflex.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Lógica de autenticación
        console.log('Usuario:', username, 'Contraseña:', password);
    };

    return (
        <div className="p-d-flex p-jc-center p-ai-center p-flex-column">
            <Card title="Iniciar Sesión" style={{ width: '25rem' }}>
                <form onSubmit={handleLogin} className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="username">Usuario</label>
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="p-field">
                        <label htmlFor="password">Contraseña</label>
                        <InputText id="password" label="Password" type="password" ></InputText>
                    </div>
                    <Button type="submit" label="Iniciar Sesión" className="p-mt-2" />
                </form>
            </Card>
        </div>
    );
};

export default Login;
