export interface Ierror {
  status?: number | string;
  data: {
    detail?: string;
    code?: number | string;
    message?: string;
    mobile_number?: string | number;
  };
  message?: string;
  code?: number | string;
  details?: string;
}

export interface LoginResponseTokens {
  refresh: string;
  access: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
