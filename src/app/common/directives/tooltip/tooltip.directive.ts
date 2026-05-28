/* eslint-disable @angular-eslint/no-input-rename */
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ctTooltip]',
})
export class TooltipDirective {
  tooltipTemplate = input<TemplateRef<unknown> | null>(null, { alias: 'ctTooltipTemplate' });
  delay = input<number>(300, { alias: 'ctTooltipDelay' });

  private el = inject(ElementRef);
  private vcr = inject(ViewContainerRef);

  private overlay = inject(Overlay);
  private overlayRef: OverlayRef | null = null;

  @HostListener('mouseenter') onMouseEnter(): void {
    this.createTooltip();
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.destroyTooltip();
  }

  private createTooltip(): void {
    const strategy = this.overlay
      .position()
      .flexibleConnectedTo(this.el)
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8, // Gap between element and overlay
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy: strategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const portal = new TemplatePortal(this.tooltipTemplate()!, this.vcr);

    this.overlayRef.overlayElement.classList.add('ct-tooltip');
    this.overlayRef.overlayElement.style.setProperty(
      '--ct-tooltip-animation-delay',
      `${this.delay()}ms`,
    );

    this.overlayRef.attach(portal);
  }

  private destroyTooltip(): void {
    if (this.tooltipTemplate()) {
      this.overlayRef?.detach();
      this.overlayRef = null;
    }
  }
}
