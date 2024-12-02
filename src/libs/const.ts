import { IToolbarItem } from "siyuan";

export const BlockType2NodeType: {[key in BlockType]: string} = {
    d: 'NodeDocument',
    p: 'NodeParagraph',
    query_embed: 'NodeBlockQueryEmbed',
    l: 'NodeList',
    i: 'NodeListItem',
    h: 'NodeHeading',
    iframe: 'NodeIFrame',
    tb: 'NodeThematicBreak',
    b: 'NodeBlockquote',
    s: 'NodeSuperBlock',
    c: 'NodeCodeBlock',
    widget: 'NodeWidget',
    t: 'NodeTable',
    html: 'NodeHTMLBlock',
    m: 'NodeMathBlock',
    av: 'NodeAttributeView',
    audio: 'NodeAudio'
}

export const NodeIcons = {
    NodeAttributeView: {
        icon: "iconDatabase"
    },
    NodeAudio: {
        icon: "iconRecord"
    },
    NodeBlockQueryEmbed: {
        icon: "iconSQL"
    },
    NodeBlockquote: {
        icon: "iconQuote"
    },
    NodeCodeBlock: {
        icon: "iconCode"
    },
    NodeDocument: {
        icon: "iconFile"
    },
    NodeHTMLBlock: {
        icon: "iconHTML5"
    },
    NodeHeading: {
        icon: "iconHeadings",
        subtypes: {
            h1: { icon: "iconH1" },
            h2: { icon: "iconH2" },
            h3: { icon: "iconH3" },
            h4: { icon: "iconH4" },
            h5: { icon: "iconH5" },
            h6: { icon: "iconH6" }
        }
    },
    NodeIFrame: {
        icon: "iconLanguage"
    },
    NodeList: {
        subtypes: {
            o: { icon: "iconOrderedList" },
            t: { icon: "iconCheck" },
            u: { icon: "iconList" }
        }
    },
    NodeListItem: {
        icon: "iconListItem"
    },
    NodeMathBlock: {
        icon: "iconMath"
    },
    NodeParagraph: {
        icon: "iconParagraph"
    },
    NodeSuperBlock: {
        icon: "iconSuper"
    },
    NodeTable: {
        icon: "iconTable"
    },
    NodeThematicBreak: {
        icon: "iconLine"
    },
    NodeVideo: {
        icon: "iconVideo"
    },
    NodeWidget: {
        icon: "iconBoth"
    }
};

export const STORAGE_NAME = "menu-config";
export const CUSTOM_ATTRIBUTE = "custom-oembed-link";

export const defaultBookmarkCardStyle = `
        .kg-card {
            font-family:
                'Inter Variable',
                ui-sans-serif,
                system-ui,
                -apple-system,
                BlinkMacSystemFont,
                Segoe UI,
                Roboto,
                Helvetica Neue,
                Arial,
                Noto Sans,
                sans-serif,
                Apple Color Emoji,
                Segoe UI Emoji,
                Segoe UI Symbol,
                Noto Color Emoji;
            font-size: 1rem;
        }
        .kg-card-main {
            max-width: 800px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
        }
        .kg-card-outer {
            width: 100%;
        }
        .kg-bookmark-card,
        .kg-bookmark-card * {
            box-sizing: border-box;
        }
        .kg-bookmark-card,
        .kg-bookmark-publisher {
            position: relative;
            /* width: 100%; */
        }
        .kg-bookmark-card a.kg-bookmark-container,
        .kg-bookmark-card a.kg-bookmark-container:hover {
            display: flex;
            background: var(--bookmark-background-color);
            text-decoration: none;
            border-radius: 6px;
            border: 1px solid rgb(124 139 154 / 25%);
            overflow: hidden;
            color: var(--bookmark-text-color);
        }
        .kg-bookmark-content {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 100%;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 20px;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
                'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }
        .kg-bookmark-title {
            font-size: 15px;
            line-height: 1.4em;
            font-weight: 600;
        }
        .kg-bookmark-description {
            display: -webkit-box;
            font-size: 14px;
            line-height: 1.5em;
            margin-top: 3px;
            font-weight: 400;
            max-height: 44px;
            overflow-y: hidden;
            opacity: 0.7;
        }
        .kg-bookmark-metadata {
            display: flex;
            align-items: center;
            margin-top: 22px;
            width: 100%;
            font-size: 14px;
            font-weight: 500;
            white-space: nowrap;
        }
        .kg-bookmark-metadata>*:not(img) {
            opacity: 0.7;
        }
        .kg-bookmark-icon {
            width: 20px;
            height: 20px;
            margin-right: 6px;
        }
        .kg-bookmark-author,
        .kg-bookmark-publisher {
            display: inline;
        }
        .kg-bookmark-publisher {
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 240px;
            white-space: nowrap;
            display: block;
            line-height: 1.65em;
        }
        .kg-bookmark-metadata>span:nth-of-type(2) {
            font-weight: 400;
        }
        .kg-bookmark-metadata>span:nth-of-type(2):before {
            content: '•';
            margin: 0 6px;
        }
        .kg-bookmark-metadata>span:last-of-type {
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .kg-bookmark-thumbnail {
            position: relative;
            flex-grow: 1;
            min-width: 33%;
        }
        .kg-bookmark-thumbnail img {
            /* width: 100%; */
            height: 100%;
            object-fit: cover;
            /* or contain */
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 0 2px 2px 0;
        }`;
