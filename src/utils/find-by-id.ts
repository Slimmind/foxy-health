export const findById = (data: any, id: string): any => {
  if (data.id === id) {
    return data;
  }

  if (data.steps) {
    for (const step of data.steps) {
      const result = findById(step, id);
      if (result) {
        return result;
      }
    }
  }

  if (data.items) {
    for (const item of data.items) {
      const result = findById(item, id);
      if (result) {
        return result;
      }
    }
  }

  return null;
}