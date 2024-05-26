import { notifications } from "resource:///com/github/Aylur/ags/service/notifications.js";

import { WidgetFunction } from "ts/utils";
import { Box, Label, Window } from "resource:///com/github/Aylur/ags/widget.js";

export const NotificationPopup: WidgetFunction = (monitor = 0) => Window({
    name: `notification-popup${monitor}`,
    monitor: monitor,
    exclusivity: "normal",
    anchor: ["top", "left", "right"],
    child: Box({
        class_name: "notifpopup-main",
        spacing: 8,
        vertical: true
    }).bind("children", notifications, "popups", popup => popup.map(p => Label(p.summary)))
})
