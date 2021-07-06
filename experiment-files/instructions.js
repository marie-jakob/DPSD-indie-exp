/*
Contains the instructions
 */

let welcome = {
    type: 'html-keyboard-response',
    stimulus:
        '<div class="Instruction"><p id="Header"> Herzlich Willkommen zu dieser Online-Studie der Universität Freiburg!</p>' +
        'In diesem Experiment wollen wir das menschliche Gedächtnis untersuchen. Daher wird es Ihre Aufgabe sein, ' +
        'sich Wörter zu merken, die auf dem Bildschirm präsentiert werden. ' +
        'Später werden wir Sie darum bitten, sich an diese Wörter zu erinnern. <br><br>' +
        'Das Experiment wird etwa 50 Minuten dauern. Bitte sorgen Sie dafür, ' +
        'dass Sie das ganze Experiment ohne Unterbrechungen durchführen können. ' +
        'Vermeiden Sie bitte außerdem Ablenkungen jeglicher Art (z.B. durch Fernseher, Musik, Handy, Haustiere etc.). ' +
        'Sie können an dieser Studie nur von einem PC, nicht von einem Tablet oder Smartphone aus teilnehmen. <br><br>' +
        '<em>Wichtig: Bitte schließen Sie das Browser-Fenster während der Studie nicht ' +
        'und laden Sie diese Seite nicht neu! </em><br><br></div>' +
        'Drücken Sie die Leertaste, wenn Sie bereit sind, zu starten.',  //+
        //'Klicken Sie auf „Weiter“, wenn Sie bereit sind, zu starten.</div>',
    choices: [' '],
    on_start: function() {
        EXP_PART = "instruction";
        PAUSE = true;
    }
}


let informed_consent = {
    type: 'html-button-response',
    stimulus: '<div class="Instruction"><p id="Header">Informationen über die Studie</p>' +
        //'Bitte lesen Sie sich die folgenden Informationen über die Studie und Ihre Teilnahme sorgfältig durch.<br><br>' +
        '<em>Freiwilligkeit und Anonymität</em><br>' +
        'Die Teilnahme an dieser Studie ist freiwillig. Sie können jederzeit und ' +
        'ohne Angabe von Gründen Ihre Einwilligung zur Teilnahme an der Studie widerrufen, ' +
        'indem Sie das Browser-Fenster schließen.<br><br>' +
        '<em>Umgang mit Ihren Daten</em><br>' +
        'Ihre Daten werden ausschließlich anonymisiert gespeichert. Entsprechend ist ' +
        'nach Abschluss dieser Datenerhebung auch keine gezielte Löschung Ihres ' +
        'persönlichen Datensatzes mehr möglich, da wir Sie diesem nicht zuordnen können. ' +
        'Bitte machen Sie sich bewusst, dass die Ergebnisse der Studie als wissenschaftliche Publikation ' +
        'veröffentlicht werden können. ' +
        'Die Daten dieser Studie können zur Gewährleistung von Transparenz in der Wissenschaft ' +
        'für eine Nachnutzung durch Dritte als offene Daten im Internet in einem ' +
        'Datenarchiv zugänglich gemacht werden. Damit folgt diese Studie den ' +
        'Empfehlungen der Deutschen Forschungsgemeinschaft (DFG) und der ' +
        'Deutschen Gesellschaft für Psychologie (DGPs) zur Qualitätssicherung in der Forschung.<br><br>' +
        '<em>Ansprechperson bei Fragen</em><br>' +
        'Wenn sie jetzt oder nach dem Versuch Fragen zu diesen Informationen ' +
        'oder zum Experiment haben, wenden Sie sich bitte an Marie Jakob (<em>mjakob@cs.uni-freiburg.de).</em><br><br>' +
        '<strong>Hiermit versichere ich, dass ich die oben beschriebenen Teilnahmeinformationen verstanden habe ' +
        'und mit den genannten Teilnahmebedingungen einverstanden bin.</strong>',
    on_start: function() { EXP_PART = "consent"; },
    choices: ['Ich stimme <strong>nicht</strong> zu.', 'Ich stimme zu.'],
    on_finish: function(data){
        PAUSE = true;
        // button "Ich stimme nicht zu" was pressed -> consent not given
        if (data.response === 0) {
            CONSENT = false;
            console.log("No consent");
            jsPsych.endExperiment();
        } else {
            console.log("consent given");
            CONSENT = true;
        }
    }
};


