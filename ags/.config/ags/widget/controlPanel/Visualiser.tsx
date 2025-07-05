import { Widget, Gtk } from "astal/gtk3";
import GObject from "gi://GObject";
import Cava from "gi://AstalCava";
import giCairo from "cairo";

const width = 1920;
const height = 250;

export const Visualiser = () => {
    const cava = Cava.get_default();

    return (
        <Widget.DrawingArea
            heightRequest={height}
            widthRequest={width}
            setup={(area) => {
                cava?.set_bars(128);
                cava?.connect("notify::values", () => {
                    area.queue_draw();
                });
                area.connect("draw", (self, cr: giCairo.Context) => {
                    let values = cava?.values;

                    if (!values) values = [0];

                    const interval = width / values.length;

                    cr.setSourceRGBA(0.47, 0.66, 1, 1); // primary

                    cr.moveTo(0, 0);
                    values.forEach((n, i) => {
                        cr.rectangle(i * interval, 0, interval + 1, n * height);
                        cr.fill();
                    });
                });
            }}
        />
    );
};
