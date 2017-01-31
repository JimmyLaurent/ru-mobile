import 'framework7/dist/js/framework7';

let Instance;
export default class F7 {

  constructor() {
    if(!Instance) {
        var notificationTemplate =
        '{{#if custom}}' +
        '<li>{{custom}}</li>' +
        '{{else}}' +
        '<li class="notification-item notification-hidden">' +
            '<div class="item-content">' +
                '{{#if material}}' +
                    '<div class="item-inner">' +
                        '<div class="item-title">{{js "this.message || this.title || this.subtitle"}}</div>' +
                        '{{#if ../button}}{{#button}}' +
                        '<div class="item-after">' +
                            '<a class="button {{#if color}}color-{{color}}{{/if}} {{#js_compare "this.close !== false"}}close-notification{{/js_compare}}">{{text}}</a>' +
                        '</div>' +
                        '{{/button}}{{/if}}' +
                    '</div>' +
                '{{else}}' +
                    '{{#if media}}' +
                    '<div class="item-media">{{media}}</div>' +
                    '{{/if}}' +
                    '<div class="item-inner">' +
                        '<div class="item-title-row">' +
                            '{{#if title}}' +
                            '<div class="item-title">{{title}}</div>' +
                            '{{/if}}' +
                            '{{#if closeIcon}}' +
                            '<div class="item-after"><a class="close-notification"><span></span></a></div>' +
                            '{{/if}}' +
                        '</div>' +
                        '{{#if subtitle}}' +
                        '<div class="item-subtitle">{{subtitle}}</div>' +
                        '{{/if}}' +
                        '{{#if message}}' +
                        '<div class="item-text">{{message}}</div>' +
                        '</div>' +
                    '{{/if}}' +
                '{{/if}}' +
            '</div>' +
        '</li>' +
        '{{/if}}';
      Instance = new Framework7({router: false, material: true, activeState: true, materialRipple: true, notificationTemplate: notificationTemplate});
    }

    return Instance;
  }
}
