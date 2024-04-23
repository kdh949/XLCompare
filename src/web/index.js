const express = require('express');
const path = require('path'); // Import the path module
const { exec } = require('child_process'); 
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));

app.get('/executePythonScript', (req, res) => {
    
    const pythonScriptPath = path.join(__dirname, '../web/views/compare.py');

    exec(`python3 "${pythonScriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing helloworld.py: ${error.message}`);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('Python script executed successfully:', stdout);
        res.send('Python script executed successfully');
    });
});



app.get('/', (req, res) => {
    res.render('index');
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
