const TabGroup = require("electron-tabs");
let tabGroup = new TabGroup();
let tab = tabGroup.addTab({
    title: "Tomboyjs",
    visible: true,
    active: true
});

/*
       <div class="etabs-tabgroup">
                <div class="etabs-tabs"></div>
                <div class="etabs-buttons"></div>
        </div>
            
        <div class="etabs-views"></div>
        <script src="tabs.js"></script>
*/