let info_study = {
    type: 'instructions',
    pages: [
        // page 1: information about the study procedure
        '<div class="Instruction"><p id="Header">Informationen zum Ablauf</p>' +
        //'Wie vorhin bereits erwähnt, wollen wir in dieser Studie das menschliche Gedächtnis untersuchen. ' +
        //'Daher wird es Ihre Aufgabe sein, sich Wörter zu merken, die nacheinander auf dem Bildschirm präsentiert werden. ' +
        //'Später werden wir Sie darum bitten, diese Wörter wiederzuerkennen. <br><br>' +
        //'Das Experiment besteht aus <strong>zwei Teilen</strong>, einer Lernphase und einer Testphase; ' +
        //'davor und danach werden Ihnen ein paar Fragen gestellt. ' +
        //'Dabei wird Ihnen vor jedem Teil genau erklärt, was Sie erwartet und was Ihre Aufgabe sein wird.
        //'Zwischen den beiden Teilen können Sie eine kurze Pause einlegen.<br><br> ' +
        'Der genaue Ablauf dieser Studie sieht so aus: ' +
        '<ul><li>Zunächst bitten wir Sie, einige <strong>demographische Angaben</strong> zu machen.</li> ' +
        '<li>Es folgt der erste Teil des Experiments, <strong>die Lernphase</strong>, in dem Sie sich einige ' +
        'Wörter merken sollen, die nacheinander auf dem Bildschirm erscheinen.</li>' +
        //'<li>Es folgt der erste Teil des Experiments, <strong>die Lernphase</strong>, in der nacheinander ' +
        //'auf dem Bildschirm Wörter erscheinen, die Sie sich merken sollen. ' +
        //'Bitte benutzen Sie dazu keine externen Hilfsmittel wie Stift und Papier, ' +
        //'sondern versuchen Sie, sich die Wörter ohne Unterstützung möglichst gut zu merken. </li>' +
        '<li>Danach sollen Sie ein paar <strong>kurze Rechenaufgaben</strong> lösen.</li>' +
        '<li>Anschließend werden Ihnen in Teil zwei, ' +
        'der <strong>Testphase</strong>, wieder nacheinander Wörter gezeigt. ' +
        //'Manche der Wörter sind aus der Lernphase, andere sind neu.
        'Sie sollen für jedes Wort zu entscheiden, ' +
        'ob Sie es bereits in der Lernphase gesehen haben, oder ob das Wort neu ist. </li>' +
        '<li>Abschließend folgen einige <strong>Fragen zu Ihrer Teilnahme</strong>,' +
        'danach ist das Experiment beendet. <br><br></li></ul>' +
        'Insgesamt wird das Experiment etwa <strong>XXX Minuten</strong> dauern.</div>',

        // page 2: general stuff about the participation
        '<div class="Instruction"><p id="Header">Hinweise zur Durchführung</p>' +
        '<ol>Bevor es mit der Studie losgeht, erhalten Sie hier noch einige Hinweise zur Durchführung.<br>' +
        '<li><p><strong>Wechseln Sie während des Experiments bitte nicht in ein anderes Browser-Fenster/' +
        'einen anderen Browser-Tab oder ein anderes Programm.</strong> ' +
        'Wenn Sie mehr als drei Mal außerhalb der Pausen diese Seite verlassen, ' +
        'wird das Experiment automatisch vorzeitig beendet und Ihre Teilnahme kann nicht über Sona verbucht werden. ' +
        'Eine mehrmalige Teilnahme bzw. Wiederaufnahme des Experiments ist nicht möglich.</p></li>' +
        '<li>Sie können die <strong>Tabulator-Taste</strong> benutzen, um zwischen den Elementen hin und her zu wechseln und das ' +
        'Experiment so ohne Maus zu bearbeiten.</li>' +
        '<li><p>Bitte schalten Sie Ihr <strong>Handy aus</strong> oder auf stumm und legen Sie es außer Reichweite.</p></li>' +
        '<li><p>Falls Sie aktuell im Hintergrund Musik hören oder Videos abspielen, schalten Sie diese bitte aus.</p></li>' +
        '<li><p><strong>Schließen Sie diese Seite bitte nicht</strong> und laden Sie sie im Verlauf des Experiments nicht neu!</p></li></ol></div>'
    ],
    show_clickable_nav: true,
    // allow_keys: false,
    button_label_previous: "Zurück",
    button_label_next: "Weiter",
    on_start: function() {
        PAUSE = true;
        EXP_PART = "instruction";
    }
}

