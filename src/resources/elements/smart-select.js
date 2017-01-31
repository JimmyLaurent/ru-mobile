import { bindable } from 'aurelia-framework';
import F7 from '../../services/framework7';

@bindable('label')
@bindable('source')
@bindable('value')
export class SmartSelect {

    constructor() {
        this.f7 = new F7();
    }

    bind() {
      if(this.source && this.source.length > 0) {
        this.value = this.source[0];
        this.valueNameElement.innerHTML = this.source[0].name || this.source[0];
      }
    }

    valueChanged(newValue) {
      if (newValue) {
        this.valueNameElement.innerHTML = newValue.name || newValue;
      }
    }
}
