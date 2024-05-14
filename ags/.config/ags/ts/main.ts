import { Bar, BarInvertedCorners } from './widgets/bar/main';
import { Monitor } from 'types/service/hyprland';
import { WidgetFunction } from './utils';
import { Panel } from './widgets/panel/main'; import { exec } from 'resource:///com/github/Aylur/ags/utils.js';
import { NotificationPopup } from './widgets/notification-popups/main';
import { app } from 'resource:///com/github/Aylur/ags/app.js';
import { hyprland } from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import Window from '../types/widgets/window';

console.log("Loading widgets")
console.log("Checking monitor count")
const monitors: Monitor[] = JSON.parse(exec("hyprctl monitors -j"))
console.log(`Found ${monitors.length} monitors`)

let loadedWins: Window<any, any>[] = []

const forMonitor = (w: WidgetFunction) => {
    let win: Window<any, any>[] = []
    monitors.forEach(m => {
        win.push(w(m.id))
    })
    return win
}

const reRender = () => {
    console.log("Rerendering")
    loadedWins.forEach(w => {
        console.log(w.class_name)
        app.removeWindow(w)
    })

    console.log("Cleaned old windows")

    loadedWins = windows()

    console.log("Created new windows")

    loadedWins.forEach(w => {
        app.addWindow(w)
    })

    console.log("Rerendered")
}


const windows = () => {
    const wins = [
        forMonitor(Bar),
        forMonitor(BarInvertedCorners),
        forMonitor(Panel),
        NotificationPopup()
    ].flat(1)
    console.log(`Loaded ${wins.length} windows`)
    return wins
}

const load = () => {
    hyprland.connect('monitor-added', mon => {
        console.log("Added: " + mon)
        reRender()
    })

    hyprland.connect('monitor-removed', mon => {
        console.log("Removed: " + mon)
        reRender()
    })
    loadedWins = windows()
    return loadedWins
}

export default { 
    windows: load()
};

