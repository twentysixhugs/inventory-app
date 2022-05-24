export interface ResponseError {
  status?: number;
  message?: string;
}

export type AsyncFunctionCallback = (
  err?: Error | null | undefined,
  result?: unknown,
) => void;
