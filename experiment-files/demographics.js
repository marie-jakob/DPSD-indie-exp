/*
Contains the standard demographic questions in German.
Adapted from Hannah Dames.
 */


let question_age = {
    type: "survey-text",
    questions: [
        {
            prompt: "<div id='Header'>Demographische Angaben</div>" +
                "<div style='text-align: left;'>Im Folgenden bitten wir Sie um einige persönliche Angaben.<br><br>" +
                "Wie alt sind Sie? ",
            rows: 1, columns: 20,
            name: "age",
            required: true
        },
        {
            prompt: "<div style='text-align: left;'>Was ist Ihre Muttersprache? ",
            rows: 1, columns: 20,
            name: "native",
            required: true
        },
        {
            prompt: "<div style='text-align: left;'>Was ist Ihr Geschlecht? ",
            rows: 1, columns: 20,
            name: "gender",
            required: false
        },
        {
            prompt: "<div style='text-align: left;'>Falls Sie aktuell studieren: <br> Welches Fach studieren Sie? ",
            rows: 1, columns: 20,
            name: "subject",
            required: false
        },
    ],
    button_label: "Weiter"
}


let scale_gender = [
    "männlich",
    "weiblich",
    "divers",
    "keine Angabe"
];

let scale_education = ["keine Berufsausbildung",
    "noch in Ausbildung oder Student/in (noch kein Abschluss)",
    "abgeschlossene Lehre oder Meisterbrief",
    "Bachelorabschluss",
    "Masterabschluss",
    "Promotion oder höher",
    "sonstiger beruflicher Ausbildungsstand"
];

let scale_yes_no = [
    "Ja",
    "Nein"
];

let question_demographic_choice = {
    type: 'survey-multi-choice',
    questions: [
        {prompt: "<strong>Geschlecht:</strong> ",
            options: scale_gender,
            name: "gender",
            required: true},
        {prompt: "<strong>Was ist Ihr höchster beruflicher Ausbildungsstand?</strong>",
            options: scale_education,
            name: "education",
            required: true},
        {prompt: "<strong>Befinden Sie sich aktuell in Ausbildung oder studieren Sie?</strong>",
            options: scale_yes_no,
            name: "training",
            required: true},
    ],
    button_label: "Weiter",
    on_finish: function(data) {
        let data_tmp = jsPsych.data.get().values();
        let resp_tmp = data_tmp[data_tmp.length - 1]["response"]["education"];
        console.log("resp tmp: ", resp_tmp);
        if (resp_tmp === 'noch in Ausbildung oder Student/in (noch kein Abschluss)') {
            education_text = true;
        } else {
            education_text = false;
        }
    }
};


let question_demographic_text = {
    type: "survey-text",
    questions: [
        {prompt: '<div style="text-align: left"> Sie haben angegeben, dass Sie sich noch in der Ausbildung befinden oder ' +
                'studieren. </div>' +
                '<div style="margin-bottom: 25px; text-align: left">' +
                'Welche Ausbildung absolvieren Sie aktuell bzw. welches ' +
                'Studienfach studieren Sie?</div>',
            rows: 1, columns: 50,
            name: "education_text",
            required: true},
    ],
    button_label: "Weiter",
}


let conditional_education = {
    timeline: [question_demographic_text],
    conditional_function:   function() {
        return education_text // skip if not selected
    }
}

// put everything together
let demographics = {
    timeline: [
        question_age,
        //question_demographic_choice,
        //conditional_education
    ],
    on_start: function() { EXP_PART = 'demographics'}
}



