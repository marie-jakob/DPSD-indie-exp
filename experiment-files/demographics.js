/*
Contains the standard demographic questions in German.
Questions adapted from Hannah Dames.
 */

let question_demo = {
    type: "survey-html-form",
    preamble: "<div id='Header'>Demographische Angaben</div>" +
        "<div style='text-align: left;'>Im Folgenden bitten wir Sie um einige persönliche Angaben.<br><br>",
    dataAsArray: true,
    html: '<div style="text-align: left"><p> Wie alt sind Sie? <input type="number" min="18" max="70" step="1" id="age"></input></p>' +
        '<p>Was ist Ihre Muttersprache? <select name = "native" id = "native">' +
        '<optgroup>' +
        '<option value="german">Deutsch</option>' +
        '<option value="english">Englisch</option>' +
        '<option value="other">Andere</option></select>' +
        '</optgroup></p>' +
        '<p>Was ist Ihr Geschlecht? <select name = "gender" id = "gender">' +
        '<optgroup>' +
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


// put everything together
let demographics = {
    timeline: [
        question_age,
        //question_demographic_choice,
        //conditional_education
    ],
    on_start: function() { EXP_PART = 'demographics'}
}



