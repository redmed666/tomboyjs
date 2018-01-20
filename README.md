# Init
npm install

bower install bootstrap tui-editor

npm install -g electron

electron .

# Package
Windows
```
electron-packager . tomboyjs --overwrite --asar=true --platform=win32 --arch=ia32 --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="tomboyjs"
```

Mac
```
electron-packager . --overwrite --platform=darwin --arch=x64 --prune=true --out=release-builds
```

Linux
```
electron-packager . tomboyjs --overwrite --asar=true --platform=linux --arch=x64 --prune=true --out=release-builds
```

## TODO
* ~~Search function~~
* ~~Resize editor with window~~
* Add close button for tabs
* ~~CSS fine tuning (kind of crappy)~~ (still crap but better?)
* Autosave
* ~~Bundle for the different OS~~
* Systray: Add functionalities
* Configuration file in order to set up anywhere and not specially inside homedir
* Backup to git (with gist or something like that?)
* Notes encryption