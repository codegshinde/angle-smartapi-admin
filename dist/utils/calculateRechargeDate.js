"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "calculateEndDateFromStartDate", {
    enumerable: true,
    get: function() {
        return calculateEndDateFromStartDate;
    }
});
async function calculateEndDateFromStartDate(startDate, duration) {
    // Create a new date object from the start date
    const startDateObj = new Date(startDate);
    // Extract the numeric value from the duration
    const durationValue = parseInt(duration);
    // Calculate the end date based on the duration
    let endDateObj;
    switch(duration){
        case "28D":
            endDateObj = new Date(startDateObj.getTime() + durationValue * 24 * 60 * 60 * 1000);
            break;
        case "84D":
            endDateObj = new Date(startDateObj.getTime() + durationValue * 24 * 60 * 60 * 1000);
            break;
        case "168D":
            endDateObj = new Date(startDateObj.getTime() + durationValue * 24 * 60 * 60 * 1000);
            break;
        case "365D":
            endDateObj = new Date(startDateObj.getFullYear() + 1, startDateObj.getMonth(), startDateObj.getDate());
            break;
        default:
            throw new Error("Invalid duration provided.");
    }
    // Return the end date as a Date object
    return endDateObj;
}
