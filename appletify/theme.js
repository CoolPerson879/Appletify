(function moveNavElementsMod() {
  const globalNavBar = document.querySelector("#global-nav-bar");
  const navTarget = document.querySelector(
    "#Desktop_LeftSidebar_Id > nav > div"
  );
  const searchSection = document.querySelector(
    "#global-nav-bar > div.main-globalNav-searchSection"
  );
  const libraryContainer = document.querySelector(
    "#Desktop_LeftSidebar_Id > nav > div > div.main-yourLibraryX-libraryContainer.YourLibraryX"
  );
  const newElement = document.querySelector(".gglUjikTBtMzCZFgSmpS");
  const nowPlayingWidget = document.querySelector(
    ".main-nowPlayingWidget-nowPlaying"
  );

  if (
    !globalNavBar ||
    !navTarget ||
    !searchSection ||
    !libraryContainer ||
    !newElement ||
    !nowPlayingWidget
  ) {
    setTimeout(moveNavElementsMod, 300);
    return;
  }

  navTarget.insertBefore(globalNavBar, navTarget.firstChild);
  libraryContainer.insertBefore(searchSection, libraryContainer.firstChild);
  nowPlayingWidget.appendChild(newElement);
})();

// Window controls functionality
(function addWindowControls() {
  function createWindowControls() {
    if (document.querySelector(".window-controls")) return;

    const windowControls = document.createElement("div");
    windowControls.className = "window-controls";
    windowControls.style.cssText = `
      position: fixed;
      top: 0px;
      left: 0px;
      display: flex;
      z-index: 99999;
      pointer-events: auto;
      -webkit-app-region: no-drag;
    `;

    const closeBtn = document.createElement("button");
    closeBtn.className = "window-control-btn close-btn";
    closeBtn.title = "Close Spotify";
    closeBtn.style.cssText = `
      height: 6px;
      width: 120px;
      border-radius: 0px 0px 6px 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
      outline: none;
      background-color: #fa586a;
      pointer-events: auto;
      -webkit-app-region: no-drag;
      position: relative;
      overflow: hidden;
    `;

    // Add hover effects
    closeBtn.addEventListener("mouseenter", () => {
      closeBtn.style.height = "30px";
      closeBtn.style.backgroundColor = "#e8455a";
    });

    closeBtn.addEventListener("mouseleave", () => {
      closeBtn.style.height = "6px";
      closeBtn.style.backgroundColor = "#fa586a";
    });

    closeBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Close button clicked");
      if (window.require) {
        try {
          const { remote } = window.require("electron");
          remote.getCurrentWindow().close();
        } catch (err) {
          console.log("Remote not available, trying window.close()");
          window.close();
        }
      } else {
        window.close();
      }
    };

    windowControls.appendChild(closeBtn);

    document.body.appendChild(windowControls);
    console.log("Window controls created and added to page");
  }

  function initWindowControls() {
    setTimeout(() => {
      createWindowControls();
    }, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWindowControls);
  } else {
    initWindowControls();
  }
})();

(function SpotifySearchMod() {
  const selector = '[data-encore-id="formInput"]';
  if (!document.querySelector(selector)) {
    setTimeout(SpotifySearchMod, 300);
    return;
  }

  function modifySearchPlaceholder() {
    const searchInput = document.querySelector(selector);
    if (searchInput) {
      searchInput.placeholder = "Search";
    }
  }

  modifySearchPlaceholder();

  const searchObserver = new MutationObserver(modifySearchPlaceholder);
  const searchInput = document.querySelector(selector);
  if (searchInput) {
    searchObserver.observe(searchInput, {
      attributes: true,
      attributeFilter: ["placeholder"],
    });
  }
})();

function enhanceImageSizes() {
  document
    .querySelectorAll(".main-image-image.main-entityHeader-image[srcset]")
    .forEach((img) => {
      img.setAttribute("sizes", "9999px");
    });

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (
              node.matches(".main-image-image.main-entityHeader-image[srcset]")
            ) {
              node.setAttribute("sizes", "9999px");
            }
            node
              .querySelectorAll(
                ".main-image-image.main-entityHeader-image[srcset]"
              )
              .forEach((img) => {
                img.setAttribute("sizes", "9999px");
              });
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", enhanceImageSizes);
} else {
  enhanceImageSizes();
}
