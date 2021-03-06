define(['jquery', 'app/pesel-service'], function ($, peselService) {
    'use strict';

    var model = (function (peselService) {
        var state = {
            pesel: '',
            sex: '',
            ageInputMethod: '',
            age: 18,
            birthdate: ''
        };

        function getPesel() {
            return state.pesel;
        }

        function setPesel(pesel) {
            var parsedPesel = peselService.parse(pesel);
            state.sex = parsedPesel.sex;
            state.age = parsedPesel.age;
            state.birthdate = parsedPesel.birthdate;
        }

        function generatePesel() {
            var age = state.ageInputMethod === 'age' ? state.age : null;
            var birthdate = state.ageInputMethod === 'birthdate' ? state.birthdate : null;
            state.pesel = peselService.generate(state.sex, age, birthdate);
        }

        function getSex() {
            return state.sex;
        }

        function setSex(sex) {
            state.sex = sex;
            generatePesel();
        }

        function getAgeInputMethod() {
            return state.ageInputMethod;
        }

        function setAgeInputMethod(ageInputMethod) {
            state.ageInputMethod = ageInputMethod;
            generatePesel();
        }

        function getAge() {
            return state.age;
        }

        function setAge(age) {
            state.age = age;
            generatePesel();
        }

        function getBirthdate() {
            return state.birthdate;
        }

        function setBirthdate(birthdate) {
            state.birthdate = birthdate;
            generatePesel();
        }

        return {
            getPesel: getPesel,
            setPesel: setPesel,
            generatePesel: generatePesel,
            getSex: getSex,
            setSex: setSex,
            getAgeInputMethod: getAgeInputMethod,
            setAgeInputMethod: setAgeInputMethod,
            getAge: getAge,
            setAge: setAge,
            getBirthdate: getBirthdate,
            setBirthdate: setBirthdate
        };
    })(peselService);

    // TODO render model

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
                    .$peselInput
                    .change(function () {
                        that.updateForm($wrapper);
                    });

                $wrapper.isHandleFormChange = true;

                $()
                    .add($wrapper.$sexRadios)
                    .add($wrapper.$ageInputMethodRadios)
                    .add($wrapper.$ageInput)
                    .add($wrapper.$birthdateInput)
                    .change(function () {
                        if ($wrapper.isHandleFormChange) {
                            that.updatePesel($wrapper);
                        }
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
        },

        updateForm: function ($wrapper) {
            // This is a workaround due to need to trigger change for awf UI to update.
            $wrapper.isHandleFormChange = false;

            var parsedPesel = peselService.parse($wrapper.$peselInput.val());
            this.updateSexRadio($wrapper, parsedPesel.sex);
            $wrapper.$ageInput.val(parsedPesel.age);
            $wrapper.$birthdateInput.val(parsedPesel.birthdate);

            $wrapper.isHandleFormChange = true;
        },

        updateSexRadio: function ($wrapper, sex) {
            $wrapper.$sexRadios.each(function () {
                var $radio = $(this);
                $radio.prop('checked', $radio.val() === sex);
            });
            // FIXME this cause updatePesel call
            // This is required for m-radio-segmented UI update.
            $wrapper.$sexRadios.first().change();
        }
    };

    return {
        initInstance: function (el) {
            peselGenerator.init(el);
        }
    };
});