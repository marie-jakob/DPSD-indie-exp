/*
Contains the standard demographic questions in German.
Adapted from Hannah Dames.
 */


let question_age = {
    type: "survey-text",
    questions: [
        {prompt: "<div>Im Folgenden bitten wir Sie um einige persönliche Angaben.</div>" +
                "<br>" + "<br>" + "<br>" +
                "Wie alt sind Sie?",
            rows: 1, columns: 20,
            name: "age",
            required: true
        }
    ],
    button_label: "Weiter"
}


let scale_gender = [
    "männlich",
    "weiblich",
    "divers",
    "keine Angabe"
];

let scale_school = ["kein Schulabschluss",
    "Haupt-/Volksschulabschluss",
    "Mittlere Reife/Realschule/Abschluss der Polytechnischen Oberschule",
    "Fachhochschulreife",
    "Abitur",
    "Sonstiges"
]

let scale_education = ["keine Berufsausbildung",
    "noch in Ausbildung oder Student/in (noch kein Abschluss)",
    "abgeschlossene Lehre oder Meisterbrief",
    "Berufsakademie-, Fachhochschul- oder Universitätsabschluss",
    "Promotion oder höher",
    "sonstiger beruflicher Ausbildungsstand"
]

let question_demographic_choice = {
    type: 'survey-multi-choice',
    questions: [
        {prompt: "<strong>Geschlecht:</strong> ",
            options: scale_gender,
            name: "gender",
            required: true},
        {prompt: "<strong>Was ist der höchste Schulabschluss, den Sie besitzen?</strong>",
            options: scale_school,
            name: "school",
            required: true},
        {prompt: "<strong>Was ist Ihr höchster, beruflicher Ausbildungsstand?</strong>",
            options: scale_education,
            name: "education",
            required: true},
    ],
    button_label: "Weiter",
    on_finish: function(data) {
        // console.log(data.responses.includes('noch in Ausbildung oder Student/in (noch kein Abschluss)'));
        if(data.responses.includes('noch in Ausbildung oder Student/in (noch kein Abschluss)')) {
            education_text = true;
        } else {
            education_text = false;
        }
    }
};


let question_demographic_text = {
    type: "survey-text",
    questions: [
        {prompt: "<div> Sie haben angegeben, dass Sie sich noch in der Ausbildung befinden oder " +
                "studieren. </div>" +
                "<div> Welche Ausbildung absolvieren Sie aktuell bzw. welches " +
                "Studienfach studieren Sie?</div>",
            rows: 10, columns: 80,
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
        question_demographic_choice,
        question_education
    ],
    on_start: function() { EXP_PART = 'demographics'}
}



