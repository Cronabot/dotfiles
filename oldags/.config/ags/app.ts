import { App, Gdk, Gtk } from "astal/gtk3";
import { Variable } from "astal";
import style from "./scss/main.scss";
import Bar from "./widget/bar";
import MprisController from "./widget/mprisController";

export const mprisControllerExpanded = Variable(false);

App.start({
    requestHandler(request: string, res: (response: any) => void) {
        if (request == "toggleMprisController") {
            mprisControllerExpanded.set(!mprisControllerExpanded.get());
            return res("Toggled");
        }
        res("Unknown Command");
    },
    css: style,
    icons: "/home/ec/wallpapers/icons",
    main() {
        // Single Widgets
        MprisController();

        // Per-monitor Widgets
        const bars = new Map<Gdk.Monitor, Gtk.Widget>();

        for (const gdkmonitor of App.get_monitors()) {
            bars.set(gdkmonitor, Bar(gdkmonitor));
        }

        App.connect("monitor-added", (_, gdkmonitor) => {
            bars.set(gdkmonitor, Bar(gdkmonitor));
        });

        App.connect("monitor-removed", (_, gdkmonitor) => {
            bars.get(gdkmonitor)?.destroy();
            bars.delete(gdkmonitor);
        });
    },
});
