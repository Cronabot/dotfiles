import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";
import { Widget } from "resource:///com/github/Aylur/ags/widget.js"

export const powerOptions = () => Widget.CenterBox({
    class_name: "box-panel-power",
    spacing: 8,
    hexpand: true,
    start_widget: Widget.Label({
        hexpand: true,
        hpack: "start",
        setup: (self) => self
            .poll(5000, label => {
                execAsync(['bash', '-c', `uptime -p | sed -e 's/up //;s/ hour./h/;s/ minute./m/'`]).then(upTimeString => {
                    label.label = `Uptime: ${upTimeString}`;
                }).catch(print);
            })
    }),
    end_widget: Widget.Box({
        hexpand: true,
        hpack: "end",
        children: [
            Widget.Button({}),
            Widget.Button({}),
            Widget.Button({})
        ]
    })

})
