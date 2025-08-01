import { Widget, Gtk } from "astal/gtk3";
import { bind } from "astal";
import Network from "gi://AstalNetwork";

export const WifiDisp = () => {
    const network = Network.get_default();

    return (
        <box
            className="panel"
            spacing={4}
            child={bind(network, "wifi").as((wifi) => {
                return (
                    <>
                        <icon icon={wifi.iconName} />
                        <label expand={true} halign={Gtk.Align.END}>
                            {wifi.ssid}
                        </label>
                    </>
                );
            })}
        ></box>
    );
};
