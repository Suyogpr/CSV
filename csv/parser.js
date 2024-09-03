const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');

const csvToArray = (csvString) => {
    return parse(csvString, { columns: true, skip_empty_lines: true });
};

const arrayToCsv = (data) => {
    return stringify(data, { header: true });
};

module.exports = {
    csvToArray,
    arrayToCsv,
};
