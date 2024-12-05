import { dom } from "../../../kolibri/util/dom.js";
import { URI_HASH_NEW_PAGE } from "../../../customize/uriHashes.js";
import { Page } from "../../../kolibri/navigation/page/page.js";

export { NewPage }

const PAGE_CLASS = URI_HASH_NEW_PAGE.substring(1);
const ACTIVATION_MS = 1250;
const PASSIVATION_MS = 1250;
const TITLE = "New Page";

/**
 * todo
 * @return { NewPage }
 * @constructor
 */
const NewPage = () => Page({
    titleText: TITLE,
    activationMs: ACTIVATION_MS,
    passivationMs: PASSIVATION_MS,
    pageClass: PAGE_CLASS,
    styleElement: /** @type { HTMLStyleElement } */ styleElement,
    contentElement: /** @type { HTMLElement } */ contentElement,
});

const [contentElement] = dom(`
    <div class="${PAGE_CLASS} prosa">
        <div class="img">
            <img src="./ball.svg" >
        </div>
        <h1>Ball Navigation</h1>


        <div class="content-sections">
           <section>
            <h2>Animation des Inhalts</h2>
            <p>Das Bild wird beim Aktivieren der Seite animiert, indem es von rechts ins Bild gleitet und sich dabei zwei Mal gegen den Uhrzeigersinn dreht. Diese Bewegung erzeugt eine dynamische und fließende visuelle Wirkung, die den Übergang zur neuen Seite betont. Beim Verlassen der Seite verschwindet das Bild nach links aus dem Bild, wobei es erneut gedreht wird und an Transparenz verliert.</p>
            <p>Die Inhaltssektionen (Textbereiche) gleiten beim Aktivieren der Seite von unten nach oben ins Bild. Dabei wird eine sanfte Bewegung angewandt, die den Eindruck eines aufsteigenden Inhaltes vermittelt. Anders als das Bild bleiben die Textbereiche beim Verlassen der Seite statisch sichtbar und verändern weder ihre Position noch ihre Transparenz. Dies stellt sicher, dass die Informationen klar und stabil wirken.</p>
            <p>Durch diese Kombination von Animationen wird ein harmonisches Gleichgewicht zwischen dynamischen und statischen Elementen geschaffen. Das Bild dient als visuelles Highlight, während der Inhalt durch seine Stabilität den Fokus auf die Lesbarkeit legt.</p>
        </section>
    </div>
</div>
`);


const [styleElement] = dom(`
   <style data-style-id="${PAGE_CLASS}">
    @layer pageLayer {
        .${PAGE_CLASS} {

           
        .img {
          display: flex;
           justify-content: center; 
           align-items: center; 
           display: inline-block;
       
        }

            /* Aktivierung der .img */
            &.activate .img {
                animation: ${PAGE_CLASS}_img_in calc(var(--activation-ms) * 1ms) ease-out forwards;
            }

            /* Passivierung der .img */
            &.passivate .img {
                animation: ${PAGE_CLASS}_img_out calc(var(--passivation-ms) * 1ms) ease-in forwards;
            }

            /* Aktivierung der .content-sections */
            &.activate .content-sections {
                animation: ${PAGE_CLASS}_content_in calc(var(--activation-ms) * 1ms) ease-out forwards;
            }

            /* Keine Passivierungsanimation für .content-sections */
            &.passivate .content-sections {
                opacity: 1; /* Bleibt sichtbar */
                transform: translateY(0); /* Bleibt an Ort und Stelle */
            }
        }


        /* Keyframes für Aktivierung der .img */
        @keyframes ${PAGE_CLASS}_img_in {
           0% {
                opacity: 1;
                transform: translateX(500%)  scale(1) rotateZ(0deg);
            }
          
            100% {
                opacity: 1;
                transform: translateX(0%) scale(1) rotateZ(360deg);
            }
        }

        /* Keyframes für Passivierung der .img */
        @keyframes ${PAGE_CLASS}_img_out {
            0% {
                opacity: 1;
                transform: translateX(0%) scale(1) rotateZ(0deg);
            }
          
            100% {
                opacity: 0;
                transform: translateX(-500%) scale(1) rotateZ(-360deg);
            }
        }
    }
</style>

`);