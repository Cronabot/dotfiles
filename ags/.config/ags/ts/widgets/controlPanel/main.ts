import { WidgetFunction } from "ts/utils";
import { Window, Box, DrawingArea } from "resource:///com/github/Aylur/ags/widget.js";
import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";

const background = DrawingArea()

export const ControlPanel: WidgetFunction = () => Window({
    name: `controlPanel`,
    exclusivity: "normal",
    monitor: hyprland.bind("active").as(active => active.monitor.id),
    margins: [9, 0],
    visible: false,
    layer: "overlay",
    keymode: "exclusive",
    child: Box({
        children: [
            
        ]
    }),
    setup: self => {
        return self.keybind("Escape", () => {
            App.closeWindow(self.name || "")
        })
    }
})
