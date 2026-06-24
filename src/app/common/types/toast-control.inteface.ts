import { Toast } from './toast.interface';

export interface ToastControl {
  id: number;
  toast: Toast;
  start: () => void;
  dismiss: () => void;
  pause: () => void;
  resume: () => void;
}
