const findAvailableSlots = require('./calendar.slots');
const moment = require('moment');

const userEvents = [
    {
        start: "2022-08-26T10:30:00.000",
        end: "2022-08-26T12:00:00.000"
    },
    {
        start: "2022-08-26T13:00:00.000",
        end: "2022-08-26T15:30:00.000"
    }
];

const expectedAvailableSlots = [
    {
        start: "2022-08-26T12:00:00.000",
        end: "2022-08-26T13:00:00.000"
    },
    {
        start: "2022-08-26T16:00:00.000",
        end: "2022-08-26T17:00:00.000"
    }
];

const params = {
    slotDuration: 60,
    from: new Date("2022-08-26T00:00:00.000"),
    to: new Date("2022-08-26T23:00:00.000"),
    daily: {
        from: [9],
        to: [18, 0],
    },
    events: userEvents
};

describe('Available Slots', function () {
    it('slots should not include hour between 10am and 11am', async function () {
        const slots = findAvailableSlots(params);
        expect(slots).not.toEqual(expect.arrayContaining([
            expect.objectContaining({
                start: "2022-08-26T10:00:00.000",
                end: "2022-08-26T11:00:00.000"
            })
        ]))
    });

    it('slots should not include hour between 13pm and 14pm', async function () {
        const slots = findAvailableSlots(params);
        expect(slots).not.toEqual(expect.arrayContaining([
            expect.objectContaining({
                start: "2022-08-26T13:00:00.000",
                end: "2022-08-26T14:00:00.000"
            })
        ]))
    });

    it('slots should include hour between 13pm - 14pm & 16pm - 17pm', async function () {
        const slots = findAvailableSlots(params);
        expect(slots).toEqual(expectedAvailableSlots)
    });

    it('should return 2 available slots', async function () {
        const slots = findAvailableSlots(params);
        expect(slots).toHaveLength(2)
    });
});