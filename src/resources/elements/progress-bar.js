import {customElement, bindable} from 'aurelia-framework';
import F7 from '../../services/framework7';

@bindable('percent')
@customElement('progress-bar')
export class ProgressBar {

    constructor() {
        this.f7 = new F7();
    }
    
    bind() {
        this.updateColor();
        this.f7.setProgressbar(this.element, this.percent, 0);
    }

    percentChanged(newVal) {
        this.updateColor();
        this.f7.setProgressbar(this.element, newVal, 0);
    }

    updateColor() {
        if(this.percent === 100) {
            this.color = 'green';
        }
        else {
            this.color = 'blue';
        }
    }
    
}
