import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

const buildPath = path.join(process.cwd(), 'dist');

app.use(express.static(buildPath));

app.get('*', (req, res) => {
    const indexPath = path.join(buildPath, 'index.html');
    res.sendFile(indexPath);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});