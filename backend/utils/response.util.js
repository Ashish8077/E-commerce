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


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  // .eyJ1c2VySWQiOiI2ODQxMTVlMDAxYjFmZjgyOGYwNjliYjEiLCJpYXQiOjE3NTI0NzI2MzMsImV4cCI6MTc1MjQ3MzUzM30
  // .YFSWw889yc40SQy1xGTLamQC9uv6FX0LWTSsR8Yq7rQ;



  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  //   .eyJ1c2VySWQiOiI2ODQxMTVlMDAxYjFmZjgyOGYwNjliYjEiLCJpYXQiOjE3NTI0NzI2MzMsImV4cCI6MTc1MjQ3MzUzM30
  //   .YFSWw889yc40SQy1xGTLamQC9uv6FX0LWTSsR8Yq7rQ;
