$(document).ready(function () {
    $('#validationform').submit(function (e) {
        const nameError = $('#errorName');
        const addressError = $('#errorAddress');
        const dateError = $('#errorDate');
        const ageError = $('#errorAge');
        const genderError = $('#errorGender');
        const termsError = $('#errorTerms');
        let noErrors = true;

        let name = $('#name').val();
        if (name === '') {
            noErrors = false;
            nameError.text('Please enter the name');
        } else {
            nameError.text('');
        }

        let address = $('#address').val();
        if (address === '') {
            noErrors = false;
            addressError.text('Please enter the address');
        } else {
            addressError.text('');
        }

        let date = $('#date').val();
        if (date === '') {
            noErrors = false;
            dateError.text('Please give your D.O.B');
        } else {
            dateError.text('');   
        }

        let age = $('#age').val();
        if (age === '') {
            noErrors = false;
            ageError.text('Please select your age category');
        } else {
            ageError.text('');
        }

        let male = $('#male');
        let female = $('#female');
        if (!male.is(':checked') && !female.is(':checked')) {
            noErrors = false;
            genderError.text('Please select your gender');
        } else {
            genderError.text('');
        }

        let terms = $('#terms');
        if (!terms.is(':checked')) {
            noErrors = false;
            termsError.text('Please agree to the terms');
        } else{
            termsError.text('');   
        }

        if (!noErrors) {
            e.preventDefault();
        }
    });
});
