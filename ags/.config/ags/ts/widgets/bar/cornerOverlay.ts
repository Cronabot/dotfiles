import { Box, CenterBox, Window } from "resource:///com/github/Aylur/ags/widget.js";
import { WidgetFunction } from "../../utils";

export const BarCornerOverlay: WidgetFunction = (monitor = 0) => Window({
    name: `baric${monitor}`,
    monitor: monitor,

    click_through: true,
    anchor: ["top", "left", "right"],
    child: CenterBox({
        start_widget: Box({
            class_name: "b-icl",
        }),
        end_widget: Box({
            class_name: "b-icr",
        }),

    })
})
