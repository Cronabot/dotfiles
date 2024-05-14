import { WidgetFunction } from "ts/utils";
import { notifDisplay } from "./notifDisplay";
import { panelToggled } from "../../../vars";
import { sysInfo } from "./sysInfo";
import { Window, Box, EventBox, Revealer } from "resource:///com/github/Aylur/ags/widget.js";

export const Panel: WidgetFunction = (monitor = 0) => Window({
    name: `panel${monitor}`,
    exclusivity: "normal",
    anchor: ["top", "right"],
    keymode: "on-demand",
    monitor: monitor,
    margins: [9, 0],
    layer: "top",
    class_name: "panel-window",
    child: Box({
        css: "padding: 1px;",
        children: [
            Revealer({
                transition_duration: 200,
                transition: 'slide_left',
                class_name: "panel-revealer",
                child: EventBox({
                    class_name: "panel-bg",
                    margin_right: 9,
                    child: Box({
                        vertical: true,
                        spacing: 8,
                        children: [
                            Box({
                                class_name: "panel-main",
                                vertical: true,
                                children: [
                                    sysInfo(),
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
