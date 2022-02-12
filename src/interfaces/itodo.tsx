export interface iTodo {
  id: number;
  title: string;
  assign: string;
  completed: boolean;
  active: boolean;
}
export interface iAction {
  type: string;
  payload: any;
}
