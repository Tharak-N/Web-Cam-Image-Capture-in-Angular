import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h6>Hello {{name}}!</h6>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
}
