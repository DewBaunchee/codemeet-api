function isPresent(item: any): boolean {
    return item !== undefined && item !== null;
}

function isBlank(item: any): boolean {
    return !isPresent(item);
}