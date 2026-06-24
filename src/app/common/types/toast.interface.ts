export interface Toast {
  message: string;
  duration: number;
  type: 'success' | 'error' | 'info';
}
