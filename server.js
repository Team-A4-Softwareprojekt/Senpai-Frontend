const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware zum Servieren der statischen Dateien
app.use(express.static(path.join(__dirname, 'dist')));

// Route für die index.html im Root-Verzeichnis
app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});