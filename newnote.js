$('#create-new-note').on('click', () => {
    let date = new Date();
    
    if(!fs.existsSync(notespath)) {
        fs.mkdirSync(notespath);
    }
    let notename = "notes_" + date.getTime().toString();
    let notepath = notespath + '/' + notename;
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

    let updatedList = '<li><button class=\"btn btn-secondary\" onClick=\"openFile(this.id)\" id=\"'+notespath+notename+'\">'+notename+'</button></li>';
    $('#notes').append(updatedList);
    editor.setValue(notename);
    $('#note-opened').attr('name',notepath);

    let newTab = '<li class=\"nav-item\" id=\"'+notename+'\"><a class=\"nav-link\" onClick=\"updateEditor(this.id)\" id=\"'+ notepath +'\">'+ notename +'<button class="close closeTab" type="button" onClick=\"closeTab(this.parentNode.id)\">X</button></a></li>';
    $('#notes-opened').append(newTab);
})