let instr_learning_LOP = {
    type: 'html-button-response',
    stimulus:
        '<div class="Instruction"><p id="Header">Lernphase</p>' +
        '<p>Nun beginnt die Lernphase des Experiments, ' +
        'in der Sie sich Wörter möglichst gut einprägen sollen. Dafür werden gleich mehrere Wörter nacheinander auf dem Bildschirm erscheinen. ' +
        'Für jedes Wort sollen Sie eine dieser beiden Aufgaben bearbeiten: ' +
        //'Bitte versuchen Sie, ' +
        //'sich diese Wörter möglichst gut zu merken, da Sie sich im nächsten Teil daran erinnern sollen. </p>' +
        //'Wie bereits angekündigt, ' +
        //'werden wir Sie im darauffolgenden Teil auffordern, sich an diese Wörter zu erinnern. ' +
        //'In jedem Block werden insgesamt 25 Begriffe auf dem Bildschirm erscheinen. <br><br>' +

        //'Für jedes Wort sollen Sie <strong>eine von zwei Aufgaben bearbeiten</strong> und Ihre Antwort ' +
        //'in das Textfeld unter dem Wort schreiben.' +
        '<ul><li><span class="shallow-prompt"><strong>Entweder: </strong>Geben Sie an, wie viele Vokale das Wort hat. </span>' +
        '"ä", "ü" und "ö" zählen dabei nicht als Vokale.</li>' +
        //'Bei der ersten Aufgabe sollen Sie angeben, wie viele Vokale das Wort hat.
        '<li><span class="deep-prompt"><strong>Oder: </strong>Geben Sie an, wie angenehm bzw. unangenehm Sie das ' +
        'Wort finden. Geben Sie dafür bitte eine Zahl von 1 bis 6 an wobei 1 \"sehr angenehm\" und 6 \"sehr unangenehm\" bedeutet.</span></li></ul>' +
        //'Bei der zweiten Aufgabe sollen Sie ein Wort in das Textfeld schreiben, das Sie mit dem Wort auf dem Bildschirm assoziieren. ' +

        'Welche Aufgabe Sie jeweils ausführen sollen, wird zu Beginn jedes Durchgangs zusammen ' +
        'mit farblicher Markierung wie oben angezeigt. Danach erscheint das Wort für genau 2 Sekunden. Geben Sie Ihre Antwort bitte ' +
        '<strong>nachdem das Wort wieder verschwunden ist</strong>, indem Sie die entsprechende Taste drücken. ' +
        'Der nächste Durchgang folgt direkt danach.<br>' +
        '<p>Insgesamt wird es <strong>vier Blöcke</strong> geben, zwischen denen Sie jeweils eine kurze Pause machen können. </p>' +
        '<em>Bitte benutzen Sie keine Hilfsmittel, wie Papier und Stift, Handy, ' +
        'oder einen Text-Editor auf dem Computer, sondern versuchen Sie, sich die Wörter ' +
        'ohne Hilfsmittel möglichst gut zu merken!</em> ' +
        'Da wir in dieser Studie das menschliche Gedächtnis untersuchen, ist dies essentiell. ' +
        'Danke für Ihre Kooperationsbereitschaft! <br><br>' +
        'Klicken Sie auf „Weiter“, wenn Sie bereit sind, mit der Lernphase zu beginnen.</div>',
    choices: ["Weiter"],
    on_start: function() {
        PAUSE = true;
        EXP_PART = "instruction";
    }
}


