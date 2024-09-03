const mongoose = require('./db/mongoose');
const { writeToCollection, readFromCollection } = require('./db/operations');
const { csvToArray, arrayToCsv } = require('./csv/parser');
const { readFile, writeFile } = require('./file/fileHandler');
const { recordStatistics } = require('./db/statistics');
const path = require('path');

// Retrieve command and file paths from command-line arguments
const command = process.argv[2];
const filePath = process.argv[3];
const outputPath = process.argv[4];

console.log('Command:', command);
console.log('File Path:', filePath);
console.log('Output Path:', outputPath);

// Validate command-line arguments
if (!command || (command === 'write' && !filePath) || (command === 'read' && (!filePath || !outputPath))) {
    console.error('Invalid command or missing arguments. Use "write <path-to-csv-file>" or "read <collection-name> <csv-path-to-write-to>".');
    process.exit(1);
}

// Function to handle 'write' command
const handleWriteCommand = async (filePath) => {
    try {
        const csvData = await readFile(filePath);
        const jsonData = csvToArray(csvData);
        const collectionName = path.basename(filePath, path.extname(filePath));
        const rowCount = await writeToCollection(collectionName, jsonData);
        await recordStatistics('write', filePath, rowCount);
        console.log(`Successfully wrote ${rowCount} rows to collection ${collectionName}`);
    } catch (error) {
        console.error('Error during write operation:', error);
        throw error;
    }
};

// Function to handle 'read' command
const handleReadCommand = async (collectionName, outputPath) => {
    try {
        const data = await readFromCollection(collectionName);
        if (data.length === 0) {
            console.log('No data to export.');
            return;
        }
        const csvData = arrayToCsv(data);

        await writeFile(outputPath, csvData);

        await recordStatistics('read', outputPath, data.length);
        console.log(`Successfully exported ${data.length} rows from collection ${collectionName} to ${outputPath}`);
    } catch (error) {
        console.error('Error during read operation:', error);
        throw error;
    }
};

// Main function to handle commands
(async () => {
    try {
        console.log(`Starting ${command} operation...`);
        if (command === 'write') {
            await handleWriteCommand(filePath);
        } else if (command === 'read') {
            await handleReadCommand(filePath, outputPath);
        } else {
            console.error('Invalid command. Use "write" or "read".');
            process.exit(1);
        }
    } catch (error) {
        console.error('An error occurred during the operation:', error);
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log('Mongoose connection closed.');
        }
    }
})();

//To run:
//node csv-db.js read users ./users-export.csv
//node csv-db.js write ./users-export.csv