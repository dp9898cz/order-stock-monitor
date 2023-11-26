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
