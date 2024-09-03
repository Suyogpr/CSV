const { csvToArray, arrayToCsv } = require('../csv/parser');

const csvString = `name,address,dob
John Doe,New York,1992-12-03
Jane Doe,Kathmandu,1999-09-30`;

const jsonArray = [
    { name: 'John Doe', address: 'New York', dob: '1992-12-03' },
    { name: 'Jane Doe', address: 'Kathmandu', dob: '1999-09-30' },
];

test('csvToArray converts CSV string to array of objects', () => {
    expect(csvToArray(csvString)).toEqual(jsonArray);
});

test('arrayToCsv converts array of objects to CSV string', () => {
    expect(arrayToCsv(jsonArray).trim()).toEqual(csvString.trim());
});
