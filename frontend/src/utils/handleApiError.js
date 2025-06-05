export const handleApiErro = (error) => {
  return error?.response?.data?.error || error?.message;
};
