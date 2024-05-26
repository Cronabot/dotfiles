import { Bar, BarCornerOverlay } from './widgets/bar/main';
import { Monitor } from 'types/service/hyprland';
import { WidgetFunction } from './utils';
import { Panel } from './widgets/panel/main'; import { exec } from 'resource:///com/github/Aylur/ags/utils.js';
import { NotificationPopup } from './widgets/notification-popups/main';
import { app } from 'resource:///com/github/Aylur/ags/app.js';
import { hyprland } from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import Window from '../types/widgets/window';
import { wallpaperDisplay } from './widgets/wallpaper-display/main';

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

const windows = () => {
    const wins = [
        forMonitor(Bar),
        forMonitor(BarCornerOverlay),
        forMonitor(Panel),
        forMonitor(wallpaperDisplay),
        NotificationPopup()
    ].flat(1)
    console.log(`Loaded ${wins.length} windows`)
    return wins
}

const load = () => {
    loadedWins = windows()
    return loadedWins
}

export default { 
    windows: load()
};

