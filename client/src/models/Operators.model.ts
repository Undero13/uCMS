export interface State {
  operators: Operator[];
}

export interface Operator {
  id: string;
  login: string;
}

export interface OperatorTable {
  value:
    | {
        caption: string;
        headers: string[];
        rows: Operator[];
      }
    | boolean;
}
