module.exports = (context, request, callback) => {
    const internal = () => {
        callback();
    };

    if (/^\./.test(request)) {
        internal();
        return;
    }
    if (/!/.test(request)) {
        internal();
        return;
    }

    callback(null, request);
};
