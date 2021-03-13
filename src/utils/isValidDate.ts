const isValidDate = (birthDate: string): boolean => {
  return birthDate.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};

export { isValidDate };
