import { Astal, Gtk, Gdk } from "astal/gtk3"
import { bind, Gio } from "astal"
import Tray from "gi://AstalTray"

function createMenu(menuModel: Gio.MenuModel, actionGroup: Gio.ActionGroup): Gtk.Menu {
    const menu = Gtk.Menu.new_from_model(menuModel);
    menu.insert_action_group("dbusmenu", actionGroup);
    return menu;
}

const TrayItem = (item: Tray.TrayItem) => {
    const menu = createMenu(item.menuModel, item.actionGroup)
    return <button
        className="tray-item"
        tooltipText={bind(item, "tooltipMarkup")}
        onClick={(b, e) => {
            if (e.button == Astal.MouseButton.PRIMARY) item.activate(e.x, e.y)
            if (e.button == Astal.MouseButton.SECONDARY) {
                menu?.popup_at_widget(b, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
            }
        }}
    >
        <icon gicon={bind(item, "gicon")} />
    </button>
}

export const TrayContainer = () => {
    const tray = Tray.get_default()
    
    return <box visible={bind(tray, "items").as(i => i.length > 0)}>
        <eventbox className="tray">
            <box>
                {bind(tray, "items").as(items => {
                    return items.map(TrayItem)
                })}
            </box>
        </eventbox>
        <label label="•" />
    </box>
}
