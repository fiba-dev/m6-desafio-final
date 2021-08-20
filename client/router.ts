import { initWelcome } from "./pages/welcome";
import { initPlay } from "./pages/play";
import { initselection } from "./pages/selection";
import { initResultado } from "./pages/resultado";
import { selectRoom } from "./pages/room";
import { inputName } from "./pages/name";
import { shareCode } from "./pages/shareCode";
import { waitingRoom } from "./pages/waitingRoom";
import { FullRoom } from "./pages/fullRoom";

//router igual como se estuvo usando en clases anteriores

export function initRouter(container: Element) {
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(route) {
    const contenedorEl = document.querySelector(".contenedor");
    const routes = [
      {
        path: /\//,
        component: initWelcome,
      },
      { path: /\/full-room/, component: FullRoom },
      { path: /\/welcome/, component: initWelcome },
      { path: /\/select-room/, component: selectRoom },
      { path: /\/input-name/, component: inputName },
      { path: /\/share-code/, component: shareCode },
      { path: /\/waiting-room/, component: waitingRoom },

      { path: /\/play/, component: initPlay },
      { path: /\/selection/, component: initselection },
      { path: /\/resultado/, component: initResultado },
    ];
    for (const i of routes) {
      if (i.path.test(route)) {
        const el = i.component({ goTo: goTo });

        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el);
      }
    }
  }
  handleRoute(location.pathname);
  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
