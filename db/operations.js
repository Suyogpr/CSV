const mongoose = require('./mongoose');
const fs = require('fs/promises'); // Using promises-based fs for async/await
const { Parser } = require('json2csv');

// Write data to the specified MongoDB collection
const writeToCollection = async (users, data) => {
    const model = mongoose.model(users, new mongoose.Schema({}, { strict: false }));
    await model.insertMany(data);
    return data.length;
};

// Read data from the specified MongoDB collection and export it to CSV
const readFromCollection = async (collectionName) => {
    try {
        const model = mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }));
        
        // Fetch data as plain JavaScript objects
        const data = await model.find({}).lean();
        
        if (data.length === 0) {
            console.log('No data found in the collection');
            return [];
        }

        return data;
    } catch (error) {
        console.error('Error during read operation:', error);
        throw error;
    }
};


module.exports = {
    writeToCollection,
    readFromCollection,
};
