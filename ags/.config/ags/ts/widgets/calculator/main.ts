import { WidgetFunction } from "ts/utils";
import { Window, Box, EventBox, Button, Entry } from "resource:///com/github/Aylur/ags/widget.js";
import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";
import { execAsync } from "resource:///com/github/Aylur/ags/utils/exec.js";

const calculatorButtons = [
    ["(", ")", "%", "C"],
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
]

const CalculatorInputs = () => Box({
    children: [
        Box({ // Row Container
            vertical: true,
            children: calculatorButtons.map(i => {
                return Box({
                    children: i.map(j => {
                        return Button({
                            label: j
                        })
                    })
                })        
            })
        })
    ]
})

const CalculationDisplay = Entry({
    text: "",
    onAccept: ({ text }) => { 
        execAsync("wl-copy " + eval(text || "")).catch(e => print(e))
    }
})

export const Calculator: WidgetFunction = () => Window({
    name: `calculator`,
    exclusivity: "ignore", 
    keymode: "exclusive",
    visible: false,
    anchor: ["bottom"],
    monitor: hyprland.bind("active").as(active => active.monitor.id),
    layer: "overlay",
    class_name: "calc-window",
    child: Box({
        children: [
            EventBox({
                class_name: "calc-bg",
                margin_bottom: 9,
                child: Box({
                    vertical: true,
                    spacing: 8,
                    children: [
                        Box({
                            class_name: "calc-main",
                            vertical: true,
                            children: [
                                CalculationDisplay,
                                CalculatorInputs()
                            ]
                        }),
                    ] 
                }),
            }),
        ]
    }),
    setup: self => {
        return self.keybind("Escape", () => {
            App.closeWindow(self.name || "")
        })
    }
})
