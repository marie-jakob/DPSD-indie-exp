/*
Dummy instructions.
 */

let welcome = {
    type: 'html-button-response',
    stimulus:
        '<div class="Instruction"><p id="Header"> Herzlich Willkommen zu dieser Online-Studie der Universität Freiburg!</p>' +
        'In diesem Experiment wollen wir das menschliche Gedächtnis untersuchen. Daher wird es Ihre Aufgabe sein, ' +
        'sich Wörter zu merken, die nacheinander auf dem Bildschirm präsentiert werden. ' +
        'Später werden wir Sie darum bitten, sich an diese Wörter zu erinnern. <br><br>' +
        'Das Experiment wird etwa XXX Minuten dauern. Bitte sorgen Sie dafür, ' +
        'dass Sie das ganze Experiment ohne Unterbrechungen durchführen können. ' +
        'Vermeiden Sie bitte außerdem Ablenkungen jeglicher Art (z.B. durch Fernseher, Musik, Handy, Haustiere etc.). ' +
        'Sie können an dieser Studie nur von einem PC, nicht von einem Tablet oder Smartphone aus teilnehmen. <br><br>' +
        '<em>Wichtig: Bitte schließen Sie das Browser-Fenster während der Studie nicht ' +
        'und laden Sie diese Seite nicht neu! </em><br><br>' +
        'Klicken Sie auf „Weiter“, wenn Sie bereit sind, zu starten.</div>',
    choices: ["Weiter"],
    on_start: function() { EXP_PART = "instr"; }
}


let informed_consent = {
    type: 'html-button-response',
    stimulus: '<div class="Instruction"><p id="Header">Informationen über die Studie</p>' +
        'Bitte lesen Sie sich die folgenden Informationen über die Studie und Ihre Teilnahme sorgfältig durch.<br><br>' +
        '<em>Freiwilligkeit und Anonymität</em><br>' +
        'Die Teilnahme an dieser Studie ist freiwillig. Sie können jederzeit und ' +
        'ohne Angabe von Gründen Ihre Einwilligung zur Teilnahme an der Studie widerrufen, ' +
        'indem Sie das Browser-Fenster schließen.<br><br>' +
        '<em>Umgang mit Ihren Daten</em><br>' +
        'Ihre Daten werden ausschließlich anonymisiert gespeichert. Entsprechend ist ' +
        'nach Abschluss dieser Datenerhebung auch keine gezielte Löschung Ihres ' +
        'persönlichen Datensatzes mehr möglich, da wir Sie diesem nicht zuordnen können. ' +
        'Bitte machen Sie sich bewusst, dass die Ergebnisse der Studie als wissenschaftliche Publikation ' +
        'veröffentlicht werden können.' +
        'Die Daten dieser Studie können zur Gewährleistung von Transparenz in der Wissenschaft ' +
        'für eine Nachnutzung durch Dritte als offene Daten im Internet in einem ' +
        'Datenarchiv zugänglich gemacht werden. Damit folgt diese Studie den ' +
        'Empfehlungen der Deutschen Forschungsgemeinschaft (DFG) und der ' +
        'Deutschen Gesellschaft für Psychologie (DGPs) zur Qualitätssicherung in der Forschung.<br><br>' +
        '<em>Ansprechperson bei Fragen</em><br>' +
        'Wenn sie jetzt oder nach dem Versuch Fragen zu oben genannten Informationen ' +
        'oder allgemein zum Experiment haben, wenden Sie sich bitte an <em>mjakob@cs.uni-freiburg.de.</em><br><br>' +
        'Hiermit versichere ich, dass ich die oben beschriebenen Teilnahmeinformationen verstanden habe ' +
        'und mit den genannten Teilnahmebedingungen einverstanden bin.',
    on_start: function() { EXP_PART = "instr"; },
    choices: ['Ich stimme zu.', 'Ich stimme <strong>nicht</strong> zu.'],
    on_finish: function(data){
        PAUSE = false;
        if (data.button_pressed == 1){
            CONSENT = false;
            jsPsych.endExperiment('As you did not agree to participate under the described ' +
                'conditions,<br> this study ends here.');
        } else {
            CONSENT = true;
        }
    }
};


