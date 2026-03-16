export class IResponse<T> {
  private constructor(
    public success: boolean,
    public message?: string,
    public data?: T
  ) {}

  public static ok(message?: string): IResponse<void> {
    return new IResponse(true, message);
  }

  public static success<T>(data: T, message?: string): IResponse<T> {
    return new IResponse(true, message, data);
  }

  public static fail(message?: string): IResponse<void> {
    return new IResponse(false, message);
  }

  public static error<T>(message: string, data?: T): IResponse<T> {
    return new IResponse(true, message, data);
  }
}

export interface IServiceResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  erros?: string[] | { $values: string[] } | null;
}
