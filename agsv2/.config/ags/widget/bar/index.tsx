import { App, Astal, Gtk, Gdk, Widget } from "astal/gtk3"
import { GdkMonitorToHypr } from "../../utils.ts"
import { TrayContainer } from "./items/Tray.tsx"
import { BatteryInfo } from "./items/Battery.tsx"
import { Clock } from "./items/Clock.tsx"
import { Workspace } from "./items/Workspace.tsx"
import { ActiveWindow } from "./items/ActiveWindow.tsx"


const Bar = (gdkmonitor: Gdk.Monitor) => {
    const mon = GdkMonitorToHypr(gdkmonitor)

    return <window
        name={"bar" + GdkMonitorToHypr(gdkmonitor).id}
        className="bar"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP
            | Astal.WindowAnchor.LEFT
            | Astal.WindowAnchor.RIGHT}
        application={App}>
        <centerbox className="bar no-bg">
            <box 
                className="bar-left" 
                expand 
                spacing={12} 
                halign={Gtk.Align.START}
            >
                <label label="󰋙" className="highlight" />
                <Workspace monitor={mon.id} />
                <ActiveWindow />
            </box>
            <box></box>
            <box 
                className="bar-right" 
                expand 
                spacing={8} 
                halign={Gtk.Align.END}
            >
                <TrayContainer />
                <BatteryInfo />
                <Clock />
            </box>
        </centerbox>
    </window>
}

export default Bar
