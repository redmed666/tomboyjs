var editor = new tui.Editor({
    el: document.querySelector('#note-opened'),
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    minHeight: $(window).height()*0.8
});