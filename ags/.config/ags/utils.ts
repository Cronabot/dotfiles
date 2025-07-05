import { Gdk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";

export const getMonitorWorkspace = (monitor: number): number => {
    const hypr = Hyprland.get_default();

    if (!hypr.monitors[monitor]) return -1;

    let sortedMons = hypr.monitors.sort((a, b) => a.id - b.id);
    let activeWs = sortedMons[monitor].activeWorkspace;
    if (!activeWs) return -1;
    let wsStr = activeWs.id.toString();
    let strippedws =
        wsStr.length === 1 ? wsStr : wsStr.padStart(3, "0").slice(1);

    let wsInt = parseInt(strippedws);
    return wsInt;
};

export const getMonitorWorkspaces = (monitor: number): Hyprland.Workspace[] => {
    const sortF = (a: any, b: any) => a.id - b.id;

    const hypr = Hyprland.get_default();

    if (!hypr.monitors[monitor]) return [];

    let sortedMons = hypr.monitors.sort(sortF);

    const workspaces = hypr.workspaces.filter((ws) => {
        const wsMon = ws.id.toString().padStart(3, "0")[0];
        if (wsMon == sortedMons[monitor].id.toString()) return true;
        return false;
    });

    workspaces.sort(sortF);

    return workspaces;
};

export const GdkMonitorToHypr = (gdkmonitor: Gdk.Monitor): Hyprland.Monitor => {
    const hypr = Hyprland.get_default();

    let found = hypr.monitors.filter((mon) => mon.model == gdkmonitor.model);
    return found[0];
};

export const ellipsisTruncate = (text: string, limit: number): string => {
    if (text.length > limit) {
        return text.slice(0, limit - 2) + "...";
    }
    return text;
};
