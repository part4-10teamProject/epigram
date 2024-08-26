export const isEmptyValue = (value: string | []) => {
  if (!value.length) {
    return true;
  }
  return false;
};

export const sanitizeHashTag = (tag: string) => tag.trim().replace(/,/g, '');
