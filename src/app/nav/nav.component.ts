import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from "@common/components/icon/icon.component";

@Component({
  selector: 'ct-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent, IconComponent],
  // imports: [RouterLink],
})
export class NavComponent {
  // store = inject(Store);
  // navItem = signal({
  //   name: 'Timelines',
  //   type: ViewType.Timelines,
  // });

  // viewType = ViewType;

  // workspaceId = this.store.selectSignal(selectWorkspaceId);

  // private navItems = signal([
  //   ViewType.WorkOrders,
  //   ViewType.WorkCenters,
  //   ViewType.Timelines,
  //   ViewType.People,
  //   ViewType.Sales,
  // ]);

  // private navNames = {
  //   [ViewType.Timelines]: 'Timelines',
  //   [ViewType.WorkOrders]: 'Orders',
  //   [ViewType.WorkCenters]: 'Centers',
  //   [ViewType.People]: 'People',
  //   [ViewType.Sales]: 'Sales',
  // };

  // navLinks = computed(() => {
  //   const items = this.navItems();

  //   return items.map((view) => ({
  //     name: this.navNames[view as ViewType],
  //     url: getViewLinkByType(view, this.workspaceId() as string),
  //     isActive: ViewType.Timelines === view, // TODO: Get active view from store
  //   }));
  // });
}
