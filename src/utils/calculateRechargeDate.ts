export async function calculateEndDateFromStartDate(startDate: Date, duration: "28D" | "84D" | "168D" | "365D") {
  // Create a new date object from the start date
  const startDateObj = new Date(startDate);

  // Extract the numeric value from the duration
  const durationValue = parseInt(duration);

  // Calculate the end date based on the duration
  let endDateObj;
  switch (duration) {
    case "28D": // 28 days
      endDateObj = new Date(startDateObj.getTime() + durationValue * 24 * 60 * 60 * 1000);
      break;
    case "84D": // 84 days
      endDateObj = new Date(startDateObj.getTime() + durationValue * 24 * 60 * 60 * 1000);
      break;
    case "168D": // 168 days
      endDateObj = new Date(startDateObj.getTime() + durationValue * 24 * 60 * 60 * 1000);
      break;
    case "365D": // 365 days
      endDateObj = new Date(startDateObj.getFullYear() + 1, startDateObj.getMonth(), startDateObj.getDate());
      break;
    default:
      throw new Error("Invalid duration provided.");
  }

  // Return the end date as a Date object
  return endDateObj;
}
