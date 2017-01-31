import {inject} from 'aurelia-framework';
import F7 from '../services/framework7';

let $ = Dom7;

export class AnimationHelper {

    constructor() {
        this.f7 = new F7();
    }

     animatePages(leftPageName, rightPageName, direction) {

        let leftPage = $('.page[data-page="' + leftPageName + '"]');
        let rightPage = $('.page[data-page="' + rightPageName + '"]');

        // Loading new page
        let removeClasses = 'page-on-center page-on-right page-on-left';
        if (direction === 'to-left') {
            leftPage.removeClass(removeClasses).addClass('page-from-center-to-left');
            rightPage.removeClass(removeClasses).addClass('page-from-right-to-center');

            rightPage.animationEnd(function (e) {
                leftPage.insertBefore(rightPage);
                leftPage.removeClass('page-from-center-to-left page-on-center page-on-right').addClass('page-on-left');
                rightPage.removeClass('page-from-right-to-center page-on-right page-on-left').addClass('page-on-center');
            });
        }
        // Go back
        if (direction === 'to-right') {
            leftPage.removeClass(removeClasses).addClass('page-from-left-to-center');
            rightPage.removeClass(removeClasses).addClass('page-from-center-to-right');
            
            rightPage.animationEnd(function (e) {
                rightPage.insertBefore(leftPage);
                leftPage.removeClass('page-from-left-to-center page-on-center page-on-left').addClass('page-on-center');
                rightPage.removeClass('page-from-center-to-right page-on-right page-on-center').addClass('page-on-right');
            });
        }
    }

}
