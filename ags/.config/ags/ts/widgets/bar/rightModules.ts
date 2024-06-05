import GLib20 from "gi://GLib?version=2.0";
import { battery } from "resource:///com/github/Aylur/ags/service/battery.js";
import { notifications } from "resource:///com/github/Aylur/ags/service/notifications.js";
import { systemTray } from "resource:///com/github/Aylur/ags/service/systemtray.js";
import { TrayItem } from "types/service/systemtray";
import { Box, Button, EventBox, Icon, Label } from "resource:///com/github/Aylur/ags/widget.js";

const Clock = () => EventBox({
    class_name: "eb-clock",
    child: Label({
        label: GLib20.DateTime.new_now_local().format("%H:%M") || "Error",
        setup: (self) => self.poll(5000, label => {
            label.label = GLib20.DateTime.new_now_local().format("%H:%M") || "Error";
        }),
    }),
});

const BatteryInfo = () => Box({
    class_name: 'info-bat',
    visible: battery.bind('available'),
    children: [
        Label().hook(battery, (label) => {
            let p = battery.percent
            if (battery.charging) {
                label.label = `↑${p}%`
            } else if (battery.charged) {
                label.label = `~${p}%`
            } else if (p <= 20) {
                label.label = `!${p}%`
            } else {
                label.label = `↓${p}%`
            }
            label.visible = battery.available
        })
    ]
})

const NotificationInfo = () => Box({
    class_name: 'info-notif',
    children: [
        Label().bind("label", notifications, "notifications", n => n.length > 0 ? "!" : "-")
    ]
})

const Infos = () => EventBox({
    class_name: "box-infos",
    on_primary_click_release: () => {
        panelToggled.setValue(!panelToggled.getValue())
    },
    child: Box({
        spacing: 8,
        margin_left: 4,
        margin_right: 8,
        children: [NotificationInfo(), BatteryInfo(), Clock()]
    })
})

const SysTrayItem = (item: TrayItem) => Button({
    class_name: "btn-systrayitem",
    child: Icon().bind('icon', item, 'icon'),
    on_primary_click: (_, event) => item.activate(event),
    on_secondary_click: (_, event) => item.openMenu(event),
});

const Tray = () => Box({
    visible: systemTray.bind("items").transform(i => i.length > 0),
    spacing: 8,
    children: [
        EventBox({
            class_name: "box-tray",
            child: Box().bind('children', systemTray, 'items', (i) => { 
                return i.map(SysTrayItem)
            })
        }),
        Label("•")
    ]
})

export const RightModules = () => Box({
    class_name: "box-right",
    expand: true,
    spacing: 8,
    halign: 2,
    children: [Tray(), Infos()]
})
