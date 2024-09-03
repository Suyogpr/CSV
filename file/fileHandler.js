const fs = require('fs/promises');

const readFile = async (filePath) => {
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        throw error;
    }
};

const writeFile = async (filePath, content) => {
    try {
        await fs.writeFile(filePath, content, 'utf8');
    } catch (error) {
        console.error(`Error writing to file ${filePath}:`, error);
        throw error;
    }
};

module.exports = {
    readFile,
    writeFile,
};
