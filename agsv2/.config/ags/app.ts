import { App, Gdk, Gtk } from "astal/gtk3"
import style from "./scss/main.scss"
import Bar from "./widget/bar"
import WallpaperWorkspace from "./widget/wallpaperWorkspace"
import ControlPanel from "./widget/controlPanel"

App.start({
    css: style,
    main() {
        // Single Widgets
        ControlPanel()

        // Per-monitor Widgets
        const bars = new Map<Gdk.Monitor, Gtk.Widget>()
        const wallpaperWorkspaces = new Map<Gdk.Monitor, Gtk.Widget>()


        for (const gdkmonitor of App.get_monitors()) {
            bars.set(gdkmonitor, Bar(gdkmonitor))
            wallpaperWorkspaces.set(gdkmonitor, WallpaperWorkspace(gdkmonitor))
        }

        App.connect("monitor-added", (_, gdkmonitor) => {
            bars.set(gdkmonitor, Bar(gdkmonitor))
            wallpaperWorkspaces.set(gdkmonitor, WallpaperWorkspace(gdkmonitor))
        })

        App.connect("monitor-removed", (_, gdkmonitor) => {
            bars.get(gdkmonitor)?.destroy()
            wallpaperWorkspaces.get(gdkmonitor)?.destroy()
            bars.delete(gdkmonitor)
            wallpaperWorkspaces.delete(gdkmonitor)
        })
    },
})
