import { bind } from "astal";
import { App, Astal, Gtk, Widget } from "astal/gtk3";
import { Player } from "./Player.tsx";
import { Visualiser } from "./Visualiser.tsx";
import { Wifi } from "./Wifi.tsx";
import { BluetoothD } from "./Bluetooth.tsx";
import Mpris from "gi://AstalMpris";

const ControlPanel = () => {
    const mp = Mpris.get_default();

    return (
        <window
            name={"controlPanel"}
            namespace="control-panel"
            className="control-panel"
            visible={false}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.OVERLAY}
            anchor={
                Astal.WindowAnchor.TOP |
                Astal.WindowAnchor.BOTTOM |
                Astal.WindowAnchor.RIGHT |
                Astal.WindowAnchor.LEFT
            }
            application={App}
        >
            <box className="dim-bg">
                <box
                    className="panel-main"
                    halign={Gtk.Align.CENTER}
                    valign={Gtk.Align.CENTER}
                    spacing={8}
                    hexpand
                    vexpand
                    vertical
                >
                    <box vertical>
                        <Visualiser />
                        <box
                            vertical
                            children={bind(mp, "players").as((players) => {
                                return players.map((player) => {
                                    return (
                                        <Player
                                            focused
                                            player={player}
                                        ></Player>
                                    );
                                });
                            })}
                        />
                    </box>
                    <box>
                        <box vertical spacing={8}>
                            <Wifi />
                            <BluetoothD />
                        </box>
                        <box></box>
                    </box>
                </box>
            </box>
        </window>
    );
};

export default ControlPanel;
