export const today = (): Date => new Date();

export const oneMonthPrior = (date: Date): Date => {
    const newDate = new Date(date.getTime());
    const currentMonth = newDate.getMonth();

    if (currentMonth === 0) {
        // If it's January, set the month to December of the previous year
        newDate.setFullYear(newDate.getFullYear() - 1);
        newDate.setMonth(11); // 11 corresponds to December
    } else {
        // For other months, just set the month to the previous month
        newDate.setMonth(currentMonth - 1);
    }
    return newDate;
};

export const formatDate = (date: Date | string | number | undefined): string => {
    if (!date) return "";
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString("cs-CZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};
