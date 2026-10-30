import { Component, effect, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { SkeletonLoaderComponent } from '@common/components/skeleton/skeleton-loader.component';
import { User } from '@common/types/user.interface';
import { Store } from '@ngrx/store';
import { debounceTime, Subject, takeWhile, withLatestFrom } from 'rxjs';

@Component({
  selector: 'ct-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  imports: [SkeletonLoaderComponent],
})
export class UsersListComponent {
  store = inject(Store);

  users = input<User[]>([]);

  textSearch = input<string>('');

  isLoadingUsers = input<boolean>(false);

  loadMore = output();

  textSearchChanged = output<string>();

  userClicked = output<string>();

  loadMoreTrigger = viewChild<ElementRef | null>('loadMoreTrigger');

  loadMoreTriggerWatcher: IntersectionObserver | null = null;

  loadMore$ = new Subject<void>();

  isLoadingUsers$ = toObservable(this.isLoadingUsers);

  textSearch$ = new Subject<string>();

  constructor() {
    effect(() => {
      const trigger = this.loadMoreTrigger();

      if (trigger) {
        this.watchLoadMoreTrigger();
      }
    });

    this.loadMore$
      .pipe(
        withLatestFrom(this.isLoadingUsers$),
        takeWhile(([, isLoading]) => !isLoading),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.loadMore.emit();
      });

    this.textSearch$
      .pipe(
        debounceTime(500),
        takeUntilDestroyed(),
      )
      .subscribe((value: string) => {
        this.textSearchChanged.emit(value);
      });
  }

  watchLoadMoreTrigger() {
    if (this.loadMoreTriggerWatcher) {
      this.loadMoreTriggerWatcher.disconnect();
    }

    this.loadMoreTriggerWatcher = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadMore$.next();
        }
      });
    });

    const trigger = this.loadMoreTrigger();

    if (trigger) {
      this.loadMoreTriggerWatcher.observe(trigger.nativeElement);
    }
  }

  onTextSearchChanged(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.textSearch$.next(target.value);
  }

  goToUser(userId: string): void {
    this.userClicked.emit(userId);
  }
}
