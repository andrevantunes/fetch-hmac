export const isNotEmptyObject = (obj: any) => obj && Object.values(obj).filter(value => value !== undefined).length > 0
