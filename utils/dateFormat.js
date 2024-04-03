const addDateSuffix = (date) => {
    let dateStr = date.toString();

    // Get last character of date string
    const lastChar = dateStr.charAt(dateStr.length - 1);

    if (lastChar === "1" && dateStr !== "11") {
    dateStr = `${dateStr}st`;
    } else if (lastChar === "2" && dateStr !== "12") {
    dateStr = `${dateStr}nd`;
    } else if (lastChar === "3" && dateStr !== "13") {
    dateStr = `${dateStr}rd`;
    } else {
    dateStr = `${dateStr}th`;
    }

    return dateStr;
};

  // Function to format a timestamp 
module.exports = (
    timestamp,
    { monthLength = "short", dateSuffix = true } = {}
) => {
    let months;

    if (monthLength === "short") {
    // Months objects that set each month equal to a position 0-11. 
    // Short name format object
    months = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec",
    };
    } else {
    // Full name format object
    months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
    };
    }

    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];

    let dayOfMonth;

    if (dateSuffix) {
    dayOfMonth = addDateSuffix(dateObj.getDate());
    } else {
    dayOfMonth = dateObj.getDate();
    }

    const year = dateObj.getFullYear();

    let hour;
     // Make sure time is 12hr format
    if (dateObj.getHours > 12) {
    hour = Math.floor(dateObj.getHours() / 2);
    } else {
    hour = dateObj.getHours();
    }
    // If the hour is equal to 0, change it to 12 (12:00AM)
    if (hour === 0) {
    hour = 12;
    }

    const minutes = dateObj.getMinutes();

    // Set `am` or `pm`
    let periodOfDay;

    if (dateObj.getHours() >= 12) {
    periodOfDay = "pm";
    } else {
    periodOfDay = "am";
    }

    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

    return formattedTimeStamp;
};