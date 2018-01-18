const {ipcRenderer, remote} = require('electron');
const {globalShortcut} = remote;

globalShortcut.register('CommandOrControl+S', () => {
    let filename = $('#note-opened').attr('name');
    let note = fs.readFileSync(filename);
    let noteXML = new DOMParser().parseFromString(note, 'application/xml');

    let newContent = editor.getValue();
    noteXML.getElementsByTagName('content')[0].textContent = newContent;
    let newTitle = $('<textarea />').html(editor.getValue()).text().split('\n')[0];
    noteXML.getElementsByTagName('title')[0].textContent = newTitle;
    let newNoteToWrite = new XMLSerializer().serializeToString(noteXML);
    fs.writeFileSync(filename, newNoteToWrite);
    updateDisplayNotes();
});