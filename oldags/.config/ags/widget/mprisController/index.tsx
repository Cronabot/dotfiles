import Mpris from "gi://AstalMpris";
import { App, Astal, Gtk, Widget } from "astal/gtk3";
import { bind } from "astal";
import { mprisControllerExpanded } from "../../app";

const MprisController = () => {
    const mp = Mpris.get_default();

    return (
        <window
            name={"mprisController"}
            namespace="mpris-controller"
            className="mpris-controller"
            visible={true}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.OVERLAY}
            anchor={
                Astal.WindowAnchor.TOP |
                Astal.WindowAnchor.RIGHT |
                Astal.WindowAnchor.LEFT
            }
            application={App}
        >
            {/* mini box */}
            <box className="container" halign={Gtk.Align.CENTER}>
                <box vertical>
                    <label>hi</label>
                    <revealer
                        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
                        revealChild={bind(mprisControllerExpanded)}
                    >
                        <label>hello</label>
                    </revealer>
                </box>
            </box>
        </window>
    );
};

export default MprisController;

/*

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

*/
