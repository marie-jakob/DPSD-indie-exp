/*
Contains post-experimental questions (e.g., about motivation, understanding of
the instructions, etc.)
Adapted from Hannah Dames.
 */


let questions_understanding = {
    type: 'survey-text',
    questions: [
        {
            prompt: "<p id='Header'>Fragen zur Teilnahme</p>" +
                "<p style='text-align: left;'>Beschreiben Sie bitte, was eine „Typ A“ Erinnerung ist, " +
                "bzw. in welchen Fällen Sie vorhin „A“ geantwortet haben.</p>",
            required: true,
            rows: 3,
            columns: 70,
            custom_warning: "Bitte geben Sie eine Antwort ein."
        },
        {
            prompt: "<p style='text-align: left;'>Beschreiben Sie bitte außerdem, was eine „Typ B“ Erinnerung ist, " +
                "bzw. in welchen Fällen Sie vorhin „B“ geantwortet haben.</p>",
            required: true,
            rows: 3,
            columns: 70,
            custom_warning: "Bitte geben Sie eine Antwort ein."
        },
        {
            prompt: "<p style='text-align: center;'>Was haben Sie danach mit dem Schieberegler angegeben?</p>",
            required: true,
            rows: 3,
            columns: 70,
            custom_warning: "Bitte geben Sie eine Antwort ein."
        },

    ],
    button_label: "Weiter",
}


let scale_yesno = [
    "Ja",
    "Nein"
];



let scale_serious = [
    'Ja, ich habe alle Aufgaben sinnvoll bearbeitet. ' +
    'Meine Angaben können für die Auswertung verwendet werden.',
    'Nein, ich wollte „nur mal gucken“ und möchte nicht, dass meine Angaben ausgewertet werden.'
]

let questions_data = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "<p id='Header'>Fragen zur Teilnahme</p>" +
                "<strong>Konnten Sie das Experiment ohne Störungen durchführen?</strong>",
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


let questions_data_lab = {
    type: 'survey-multi-choice',
    questions: [
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
        questions_understanding,
        questions_data,
        question_comments
    ]
}

let post_exp_questions_lab = {
    timeline: [
        questions_understanding,
        questions_data_lab,
        question_comments
    ]
}