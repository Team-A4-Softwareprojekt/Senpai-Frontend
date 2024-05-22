import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

const buildPath = path.join(__dirname, './dist');

app.use(express.static(buildPath));

app.get('*', (req, res) => {
    const indexPath = path.join(buildPath, 'index.html');
    res.sendFile(indexPath);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

console.log('Build path:', buildPath);