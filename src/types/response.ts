export interface IResponse<T> {
  success: boolean;
  message: string | undefined;
  data?: T;
}
