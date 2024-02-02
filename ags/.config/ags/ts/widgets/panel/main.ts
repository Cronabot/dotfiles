import { Widget } from "resource:///com/github/Aylur/ags/widget.js";
import { WidgetFunction } from "ts/utils";
import { powerOptions } from "./powerOptions";
import { sysInfo } from "./sysInfo";
import { notifDisplay } from "./notifDisplay";
import { panelToggled } from "vars";

export const Panel: WidgetFunction = () => Widget.Window({
    name: `panel`,
    exclusivity: "ignore",
    anchor: ["top", "right"],
    child: Widget.Revealer({
        transition_duration: 300,
        transition: 'slide_left',
        class_name: "panel-revealer",
        child: Widget.EventBox({
            class_name: "panel-bg",
            margin_top: 50,
            margin_right: 10,
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
        }) 
    }).bind("reveal_child", panelToggled, "value", v => {
        console.log(v.toString())
        return v
    })
})
