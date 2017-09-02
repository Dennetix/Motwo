const path = require('path');
const electron = require('electron');
const { app, BrowserWindow } = electron;

const config = require('./app/js/config/config');

app.on('ready', () => {
	let win = new BrowserWindow(config.windowConfig);
	win.loadURL('file://' + path.join(__dirname, '/app/index.html'));
	if(config.debug) {
		// Toggle the dev console and set the menu bar visibility to false so the key bindings are still usable
		win.webContents.toggleDevTools();
		win.setMenuBarVisibility(false);
	} else {
		// Set the menu to null so the key bindings aren't usable anymore
		win.setMenu(null);
	}

	// Show the window when the page has loaded
	win.once('ready-to-show', () => {
		win.show();
	});
}); 