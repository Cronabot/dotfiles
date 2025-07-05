import { GLib, Variable } from "astal";
import { Widget, Gtk, Gdk, astalify, type ConstructProps } from "astal/gtk3";
import GObject from "gi://GObject";
import Mpris from "gi://AstalMpris";
import { bind } from "astal";
import { ellipsisTruncate } from "../../utils";

// subclass, register, define constructor props
class ProgressBar extends astalify(Gtk.ProgressBar) {
    static {
        GObject.registerClass(this);
    }

    constructor(
        props: ConstructProps<
            ProgressBar,
            Gtk.ProgressBar.ConstructorProps,
            { onColorSet: [] } // signals of Gtk.ColorButton have to be manually typed
        >,
    ) {
        super(props as any);
    }
}

export const Player = ({
    focused,
    player,
}: {
    focused: boolean;
    player: Mpris.Player;
}) => {
    const songName = Variable.derive(
        [bind(player, "title"), bind(player, "artist")],
        (t: string, a: string) => {
            return `${ellipsisTruncate(t || "", 20)} - ${ellipsisTruncate(a || "", 15)}`;
        },
    );
    return (
        <box className="panel" vertical>
            <Widget.Label
                label={bind(songName)}
                hexpand
                halign={Gtk.Align.CENTER}
            />
            <ProgressBar
                className="playerProgress"
                fraction={bind(player, "position").as((pos) => {
                    return pos / player.get_length();
                })}
                widthRequest={300}
            />

            <box hexpand halign={Gtk.Align.CENTER} spacing={12}>
                <button
                    expand
                    halign={Gtk.Align.START}
                    className="player-button"
                    onClick={() => player.previous()}
                >
                    <label></label>
                </button>
                <button
                    expand
                    halign={Gtk.Align.CENTER}
                    className="player-button"
                    onClick={() => player.play_pause()}
                >
                    <label
                        label={bind(player, "playbackStatus").as((st) =>
                            st ? "" : "",
                        )}
                    />
                </button>
                <button
                    expand
                    halign={Gtk.Align.END}
                    className="player-button"
                    onClick={() => player.next()}
                >
                    <label></label>
                </button>
            </box>
        </box>
    );
};
