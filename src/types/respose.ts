interface APIResponse {
  _metaData: {
    statusCode: number;
    message: string | [];
  };
  data?: {};
  error?: {};
}
