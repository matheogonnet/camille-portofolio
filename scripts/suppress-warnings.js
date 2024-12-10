// Suppress specific deprecation warnings while keeping other warnings active
process.env.NODE_NO_WARNINGS = '1';
const originalEmit = process.emit;

process.emit = function (name, data, ...args) {
    if (
        name === 'warning' &&
        data &&
        data.name === 'DeprecationWarning' &&
        data.message.includes('punycode')
    ) {
        return false;
    }
    return originalEmit.apply(process, [name, data, ...args]);
}; 