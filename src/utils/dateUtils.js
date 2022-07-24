
const dayLength = 1000 * 60 * 60 * 24;

// Функция получения значений текущего года, месяца, даты и дня недели
const getCurrentDayData = () => {
    const currentDateObj = new Date();
    return {
        currentDateObj: currentDateObj,
        currentYear: currentDateObj.getFullYear(),
        currentMonth: currentDateObj.getMonth(),
        currentDate: currentDateObj.getDate(),
        currentWeekDay: currentDateObj.getDay(),
    };
};

const getDottedDateString = (date) => {
    const dateObj = date ? new Date(date) : new Date();
    return `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${dateObj.getFullYear()}`;
}

const getCurrentDateString = (date) => {
    const dateObj = date ? new Date(date) : new Date();
    return `${String(dateObj.getDate()).padStart(2, '0')}.${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
}

const getCurrentWeekMonday = () => {
    const dateObj = new Date();
    const epoch = dateObj.getTime();
    const dayOfWeek = dateObj.getDay() || 7;
    return epoch - (dayOfWeek - 1) * dayLength;
}

const getCurrentWeekAsArray = () => {
    const daysArray = [];
    const monday = getCurrentWeekMonday();
    for (let i = 0; i < 7; i++) {
        daysArray.push(getDottedDateString(monday + i * dayLength));
    }
    return daysArray;
}

const getCurrentWeekAsString = () => {
    const monday = getCurrentWeekMonday();
    const sunday = monday + 7 * dayLength;
    return `${getCurrentDateString(monday)}-${getCurrentDateString(sunday)}`;
}

// Функция получения последнего числа в месяце
const getLastDateOfMonth = (year, month) => {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
};

// Функция получения первого и последнего дня недели в месяце
const getFirstAndLastDaysOfMonth = (year, month) => {
    // первый день месяца
    let dateObj = new Date(year, month, 1);
    const firstWeekDayOfMonth = dateObj.getDay();
    // последний день месяца
    const lastDateOfMonth = getLastDateOfMonth(year, month);
    dateObj = new Date(year, month, lastDateOfMonth);
    const lastWeekDayOfMonth = dateObj.getDay();
    return { firstWeekDayOfMonth, lastWeekDayOfMonth };
};

export {
    getCurrentDayData,
    getCurrentDateString,
    getCurrentWeekAsString,
    getLastDateOfMonth,
    getFirstAndLastDaysOfMonth,
    getCurrentWeekAsArray, 
    getDottedDateString
};