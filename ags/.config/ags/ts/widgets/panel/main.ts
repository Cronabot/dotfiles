import { Widget } from "resource:///com/github/Aylur/ags/widget.js";
import { WidgetFunction } from "ts/utils";
import { powerOptions } from "./powerOptions";
import { sysInfo } from "./sysInfo";
import { notifDisplay } from "./notifDisplay";
import { panelToggled } from "../../../vars";

export const Panel: WidgetFunction = (monitor = 0) => Widget.Window({
    name: `panel${monitor}`,
    exclusivity: "normal",
    anchor: ["top", "right"],
    monitor: monitor,
    margins: [9, 0],
    layer: "top",
    class_name: "panel-window",
    child: Widget.Box({
        css: "padding: 1px;",
        children: [
            Widget.Revealer({
                transition_duration: 300,
                transition: 'slide_left',
                class_name: "panel-revealer",
                child: Widget.EventBox({
                    class_name: "panel-bg",
                    margin_right: 9,
                    child: Widget.Box({
                        vertical: true,
                        spacing: 8,
                        children: [
                            Widget.Box({
                                class_name: "panel-main",
                                vertical: true,
                                children: [
                                    powerOptions(),
                                    sysInfo()
                                ]
                            }),
                            notifDisplay(),
                        ] 
                    }),
                }),
                setup: self => self.hook(panelToggled, () => {
                    self.reveal_child = panelToggled.value
                })
            })
        ]
    })
})
