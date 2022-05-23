export {};

declare global {
  interface ResponseError {
    status?: number;
    message?: string;
  }
}