let info_study = {
    type: 'instructions',
    pages: [
        // page 1: information about the study procedure
        '<div class="Instruction"><p id="Header">Informationen zum Ablauf</p>' +
        'Wie vorhin bereits erwähnt, wollen wir in dieser Studie das menschliche Gedächtnis untersuchen. ' +
        'Daher wird es Ihre Aufgabe sein, sich Wörter zu merken, die nacheinander auf dem Bildschirm präsentiert werden. ' +
        'Später werden wir Sie darum bitten, diese Wörter wiederzuerkennen. <br><br>' +
        'Das Experiment besteht aus <strong>zwei Teilen</strong>, einer Lernphase und einer Testphase; ' +
        'davor und danach werden Ihnen einige Fragen gestellt. Dabei wird Ihnen vor jedem Teil genau erklärt, ' +
        'was Sie erwartet und was Ihre Aufgabe sein wird. Zwischen den beiden Teilen können Sie ' +
        'eine kurze Pause einlegen.<br><br> ' +
        'Zunächst bitten wir Sie, einige demographische Angaben zu machen. ' +
        'Es folgt der erste Teil des Experiments, <strong>die Lernphase</strong>, in der nacheinander ' +
        'auf dem Bildschirm Wörter erscheinen, die Sie sich merken sollen. ' +
        'Bitte benutzen Sie dazu keine externen Hilfsmittel wie Stift und Papier, ' +
        'sondern versuchen Sie, sich die Wörter ohne Unterstützung möglichst gut zu merken. ' +
        'Danach sollen Sie ein paar kurze Rechen-Aufgaben lösen. Anschließend werden Ihnen in Teil zwei, ' +
        'der <strong>Testphase</strong>, wieder nacheinander Wörter gezeigt. Manche der Wörter sind aus der Lernphase, ' +
        'andere sind neu. Ihre Aufgabe wird es sein, für jedes Wort zu entscheiden, ' +
        'ob Sie es bereits in der Lernphase gesehen haben, oder ob das Wort neu ist. ' +
        'Abschließend folgen einige Fragen zu Ihrer Teilnahme und Motivation, danach ist das Experiment beendet. <br><br>' +
        'Insgesamt wird das Experiment etwa <strong>XXX Minuten</strong> dauern.</div>',

        // page 2: general stuff about the participation
        '<div class="""Instruction"><p id="Header">Hinweise zur Durchführung</p>' +
        '<ol>Bevor es richtig losgeht, erhalten Sie hier noch einige Hinweise zur Durchführung der Studie.<br><br>' +
        '<li>Verlassen Sie bitte diese Seite bzw. das Browser-Fenster/den Browser-Tab während des Experiments nicht. ' +
        'Wenn Sie mehr als drei Mal außerhalb der Pausen diese Seite verlassen, ' +
        'wird das Experiment automatisch vorzeitig beendet und Ihre Teilnahme kann nicht über Sona verbucht werden. ' +
        'Eine mehrmalige Teilnahme bzw. Wiederaufnahme des Experiments ist nicht möglich.</li>' +
        '<li>Bitte schalten Sie Ihr Handy aus oder auf stumm und legen Sie es außer Reichweite.</li>' +
        '<li>Falls Sie aktuell im Hintergrund Musik hören oder Videos abspielen, schalten Sie diese bitte aus.</li>' +
        '<li>Schließen Sie diese Seite bitte nicht und laden Sie sie im Verlauf des Experiments nicht neu!</li></ol></div>'
    ],
    show_clickable_nav: true,
    button_label_previous: "Zurück",
    button_label_next: "Weiter",
    on_start: function() { EXP_PART = "instr"; }
}

