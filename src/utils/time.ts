export const convertStringToDate = (stringDate: string): Date | null => {
    try {
        let date = new Date(stringDate);
        return date;
    } catch (e) {
        return null;
    }
};
