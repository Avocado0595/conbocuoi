/**
 * check is integer or float positive
 */
export const isIntOrFloat = (s: string): boolean => {
    s += '';
    const rgx = /^[0-9]*\.?[0-9]*$/;
    return Boolean(s?.match(rgx));
}

export const isInt = (s: string): boolean => {
    s += '';
    const rgx = /^[0-9]*$/;
    return Boolean(s?.match(rgx));
}