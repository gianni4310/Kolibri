/**
 * @module kolibri.navigation.siteController
 */

import {Observable} from "../observable.js";

export { SiteController }


const SiteController = siteModel => {

    const gotoUriHash = uriHash => siteModel.activeUriHashObs.setValue(uriHash);

    // handles initial page load and page reload
    window.onload = () => gotoUriHash(window.location.hash);

    // handles navigation through the browser URL field, bookmarking, or browser previous/next
    window.onhashchange = () => gotoUriHash(window.location.hash);

    // the main Hash relates to the Controller that is used for activation and passivation
    const mainHash = uriHash => uriHash.split('/')[0]; // if there are subHashes, take the parent

    /**
     * Navigates to the {@link PageControllerType page} for the given {@link UriHash}.
     * This includes side-effecting the model, the browser incl. history, and
     * activating / passivating the involved {@link PageControllerType controllers}.
     *
     * @private
     * @impure
     * @param { !UriHash } newUriHash - this might include subHashes like `#parent/sub`
     * @param { ?UriHash } oldUriHash
     * @return { void }
     */
    const activateHash = (newUriHash, oldUriHash) => {

        // on initialization the active page might be null/undefined and passivation should not fail in that case
        siteModel.allPages[mainHash(oldUriHash)] ?. passivate();

        // effect: navigate to hash, trigger hashchanged event (?), add to history
        window.location.hash = newUriHash;

        siteModel.allPages[mainHash(newUriHash)].activate();
    };

    siteModel.activeUriHashObs.onChange( (newUriHash, oldUriHash) => {
        if ( null == siteModel.allPages[mainHash(newUriHash)] ) {
            gotoUriHash(ERROR_URI_HASH);
        } else {
            activateHash(newUriHash, oldUriHash);
        }
    });

    return /** @type { SiteControllerType } */{
        gotoUriHash
    }
};