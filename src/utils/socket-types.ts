export interface Message {
  to: string;
  message: string | null;
  type: string;
  component: string;
  endpoint: string;
}
