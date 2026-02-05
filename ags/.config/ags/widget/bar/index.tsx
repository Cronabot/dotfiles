import { Astal, Gdk, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Hyprland from "gi://AstalHyprland";
import {
    GdkMonitorToHypr,
    getMonitorWorkspace,
    getMonitorWorkspaces,
} from "../../utils";
import { createState, onCleanup } from "ags";

const height = 3;

const Bar = ({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) => {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
    const mon = GdkMonitorToHypr(gdkmonitor);

    const hypr = Hyprland.get_default();

    const [mwss, setMwss] = createState<Hyprland.Workspace[]>([]);

    const id = hypr.connect("event", () => {
        setMwss(getMonitorWorkspaces(mon.id));
    });

    onCleanup(() => hypr.disconnect(id));

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
            <box orientation={Gtk.Orientation.VERTICAL}>
                <box>
                    {getMonitorWorkspaces(mon.id).map((ws) => (
                        <box
                            heightRequest={height}
                            hexpand
                            class={mwss.as(
                                (_) =>
                                    `indicator ${
                                        ws ===
                                        mwss.get()[
                                            getMonitorWorkspace(mon.id) - 1
                                        ]
                                            ? "active"
                                            : ws.clients.length > 0
                                              ? "populated"
                                              : "empty"
                                    }`,
                            )}
                        ></box>
                    ))}
                </box>
            </box>
        </window>
    );
};

export default Bar;
