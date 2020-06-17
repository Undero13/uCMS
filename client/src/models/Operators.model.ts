export interface State {
  operators: Operator[];
  pageCount: number;
}

export interface Operator {
  id: string;
  login: string;
}

export interface OperatorTable {
  value: {
    caption?: string;
    headers?: string[];
    rows?: Operator[];
  };
}

export interface OperatorCreateData {
  email: string;
}

export interface OperatorResponse {
  status: boolean;
  error: string;
}
