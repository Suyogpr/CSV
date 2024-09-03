const mongoose = require('./mongoose');

const statisticsSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    operation: String,
    file: String,
    rowCount: Number,
});

const Statistics = mongoose.model('Statistics', statisticsSchema);

const recordStatistics = async (operation, file, rowCount) => {
    await Statistics.create({ operation, file, rowCount });
};

module.exports = {
    recordStatistics,
};
