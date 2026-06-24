import { Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastControl } from '@common/types/toast-control.inteface';
import { Toast } from '@common/types/toast.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts$ = new Subject<{
    message: string;
    duration: number;
    type: 'success' | 'error' | 'info';
  }>();

  defaultDuration = 5000;

  _toasts: ToastControl[] = [];

  toasts = signal<ToastControl[]>([]);

  constructor() {
    this.toasts$.pipe(takeUntilDestroyed()).subscribe((toast) => {
      const toastControl = this.createToastControl(toast!);
      this._toasts.push(toastControl);
      this.checkQueue();
    });
  }

  showToast(toast: Toast) {
    this.toasts$.next(toast);
  }

  dismiss(id: number): void {
    const currentToasts = this.toasts();
    const toast = currentToasts.find((t) => t.id === id);
    const remainingToasts = currentToasts.filter((t) => t.id !== id);

    if (toast) {
      toast.dismiss();
    }

    if (this._toasts.length > 0) {
      const nextToast = this._toasts.shift()!;

      this.toasts.set([...remainingToasts, nextToast]);

      nextToast.start();
    } else {
      this.toasts.set(remainingToasts);
    }
  }

  pauseDismissTimer(id: number): void {
    const toast = this.toasts().find((t) => t.id === id);

    if (toast) {
      toast.pause();
    }
  }

  resumeDismissTimer(id: number): void {
    const toast = this.toasts().find((t) => t.id === id);

    if (toast) {
      toast.resume();
    }
  }

  private checkQueue(): void {
    const currentToasts = this.toasts();

    if (currentToasts.length < 3) {
      const nextToast = this._toasts.shift();

      if (nextToast) {
        this.toasts.set([...currentToasts, nextToast]);
        nextToast.start();
      }
    }
  }

  private createToastControl(toast: Toast): ToastControl {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const id = Date.now();
    let remainingDurationWhenPaused = 0;

    const startTimeout = (duration?: number) => {
      timeoutId = setTimeout(() => {
        this.dismiss(id);
      }, duration || toast.duration || this.defaultDuration);
    };

    const clearExistingTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    return {
      id,
      toast,
      start: startTimeout,
      dismiss: clearExistingTimeout,
      pause: () => {
        remainingDurationWhenPaused = timeoutId ? toast.duration - (Date.now() - id) : 0;

        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      },
      resume: () => {
        if (!timeoutId) {
          startTimeout(remainingDurationWhenPaused);
        }
      },
    };
  }
}
