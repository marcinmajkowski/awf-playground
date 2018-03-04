define(['jquery'], function ($) {
    'use strict';

    var ageInput = {
        init: function (el) {
            var $wrapper = $(el);

            if (!$wrapper.hasClass('js-age-input')) {
                $wrapper.addClass('js-age-input');

                var that = this;

                $wrapper.$ageFormRow = $wrapper.find('.m-form-row:has(.a-textbox)');
                $wrapper.$birthdayFormRow = $wrapper.find('.m-form-row:has(.a-date)');
                $wrapper.$ageInputRadioInput = $wrapper.find('.a-radio__input');

                $wrapper.$ageInputRadioInput.change(function () {
                    that.updateVisibleFormRow($wrapper, this.value);
                });

                that.updateVisibleFormRow($wrapper, $wrapper.$ageInputRadioInput.value);
            }
        },

        updateVisibleFormRow: function ($wrapper, value) {
            $wrapper.$ageFormRow.toggle(value === 'age');
            $wrapper.$birthdayFormRow.toggle(value === 'birthdate');
        }
    };

    return {
        initInstance: function (el) {
            ageInput.init(el);
        }
    }
});