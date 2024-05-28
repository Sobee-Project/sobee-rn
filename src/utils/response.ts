export interface BaseResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
