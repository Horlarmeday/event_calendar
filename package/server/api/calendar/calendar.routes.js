const express = require('express');
const router = express.Router();
const CalendarController = require("./calendar.controller");

router.get("/calendar", CalendarController.getCalendarSlots);

module.exports = router;