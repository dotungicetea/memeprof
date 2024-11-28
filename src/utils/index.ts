export * from "./getters";
export * from "./helpers";

export function isDeepEqual(obj1: any, obj2: any): boolean {
  // Check if both objects are of the same type
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // Handle primitive types and null
  if (obj1 === null || typeof obj1 !== "object") {
    return obj1 === obj2;
  }

  // Check if both objects have the same set of keys
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (
    keys1.length !== keys2.length ||
    !keys1.every((key) => keys2.includes(key))
  ) {
    return false;
  }

  // Recursively check the equality of each property
  for (const key of keys1) {
    if (!isDeepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