let instr_learning_strength = {
    type: 'html-button-response',
    stimulus:
        '<div class="Instruction"><p id="Header">Lernphase</p>' +
        '<p>Nun beginnt die Lernphase des Experiments, ' +
        'in der Sie sich Wörter möglichst gut einprägen sollen. Dafür werden gleich mehrere ' +
        'Wörter nacheinander auf dem Bildschirm erscheinen. Manche Wörter erscheinen ' +
        'mehrmals, andere nur ein Mal. Bitte versuchen Sie, ' +
        'sich diese Wörter möglichst gut zu merken, da Sie sich im nächsten Teil daran erinnern sollen. </p>' +
        //'Wie bereits angekündigt, werden wir Sie im darauffolgenden Teil auffordern, sich an diese Wörter zu erinnern. ' +
        '<p>Insgesamt wird es <strong>vier Blöcke</strong> geben, zwischen denen Sie jeweils eine kurze Pause machen können. </p>' +
        //'In jedem Block werden insgesamt 50 Begriffe auf dem Bildschirm erscheinen. <br><br>' +
        '<em>Bitte benutzen Sie keine Hilfsmittel, wie Papier und Stift, Handy, ' +
        'oder einen Text-Editor auf dem Computer, sondern versuchen Sie, sich die Wörter ' +
        'ohne Hilfsmittel möglichst gut zu merken!</em> ' +
        'Da wir in dieser Studie das menschliche Gedächtnis untersuchen, ist dies essentiell. ' +
        'Danke für Ihre Kooperationsbereitschaft! <br><br>' +
        'Klicken Sie auf „Weiter“, wenn Sie bereit sind, mit der Lernphase zu beginnen.</div>',
    choices: ["Weiter"],
    on_start: function() { EXP_PART = "instruction"; }
}

let instr_break_learn = {
    type: 'html-button-response',
    stimulus:
        '<p id="Header">Pause</p>' +
        '<p style="margin-top: 20%; max-width: 85%;">Block 1/4 der Lernphase ist geschafft! ' +
        'Sie können an dieser Stelle eine kurze Pause machen.</p>' +
        '<p>Klicken Sie auf "Weiter", um den nächsten Block zu starten.</p>',
    choices: ["Weiter"],
    on_start: function() {
        PAUSE = true;
        EXP_PART = "instruction";
    }
}


let instr_calculations = {
    type: 'html-button-response',
    stimulus:
        '<p id="Header">Die Lernphase ist nun geschafft!</p>' +
        '<p class="Instruction">Bevor es mit der Testphase weitergeht, ' +
        'bitten wir Sie, drei kurze Rechenaufgaben zu lösen. Die Aufgaben werden ' +
        'nacheinander auf dem Bildschirm erscheinen. Wenn Sie die <em>richtige</em> Antwort eingeben, ' +
        'gelangen Sie direkt zur nächsten Aufgabe.</p>' +
        '<p class="Instruction">Wenn Sie bereit sind, mit den Rechenaufgaben zu beginnen, klicken Sie auf „Weiter“.</p>',
    choices: ["Weiter"],
    on_start: function() {
        PAUSE = true;
        EXP_PART = "instruction";
    }
}

