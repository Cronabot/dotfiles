import { Bar, BarCornerOverlay } from './widgets/bar/main';
import { Monitor } from 'types/service/hyprland';
import { WidgetFunction } from './utils';
import { NotificationPopups } from './widgets/notification-popups/main';
import Window from '../types/widgets/window';
import { WallpaperDisplay } from './widgets/wallpaper-display/main';
import { Calculator } from './widgets/calculator/main';
import { ControlPanel } from './widgets/controlPanel/main';
import { Overview } from './widgets/overview/main';

console.log("Checking monitor count")
const monitors: Monitor[] = JSON.parse(Utils.exec("hyprctl monitors -j"))
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
    console.log("Loading widgets")
    const wins = [
        forMonitor(Bar),
        forMonitor(BarCornerOverlay),
        forMonitor(WallpaperDisplay),
        NotificationPopups(),
        ControlPanel(),
        Overview(),
        Calculator()
    ].flat(1)
    console.log(`Loaded ${wins.length} windows`)
    return wins
}

const load = () => {
    loadedWins = windows()
    return loadedWins
}

App.config({ 
    windows: load()
});

