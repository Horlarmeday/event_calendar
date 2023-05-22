const express = require('express');
const path = require('path');
const calendarRoutes = require('./api/calendar/calendar.routes');
const error = require("./middleware/error");

const app = express();
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));

app.use('/api', calendarRoutes);

app.use(error);

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
});

module.exports = app;