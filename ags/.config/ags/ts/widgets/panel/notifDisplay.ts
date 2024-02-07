import { Notification, notifications } from "resource:///com/github/Aylur/ags/service/notifications.js"
import { Widget } from "resource:///com/github/Aylur/ags/widget.js"
import { lookUpIcon } from "resource:///com/github/Aylur/ags/utils.js";

const NotificationIcon = ({ app_entry, app_icon, image }: Notification) => {
    if (image) {
        return Widget.Box({
            css: `
                background-image: url("${image}");
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                min-width: 3rem;
            `,
        });
    }

    let icon = 'dialog-information-symbolic';
    if (lookUpIcon(app_icon))
        icon = app_icon;

    if (app_entry && lookUpIcon(app_entry))
        icon = app_entry;

    return Widget.Icon({ icon: icon });
};

export const notifDisplay = () => Widget.Box({
    class_name: "box-panel-notifDisplay",
    spacing: 8,
    vertical: true,
    
}).bind("children", notifications, "notifications", notifs => notifs.map(notif => Widget.Box({
        class_name: "notification",
        children: [
            Widget.Box({
                hpack: "start",
                child: NotificationIcon(notif)
            }),
            Widget.Box({
                hpack: "end",
                vertical: true,
                children: [
                    Widget.Label({
                        class_name: "notification-title",
                        max_width_chars: 10,
                        justification: 'left',
                        label: notif.summary
                    }),
                    Widget.Label({
                        class_name: "notification-body",
                        justification: 'left',
                        label: notif.body,
                        wrap: true,
                        max_width_chars: 10,
                    })
                ]
            }),
            Widget.Button({
                hpack: "end",
                vpack: "start",
                on_primary_click_release: () => {
                    notif.close()
                },
                child: Widget.Icon("window-close-symbolic")
            })
        ]
    })))
