/*
This file contains the trials used in the experiment.
*/


let word_learning = {
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
};

let empty_slide = {
    type: 'html-keyboard-response',
    stimulus: "",
    choices: jsPsych.NO_KEYS,
    trial_duration: DURATIONS.EMPTY,
}

let word_test = {
    type: 'categorize-html',
    stimulus: function() {
        let word = jsPsych.timelineVariable("word");
        return "<p style='position: relative; text-align: center;" +
            "font-size: 28px; line-height: 1.5'>" +
            word + "</p>";
    },
    choices: [KEYS.REMEMBER, KEYS.KNOW, KEYS.NEW],
    /*prompt: function() {
        return "<div style='overflow: hidden;'>" +
            "<p style='text-align: center; position: absolute; left: 25%;" +
            "font-size: 20px; top: 80%;'>" +
            "R: Remember</p>" +
            "<p style='text-align: center; position: absolute; left: 50%;" +
            "font-size: 20px; top: 80%;'>" +
            "K: Know</p>" +
            "<p style='text-align: center; position: absolute; left:75%;" +
            "font-size: 20px; top: 80%;'>" +
            "N: New </p> </div>";
    },*/
    // we don't actually want to display feedback but we want the promt feature
    // from the categorize-html plugin, hence this weird stuff
    feedback_duration: 0.0000000001,
    show_stim_with_feedback: false,
    correct_text: "",
    incorrect_text: "",
    key_answer: false
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
    slider_start: function() {
        return window.innerWidth * 0.35;
    },
    slider_width: function() {
        return window.innerWidth * 0.7;
    },
    prompt: "<br>" +
        "Please rate the familiarity of the word presented above." +
        "<br> <br>"
}


console.log("trials.js imported successfully.");