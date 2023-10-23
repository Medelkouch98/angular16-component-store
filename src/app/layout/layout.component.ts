import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <div class="h-full w-full">
    <router-outlet />
  </div>`,
})
export class LayoutComponent {}
