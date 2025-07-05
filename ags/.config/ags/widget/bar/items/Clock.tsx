import { GLib, Variable } from "astal"

export const Clock = () => {
    const time = Variable<string>("").poll(3000, () =>
        GLib.DateTime.new_now_local().format("%H:%M")!)

    return <eventbox className="eb-clock">
        <label
        onDestroy={() => time.drop()}
        label={time()}
        />
    </eventbox>
}
