const { app, Tray, globalShortcut, BrowserWindow, Menu } = require('electron')
const path = require('path')

let tray = null
let mainWindow = null

app.on('ready', () => {

  tray = new Tray(path.join(__dirname, 'icon.png'))

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])

  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

  globalShortcut.register('CommandOrControl+;', () => {
    if (!mainWindow) {
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
      })

      mainWindow.loadFile('index.html')

      mainWindow.on('closed', () => {
        mainWindow = null
      })
    }

    mainWindow.show()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})