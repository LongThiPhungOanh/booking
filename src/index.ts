import express from 'express';
import { connectDB } from './config/dbConfig';
import { swaggerUi, swaggerSpec } from './config/swaggerConfig';
const app = express();
const port = 3000;

app.use(express.json());

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Sử dụng routes

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
