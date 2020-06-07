export type ResponseData = {
  status: boolean;
  error: string;
  data: unknown[];
};

export interface Response {
  setResponse(
    status?: boolean,
    error?: string,
    data?: unknown[],
  ): ResponseData;
}