let instr_learning_LOP = {
    type: 'html-button-response',
    stimulus:
        '<div class="Instruction"><p id="Header">Lernphase</p>' +
        'Nun beginnt die Lernphase des Experiments, ' +
        'in der Sie sich Wörter möglichst gut einprägen sollen. Dafür werden gleich insgesamt ' +
        '100 Wörter nacheinander auf dem Bildschirm erscheinen. Bitte versuchen Sie, ' +
        'sich diese Wörter möglichst gut zu merken. Wie bereits angekündigt, ' +
        'werden wir Sie im darauffolgenden Teil auffordern, sich an diese Wörter zu erinnern. ' +
        'Die Lernphase ist in <strong>vier Blöcke</strong> aufgeteilt, zwischen denen Sie jeweils eine kurze Pause einlegen können. ' +
        'In jedem Block werden insgesamt 25 Begriffe auf dem Bildschirm erscheinen. <br><br>' +
        'Für jedes Wort sollen Sie <strong>eine von zwei Aufgaben ausführen</strong> und Ihre Antwort ' +
        'in das Textfeld unter dem Wort schreiben. Bei der ersten Aufgabe sollen Sie angeben, ' +
        'wie viele Vokale das Wort hat. Bei der zweiten Aufgabe sollen Sie ein Wort in das Textfeld schreiben, ' +
        'das Sie mit dem Wort auf dem Bildschirm assoziieren. ' +
        'Welche Aufgabe Sie jeweils ausführen sollen, wird Ihnen in jedem Durchgang angezeigt.<br><br>' +
        '<em>Bitte benutzen Sie keine Hilfsmittel, wie Papier und Stift, Handy, ' +
        'oder einen Text-Editor auf dem Computer, sondern versuchen Sie, sich die Wörter ' +
        'ohne Hilfsmittel möglichst gut zu merken</em>! Da wir in dieser Studie untersuchen, ' +
        'wie das menschliche Gedächtnis funktioniert, ist dies essentiell. Danke für Ihre Compliance! <br><br>' +
        'Klicken Sie auf „Weiter“, wenn Sie bereit sind, mit dem ersten Block der Lernphase zu beginnen.</div>',
    choices: ["Weiter"],
    on_start: function() { EXP_PART = "instr"; }
}


let instr_learning_strength = {
    type: 'html-button-response',
    stimulus:
        '<div class="Instruction"><p id="Header">Lernphase</p>' +
        'Nun beginnt die Lernphase des Experiments, ' +
        'in der Sie sich Wörter möglichst gut einprägen sollen. Dafür werden gleich insgesamt ' +
        '100 Wörter nacheinander auf dem Bildschirm erscheinen. Manche Wörter erscheinen' +
        'mehrmals, andere nur ein Mal. Bitte versuchen Sie, ' +
        'sich diese Wörter möglichst gut zu merken. Wie bereits angekündigt, ' +
        'werden wir Sie im darauffolgenden Teil auffordern, sich an diese Wörter zu erinnern. ' +
        'Die Lernphase ist in <strong>vier Blöcke</strong> aufgeteilt, zwischen denen Sie jeweils eine kurze Pause einlegen können. ' +
        'In jedem Block werden insgesamt 50 Begriffe auf dem Bildschirm erscheinen. <br><br>' +
        '<em>Bitte benutzen Sie keine Hilfsmittel, wie Papier und Stift, Handy, ' +
        'oder einen Text-Editor auf dem Computer, sondern versuchen Sie, sich die Wörter ' +
        'ohne Hilfsmittel möglichst gut zu merken</em>! Da wir in dieser Studie untersuchen, ' +
        'wie das menschliche Gedächtnis funktioniert, ist dies essentiell. Danke für Ihre Compliance! <br><br>' +
        'Klicken Sie auf „Weiter“, wenn Sie bereit sind, mit dem ersten Block der Lernphase zu beginnen.</div>',
    choices: ["Weiter"],
    on_start: function() { EXP_PART = "instr"; }
}

let instr_break_learn = {
    type: 'html-button-response',
    stimulus:
        '<p id="Header">Pause</p>' +
        '<p style="margin-top: 20% max-width: 85%;">Block 1/4 der Lernphase ist geschafft! ' +
        'Sie können an dieser Stelle eine kurze Pause machen.</p>' +
        '<p>Klicken Sie auf "Weiter", um den nächsten Block zu starten.</p>',
    choices: ["Weiter"],
    on_start: function() { EXP_PART = "instr"; }
}


let instr_calculations = {
    type: 'html-button-response',
    stimulus:
        '<p id="Header">Die Lernphase ist nun geschafft!</p>' +
        '<p style="margin-top: 20% max-width: 85%;">Bevor es mit der Testphase weitergeht, ' +
        'bitten wir Sie, ein paar kurze Rechenaufgaben bearbeiten. </p>' +
        '<p>Wenn Sie bereit sind, mit den Rechenaufgaben zu beginnen, klicken Sie auf „Weiter“.</p>',
    choices: ["Weiter"],
    on_start: function() { EXP_PART = "instr"; }
}

