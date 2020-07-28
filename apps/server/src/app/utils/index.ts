export const excelDateToJSDate = (date: number): string => {
  return new Date(Math.round((date - 25569) * 86400 * 1000)).toISOString();
}; 
