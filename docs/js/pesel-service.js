define(['moment'], function (moment) {
    'use strict';

    var peselService = {
        generate: function (sex, age, birthdate) {
            console.log('TODO peselService.generate(' + sex + ', ' + age + ', ' + birthdate + ')');
            return sex !== null && (age !== null || birthdate !== null) ? 'TODO' : '';
        },

        parse: function (pesel) {
            console.log('TODO peselServie.parse("' + pesel + '")');
            return {
                sex: 'male',
                age: 18,
                birthdate: moment().subtract(18, 'year').format('YYYY-MM-DD')
            };
        }
    };

    return {
        generate: function (sex, age, birthdate) {
            return peselService.generate(sex, age, birthdate);
        },
        parse: function (pesel) {
            return peselService.parse(pesel);
        }
    };
});