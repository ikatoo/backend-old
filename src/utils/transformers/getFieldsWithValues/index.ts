import { toSnakeCase } from "../toSnakeCase";

export const getFieldsWithValues = <T>(page: Partial<T>) => {
  return Object.keys(page).map((field, index) => {
    const data = Object.values(page)[index];
    const stringData = (!!data && typeof data === 'object')
      ? `{"${field}": ${JSON.stringify(data)}}`
      : data;

    return `${toSnakeCase(field)} = '${stringData}'`;
  });
}