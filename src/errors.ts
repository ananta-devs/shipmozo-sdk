export class ShipmozoError extends Error {
  public readonly code?: string;
  public readonly status?: number;
  public readonly data?: any;

  constructor(message: string, code?: string, status?: number, data?: any) {
    super(message);
    this.name = 'ShipmozoError';
    this.code = code;
    this.status = status;
    this.data = data;
    
    // Maintain proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ShipmozoError);
    }
  }
}
