const findAvailableSlots = require("./calendar.slots");
const db = require("db");
const moment = require("moment");

class CalendarService {
    static async findAvailableSlots(hostUserId) {
        // Get user events
        const userEvents = await db.calendar.findEventsForUser(hostUserId);
        userEvents.sort((a, b) => new Date(a.start) - new Date(b.start));

        const params = {
            slotDuration: 60,
            from: moment().clone().add(1, 'days').set({ 'h': 0, 'm': 0, 's': 0 }),
            to: moment().clone().add(7, 'days').set({ 'h': 23, 'm': 0, 's': 0 }),
            daily: {
                from: [9],
                to: [17, 0],
            },
            events: userEvents
        };

        return findAvailableSlots(params)
    }
}
module.exports = CalendarService;