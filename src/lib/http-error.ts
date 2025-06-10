export interface ApiErrorDetail {
  property?: string;
  message: string;
}

export class HttpError extends Error {
  status: number;
  data: ApiErrorDetail | null;

  constructor(
    message: string,
    status: number,
    data: ApiErrorDetail | null = null
  ) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
