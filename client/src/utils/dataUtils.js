export const formatDate = (isoDate) => {
    const options = {
        year: 'numeric', month: 'long', day: 'numeric'
    };

    return new Date(isoDate).toLocaleDateString(undefined, options);
};

export const formatDateAndTime = (isoDate) => {
    const options = {
        year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',
        minute: 'numeric', hour12: false
    };

    return new Date(isoDate).toLocaleDateString(undefined, options);
};