let instr_test = {
    type: 'instructions',
    pages: [
        ////////////////////////////////////////////////////////////////////////
        // General stuff
        '<div class="Instruction"><p id="Header">Testphase</p>' +
        '<p>Im nächsten Teil werden Ihnen wieder nacheinander einige Wörter gezeigt. ' +
        'Einen Teil dieser Wörter haben Sie schon in der Lernphase gesehen („alte“ Wörter), ' +
        'den anderen Teil nicht („neue“ Wörter). ' +
        '<ul><li>Wenn Sie ein Wort aus der Lernphase <strong>nicht</strong> wiedererkennen, das Wort also Ihrer Einschätzung nach neu ist, ' +
        'antworten Sie bitte „N“. </li>' +
        '<li>Wenn Sie ein Wort aus der Lernphase wiedererkennen, ' +
        'entscheiden Sie bitte, ob es sich dabei um eine Typ A oder eine Typ B Erinnerung handelt ' +
        'und antworten Sie entsprechend „A“ oder „B“. </li></ul>' +
        'Wie genau sich die beiden Erinnerungen unterscheiden, ' +
        'wird Ihnen auf der nächsten Seite erklärt.</p></div>',
        //'<p>Auch die Testphase ist in Blöcke aufgeteilt, zwischen denen Sie ' +
        //'jeweils eine kurze Pause machen können. Insgesamt wird es vier Blöcke ' +
        //'mit jeweils 50 Wörtern geben.</p></div> ',

        ////////////////////////////////////////////////////////////////////////
        // Type A and B memory
        '<div class="Instruction"><p id="Header">Typ A und B Erinnerungen</p>' +
        '<p><strong>Typ A</strong>: Wenn Sie das Wort wiedererkennen und damit <em>eine bewusste Erinnerung ' +
        'an dessen Vorkommen in der Lernphase</em> einhergeht, antworten Sie bitte „A“: ' +
        'Typ A Erinnerungen sind dadurch gekennzeichnet, dass Sie sich bewusst ' +
        'etwas, was während der Präsentation des Wortes ' +
        'in der Lernphase passiert ist, ' +
        //'bzw. was Sie zu diesem Zeitpunkt gedacht oder erlebt haben, ' +
        'ins Gedächtnis zurückrufen können. Das können zum Beispiel sein: ' +
        '<ul><li>Aspekte in Bezug darauf, wie das Wort aussah,</li>' +
        '<li>etwas, das zu diesem Zeitpunkt irgendwo im Raum, draußen etc. passiert ist, </li>' +
        '<li>was Sie während der Präsentation des Wortes gedacht oder gemacht haben, </li>' +
        '<li>wann das Wort präsentiert wurde (z.B. als erstes Wort im zweiten Block), </li>' +
        '<li>oder eine andere Erinnerung dieser Art.</li></ul>' +
        // '(z.B. Aspekte in Bezug darauf, wie das Wort aussah, ' +
        //'oder etwas, das zu diesem Zeitpunkt irgendwo im Raum passiert ist, ' +
        //'oder was Sie während der Präsentation des Wortes gedacht oder gemacht haben). ' +
        'Anders gesagt, eine Typ A Erinnerung sollte Ihnen eine bestimmte Assoziation, ' +
        'ein Bild, etwas Persönliches, oder etwas in Bezug auf die Präsentation ' +
        'des Wortes (also bspw. was vor oder was nach dem Wort präsentiert wurde) ' +
        'aus der Lernphase ins Gedächtnis zurückrufen. Antworten Sie also bitte „A“, ' +
        'wenn Sie diese Details, an die Sie sich erinnern, <em>auch konkret angeben könnten,</em> ' +
        'wenn Sie danach gefragt würden.</p>' +
        '<p><strong>Typ B</strong>: Antworten Sie bitte „B“, wenn Sie das Wort aus ' +
        'der Lernphase wiedererkennen, Sie sich aber <strong>nicht</strong> bewusst an Aspekte erinnern, ' +
        'die während des Lernens dieses Wortes passiert sind oder die Sie währenddessen ' +
        'erlebt oder gedacht haben. Anders gesagt, antworten Sie bitte „B“, wenn Sie <em>das Gefühl haben, ' +
        'das Wort wiederzuerkennen</em>, es aber keine spezifischen Erinnerungen ' +
        'aus der Lernphase zurück ins Gedächtnis ruft.</p></div>',
        //'Auf der nächsten Seite folgen einige Beispiele dazu.</div>',

        ////////////////////////////////////////////////////////////////////////
        // Examples - Type A and B memory
        '<div class="Instruction"><p id="Header">Typ A und B Erinnerungen</p>' +
        'Um die Unterschiede zwischen Typ A und Typ B Erinnerungen ' +
        // '<p>Um die Unterschiede zwischen diesen beiden Antworten bzw. Erinnerungen (also „A“ und „B“) ' +
        'zu verdeutlichen, sind hier ein paar Beispiele: <br>' +
        //'<ul><li>Wenn jemand Sie nach Ihrem Namen fragt, ' +
        //'antworten Sie üblicherweise im „Typ B“ Sinne, ohne sich irgendeines bestimmten ' +
        //'Ereignisses oder einer bestimmten Erfahrung bewusst zu werden. ' +
        //'Wenn Sie jedoch gefragt werden, was der letzte Film war, den Sie gesehen haben, ' +
        //'antworten Sie üblicherweise im „Typ A“ Sinne, erinnern sich also bewusst an ' +
        //'Aspekte dieser Erfahrung.</li><br>' +
        '<ul><li>Wenn Sie eine andere Person sehen und Ihnen einfällt, dass Sie diese Person ' +
        'von der Arbeit kennen und dass Sie sie dort immer in der Kantine sehen, ' +
        'handelt es sich um eine „Typ A“ Erinnerung. Erinnern Sie sich jedoch nicht ' +
        'an so ein Detail, sind aber trotzdem der Meinung, diese Person schon mal gesehen zu haben, ' +
        'ist das eine „Typ B“ Erinnerung.</li><br>' +
        '<li>Wenn Sie in der Testphase das Wort „Hund“ sehen ' +
        'und sich erinnern, woran Sie bei der Präsentation gedacht haben ' +
        '(z.B., wie gerne Sie einen Hund oder ein anderes Haustier hätten) oder was währenddessen passiert ist ' +
        '(z.B., dass kurz davor der Nachbarshund gebellt hat, oder dass draußen ein Krankenwagen vorbeigefahren ist etc.), ' +
        'ist das eine „Typ A“ Erinnerung. Erinnern Sie sich nicht an solche Dinge, ' +
        'haben aber das Gefühl, dass das Wort in der Lernphase präsentiert wurde, ' +
        'ist das eine „Typ B“ Erinnerung.</li><br>' +
        '<li>Wenn Sie in der Testphase das Wort „Tomate" sehen und Ihnen einfällt, ' +
        'bei der Präsentation in der Lernphase über Ihre Abneigung gegenüber Tomaten ' +
        'nachgedacht zu haben, ist das eine "Typ A" Erinnerung. Erinnern Sie sich nicht an ' +
        'Dinge dieser Art, denken aber dennoch, dass das Wort in der Lernphase präsentiert wurde, ' +
        'ist das eine „Typ B“ Erinnerung.</li</li></ul></div>',
        //'<p>Noch einmal zusammengefasst: Antworten Sie für ein Wort „N“ (neu), ' +
        //'wenn Sie der Ansicht sind, dieses Wort in der Lernphase nicht gesehen zu haben. ' +
        //'Wenn Sie das Wort wiedererkennen und sich bewusst an Details aus der Lernphase ' +
        //'in Bezug auf dieses Wort erinnern, antworten Sie bitte „A“. Wenn Sie „A“ geantwortet haben, ' +
        //'sollten Sie also dazu in der Lage sein, diese Details aus der Lernphase zu berichten. ' +
        //'Antworten Sie „B“, wenn Sie der Ansicht sind, das Wort aus der Lernphase zu kennen, ' +
        //'sich aber nicht an solche spezifischen Detail aus der Lernphase erinnern.</p></div>',

        ////////////////////////////////////////////////////////////////////////
        // familiarity rating task
        '<div class="Instruction" style="margin-bottom: 3%"><p id="Header">Testphase</p> ' +
        'Nachdem Sie entschieden haben, ob ein Wort neu ist, oder Sie es als ' +
        'eine Typ A oder Typ B Erinnerung wiedererkennen, folgt eine zweite Aufgabe: ' +
        'Dabei sollen Sie für dasselbe Wort beurteilen, wie <em>vertraut</em> es Ihnen vorkommt. ' +
        'Ihre Antwort geben Sie mithilfe dieses Schiebereglers: </div>' +
        // my own slider, copied from the plugin:
        '<div class="slider-container" id="my-slider" tabindex="0" onclick: >' +
        '    <div class="slider-bar" style="width: 65%; margin: 0 auto;">' +
        '      <div class="slider-handle" style="left: 50%;"></div>' +
        '    </div>' +
         // could this be any uglier?
        //'<div style="width: 65%; margin: 0 auto;">' +
        '<div style="border: 1px solid transparent; display: inline-block; position: relative; ' +
        'text-align: center; width: 22%;">' +
        '<span style="text-align: center; font-size: 80%;">extrem <strong>un</strong>vertraut</span>' +
        '</div>' +
        '<div style="border: 1px solid transparent; display: inline-block; position: relative; ' +
        'text-align: center; width: 22%;">' +
        '<span style="text-align: center; font-size: 80%;">relativ <strong>un</strong>vertraut</span>' +
        '</div>' +
        '<div style="border: 1px solid transparent; display: inline-block; position: relative; ' +
        'text-align: center; width: 22%;">' +
        '<span style="text-align: center; font-size: 80%;">relativ vertraut</span>' +
        '</div>' +
        '<div style="border: 1px solid transparent; display: inline-block; position: relative; ' +
        'text-align: center; width: 22%;">' +
        '<span style="text-align: center; font-size: 80%;">extrem vertraut</span>' +
        '</div>' +
        //'</div>' +

        '<div class="Instruction" style="margin-top: 7%"> Bewegen Sie den Schieberegler mit den Pfeiltasten ' +
        'auf die Stelle der Skala, die Ihrer Ansicht nach angibt, ' +
        'wie vertraut Ihnen das Wort ist. ' +
        //'Je weiter nach rechts Sie den Schieberegler einstellen, desto vertrauter kommt Ihnen ein Wort vor.
        'Versuchen Sie, für jedes Wort eine individuelle und möglichst akkurate Einschätzung vorzunehmen.</div>',

        ////////////////////////////////////////////////////////////////////////
        // Recap
        '<div class="Instruction"><p id="Header">Testphase</p>' +
        '<p>Nochmal zusammengefasst: Auf dem Bildschirm werden nun wieder nacheinander ' +
        'einige Wörter erscheinen. ' +
        //'Sie haben nun zwei Aufgaben: </p>' +
        '<ul><li>Für jedes Wort sollen Sie zunächst entscheiden, ob dieses Wort ' +
        '<strong>neu (Antwort „N“)</strong> ist, oder Sie es als <strong>Typ A (Antwort „A“)</strong> ' +
        'oder <strong>Typ B (Antwort „B“)</strong> Erinnerung wiedererkennen. </li>' +
        '<li>Anschließend sollen Sie mit einem Schieberegler angeben, <strong>wie vertraut</strong> ' +
        'Ihnen das Wort vorkommt. </li></ul>' +
        'Insgesamt wird es wieder vier Blöcke geben, zwischen denen Sie jeweils eine kurze Pause machen können.</p>' +
        '<p>Wenn Sie bereit sind, mit der Testphase zu beginnen, klicken Sie auf „Weiter“. </p></div> '
    ],
    show_clickable_nav: true,
    allow_keys: false,
    button_label_previous: "Zurück",
    button_label_next: "Weiter",
    on_start: function () {
        EXP_PART = "instruction";
        TRIAL_IDX = 0;
        PAUSE = true;
    }
}


