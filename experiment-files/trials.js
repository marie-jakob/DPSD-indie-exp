/*
This file contains the trials used in the experiment.
*/


let word_learning_strength = {
    type: 'html-keyboard-response',
    stimulus: function() {
        let word = jsPsych.timelineVariable("word");
        return "<p style='position: relative; " +
            "margin-left: auto; margin-right: auto; text-align: right;" +
            "font-size: 28px; line-height: 1.5'>" +
            word + "</p>";
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: DURATIONS.LEARN,
    on_finish: function(data) {
        write_data(data);
        data.trial_num = TRIAL_IDX;
        TRIAL_IDX++;
        if (TRIAL_IDX == N_STIMULI_LEARN * 2) TRIAL_IDX = 0;
    }
};

let empty_slide = {
    type: 'html-keyboard-response',
    stimulus: "",
    choices: jsPsych.NO_KEYS,
    trial_duration: DURATIONS.EMPTY,
}


let word_learning_LOP = {
    type: 'survey-text',
    // !!! the standard preamble function is overwritten in the customized plugin
    // -> you have to specify the exact html string that is displayed as preamble
    preamble: function() {
        // TODO: this should depend on the LOP condition
        return "<p style='font-size: 18px'>" + "Assoziation" + "<br></p>";
    },
    questions: [
        {prompt: function() {
            // same here -> just add the whole html string and not just the text
            let word = jsPsych.timelineVariable("word");
            return "<p style='font-size: 28px'>" + word + "</p>";
            }, rows: 1, columns: 20},
    ],
    button_label: "Weiter",
    required: true
};


let word_test = {
    type: 'categorize-html',
    stimulus: function() {
        let word = jsPsych.timelineVariable("word");
        return "<p style='position: relative; text-align: center;" +
            "font-size: 28px; line-height: 1.5'>" +
            word + "</p>";
    },
    choices: [KEYS.REMEMBER, KEYS.KNOW, KEYS.NEW],
    prompt: "<div class='Row'>" +
        "<div class='Column'>R: Remember</div>" +
        "<div class='Column'>K: Know</div>" +
        "<div class='Column'>N: New</div>" +
        "</div>",
    // we don't actually want to display feedback but we want the promt feature
    // from the categorize-html plugin, hence this weird stuff
    feedback_duration: 0.0000000001,
    show_stim_with_feedback: false,
    correct_text: "",
    incorrect_text: "",
    key_answer: false,
    on_finish: function(data) {
        write_data(data);
    }
};

let familiarity_slider = {
    type: 'html-slider-response',
    stimulus: function() {
        let word = jsPsych.timelineVariable("word");
        return "<p style='position: relative; text-align: center;" +
            "font-size: 28px; line-height: 1.5'>" +
            word + "</p>" +
            "<br>";
    },
    labels: ["extremely unfamiliar", "moderately unfamiliar",
        "moderately familiar", "extremely familiar"],
    min: 0,
    max: 1000,
    // set slider width dynamically, depending on the size of the browser window
    slider_start: 500,
    slider_width: function() {
        return window.innerWidth * 0.9;
    },
    prompt: "<br>" +
        "Please rate the familiarity of the word presented above." +
        "<br> <br>",
    on_finish: function(data) {
        write_data(data);
        TRIAL_IDX++;
    }
}


console.log("trials.js imported successfully.");