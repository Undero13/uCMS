export type ResponseData = {
  status: boolean;
  error: string;
  data: unknown[];
  pageCount: number;
};

export interface Response {
  setResponse(
    status?: boolean,
    error?: string,
    data?: unknown[],
    pageCount?: number,
  ): ResponseData;
}