let instr_final_questions = {
    type: 'html-button-response',
    stimulus:
        '<div><p style="font-weight: bold; font-size: 24px;">' +
        'Die beiden Hauptteile des Experiments sind nun geschafft!</p>' +
        '<p style="margin-bottom: 5%">Es folgen nun noch einige Fragen zu Ihrer Teilnahme.</p></div>',
    on_start: function() {
        EXP_PART = "instruction";
        PAUSE = true;
        },
    choices: ["Weiter"]
}


let debriefing_strength = {
    type: 'html-button-response',
    stimulus: '<div class="Instruction"><p id="Header">Ziele dieser Studie</p>' +
        'Zum Abschluss möchten wir Sie kurz über den Hintergrund unserer Studie informieren. ' +
        'Wie bereits angekündigt, möchten wir das menschliche Gedächtnis untersuchen. ' +
        'Konkret interessiert uns, ob Typ A Erinnerungen und Typ B Erinnerungen ' +
        'Personen ähnlich bekannt vorkommen und ob dies davon abhängt, wie oft ' +
        'Personen ein Wort gesehen haben. Deshalb haben Sie in der Lernphase ' +
        'manche Wörter mehrmals gesehen und andere nur einmal.</div>' +
        '<p style="margin-bottom: 3%; font-weight: bold">Herzlichen Dank, dass Sie mit ' +
        'Ihrer Teilnahme unsere Forschung unterstützt haben!</p>',
    on_start: function() {
        EXP_PART = "instruction";
        PAUSE = true;
        },
    choices: ["Weiter"]
}

