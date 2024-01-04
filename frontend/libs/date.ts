export const today = (): Date => new Date();

export const oneMonthPrior = (date: Date): Date => {
    const newDate = new Date(date.getTime());
    newDate.setMonth(newDate.getMonth() - 1);
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
