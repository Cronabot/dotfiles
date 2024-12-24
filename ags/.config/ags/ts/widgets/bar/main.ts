import { LeftModules } from "./leftModules";
import { CenterModules } from "./centerModules";
import { RightModules } from "./rightModules";
import { WidgetFunction } from "ts/utils";
import { Window, Box, CenterBox } from "resource:///com/github/Aylur/ags/widget.js";

export const Bar: WidgetFunction = (monitor = 0) => Window({
    name: `bar${monitor}`,
    monitor: monitor,
    exclusivity: "exclusive",
    anchor: ["top", "left", "right"],
    child: CenterBox({
        class_name: 'bar-bg',
        start_widget: LeftModules(monitor),
        center_widget: CenterModules(),
        end_widget: RightModules(),
    }),
})

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
