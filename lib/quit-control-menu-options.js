const options = {}

options.Quit = {
    label: "Quit"
    ,description: "⌘Q"
    ,command: "application:quit"
}

options.CloseWindow = {
    label: "Close Window"
    ,description: "⇧⌘W, ⌘W"
    ,command: "window:close"
}

options.Cancel = {
    label: "Cancel"
    ,description: "ESC"
}

module.exports = options
