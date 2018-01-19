let $ = require('jquery');
let fs = require('fs');
let os = require('os');
let notespath = os.homedir() + '/tomboynotes/';

function openFile(notepath) {
    if (!fs.existsSync(notepath)) {
        alert('File doesn\'t exist! File requested = ' + notepath);
    }
    let note = fs.readFileSync(notepath);
    let noteXML = new DOMParser().parseFromString(note, 'application/xml');
    let title = noteXML.getElementsByTagName('title')[0].textContent;
    let newTab = '<li class=\"nav-item\"><a class=\"nav-link\" onClick=\"updateEditor(this.id)\" id=\"'+ notepath +'\">'+ title +'</a></li>';
    $('#notes-opened').append(newTab);
}

function updateEditor(notepath) {
    let note = fs.readFileSync(notepath);
    let noteXML = new DOMParser().parseFromString(note, 'application/xml');
    let content = noteXML.getElementsByTagName('content')[0].textContent;
    editor.setValue(content);
    $('#note-opened').attr('name',notepath);
}

function search(string) {
    let notes = fs.readdirSync(notespath);
    $('#found').empty();
    notes.forEach((note,index) => {
        let indexOfString = note.indexOf(string);
        if( indexOfString >= 0) {

        }
    })
}

function updateDisplayNotes() {
    if(!fs.existsSync(notespath)) {
        fs.mkdirSync(notespath);
    }
    let files = fs.readdirSync(notespath);
    $('#notes').empty();
    files.forEach((file,index) => {
        let note = fs.readFileSync(notespath+file);
        let noteXML = new DOMParser().parseFromString(note, 'application/xml');
        let title = noteXML.getElementsByTagName('title')[0].textContent;
        let updatedList = '<li><button class=\"btn btn-secondary\" onClick=\"openFile(this.id)\" id=\"'+notespath+file+'\">'+title+'</button></li>';
        $('#notes').append(updatedList);
    });
}

document.addEventListener('click', function (event) {
    if (event.target.tagName === 'A' && event.target.href.startsWith('file')) {
        event.preventDefault();
        openFile(event.target.href.replace('file://',''));
    }
})

updateDisplayNotes();