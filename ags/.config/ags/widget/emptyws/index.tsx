import { Astal, Gdk, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Hyprland from "gi://AstalHyprland";
import {
    GdkMonitorToHypr,
    getMonitorWorkspace,
    getMonitorWorkspaces,
} from "../../utils";
import { createState, onCleanup } from "ags";

const EmptyWs = ({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) => {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
    const mon = GdkMonitorToHypr(gdkmonitor);

    const hypr = Hyprland.get_default();

    const [mwss, setMwss] = createState<Hyprland.Workspace[]>([]);

    const id = hypr.connect("event", () => {
        setMwss(getMonitorWorkspaces(mon.id));
    });

    onCleanup(() => hypr.disconnect(id));

    let images = [];

    for (let i = 1; i <= 10; i++) {
        let str = `/home/ec/wallpapers/icons/${i.toString().padStart(2, "0")}.png`;
        console.log(str);
        const img = Gtk.Image.new_from_file(str);
        console.log(img.file);
        img.pixelSize = mon.width / 10;
        images.push(img);
    }

    return (
        <window
            visible
            name="bar"
            class="Bar"
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
            application={app}
        >
            <revealer
                transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
                revealChild={mwss.as(
                    (_) =>
                        getMonitorWorkspaces(mon.id)[
                            getMonitorWorkspace(mon.id) - 1
                        ].clients.length == 0,
                )}
            >
                <box>{images}</box>
            </revealer>
        </window>
    );
};

export default EmptyWs;
