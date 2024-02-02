import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";
import { Widget } from "resource:///com/github/Aylur/ags/widget.js"

export const powerOptions = () => Widget.Box({
    class_name: "box-panel-power",
    expand: true,
    spacing: 8,
    halign: 1,
    vertical: false,
    children: [
        Widget.Label({
            setup: (self) => self
                .poll(5000, label => {
                    execAsync(['bash', '-c', `uptime -p | sed -e 's/up //;s/ hour./h/;s/ minute./m/'`]).then(upTimeString => {
                        label.label = `Uptime: ${upTimeString}`;
                    }).catch(print);
                })
        }),
        Widget.Box({
            hpack: "end",
            children: [
                Widget.Button({}),
                Widget.Button({}),
                Widget.Button({})
            ]
        })
    ]
})
