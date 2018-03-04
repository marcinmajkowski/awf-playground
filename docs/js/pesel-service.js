define([], function () {
    'use strict';

    var peselService = {
        generate: function () {
            console.log('TODO peselService.generate');
        }
    };

    return {
        generate: function(sex, age, birthdate) {
            peselService.generate(sex, age, birthdate);
        }
    };
});