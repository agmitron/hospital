async function getData({ sheetId, apiKey, sheetName, sheetNumber = 1 }) {
    const sheetNameStr = sheetName && sheetName !== '' ? encodeURIComponent(sheetName) : `Sheet${sheetNumber}`
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetNameStr}?dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&key=${apiKey}`;
    const resultArray = [];

    const { values } = await fetch(sheetsUrl).then(res => res.ok ? res.json() : Promise.reject('Error in fetch'));
    const titles = values[0];
    for (let i = 1; i < values.length; i++) {
        resultArray.push(values[i].reduce((acc, item, i) => {
            acc[titles[i]] = item;
            return acc;
        }, {}));
    }
    return resultArray;
}

function doFilter(values, filter) {
    // В настоящее время в фильтре может быть только один ключ - значение строка или массив
    // Если массив, то к его элементам применяется условие ИЛИ
    const fieldName = Object.keys(filter)[0];
    //    console.log('filter', typeof filter[fieldName], fieldName);
    if (typeof filter[fieldName] === 'object') {
        return values.filter(item => filter[fieldName].some(filterItem => filterItem === item[fieldName]));
    }
    else {
        return values.filter(item => item[fieldName] === filter[fieldName]);
    }
}

export async function gsheets({ filter, ...options }) {
    const values = await getData(options);
    //    console.log(values, filter);
    return filter ? doFilter(values, filter) : values;
}