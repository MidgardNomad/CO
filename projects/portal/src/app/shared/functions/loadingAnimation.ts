import { ElementRef, Renderer2 as Renderer, inject } from '@angular/core';

export const loadingAnimation = () => {
  const renderer = inject(Renderer);
  return (
    display: 'block' | 'none',
    opacity: 0.8 | 1,
    loadingSpinner: ElementRef,
    form?: ElementRef
  ) => {
    renderer.setStyle(loadingSpinner.nativeElement, 'display', display);
    renderer.setStyle(form.nativeElement, 'opacity', opacity);
  };
};
