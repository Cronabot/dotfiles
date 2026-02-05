import app from "ags/gtk4/app";
import style from "./style.scss";
import Bar from "./widget/bar/index";
import { Gdk, Gtk } from "ags/gtk4";
import { For, createBinding } from "ags";

const main = () => {
    const monitors = createBinding(app, "monitors");

    return (
        <For each={monitors} cleanup={(win) => (win as Gtk.Window).destroy()}>
            {(monitor) => <Bar gdkmonitor={monitor} />}
        </For>
    );
};

app.start({
    css: style,
    main,
});
