define([], function () {
    'use strict';

    var peselService = {
        generate: function (sex, age, birthdate) {
            console.log('TODO peselService.generate(' + sex + ', ' + age + ', ' + birthdate + ')');
            return sex !== null && (age !== null || birthdate !== null) ? 'TODO' : '';
        }
    };

    return {
        generate: function(sex, age, birthdate) {
            return peselService.generate(sex, age, birthdate);
        }
    };
});