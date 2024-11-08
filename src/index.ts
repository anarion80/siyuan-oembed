import {
    Plugin,
    showMessage,
    Dialog,
    getFrontend,
    IModel,
    IMenuItemOption,
    getBackend,
} from "siyuan";
import {IMenuItem} from "siyuan/types";
import "@/index.scss";

import { BlockIconTemplate, createBlockIconConfig, SlashCommandTemplates, ToolbarCommandsTemplates } from "./config";
import { builtinEditTools } from "@/libs/const";
import { processSelectedBlocks } from "./convert";
import { setPlugin } from "@/utils/plugin";
import { logger } from "./utils/logger";
import { settings } from "./settings";
import Settings from "@/libs/components/Settings.svelte";

export default class OembedPlugin extends Plugin {
    customTab: () => IModel;
    private blockIconEventBindThis = this.blockIconEvent.bind(this);
    private isMobile: boolean;
    init() {
        setPlugin(this);
    }
    
    updateProtyleToolbar(toolbar: Array<string | IMenuItem>) {
        toolbar.push(...Object.values(ToolbarCommandsTemplates))
        return toolbar;
    }

    async onload() {
        this.init();

        logger.debug("Loading oembed plugin", this.i18n);
        let start = performance.now();

        const frontEnd = getFrontend();
        this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";
        const backEnd = getBackend();
        logger.debug("Environment", { backEnd, frontEnd });
        this.addIcons(`<symbol id="iconOembed" viewBox="0 0 32 32">
            <path d="M 16.0314 0.109395 C 7.2121 0.109396 0.0626228 7.25887 0.0626218 16.0782 C 0.062623 24.8975 7.2121 32.047 16.0314 32.047 C 24.8508 32.047 32.0002 24.8975 32.0002 16.0782 C 32.0002 7.25887 24.8508 0.109396 16.0314 0.109395 Z M 16.0314 3.99417 C 19.2364 3.99399 22.3101 5.26707 24.5763 7.5333 C 26.8426 9.79954 28.1156 12.8733 28.1155 16.0782 C 28.1156 19.2831 26.8426 22.3569 24.5763 24.6231 C 22.3101 26.8893 19.2364 28.1624 16.0314 28.1622 C 12.8265 28.1624 9.75276 26.8893 7.48653 24.6231 C 5.2203 22.3569 3.94722 19.2831 3.9474 16.0782 C 3.94722 12.8733 5.2203 9.79954 7.48653 7.5333 C 9.75276 5.26707 12.8265 3.99399 16.0314 3.99417 Z M 16.6056 7.47075 L 13.2697 24.4982 L 15.5002 24.9357 L 18.8361 7.90825 L 16.6056 7.47075 Z M 20.4006 9.86724 L 18.8342 11.4356 L 23.465 16.0684 L 18.8127 20.7208 L 20.3811 22.2872 L 25.0334 17.6348 L 25.0393 17.6407 L 26.6076 16.0743 L 20.4006 9.86724 Z M 11.7267 9.92974 L 7.07437 14.5841 L 7.06851 14.5782 L 5.50014 16.1446 L 11.7052 22.3497 L 13.2736 20.7833 L 8.64078 16.1505 L 13.2951 11.4981 L 11.7267 9.92974 Z" />
        </symbol>`);

        this.eventBus.on("click-blockicon", this.blockIconEventBindThis);

        settings.setPlugin(this);

        await Promise.all([settings.load()]);

        this.protyleSlash = Object.values(SlashCommandTemplates).map((template) => {
            return {
                filter: template.filter,
                html: `<div class="b3-list-item__first"><svg class="b3-list-item__graphic"><use xlink:href="#${template.icon}"></use></svg><span class="b3-list-item__text">${template.name}</span><span class="b3-list-item__meta">${template.template}</span></div>`,
                id: template.name,
                callback: template.callback,
            };
        });

        let end = performance.now();
        logger.debug(`Loading oembed completed in ${end - start} ms`);
        logger.debug("Environment", { backEnd, frontEnd });
    }

    async onunload() {
        this.eventBus.on("click-blockicon", this.blockIconEventBindThis);
        showMessage("Unloading Siyuan-Oembed");
    }

    uninstall() {
        logger.debug("uninstall");
    }

    openSetting(): void {
        let dialog = new Dialog({
            //@ts-ignore
            title: `${this.displayName} <code class="fn__code">${this.name}</code>`,
            content: `<div id="SettingsPanel" class="fn__flex-column" />`,
            width: this.isMobile ? "92vw" : "720px",
            height: this.isMobile ? undefined : "600px",
            destroyCallback: () => {
                panel.$destroy();
            },
        });
        let panel = new Settings({
            target: dialog.element.querySelector("#SettingsPanel"),
        });
    }

    private attachClickHandler(template: BlockIconTemplate, blockElements: HTMLElement[]): IMenuItemOption {
        return {
            ...template,
            click: async () => {
                await processSelectedBlocks(blockElements, template.handler);
            },
        };
    }

    // Add block icon menu
    private blockIconEvent({
        detail,
    }: {
        detail: {
            blockElements: HTMLElement[];
            menu: { addItem: (item: IMenuItemOption) => void };
        };
    }) {
        const blockIconCommandTemplates = createBlockIconConfig();

        const submenus: IMenuItemOption[] = blockIconCommandTemplates.map((template) =>
            this.attachClickHandler(template, detail.blockElements)
        );

        detail.menu.addItem({
            icon: "iconOembed",
            label: this.i18n.name,
            type: "submenu",
            submenu: submenus,
        });
    }
}
