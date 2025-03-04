import { App, Astal, Gtk, Widget } from "astal/gtk3"

const PanelButton = () => {
    return <button><Widget.Icon icon="" /></button>
}

const ControlPanel = () => {
    return <window
        name={"controlPanel"}
        namespace="control-panel"
        className="control-panel"
        visible={false}
        exclusivity={Astal.Exclusivity.IGNORE}
        layer={Astal.Layer.OVERLAY}
        anchor={Astal.WindowAnchor.TOP
            | Astal.WindowAnchor.RIGHT}
        application={App}
        marginTop={42}
        marginRight={8}
    >
        <box>
            <box
                className="panel-main"
                halign={Gtk.Align.CENTER}
                valign={Gtk.Align.CENTER}
                hexpand
                vexpand
                vertical
            >
                <box className="grid-row">
                </box>
                <box className="grid-row">
                </box>
                <box className="grid-row">
                    <PanelButton />
                    <PanelButton />
                    <PanelButton />
                </box>
            </box>
        </box>
    </window>
}

export default ControlPanel
