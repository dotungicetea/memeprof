import { DEFAULT_TAX_PERCENTAGE } from "../app/constants";

export const isEmpty = (obj: any) => {
  if (obj === null || typeof obj !== "object") return false;

  return Object.keys(obj).length === 0;
};

export const noop = () => {};
export const isBrowser = typeof document !== "undefined";

export const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export function genuid() {
  return Math.random().toString(36).substr(2, 9);
}

function flattenMessages(nestedMessages: any, prefix = "") {
  return Object.keys(nestedMessages).reduce<any>((messages, key) => {
    let value = nestedMessages[key];
    let prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
}

export default flattenMessages;

export const calcTotal = (total: number, taxRate = DEFAULT_TAX_PERCENTAGE) => {
  return total + total * (taxRate / 100);
};
