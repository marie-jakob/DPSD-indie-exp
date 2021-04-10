/**
 * Contains relevant information and methods for the experimental trials
 */
class Trial {

    constructor(id) {
        this.id = id;
        this.data = [];
        this.word = "";
        this.trialNum = 0;
        this.RT = 0;
        this.response = 0;
    }

    save() {
        this.dataAG.push(`${this.id}, ${this.data}, ${this.word}, ${this.trialNum},
        ${this.RT}, ${this.RT}, ${this.response}\n`);
    }


    resetData() {
        this.word = "";
        this.RT = 0;
        this.response = 0;
    }


    sendData(data, kind) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', './writeFile.php');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify({
            filename: this.id,
            filedata: {
                value: data
            },
            kind: kind
        }));
    }

    sendEnd() {
        window.location.href = `/experiment_over?id=${this.id}&message=end`;
    }
}