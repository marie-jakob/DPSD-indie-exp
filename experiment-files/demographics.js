/*
Contains the standard demographic questions in German.
Questions adapted from Hannah Dames.
 */

let question_demo = {
    type: "survey-html-form",
    preamble: "<div id='Header'>Demographische Angaben</div>" +
        "<div style='text-align: left;'>Im Folgenden bitten wir Sie um einige persönliche Angaben.<br><br>",
    dataAsArray: true,
    html: '<div style="text-align: left"><p> Wie alt sind Sie? <input type="number" ' +
        'min="18" max="70" step="1" id="age" required></input></p>' +
        '<p>Was ist Ihre Muttersprache? <select name = "native" id = "native" required>' +
        '<optgroup>' +
        '<option value=""></option>' +
        '<option value="german">Deutsch</option>' +
        '<option value="english">Englisch</option>' +
        '<option value="other">Andere</option></select>' +
        '</optgroup></p>' +
        '<p>Was ist Ihr Geschlecht? <select name = "gender" id = "gender" required>' +
        '<optgroup>' +
        '<option value=""></option>' +
        '<option value="female">weiblich</option>' +
        '<option value="english">männlich</option>' +
        '<option value="diverse">divers</option>' +
        '<option value="diverse">keine Angabe</option>' +
        '</optgroup></select></p>' +
        '<p>Falls Sie aktuell studieren: <br> Welches Fach studieren Sie? ' +
        '<input type="text" size="30"></input></p></div>',
    button_label: "Weiter",
    autofocus: "age"
}

let question_age = {
    type: "survey-text",
    questions: [
        {
            prompt: "<div id='Header'>Demographische Angaben</div>" +
                "<div style='text-align: left;'>Im Folgenden bitten wir Sie um einige persönliche Angaben.<br><br>" +
                "Wie alt sind Sie? ",
            rows: 1, columns: 20,
            name: "age",
            required: true,
            pattern: "^[0-9q]+$",
            invalid_message: "Bitte geben Sie eine Zahl zwischen 18 und 70 ein."
        },
        /*{
            prompt: "<div style='text-align: left;'>Ist Ihre Muttersprache Deutsch? (J/N)",
            rows: 1, columns: 20,
            name: "native",
            required: true,
            pattern: "JN"
        },
        {
            prompt: "<div style='text-align: left;'>Was ist Ihr Geschlecht? (m/w/d)",
            rows: 1, columns: 20,
            name: "gender",
            required: false,
            pattern: "mwd"
        },*/
        {
            prompt: "<div style='text-align: left;'>Falls Sie aktuell studieren: <br> Welches Fach studieren Sie? ",
            rows: 1, columns: 20,
            name: "subject",
            required: false,
        },
    ],
    button_label: "Weiter"
}


var scale_gender = [
    "männlich",
    "weiblich",
    "divers",
    "keine Angabe"
];

var scale_yes_no = [
    "Ja",
    "Nein"
];

var question_demographic_choice = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "<strong>Was ist Ihr Geschlecht? </strong> ",
            options: scale_gender,
            name: "gender",
            required: true
        },
        {
            prompt: "<strong>Ist deutsch Ihre Muttersprache? </strong>",
            options: scale_yes_no,
            name: "native",
            required: true
        }
    ],
    button_label: "Weiter",
};



// put everything together
let demographics = {
    timeline: [
        question_age,
        question_demographic_choice
        //question_demographic_choice,
        //conditional_education
    ],
    on_start: function() { EXP_PART = 'demographics'}
}



