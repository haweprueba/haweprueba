import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar el mensaje de error
        try {
            const response = await api.post('/token', { email, password });
            localStorage.setItem('token', response.data.access_token);
            const userResponse = await api.get('/users/me/');
            const user = userResponse.data;
            if (user.role === 'admin') {
                navigate('/admin');
            } else if (user.role === 'contador') {
                navigate('/contador');
            } else if (user.role === 'colaborador') {
                navigate('/colaborador');
            }
        } catch (error) {
            console.error('Login failed', error);
            setError('El usuario o la contraseña no son correctos.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: '80px', textAlign: 'center' }}>  {/* Ajustar margen superior para evitar superposición */}
                <Typography variant="h4" component="h1" gutterBottom>
                    Bienvenido
                </Typography>
            </Box>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Iniciar Sesión
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
