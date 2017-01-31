import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Popover {
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.source = [];
    let self = this;
    this.eventAggregator.subscribe('popoper:source:init', items => {
        self.items = items;
    });
  }

  handleClick(item) {
      this.eventAggregator.publish('popoper:item:click', item);
    }
}
