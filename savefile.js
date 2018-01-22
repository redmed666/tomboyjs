const {ipcRenderer} = require('electron');
const {globalShortcut} = remote;

function save() {
    console.log('saving');
    let notepath = $('#note-opened').attr('name');
    if (notepath === '' || notepath === undefined) {
        return;
    }
    let note = fs.readFileSync(notepath);
    let noteXML = new DOMParser().parseFromString(note, 'application/xml');
    
    let newContent = editor.getValue();
    let newTitle = $('<textarea />').html(editor.getValue()).text().split('\n')[0].replace('#','').trim();

    linkMap.set(notepath, newTitle);
    linkMap.forEach((value, key) => {
        if (value !== newTitle) {
            let varReg = '^'+value+'|'+value+'$'+'|'+' '+value+'|'+value + ' '
            let regVal = new RegExp(varReg, 'g');
            newContent = newContent.replace(regVal, ' <a href=\"'+ key +'\">'+ value +'</a> ');
        }
    })
    noteXML.getElementsByTagName('title')[0].textContent = newTitle;
    noteXML.getElementsByTagName('content')[0].textContent = newContent;
    
    let newNoteToWrite = new XMLSerializer().serializeToString(noteXML);
    fs.writeFileSync(notepath, newNoteToWrite);
    updateDisplayNotes();
    editor.setValue(newContent);
    $("a[id*='"+notepath+"']").val(newTitle);
}

globalShortcut.register('CommandOrControl+S', save);

/*
(function(){
    setInterval(save, 5000);
})();
*/