let instr_test = {
    type: 'instructions',
    pages: [
        ////////////////////////////////////////////////////////////////////////
        // General stuff
        '<div class="Instruction"><p id="Header">Testphase</p>' +
        '<p>Im nächsten Teil des Experiments werden Ihnen wieder nacheinander einige Wörter gezeigt. ' +
        'Einen Teil dieser Wörter haben Sie schon in der Lernphase gesehen („alte“ Wörter), ' +
        'den anderen Teil nicht („neue“ Wörter). Wenn Sie ein Wort nicht aus dem ersten Teil des ' +
        'Experiments wiedererkennen, das Wort also Ihrer Einschätzung nach neu ist, ' +
        'antworten Sie bitte „N“. Wenn Sie ein Wort aus dem ersten Teil des Experiments wiedererkennen, ' +
        'entscheiden Sie bitte, ob es sich dabei um eine Typ A oder eine Typ B Erinnerung handelt ' +
        'und antworten Sie entsprechend „A“ oder „B“. Wie genau sich die beiden Erinnerungen unterscheiden, ' +
        'wird Ihnen auf der nächsten Seite erklärt.</p>' +
        '<p>Genau wie die Lernphase ist auch die Testphase in aufgeteilt, zwischen denen Sie ' +
        'jeweils eine kurze Pause machen können. Insgesamt wird es vier Blöcke mit jeweils 50 Wörtern geben.</p></div> ',

        ////////////////////////////////////////////////////////////////////////
        // Type A and B memory
        '<div class="Instruction"><p id="Header">Typ A und B Erinnerungen</p>' +
        '<p><strong>Typ A</strong>: Wenn Sie das Wort wiedererkennen und damit eine bewusste Erinnerung ' +
        'an dessen Vorkommen in der Lernphase einhergeht, antworten Sie bitte „A“: ' +
        'Typ A Erinnerungen sind dadurch charakterisiert, dass Sie sich bewusst ' +
        'einen oder mehrere Aspekte von dem, was während der Präsentation des Wortes ' +
        'in der Lernphase passiert ist bzw. was Sie zu diesem Zeitpunkt gedacht oder erlebt haben, ' +
        'ins Gedächtnis zurückrufen können (z.B. Aspekte in Bezug darauf, wie das Wort aussah, ' +
        'oder etwas, das zu diesem Zeitpunkt irgendwo im Raum passiert ist, ' +
        'oder was Sie während der Präsentation des Wortes gedacht oder gemacht haben). ' +
        'Anders gesagt, eine Typ A Erinnerung sollte Ihnen eine bestimmte Assoziation, ' +
        'ein Bild, etwas Persönlicheres, oder etwas in Bezug auf die Präsentation ' +
        'oder Position des Wortes (also bspw. was vor oder was nach dem Wort präsentiert wurde) ' +
        'aus der Lernphase in Gedächtnis zurückrufen. Antworten Sie also bitte „A“, ' +
        'wenn Sie diese Details, an die Sie sich erinnern, auch konkret angeben könnten, ' +
        'wenn Sie danach gefragt würden.</p>' +
        '<p><strong>Typ B</strong>: Antworten Sie bitte „B“, wenn Sie das Wort aus ' +
        'der Lernphase wiedererkennen, Sie sich aber nicht bewusst an Aspekte erinnern, ' +
        'die während des Lernens dieses Wortes passiert sind oder die Sie währenddessen ' +
        'erlebt oder gedacht haben. Anders gesagt, antworten Sie bitte „B“, wenn Sie das Gefühl haben, ' +
        'das Wort wiederzuerkennen, das Wort aber keine spezifischen, bewussten Erinnerungen ' +
        'aus der Lernphase zurück ins Gedächtnis ruft.</p>' +
        'Auf der nächsten Seite folgen einige Beispiele dazu.</div>',

        ////////////////////////////////////////////////////////////////////////
        // Examples - Type A and B memory
        '<div class="Instruction"><p id="Header">Typ A und B Erinnerungen</p>' +
        '<p>Um die Unterschiede zwischen diesen beiden Antworten bzw. Erinnerungen (also „A“ und „B“) ' +
        'zu verdeutlichen, sind hier ein paar Beispiele: Wenn jemand Sie nach Ihrem Namen fragt, ' +
        'antworten Sie üblicherweise im „Typ B“ Sinne, ohne sich irgendeines bestimmten ' +
        'Ereignisses oder einer bestimmten Erfahrung bewusst zu werden. ' +
        'Wenn Sie jedoch gefragt werden, was der letzte Film war, den Sie gesehen haben, ' +
        'antworten Sie üblicherweise im „Typ A“ Sinne, erinnern sich also bewusst an ' +
        'Aspekte dieser Erfahrung.</p> ' +
        '<p>Ein anderes Beispiel ist das Wiedererkennen einer Person: ' +
        'Wenn Sie eine andere Person sehen und Ihnen einfällt, dass Sie diese Person ' +
        'von der Arbeit kennen und dass Sie sie dort immer in der Kantine sehen, ' +
        'handelt es sich um eine „Typ A“ Erinnerung. Erinnern Sie sich jedoch nicht ' +
        'an so ein Detail, denken aber trotzdem, diese Person wiederzuerkennen, ' +
        'ist das eine „Typ B“ Erinnerung.</p>' +
        '<p>Ein letztes Beispiel: Wenn Sie in der Testphase das Wort „Hund“ sehen ' +
        'und sich erinnern, woran Sie bei der Präsentation gedacht haben ' +
        '(z.B., wie gerne Sie einen Hund hätten) oder was währenddessen passiert ist ' +
        '(z.B., dass kurz davor der Nachbarshund gebellt hat, oder währenddessen Ihre Katze ins Zimmer kam), ' +
        'ist das eine „Typ A“ Erinnerung. Erinnern Sie sich nicht an solche Dinge, ' +
        'haben aber das Gefühl, dass das Wort in der Lernphase präsentiert wurde, ' +
        'ist das eine „Typ B“ Erinnerung.</p>' +
        '<p>Noch einmal zusammengefasst: Antworten Sie für ein Wort „N“ (neu), ' +
        'wenn Sie der Ansicht sind, dieses Wort in der Lernphase nicht gesehen zu haben. ' +
        'Wenn Sie das Wort wiedererkennen und sich bewusst an Details aus der Lernphase ' +
        'in Bezug auf dieses Wort erinnern, antworten Sie bitte „A“. Wenn Sie „A“ geantwortet haben, ' +
        'sollten Sie also dazu in der Lage sein, diese Details aus der Lernphase zu berichten. ' +
        'Antworten Sie „B“, wenn Sie der Ansicht sind, das Wort aus der Lernphase zu kennen, ' +
        'sich aber nicht an solche spezifischen Details, wie Ereignisse oder Gedanken ' +
        'aus der Lernphase erinnern.</p></div>',

        ////////////////////////////////////////////////////////////////////////
        // familiarity rating task
        '<div class="Instruction" style="margin-bottom: 3%"><p id="Header">Testphase</p> ' +
        'Nachdem Sie entschieden haben, ob ein Wort neu ist, oder Sie es als ' +
        'eine Typ A oder Typ B Erinnerung wiedererkennen, folgt eine zweite Aufgabe: ' +
        'Dabei sollen Sie für dasselbe Wort beurteilen, wie vertraut es Ihnen vorkommt. ' +
        'Ihre Antwort geben Sie mithilfe dieses Schiebereglers: </div>' +
        // please ignore this monstrosity (copied from the console, to get the
        // exact slider that is produced by the slider plugin)
        '<div class="jspsych-html-slider-response-container" style="position:relative; ' +
        'margin: 0 auto 3em auto; width:1080px;"><input type="range" class="jspsych-slider" ' +
        'value="500" min="0" max="1000" step="1" id="jspsych-html-slider-response-response">' +
        '</input><div><div style="border: 1px solid transparent; display: inline-block; ' +
        'position: absolute; left:calc(0% - (33.333333333333336% / 2) - -7.5px); ' +
        'text-align: center; width: 33.333333333333336%;"><span style="text-align: center; ' +
        'font-size: 80%;">extremely unvertraut</span></div><div style="border: 1px solid transparent; ' +
        'display: inline-block; position: absolute; left:calc(33.333333333333336% - (33.333333333333336% / 2) - -2.4999999999999996px); ' +
        'text-align: center; width: 33.333333333333336%;"><span style="text-align: center; font-size: 80%;">' +
        'eher unvertraut</span></div><div style="border: 1px solid transparent; ' +
        'display: inline-block; position: absolute; ' +
        'left:calc(66.66666666666667% - (33.333333333333336% / 2) - 2.5000000000000004px); ' +
        'text-align: center; width: 33.333333333333336%;"><span style="text-align: center; ' +
        'font-size: 80%;">eher vertraut</span></div><div style="border: 1px solid transparent; ' +
        'display: inline-block; position: absolute; left:calc(100% - (33.333333333333336% / 2) - 7.5px); ' +
        'text-align: center; width: 33.333333333333336%;"><span style="text-align: center; font-size: 80%;">' +
        'extrem vertraut</span></div></div>' +
        '<div class="Instruction" style="margin-top: 7%"> Bewegen Sie den Schieberegler ' +
        'auf die Stelle der Skala, die Ihrer Ansicht nach angibt, ' +
        'wie vertraut Ihnen das Wort ist. Je weiter nach rechts Sie den Schieberegler einstellen, ' +
        'desto vertrauter kommt Ihnen ein Wort vor. Versuchen Sie, ' +
        'für jedes Wort eine individuelle und möglichst akkurate Einschätzung vorzunehmen.</div>',

        ////////////////////////////////////////////////////////////////////////
        // Recap
        '<div class="Instruction"><p id="Header">Testphase</p>' +
        '<p>Nochmal zusammengefasst: Auf dem Bildschirm werden nun wieder nacheinander ' +
        'XXX Wörter erscheinen. Sie haben nun zwei Aufgaben: </p>' +
        '<ul><li>Für jedes Wort sollen Sie zunächst entscheiden, ob dieses Wort ' +
        '<strong>neu (Antwort „N“)</strong> ist, oder Sie es als <strong>Typ A (Antwort „A“)</strong> ' +
        'oder <strong>Typ B (Antwort „B“)</strong> Erinnerung wiedererkennen. </li>' +
        '<li>Anschließend sollen Sie mit einem Schieberegler angeben, <strong>wie vertraut</strong> ' +
        'Ihnen das Wort vorkommt. </li></ul>' +
        'Insgesamt wird es vier Blöcke geben, zwischen denen Sie jeweils eine kurze Pause machen können.</p>' +
        '<p>Wenn Sie bereit sind, mit der Testphase zu beginnen, klicken Sie auf „Weiter“. </p></div> '
    ],
    show_clickable_nav: true,
    button_label_previous: "Zurück",
    button_label_next: "Weiter",
    on_start: function () {
        EXP_PART = "instr";
    }
}


