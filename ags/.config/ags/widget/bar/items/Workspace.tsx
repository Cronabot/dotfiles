import { bind } from "astal";
import { Widget, Gtk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import { GdkMonitorToHypr, getMonitorWorkspace } from "../../../utils.ts";

export const Workspace = ({ mon }: { mon: Hyprland.Monitor }) => {
    const hypr = Hyprland.get_default();

    return (
        <box hexpand={true}>
            <label
                label={bind(hypr, "focusedWorkspace").as((ws) => {
                    return getMonitorWorkspace(mon.id).toString();
                })}
            />
        </box>
    );
};
