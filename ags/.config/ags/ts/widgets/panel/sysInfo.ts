import { Widget } from "resource:///com/github/Aylur/ags/widget.js"

export const sysInfo = () => Widget.Box({
    class_name: "box-panel-sysInfo",
    expand: true,
    spacing: 8,
    children: [
        Widget.Box({
            hpack: "start",
            vertical: true,
            children: [
                Widget.Button({
                    child: Widget.Box({
                        spacing: 8,
                        children: [
                            Widget.Icon("network-wireless-symbolic"),
                            Widget.Label("Wifi"),
                            Widget.Icon({ icon: "go-next-symbolic", hexpand: true, hpack: "end" })
                        ]
                    })
                }),
                Widget.Button({
                    child: Widget.Box({
                        spacing: 8,
                        children: [
                            Widget.Icon("bluetooth-symbolic"),
                            Widget.Label("Bluetooth"),
                            Widget.Icon({ icon: "go-next-symbolic", hexpand: true, hpack: "end" })
                        ]
                    })
                }),
                Widget.Box({
                    children: [
                        Widget.CircularProgress(),
                        Widget.CircularProgress(),
                        Widget.CircularProgress()
                    ]
                })
            ]
        }),
        Widget.Box({
            hpack: "end",
            children: [
                Widget.Slider({
                    orientation: 1,
                    vexpand: true,
                }),
                Widget.Slider({
                    orientation: 1,
                    vpack: "fill",
                })
            ]
        })
    ]
})
