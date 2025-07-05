import { bind } from "astal";
import { App, Astal, Gtk, Widget } from "astal/gtk3";
import { Player } from "./Player.tsx";
import { Visualiser } from "./Visualiser.tsx";
import { WifiDisp } from "./WifiDisp.tsx";
import { BluetoothDisp } from "./BluetoothDisp.tsx";
import Mpris from "gi://AstalMpris";
import { BrightnessCtrl } from "./BrightnessCtrl.tsx";
import { VolumeCtrl } from "./VolumeCtrl.tsx";

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
                <centerbox vertical>
                    <overlay
                        child={<Visualiser />}
                        overlay={
                            <box
                                vertical
                                valign={Gtk.Align.START}
                                halign={Gtk.Align.CENTER}
                                children={bind(mp, "players").as((players) => {
                                    if (players.length === 0) {
                                        return [
                                            <box className="panel" spacing={4}>
                                                <label hexpand={true}>
                                                    No active players
                                                </label>
                                            </box>,
                                        ];
                                    }
                                    return [
                                        players.map((player) => {
                                            return (
                                                <Player
                                                    focused
                                                    player={player}
                                                />
                                            );
                                        }),
                                    ];
                                })}
                            />
                        }
                    />

                    <box
                        className="panel-main"
                        halign={Gtk.Align.CENTER}
                        valign={Gtk.Align.CENTER}
                        spacing={8}
                        hexpand
                        vexpand
                        vertical
                    >
                        <box vertical></box>
                        <box vertical spacing={8}>
                            <WifiDisp />
                            <BluetoothDisp />
                            <BrightnessCtrl />
                            <VolumeCtrl />
                        </box>
                    </box>
                    <box></box>
                </centerbox>
            </box>
        </window>
    );
};

export default ControlPanel;
