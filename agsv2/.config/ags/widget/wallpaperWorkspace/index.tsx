import { bind } from "astal"
import { App, Astal, Gtk, Gdk, Widget } from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"
import { GdkMonitorToHypr, getMonitorWorkspace } from "../../utils.ts"
import giCairo from "cairo"

const start = Math.PI * -0.5
const interval = Math.PI * 1/3

const WallpaperWorkspace = (gdkmonitor: Gdk.Monitor) => {
    const mon = GdkMonitorToHypr(gdkmonitor)
    const hypr = Hyprland.get_default()

    let mid = {
        x: mon.width / 2,
        y: mon.height / 2
    }

    return <window
        name={"wallpaperWorkspace" + GdkMonitorToHypr(gdkmonitor).id}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.IGNORE}
        layer={Astal.Layer.BOTTOM}
        anchor={Astal.WindowAnchor.TOP
            | Astal.WindowAnchor.BOTTOM
            | Astal.WindowAnchor.LEFT
            | Astal.WindowAnchor.RIGHT}
        application={App}
    >
        <Widget.DrawingArea 
            css={bind(hypr, "focusedWorkspace").as(_ => {
                    let ws = getMonitorWorkspace(mon.id)
                    if (ws <= 0) return
                    let pos = (ws - 1) * interval
                    return `font-size: ${pos}px; transition: 0.2s ease-out`
            })}
            setup={(area) => {
                area.connect("draw", (self, cr: giCairo.Context) => {

                    let styleContext = self.get_style_context()
                    let progress: any = styleContext.get_property("font-size", Gtk.StateFlags.NORMAL)
                    if (!progress) progress = 0

                    cr.setSourceRGBA(0.0902, 0.576, 0.820, 1)
                    cr.setLineWidth(2)
                    cr.arc(mid.x, mid.y, 196, start, start + progress)
                    let pos = cr.getCurrentPoint()
                    cr.newPath()
                    cr.moveTo(pos[0], pos[1])
                    cr.newSubPath()
                    cr.arc(Math.round(pos[0]), Math.round(pos[1]), 49.108, 0, Math.PI * 2)
                    cr.stroke()
                })
            }}
        />
    </window>
}

export default WallpaperWorkspace
