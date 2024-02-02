import GLib from "node_modules/@girs/glib-2.0/glib-2.0";
import { Widget } from "resource:///com/github/Aylur/ags/widget.js"

const Clock = () => Widget.EventBox({
    class_name: "eb-clock",
    child: Widget.Label({
        label: GLib.DateTime.new_now_local().format("%H:%M"),
        setup: (self) => self.poll(5000, label => {
            label.label = GLib.DateTime.new_now_local().format("%H:%M") || "Error";
        }),
    }),
});


export const CenterModules = () => Widget.CenterBox({
        class_name: "box-center",
        expand: true,
        spacing: 8,
        halign: 3,
        vertical: false,
        center_widget: Clock()
})
