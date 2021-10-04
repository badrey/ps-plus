import type {MediaDataPlus} from "../types";
import type {Media} from "./response-types";
import type {MediaLink} from "../../api/store-api-types";

export function parseMedia(media: Array<Media> = []): MediaDataPlus {
    const screenshots: Array<MediaLink> = [];
    let thumbnailUrl = "";
    let preview: string | null = null;
    media.forEach(({role, url, type}: Media) => {
        switch (role) {
            case "MASTER": {
                thumbnailUrl = url;
                break;
            }
            case "SCREENSHOT": {
                screenshots.push({url});
                break;
            }
            case "EDITION_KEY_ART": {
                preview = url;
                break;
            }
            case "GAMEHUB_COVER_ART": {
                if (!preview) {
                    preview = url;
                }
                break;
            }
            case "BACKGROUND": {
                if (!preview) {
                    preview = url;
                }
                break;
            }
        }
    });

    return {media: {screenshots}, thumbnailUrl, preview};
}
