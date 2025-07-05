import { bind } from "astal";
import { App, Astal, Gtk, Gdk, Widget } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import { GdkMonitorToHypr, getMonitorWorkspace } from "../../utils.ts";
import giCairo from "cairo";

const start = Math.PI * -0.5;
const interval = (Math.PI * 1) / 3;

const WallpaperWorkspace = (gdkmonitor: Gdk.Monitor) => {
    const mon = GdkMonitorToHypr(gdkmonitor);
    const hypr = Hyprland.get_default();

    let mid = {
        x: mon.width / 2,
        y: mon.height / 2,
    };

    return (
        <window
            name={"wallpaperWorkspace" + GdkMonitorToHypr(gdkmonitor).id}
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.IGNORE}
            layer={Astal.Layer.BOTTOM}
            anchor={
                Astal.WindowAnchor.TOP |
                Astal.WindowAnchor.BOTTOM |
                Astal.WindowAnchor.LEFT |
                Astal.WindowAnchor.RIGHT
            }
            application={App}
        >
            <Widget.DrawingArea
                css={bind(hypr, "focusedWorkspace").as((_) => {
                    let ws = getMonitorWorkspace(mon.id);
                    if (ws <= 0) return;
                    let pos = (ws - 1) * interval;
                    return `font-size: ${pos}px; transition: 0.2s ease-out`;
                })}
                setup={(area) => {
                    area.connect("draw", (self, cr: giCairo.Context) => {
                        let styleContext = self.get_style_context();
                        let progress: any = styleContext.get_property(
                            "font-size",
                            Gtk.StateFlags.NORMAL,
                        );
                        if (!progress) progress = 0;

                        let hexSize = 196;
                        //let lineWidth = 4;

                        //hexSize = lineWidth / 2;
                        let startX = mid.x + hexSize * Math.cos(start);
                        let startY = mid.y + hexSize * Math.sin(start);
                        cr.moveTo(startX, startY);

                        for (let i = 1; i < 7; i++) {
                            let angle = start - interval * i;
                            let x = mid.x + hexSize * Math.cos(angle);
                            let y = mid.y + hexSize * Math.sin(angle);
                            cr.lineTo(x, y);
                        }

                        /*
                        hexSize += lineWidth;
                        for (let i = 0; i < 7; i++) {
                            let angle = start + interval * i;
                            let x = mid.x + hexSize * Math.cos(angle);
                            let y = mid.y + hexSize * Math.sin(angle);
                            cr.lineTo(x, y);
                        }
                        */

                        let circleSize = 245;
                        cr.arc(mid.x, mid.y, circleSize, 0, Math.PI * 2);

                        cr.closePath();
                        cr.clip();

                        cr.moveTo(mid.x, mid.y);
                        let preLineX =
                            mid.x +
                            hexSize * 2 * Math.cos(progress - interval * 1.5);
                        let preLineY =
                            mid.y +
                            hexSize * 2 * Math.sin(progress - interval * 1.5);

                        let postLineX =
                            mid.x +
                            hexSize * 2 * Math.cos(progress - interval / 2);
                        let postLineY =
                            mid.y +
                            hexSize * 2 * Math.sin(progress - interval / 2);

                        cr.setSourceRGBA(0.47, 0.66, 1, 1); // primary
                        // cr.setSourceRGBA(0.75, 0.66, 1, 1); // accent
                        cr.lineTo(preLineX, preLineY);
                        cr.lineTo(postLineX, postLineY);
                        cr.closePath();

                        cr.stroke();
                    });
                }}
            />
        </window>
    );
};

export default WallpaperWorkspace;
