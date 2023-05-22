const moment = require('moment');

const slotAvailable = (fromDate, toDate, calendarEvents) => {
    for (const event of calendarEvents) {
        const eventStart = event.start;
        const eventEnd = event.end;
        if (moment(fromDate).isBetween(eventStart, eventEnd) || moment(toDate).isBetween(eventStart, eventEnd)) {
            return false
        }
    }
    return true;
};

const recommendedSlots = (calendarEvents, allPotentialSlots) => {
    const availableSlots = [];
    for (const time of allPotentialSlots) {
        if (slotAvailable(time.start, time.end, calendarEvents)) {
            availableSlots.push(time)
        }
    }
    return availableSlots;
};

const findAvailableSlots = (params) => {
    const slotDuration = params.slotDuration ?? 60;
    const daysAllowed = [0, 1, 2, 3, 4, 5, 6];
    delete params.slotDuration;

    // Find all slots
    const potentialSlots = [];
    let endDate = moment(params.from).hours(0).minutes(0).seconds(0);
    while (moment(endDate).isBefore(params.to)) {
        const start = endDate;
        const end = moment(start).add(slotDuration, "minutes");
        const now = moment();

        if (
            daysAllowed.includes(moment(start).day()) &&
            daysAllowed.includes(end.day()) &&
            start.isAfter(
                moment(params.from)
                    .hours((params.daily?.from ?? [])[0] ?? 0)
                    .minutes((params.daily?.from ?? [])[1] ?? 0)
                    .seconds((params.daily?.from ?? [])[2] ?? 0)
            ) &&
            end.isBefore(
                moment(params.to)
                    .hours((params.daily?.to ?? [])[0] ?? 0)
                    .minutes((params.daily?.to ?? [])[1] ?? 0)
                    .seconds((params.daily?.to ?? [])[2] ?? 0)
            ) &&
            start.isAfter(now)
        ) {
            const startTime = moment(start);
            const endTime = moment(end);

            let dailyConditionsMet = true;
            if (params.daily)
                if (
                    moment(startTime).isBefore(
                        moment(startTime)
                            .hours((params.daily.from ?? [])[0] ?? 0)
                            .minutes((params.daily.from ?? [])[1] ?? 0)
                            .seconds((params.daily.from ?? [])[2] ?? 0)
                    ) ||
                    moment(endTime).isAfter(
                        moment(endTime)
                            .hours((params.daily.to ?? [])[0] ?? 0)
                            .minutes((params.daily.to ?? [])[1] ?? 0)
                            .seconds((params.daily.to ?? [])[2] ?? 0)
                    )
                )
                    dailyConditionsMet = false;

            if (dailyConditionsMet)
                potentialSlots.push({
                    start: startTime.format('YYYY-MM-DDTHH:mm:ss.SSS'),
                    end: endTime.format('YYYY-MM-DDTHH:mm:ss.SSS'),
                });
        }
        endDate = end;
    }
    if (!potentialSlots.length) return [];
    return recommendedSlots(params.events, potentialSlots);
};

module.exports = findAvailableSlots;