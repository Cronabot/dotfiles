import { Widget } from "resource:///com/github/Aylur/ags/widget.js"
import { battery } from "resource:///com/github/Aylur/ags/service/battery.js";
import { notifications } from "resource:///com/github/Aylur/ags/service/notifications.js";
import { systemTray } from "resource:///com/github/Aylur/ags/service/systemtray.js";
import { TrayItem } from "types/service/systemtray";

const batRangesC = [
    { b: "battery-level-0-charging-symbolic", min: -1, max: 5 },
    { b: "battery-level-10-charging-symbolic", min: 6, max: 15 },
    { b: "battery-level-20-charging-symbolic", min: 16, max: 25 },
    { b: "battery-level-30-charging-symbolic", min: 26, max: 35 },
    { b: "battery-level-40-charging-symbolic", min: 36, max: 45 },
    { b: "battery-level-50-charging-symbolic", min: 46, max: 55 },
    { b: "battery-level-60-charging-symbolic", min: 56, max: 65 },
    { b: "battery-level-70-charging-symbolic", min: 66, max: 75 },
    { b: "battery-level-80-charging-symbolic", min: 76, max: 85 },
    { b: "battery-level-90-charging-symbolic", min: 86, max: 95 },
    { b: "battery-level-100-charged-symbolic", min: 96, max: 101 }
];

const batRanges = [
    { b: "battery-level-0-symbolic", min: -1, max: 5 },
    { b: "battery-level-10-symbolic", min: 6, max: 15 },
    { b: "battery-level-20-symbolic", min: 16, max: 25 },
    { b: "battery-level-30-symbolic", min: 26, max: 35 },
    { b: "battery-level-40-symbolic", min: 36, max: 45 },
    { b: "battery-level-50-symbolic", min: 46, max: 55 },
    { b: "battery-level-60-symbolic", min: 56, max: 65 },
    { b: "battery-level-70-symbolic", min: 66, max: 75 },
    { b: "battery-level-80-symbolic", min: 76, max: 85 },
    { b: "battery-level-90-symbolic", min: 86, max: 95 },
    { b: "battery-level-100-symbolic", min: 96, max: 101 }
];

const BatteryInfo = () => Widget.Box({
    class_name: 'info-bat',
    visible: battery.bind('available'),
    children: [
        Widget.Icon().hook(battery, self => {
            self.icon = ""
            const p = battery.percent
            if (battery.charging) {
                for (const range of batRangesC) {
                    if (p >= range.min && p <= range.max) {
                        self.icon = range.b
                    }
                }
            }  else {
                for (const range of batRanges) {
                    if (p >= range.min && p <= range.max) {
                        self.icon = range.b
                    }
                }
            }

        }),

        Widget.Label().bind("label", battery, "percent", p => ` ${p}%`)
    ]
})

const NotificationInfo = () => Widget.Box({
    class_name: 'info-notif',
    children: [
        Widget.Icon("preferences-system-notifications-symbolic"),
        Widget.Label().bind("label", notifications, "notifications", n => ` ${n.length}`)
    ]
})

const Infos = () => Widget.EventBox({
    class_name: "box-infos",
    on_primary_click_release: () => {
        panelToggled.setValue(!panelToggled.getValue())
    },
    child: Widget.Box({
        spacing: 8,
        margin_left: 8,
        margin_right: 8,
        children: [NotificationInfo(), BatteryInfo()]
    })
})

const SysTrayItem = (item: TrayItem) => Widget.Button({
    class_name: "btn-systrayitem",
    child: Widget.Icon().bind('icon', item, 'icon'),
    on_primary_click: (_, event) => item.activate(event),
    on_secondary_click: (_, event) => item.openMenu(event),
});

const Tray = () => Widget.Box({
    visible: systemTray.bind("items").transform(i => i.length > 0),
    spacing: 8,
    children: [
        Widget.EventBox({
            class_name: "box-tray",
            child: Widget.Box().bind('children', systemTray, 'items', (i) => { 
                return i.map(SysTrayItem)
            })
        }),
        Widget.Label("•")
    ]
})

export const RightModules = () => Widget.Box({
    class_name: "box-right",
    expand: true,
    spacing: 8,
    halign: 2,
    vertical: false,
    children: [Tray(), Infos()]
})
