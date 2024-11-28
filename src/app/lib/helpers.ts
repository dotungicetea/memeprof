export const serialize = <T extends Record<string, any> | any[]>(data: T) => {
  const serializedData = JSON.stringify(data, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }

    return value;
  });

  return JSON.parse(serializedData);
};
