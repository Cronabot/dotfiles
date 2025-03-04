import Battery from "gi://AstalBattery"
import { bind, Variable } from "astal"

export const BatteryInfo = () => {
    const bat = Battery.get_default()

    const batState = bind(bat, "state").as(s => {
        switch (s) {
            case Battery.State.CHARGING:
                return "↑"
            case Battery.State.DISCHARGING:
                return "↓"
            case Battery.State.FULLY_CHARGED:
                return "~"
            default:
                return "!"
        }
    })

    const batPercent = bind(bat, "percentage").as(p => {
        return Math.round(p*100) + "%"
    })

    const formattedBat = Variable.derive([batState, batPercent], (s, p) => s + p)

    return <label 
        visible={bind(bat, "isPresent")}
        label={bind(formattedBat)}
    />
}
