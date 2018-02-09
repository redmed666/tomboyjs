const {ipcRenderer} = require('electron');
const {remote} = require('electron');
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
    let newTitle = $('<textarea />').html(editor.getValue()).text().split('\n')[0].replace('#','').trim().toLowerCase();

    linkMap.set(notepath, newTitle);
    linkMap.forEach((value, key) => {
        if (value !== newTitle) {
            let tmp = key.split('/');
            let filename = tmp[tmp.length - 1];
            let varReg = '^'+value+'|'+value+'$'+'|'+' '+value+'|'+value + ' '
            let regVal = new RegExp(varReg, 'gi');
            newContent = newContent.replace(regVal, ' <a href=\"'+ filename +'\">'+ value +'</a> ');
        }
    })
    noteXML.getElementsByTagName('title')[0].textContent = newTitle;
    noteXML.getElementsByTagName('content')[0].textContent = newContent;
    
    let newNoteToWrite = new XMLSerializer().serializeToString(noteXML);
    fs.writeFileSync(notepath, newNoteToWrite);
    updateDisplayNotes();
    $("a[id*='"+notepath+"']").text(newTitle).append('<button class="close closeTab" type="button" onClick=\"closeTab(this.parentNode.id)\">X</button>');
}

$(document).focusout(() => {
    globalShortcut.unregisterAll();   
});
$(document).focusin(() => {
    globalShortcut.register('CommandOrControl+S', save);
});

/*
(function(){
    setInterval(save, 5000);
})();
*/