let debriefing_LOP = {
    type: 'html-button-response',
    stimulus: '<div class="Instruction"><p id="Header">Ziele dieser Studie</p>' +
        'Zum Abschluss möchten wir Sie kurz über den Hintergrund unserer Studie informieren. ' +
        'Wie bereits angekündigt, möchten wir das menschliche Gedächtnis untersuchen. ' +
        'Konkret interessiert uns, ob Typ A Erinnerungen und Typ B Erinnerungen ' +
        'Personen ähnlich bekannt vorkommen und ob dies davon abhängt, wie ' +
        'tief die Wörter verarbeitet wurden. Deshalb sollten Sie in der Lernphase' +
        'für einen Teil der Wörter die Anzahl der Vokale und für den ' +
        'anderen Teil ein assoziiertes Wort angeben. </div>' +
        '<p style="margin-bottom: 3%; font-weight: bold">Herzlichen Dank, dass Sie mit ' +
        'Ihrer Teilnahme unsere Forschung unterstützt haben!</p>',
    on_start: function() {
        EXP_PART = "instruction";
        PAUSE = true;
        },
    choices: ["Weiter"]
}

let instr_end = {
    type: 'html-keyboard-response',
    stimulus:
        '<div><p style="font-weight: bold; font-size: 24px;">Das Experiment ist nun beendet. ' +
        'Vielen Dank für Ihre Teilnahme!</p>' +
        'Sie können dieses Fenster nun schließen / Sie werden nun zu Sona weitergeleitet.<br>' +
        'Testmode: Drücken Sie eine beliebige Taste, um zu JATOS zurückzukehren.</div>',
    on_start: function() {
        PAUSE = true;
        EXP_PART = "instruction";
    }
}


// Break slides
function gen_instr_break(learn, block_num, LOP) {
    let phase = learn ? "Lernphase" : "Testphase";
    let n_block_total = learn ? 4 : 8;

    return {
        type: 'html-button-response',
        stimulus:
            '<p id="Header">Pause</p>' +
            '<p style="margin-top: 20% max-width: 85%;">Block ' + block_num +
            '/' + n_block_total + ' der ' + phase + ' ist geschafft! ' +
            'Sie können an dieser Stelle eine kurze Pause machen.</p>' +
            '<p>Klicken Sie auf "Weiter", um den nächsten Block zu starten.</p>',
        choices: ["Weiter"],
        on_start: function() {
            PAUSE = true;
            EXP_PART = "break";
        }
    }
}



console.log("instructions.js imported successfully.")