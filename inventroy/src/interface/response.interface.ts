export interface IResponse<T> {
  status: number;
  message: string;
  response: T | T[];
}
