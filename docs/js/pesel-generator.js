define(['jquery', 'app/pesel-service'], function ($, peselService) {
    'use strict';

    var peselGenerator = {
        init: function (el) {
            var $wrapper = $(el);

            if (!$wrapper.hasClass('js-pesel-generator')) {
                $wrapper.addClass('js-pesel-generator');

                $wrapper.find(':input').change(function () {
                    console.log('TODO generate pesel');
                    var sex, age, birthdate;
                    peselService.generate(sex, age, birthdate);
                })
            }
        }
    };

    return {
        initInstance: function (el) {
            peselGenerator.init(el);
        }
    };
});