
import { notifications } from "resource:///com/github/Aylur/ags/service/notifications.js";
import { Widget } from "resource:///com/github/Aylur/ags/widget.js";

import { WidgetFunction } from "ts/utils";

export const NotificationPopup: WidgetFunction = (monitor = 0) => Widget.Window({
    name: `notification-popup${monitor}`,
    monitor: monitor,
    exclusivity: "normal",
    anchor: ["top", "left", "right"],
    child: Widget.Box({
        class_name: "notifpopup-main",
        spacing: 8,
        vertical: true
    }).bind("children", notifications, "popups", popup => popup.map((p) => {
        console.log(p.summary)
        return Widget.Label(p.summary)
    }))
})
