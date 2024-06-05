import { WidgetFunction, getMonitorWorkspace } from "../../utils";
import { DrawingArea, Window } from "resource:///com/github/Aylur/ags/widget.js";
import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";
import Gtk from "../../../node_modules/@girs/gtk-3.0/gtk-3.0";

const start = Math.PI * -0.5
const interval = Math.PI * 1/3

export const WallpaperDisplay: WidgetFunction = (monitor = 0) => Window({
    name: `wallpaperDisplay${monitor}`,
    exclusivity: "ignore",
    anchor: ["top", "bottom", "left", "right"],
    keymode: "on-demand",
    monitor: monitor,
    layer: "bottom",

    child: DrawingArea({
        css: "font-size: 0px; transition: 0.2s ease-in-out",
        draw_fn: (self, cr: any, w, h) => {
            let mid = {
                x: w / 2,
                y: h / 2
            }

            let styleContext = self.get_style_context()
            let progress = styleContext.get_property("font-size", Gtk.StateFlags.NORMAL)

            cr.setSourceRGBA(0.0902, 0.576, 0.820, 1)
            cr.setLineWidth(2)
            cr.arc(mid.x, mid.y, 196, start, start + progress)
            let pos = cr.getCurrentPoint()
            cr.newPath()
            cr.moveTo(pos[0], pos[1])
            cr.newSubPath()
            cr.arc(Math.round(pos[0]), Math.round(pos[1]), 49.108, 0, Math.PI * 2)
            cr.stroke()

            cr.$dispose()

        },
    }).hook(hyprland.active.workspace, self => {
        let ws = getMonitorWorkspace(monitor)
        if (ws <= 0) return
        let pos = (ws - 1) * interval
        self.css = `font-size: ${pos}px; transition: 0.2s ease-out`
    })
})

