define(['jquery', 'app/pesel-service'], function ($, peselService) {
    'use strict';

    var peselGenerator = {
        init: function (el) {
            var $wrapper = $(el);

            if (!$wrapper.hasClass('js-pesel-generator')) {
                $wrapper.addClass('js-pesel-generator');

                var that = this;

                $wrapper.$peselInput = $wrapper.find('input[name=pesel]');
                $wrapper.$sexRadios = $wrapper.find('input[name=sex]');
                $wrapper.$ageInputMethodRadios = $wrapper.find('input[name=age-input-method]');
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
            var sex = $wrapper.$sexRadios.filter(':checked').val() || null;
            var ageInputMethod = $wrapper.$ageInputMethodRadios.filter(':checked').val() || null;
            var age = ageInputMethod === 'age' ? $wrapper.$ageInput.val() || null : null;
            var birthdate = ageInputMethod === 'birthdate' ? $wrapper.$birthdateInput.val() || null : null;
            var pesel = peselService.generate(sex, age, birthdate);
            $wrapper.$peselInput.val(pesel);
        }
    };

    return {
        initInstance: function (el) {
            peselGenerator.init(el);
        }
    };
});