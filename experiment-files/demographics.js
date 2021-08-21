/*
Contains the standard demographic questions in German.
Questions adapted from Hannah Dames.
 */


let questions_demo = {
    type: "survey-text",
    questions: [
        {
            prompt: "<div id='Header'>Demographische Angaben</div>" +
                "<div style='text-align: left;'>Im Folgenden bitten wir Sie um einige persönliche Angaben.<br><br>" +
                "Wie alt sind Sie? ",
            rows: 1, columns: 20,
            name: "age",
            required: true,
            pattern: "^[0-9]+$",
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
        questions_demo,
        question_demographic_choice
        //question_demographic_choice,
        //conditional_education
    ],
    on_start: function() { EXP_PART = 'demographics'}
}

