export const sendResponse = (res, code, { success, message, error, data }) => {
  const responseBody = {
    success: Boolean(success),
    ...(message && { message }),
    ...(data && { data }),
    ...(error && { error }),
  };
  return res.status(code).json(responseBody);
};



// message !== undefined 
