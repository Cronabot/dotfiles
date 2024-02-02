import { Widget } from "resource:///com/github/Aylur/ags/widget.js";

import { LeftModules } from "./leftModules";
import { CenterModules } from "./centerModules";
import { RightModules } from "./rightModules";
import { WidgetFunction } from "ts/utils";

export const Bar: WidgetFunction = (monitor = 0) => Widget.Window({
    name: `bar${monitor}`,
    monitor: monitor,

    exclusivity: "exclusive",
    anchor: ["top", "left", "right"],
    child: Widget.CenterBox({
        class_name: 'bar-bg',
        start_widget: LeftModules(),
        center_widget: CenterModules(),
        end_widget: RightModules(),
    }),
})
