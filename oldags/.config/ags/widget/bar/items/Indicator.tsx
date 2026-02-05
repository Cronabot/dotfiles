import { bind } from "astal";
import { Widget, Gtk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import { getMonitorWorkspace, getMonitorWorkspaces } from "../../../utils.ts";
import giCairo from "cairo";

const width = 3;

export const Indicator = ({ mon }: { mon: Hyprland.Monitor }) => {
    const hypr = Hyprland.get_default();

    return (
        <Widget.DrawingArea
            className="indicator"
            heightRequest={width}
            widthRequest={mon.width}
            setup={(area) => {
                hypr.connect("event", (_self, _event, _args) => {
                    let ws = getMonitorWorkspace(mon.id);
                    if (ws <= 0) return;
                    let pos =
                        ((ws - 1) * mon.width) /
                        getMonitorWorkspaces(mon.id).length;

                    area.css = `font-size: ${pos}px; transition: 0.2s ease-out`;
                    area.queue_draw();
                });
                area.connect("draw", (self, cr: giCairo.Context) => {
                    let styleContext = self.get_style_context();
                    let progress: any = styleContext.get_property(
                        "font-size",
                        Gtk.StateFlags.NORMAL,
                    );
                    if (!progress) progress = 0;

                    cr.setSourceRGBA(0.47, 0.66, 1, 1); // primary
                    cr.moveTo(0, 0);

                    const workspaces = getMonitorWorkspaces(mon.id);

                    const interval = mon.width / workspaces.length;

                    // Draw Workspaces first
                    for (let i = 0; i < 10; i++) {
                        cr.setSourceRGBA(0.75, 0.66, 1, 1); // accent
                        if (workspaces[i].clients.length <= 0) {
                            cr.rectangle(interval * i + 1, 0, interval - 2, 1);
                            cr.fill();
                        } else {
                            cr.rectangle(
                                interval * i + 1,
                                0,
                                interval - 2,
                                width,
                            );
                            cr.fill();
                        }
                    }
                    // Then draw active on top
                    cr.setSourceRGBA(0.47, 0.66, 1, 1); // primary
                    cr.rectangle(progress + 1, 0, interval - 2, width);
                    cr.fill();
                });
            }}
        />
    );
};
