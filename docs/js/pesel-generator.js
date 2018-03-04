define(['jquery', 'app/pesel-service'], function ($, peselService) {
    'use strict';

    var peselGenerator = {
        init: function (el) {
            var $wrapper = $(el);

            if (!$wrapper.hasClass('js-pesel-generator')) {
                $wrapper.addClass('js-pesel-generator');

                var that = this;

                $wrapper.$peselInput = $wrapper.find('input[name=pesel]');
                $wrapper.$sexInput = $wrapper.find('input[name=sex]');
                $wrapper.$ageInputInput = $wrapper.find('input[name=ageInput]');
                $wrapper.$ageInput = $wrapper.find('input[name=age]');
                $wrapper.$birthdateInput = $wrapper.find('input[name=birthdate]');

                $wrapper
                    .find(':input')
                    .change(function () {
                        that.updatePesel($wrapper);
                    });

                that.updatePesel($wrapper);
            }
        },

        updatePesel: function ($wrapper) {
            console.log('TODO updatePesel');
            var sex, age, birthdate;
            peselService.generate(sex, age, birthdate);
        }
    };

    return {
        initInstance: function (el) {
            peselGenerator.init(el);
        }
    };
});