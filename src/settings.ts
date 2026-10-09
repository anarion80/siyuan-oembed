import OembedPlugin from "@/index";
import { eventBus } from "@/utils/event-bus";
import { logger } from "@/utils/logger";

interface Item {
    key: SettingsKey;
    value: any;
}

const SettingsFile = "PluginOembed.json.txt";

class SettingsManager {
    plugin: OembedPlugin;

    settings: any = {
        EnableDebug: false as boolean,
        CatchClipboard: false as boolean,
        ClipboardConverter: "bookmarkCard" as ConvertType,
        OembedBlacklist: "" as string,
        BookmarkCardBlacklist: "" as string,
        BookmarkCustomCSS: "" as string,
    };

    constructor() {
        eventBus.subscribe(eventBus.EventSetting, (data: Item) => {
            this.set(data.key, data.value);
            this.save();
        });
    }

    setPlugin(plugin: OembedPlugin) {
        this.plugin = plugin;
    }

    get(key: SettingsKey) {
        return this.settings?.[key];
    }

    set(key: any, value: any) {
        logger.debug(`Setting update: ${key} = ${value}`);
        if (!(key in this.settings)) {
            logger.error(`"${key}" is not a setting`);
            return;
        }

        this.settings[key] = value;
    }

    async load() {
        const loaded = await this.plugin.loadData(SettingsFile);
        if (loaded == null || loaded == undefined || loaded == "") {
            logger.debug("No config file, use defaults");
            // Persist defaults only on the first run. Writing on every load makes the
            // kernel broadcast a plugin-storage change, which reloads this plugin in
            // every open frontend; each reload writes again and the loop never settles
            // (visible as endless "Unloading Siyuan-Oembed" toasts with 2+ frontends).
            this.save();
        } else {
            logger.debug("Reading config file:", SettingsFile);
            logger.debug("Config loaded:", loaded);

            if (typeof loaded === "string") {
                loaded = JSON.parse(loaded);
            }
            try {
                for (let key in loaded) {
                    this.set(key, loaded[key]);
                }
            } catch (error_msg) {
                logger.error("Error loading settings:", error_msg);
            }
        }
        eventBus.publish(eventBus.EventSettingLoaded, {});
    }

    async save() {
        let json = JSON.stringify(this.settings);
        logger.debug("Saving config file:", json);
        this.plugin.saveData(SettingsFile, json);
    }
}

export const settings: SettingsManager = new SettingsManager();