let instr_end = {
    type: 'html-keyboard-response',
    stimulus:
        '<div class="Instruction"><p id="Header">Das Experiment ist nun beendet. ' +
        'Vielen Dank für Ihre Teilnahme!</p>' +
        'Sie können dieses Fenster nun schließen / Sie werden nun zu Sona weitergeleitet.</div>'
}


// Break slides
function gen_instr_break(learn, block_num) {
    let phase = learn ? "Lernphase" : "Testphase";
    return {
        type: 'html-button-response',
        stimulus:
            '<p id="Header">Pause</p>' +
            '<p style="margin-top: 20% max-width: 85%;">Block ' + block_num +
            '/4 der ' + phase + ' ist geschafft! ' +
            'Sie können an dieser Stelle eine kurze Pause machen.</p>' +
            '<p>Klicken Sie auf "Weiter", um den nächsten Block zu starten.</p>',
        choices: ["Weiter"],
        on_start: function() { EXP_PART = "instr"; }
    }
}

let instr_breaks_learn = [];
let instr_breaks_test = [];
for (let block = 1; block <= 3; block++) {
    instr_breaks_learn.push(gen_instr_break(learn = true, block));
    instr_breaks_test.push(gen_instr_break(learn = false, block));
}



console.log("instructions.js imported successfully.")