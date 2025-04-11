import express from 'express';
import userContainer from './src/config/user.container.js';
import productosContainer from './src/config/productos.container.js';

const app = express();
app.use(express.json());

// Simulación de base de datos en memoria

app.use('/api/users', userContainer);
app.use('/api/productos', productosContainer);
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
