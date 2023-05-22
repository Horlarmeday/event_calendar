const CalendarService = require("./calendar.service");
const { flatten } = require('../helper')

class CalendarController {
    static async getCalendarSlots(req, res, next) {
        const { hostUserId } = req.query;

        try {
            const availableSlots = await CalendarService.findAvailableSlots(hostUserId);

            return res.status(200).json({
                name: 'Eng Test User',
                timeslotLengthMin: 60,
                timeslots: flatten(availableSlots),
                availableSlots,
            })
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = CalendarController;