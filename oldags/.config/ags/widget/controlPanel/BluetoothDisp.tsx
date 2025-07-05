import { Widget, Gtk } from "astal/gtk3";
import { bind } from "astal";
import Bluetooth from "gi://AstalBluetooth";

export const BluetoothDisp = () => {
    const bluetooth = Bluetooth.get_default();

    return (
        <box
            className="panel"
            spacing={4}
            child={bind(bluetooth, "devices").as((devices) => {
                return (
                    <>
                        <icon icon={""} />
                        <label expand={true} halign={Gtk.Align.END}>
                            {devices.length === 0
                                ? "No devices connected"
                                : devices.length === 1
                                  ? devices[0].name
                                  : devices.map((d) => d.name).join("")}
                        </label>
                    </>
                );
            })}
        ></box>
    );
};
