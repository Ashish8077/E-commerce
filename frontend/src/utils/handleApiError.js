export const handleApiError = (error) => {
  return error?.response?.data?.error || error?.message;
};
