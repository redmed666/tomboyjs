$('#create-new-note').on('click', () => {
    let date = new Date();
    
    if(!fs.existsSync(notespath)) {
        fs.mkdirSync(notespath);
    }
    let notename = "notes_" + date.getTime().toString();
    let notepath = notespath + notename;
    var noteXML = document.implementation.createDocument ('http://www.w3.org/1999/xhtml', 'xml', null);
    var title = document.createElementNS('http://www.w3.org/1999/xhtml', 'title');
    title.textContent = notename;
    var content = document.createElementNS('http://www.w3.org/1999/xhtml', 'content');
    content.textContent = notename;
    noteXML.documentElement.appendChild(title);
    noteXML.documentElement.appendChild(content);
    let note = new XMLSerializer().serializeToString(noteXML);
    console.log(note);

    fs.writeFileSync(notespath+notename, note, (err) => {
        console.log(err);
    });
    let updatedList = createNavLink(notename, notename);
    $('#notes').append(updatedList);    
    let newTab = createTab(notepath, notename);
    $('#notes-opened').append(newTab);
    updateEditor(notepath);
})