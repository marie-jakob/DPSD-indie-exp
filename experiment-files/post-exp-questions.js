/*
Contains post-experimental questions (e.g., about motivation, understanding of
the instructions, etc.)
Adapted from Hannah Dames.
 */

let scale_yesno = [
    "Ja",
    "Nein"
];


let question_disturbed = {
    type: 'survey-multi-choice',
    questions: [{
        prompt: "<p>Konnten Sie das Experiment ohne Störungen durchführen?</p>",
        options: scale_yesno,
        name: "post_disturbed",
        required: true
    }
    ],
    button_label: "Continue",
    on_start: function() {
        EXP_PART = "post-exp-questions";
        $('body').css('cursor', 'default');
    }
};


let scale_serious = [
    'Ja, ich habe alle Aufgaben sinnvoll bearbeitet. ' +
    'Meine Angaben können für die Auswertung verwendet werden.',
    'Nein, ich wollte „nur mal gucken“ und möchte nicht, dass meine Angaben ausgewertet werden.'
]

let questions_data = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "<strong>Konnten Sie das Experiment ohne Störungen durchführen?</strong>",
            options: scale_yesno,
            name: "post_disturbed",
            required: true
        },
        {
            prompt: "<strong>Können wir Ihre Angaben für die Auswertung verwenden?</strong>",
            options: scale_serious,
            name: "serious_selection",
            required: true
        }
    ],
    button_label: "Weiter",
    on_start: function() { EXP_PART = "post-exp-questions"; },
    scale_width: 400,
    randomize_question_order: false
}

let question_comments = {
    type: 'survey-text',
    questions: [
        {
            prompt: "<p>Möchten Sie uns sonst noch etwas mitteilen?</p>",
            required: false,
            rows: 3,
            columns: 50,
        }
    ],
    button_label: "Weiter",
}

let post_exp_questions = {
    timeline: [
        questions_data,
        question_comments
    ]
}