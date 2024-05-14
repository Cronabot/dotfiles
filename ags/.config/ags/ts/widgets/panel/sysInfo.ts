import GLib20 from "gi://GLib?version=2.0";
import { execAsync, exec } from "resource:///com/github/Aylur/ags/utils.js";
import { Box, Icon, Label } from "resource:///com/github/Aylur/ags/widget.js";
import service from "resource:///com/github/Aylur/ags/service/powerprofiles.js"

const dateFormat = "%A %F"

export const sysInfo = () => Box({
    class_name: "box-panel-sys",
    spacing: 8,
    hexpand: true,
    vertical: true,

    children: [
        Label({
            hexpand: true,
            hpack: "end",
            label: GLib20.DateTime.new_now_local().format(dateFormat) || "Error",
            setup: (self) => self.poll(5000, label => {
                label.label = GLib20.DateTime.new_now_local().format(dateFormat) || "Error";
            }),
        }),

        Box({
            hexpand: true,
            hpack: "end",
            children: [
                Icon("preferences-system-time-symbolic"),
                Label("  "),
                Label({
                    setup: (self) => self
                        .poll(5000, label => {
                            execAsync(['bash', '-c', `uptime -p | sed -e 's/up //;s/ hour./h/;s/ minute./m/'`]).then(upTimeString => {
                                label.label = `${upTimeString}`;
                            }).catch(print);
                        })
                }),
            ]
        }),

        Box({
            hexpand: true,
            hpack: "end",
            children: [
                Icon("avatar-default-symbolic"),
                Label("  "),
                Label(exec("whoami") + "@" + exec("hostname"))
            ]
        }),

        Box({
            hexpand: true,
            hpack: "end",
            children: [
                Icon().bind("icon", service, "icon_name"),
                Label("  "),
                Label().bind("label", service, "active_profile"),
            ]        
        }),

    ]
})
