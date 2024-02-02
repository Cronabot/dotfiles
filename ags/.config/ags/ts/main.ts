import AgsWindow from 'types/widgets/window';
import { Bar } from './widgets/bar/main';
import { exec } from 'resource:///com/github/Aylur/ags/utils.js';
import { Monitor } from 'types/service/hyprland';
import { WidgetFunction } from './utils';
import { Panel } from './widgets/panel/main';
import { App } from 'types/app';
import { panelToggled } from 'vars';

console.log("Loading Widgets")
console.log("Checking monitor count")
const monitors: Monitor[] = JSON.parse(exec("hyprctl monitors -j"))

const forMonitor = (w: WidgetFunction) => {
    let win: AgsWindow[] = []
    monitors.forEach(m => {
        win.push(w(m.id))
    })
    return win
}

const windows = () => {
    const wins = [
        forMonitor(Bar),
        Panel()
    ].flat(1)
    console.log(`Loaded ${wins.length} Windows`)
    return wins
}

export default { 
    windows: windows(),
};

