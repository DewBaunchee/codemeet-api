export const isPresent = (item: any): boolean => {
    return item !== undefined && item !== null;
}

export const isBlank = (item: any): boolean => {
    return !isPresent(item);
}