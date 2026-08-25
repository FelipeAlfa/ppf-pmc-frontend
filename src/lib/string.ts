export const fromKebabToCamel = (str: string) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

export const fromCamelToKebab = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
