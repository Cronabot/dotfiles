import GLib20 from "gi://GLib?version=2.0";
import { execAsync, exec } from "resource:///com/github/Aylur/ags/utils.js";
import { Box, Icon, Label } from "resource:///com/github/Aylur/ags/widget.js";
import service from "resource:///com/github/Aylur/ags/service/powerprofiles.js"

const dateFormat = "%a %F"

export const sysInfo = () => Box({
    class_name: "box-panel-sys",
    spacing: 8,
    hexpand: true,
    vertical: true,

    children: [
        Box({
            hexpand: true,
            hpack: "end",
            tooltipText: "Date",
            children: [
                Label({
                    label: GLib20.DateTime.new_now_local().format(dateFormat) || "Error",
                    setup: (self) => self.poll(5000, label => {
                        label.label = GLib20.DateTime.new_now_local().format(dateFormat) || "Error";
                    }),
                }),
                Label("  "),
                Icon("x-office-calendar-symbolic"),
            ]
        }),

        Box({
            hexpand: true,
            hpack: "end",
            tooltipText: "User",
            children: [
                Label(exec("whoami") + "@" + exec("hostname")),
                Label("  "),
                Icon("avatar-default-symbolic"),
            ]
        }),

        Box({
            hexpand: true,
            hpack: "end",
            tooltipText: "Uptime",
            children: [
                Label({
                    setup: (self) => self
                        .poll(5000, label => {
                            execAsync(['bash', '-c', `uptime -p | sed -e 's/up //;s/ hour./h/;s/ minute./m/'`]).then(upTimeString => {
                                label.label = `${upTimeString}`;
                            }).catch(print);
                        })
                }),
                Label("  "),
                Icon("preferences-system-time-symbolic"),
            ]
        }),

        Box({
            hexpand: true,
            hpack: "end",
            tooltipText: "Power Profile",
            children: [
                Label().bind("label", service, "active_profile"),
                Label("  "),
                Icon().bind("icon", service, "icon_name"),
            ]        
        }),

    ]
})
