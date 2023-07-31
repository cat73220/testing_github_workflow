import "../scss/app.scss";
import "focus-visible";
import "lazysizes";
import ScrollMagic from "scrollmagic";
import smoothscroll from "smoothscroll-polyfill";

const appPreviewVideoId = "app-preview-video";
const dropDownMenuButtonId = "drop-down-menu-button";
const dropDownMenuButtonToggleClassName = "header__button--close";
const dropDownMenuId = "drop-down-menu";
const dropDownMenuToggleClassName = "header__navigation--drop-down-menu";
const headerId = "header";
const headlineId = "headline";
const headerAnimateInClassName = "header--animate-in";
const headerAnimateOutClassName = "header--animate-out";
const inquiryButtonId = "inquiry-button";
const mobileApplicationStructuredDataPath = "/mobile-application.json";
const scrollToTopButtonId = "scroll-to-top-button";
const scrollToTopButtonAnimateInClassName = "footer__button--animated-in";
const scrollToTopButtonAnimateOutClassName = "footer__button--animated-out";
const zendeskColor = "#e60833";
const zendeskKey = "f47fba4f-ca1c-47b4-a9cb-94ba4c64e5d6";
const zendeskLocale = "ja";

const controller = new ScrollMagic.Controller();
smoothscroll.polyfill();

/**
 * Close drop-down menu on click outside.
 * @param {HTMLElement} dropDownMenuButton - drop-down menu button element
 * @param {HTMLElement} dropDownMenu       - drop-down menu element
 * @returns {Void} void
 */
const closeDropDownMenuOnClickOutside =
  (dropDownMenuButton: HTMLElement, dropDownMenu: HTMLElement) => {
    document.addEventListener("click", (event) => {
      const target = event.target as Node;

      if (target) {
        const isClickOutside = !dropDownMenuButton.contains(target);

        if (isClickOutside) {
          dropDownMenuButton.classList.remove(
            dropDownMenuButtonToggleClassName);
          dropDownMenu.classList.remove(dropDownMenuToggleClassName);
          dropDownMenuButton.setAttribute("aria-expanded", "false");
        }
      }
    });
  };

/**
 * Toggle header drop-down menu on click.
 * @returns {Void} void
 */
const toggleDropDownMenuOnClick = () => {
  const dropDownMenuButton = document.getElementById(dropDownMenuButtonId);
  const dropDownMenu = document.getElementById(dropDownMenuId);
  let firstDropDownMenuItem: ChildNode | null;

  if (dropDownMenuButton && dropDownMenu) {
    firstDropDownMenuItem = dropDownMenu.getElementsByTagName("a")[0];

    dropDownMenuButton.onclick = () => {
      const ariaExpanded = dropDownMenuButton.getAttribute("aria-expanded");
      dropDownMenuButton.classList.toggle(dropDownMenuButtonToggleClassName);
      dropDownMenu.classList.toggle(dropDownMenuToggleClassName);

      if (ariaExpanded === "false") {
        dropDownMenuButton.setAttribute("aria-expanded", "true");

        if (firstDropDownMenuItem) {
          (firstDropDownMenuItem as HTMLElement).focus();
        }
      } else {
        dropDownMenuButton.setAttribute("aria-expanded", "false");
        dropDownMenuButton.focus();
      }
    };
    closeDropDownMenuOnClickOutside(dropDownMenuButton, dropDownMenu);
  }
};

/**
 * Enable smooth scroll to hash links
 * @returns {Void} void
 */
const enableSmoothScrollToHashLinks = () => {
  document.querySelectorAll("a[href^=\"#\"").forEach(anchor => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      const href = anchor.getAttribute("href");

      if (href) {
        const querySelector = document.querySelector(href);

        if (querySelector) {
          querySelector.scrollIntoView({ behavior: "smooth" });
          (querySelector as HTMLElement).focus({ preventScroll: true });
        }
      }
    });
  });
};

/**
 * Hide header on scroll down and show header on scroll up
 * @returns {Void} void
 */
const toggleHeaderOnScroll = () => {
  const header = document.getElementById(headerId);
  const dropDownMenuButton = document.getElementById(dropDownMenuButtonId);

  if (header && dropDownMenuButton) {
    let previousScroll = window.scrollY || window.pageYOffset;
    let isDropDownMenuOpened = false;

    const handler = () => {
      const currentScroll = window.scrollY || window.pageYOffset;
      const thresholdFromTop = window.innerHeight / 2;
      const isEnabled = currentScroll > thresholdFromTop;
      const isScrollDown = currentScroll > previousScroll;
      const ariaExpanded = dropDownMenuButton.getAttribute("aria-expanded");

      if (ariaExpanded) {
        isDropDownMenuOpened = ariaExpanded === "true";
      }

      if (isEnabled && !isDropDownMenuOpened) {

        if (isScrollDown) {
          header.classList.add(headerAnimateOutClassName);
          header.classList.remove(headerAnimateInClassName);
        } else {
          header.classList.add(headerAnimateInClassName);
          header.classList.remove(headerAnimateOutClassName);
        }
      }

      previousScroll = currentScroll;
    };

    window.addEventListener("scroll", handler, false);
  }
};

/**
 * Show a scroll to top button on scroll down to the end of a document
 * @returns {Void} void
 */
const toggleScrollToTopButton = () => {
  const scrollToTopButton = document.getElementById(scrollToTopButtonId);
  const header = document.getElementById(headerId);
  const headline = document.getElementById(headlineId);

  if (scrollToTopButton && header && headline) {
    const scrollToShowHandler = () => {
      const currentScroll = window.scrollY || window.pageYOffset;
      const thresholdFromTop = headline.offsetHeight;
      const isVisible = currentScroll > thresholdFromTop;

      if (isVisible) {
        scrollToTopButton.classList.add(scrollToTopButtonAnimateInClassName);
        scrollToTopButton.classList.remove(
          scrollToTopButtonAnimateOutClassName
        );
      } else {
        scrollToTopButton.classList.add(scrollToTopButtonAnimateOutClassName);
        scrollToTopButton.classList.remove(scrollToTopButtonAnimateInClassName);
      }
    };

    const scrollToTopHandler = () => {
      window.scroll({
        top: 0
        , left: 0
        , behavior: "smooth"
      });
      header.classList.add(headerAnimateInClassName);
      header.classList.remove(headerAnimateOutClassName);
    };

    window.addEventListener("scroll", scrollToShowHandler, false);
    scrollToTopButton.addEventListener("click", scrollToTopHandler, false);
  }
};

/**
 * Set autoplay video attributes
 * @param {string} id - Target video id
 * @returns {Void} void
 */
const setAutoplayVideoAttributes = (id: string) => {
  const video = <HTMLMediaElement> document.getElementById(id);

  if (video) {
    video.autoplay = true;
    video.muted = true;
    video.preload = "none";
    video.defaultMuted = true;
    (video as any).playsInline = true;
  }
};

/**
 * Play a video on scroll
 * @param {string} id - Target video id
 * @returns {Void} void
 */
const playVideoOnScroll = (id: string) => {
  const video = <HTMLMediaElement> document.getElementById(id);

  if (video) {
    new ScrollMagic.Scene({
      triggerElement: video
      , triggerHook: 0.7
    })
      .on("enter", async () => await video.play())
      .addTo(controller);
  }
};

/**
 * Close the drop-down menu with escape key
 * @returns {Void} void
 */
const closeDropDownMenuWithEscapeKey = () => {
  const dropDownMenuButton = document.getElementById(dropDownMenuButtonId);
  const dropDownMenu = document.getElementById(dropDownMenuId);

  const handler = (event) => {

    if (dropDownMenuButton && dropDownMenu) {
      const ariaExpanded = dropDownMenuButton.getAttribute("aria-expanded");

      if (event.key === "Escape" && ariaExpanded === "true") {
        dropDownMenu.classList.remove(dropDownMenuToggleClassName);
        dropDownMenuButton.classList.remove(dropDownMenuButtonToggleClassName);
        dropDownMenuButton.setAttribute("aria-expanded", "false");
        dropDownMenuButton.focus();
      }
    }
  };

  document.addEventListener("keydown", handler);
};

/**
 * Add "animate-in" and "animate-out" classes to an element when it is visible
 * on scroll
 * @param {string} selectors - CSS selector
 * @param {number} triggerHook - position of trigger hook between 0 and 1
 * @returns {Void} void
 */
const animateOnScroll = (selectors: string, triggerHook: number) => {
  const elements =
    Array.from(document.querySelectorAll(selectors));
  elements.forEach(element => {
    const animateInClassName = "animate-in";
    const animateOutClassName = "animate-out";
    new ScrollMagic.Scene({
      triggerElement: element
      , triggerHook
      , duration: "70%"
    })
      .on("enter", () => element.classList.add(animateInClassName))
      .on("leave", () => element.classList.add(animateOutClassName))
      .addTo(controller);
  });
};

/**
 * Append structured data for Google Search
 * @param {string} path -  JSON-LD path
 * @returns {Void} void
*/
const appendStructuredData = async (path) => {
  const response = await fetch(path);

  if (response) {
    const structuredDataText = await response.text();
    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.textContent = structuredDataText;
    document.head.appendChild(script);
  }
};

/**
 * Set up Zendesk
 * @param {string} zendeskKey - Zendesk key
 * @returns {Void} void
 */
const setUpZendesk = (zendeskKey: string) => {
  const script = document.createElement("script");
  script.id = "ze-snippet";
  script.src = "https://static.zdassets.com/ekr/snippet.js?key=" + zendeskKey;
  document.body.appendChild(script);
};

/**
 * Set Zendesk locale
 * @param {string} locale - Zendesk locale (e.g. "ja")
 * @return {Void} void
 */
const setZendeskLocale = (locale: string) => {
  if ((window as any).zE) {
    (window as any).zE("webWidget", "setLocale", locale);
  }
};

/**
 * Set Zendesk color
 * @param {string} color - color code (e.g. "#e60833")
 * @return {Void} void
 */
const setZendeskColor = (color: string) => {
  (window as any).zESettings = {
    webWidget: {
      color: { theme: color }
    }
  };
};


/**
 * Open Zendesk on click the target button
 * @param {string} id - Target button id
 * @returns {Void} void
 */
const openZendeskOnClick = (id) => {
  const button = document.getElementById(id);

  if (button && (window as any).zE) {
    const handler = () => {
      const isZendeskExpanded = button.getAttribute("aria-expanded") === "true";

      if (isZendeskExpanded) {
        (window as any).zE("webWidget", "close");
        button.setAttribute("aria-expanded", "false");
      } else {
        (window as any).zE("webWidget", "open");
        button.setAttribute("aria-expanded", "true");
      }
    };

    button.addEventListener("click", handler, false);
    (window as any).zE("webWidget:on", "open", () => {
      button.setAttribute("aria-expanded", "true");
    });
    (window as any).zE("webWidget:on", "close", () => {
      button.setAttribute("aria-expanded", "false");
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  setAutoplayVideoAttributes(appPreviewVideoId);
  closeDropDownMenuWithEscapeKey();
  setUpZendesk(zendeskKey);
  setZendeskColor(zendeskColor);
});

window.onload = async () => {
  document.body.classList.add("body--loaded");
  toggleDropDownMenuOnClick();
  enableSmoothScrollToHashLinks();
  toggleHeaderOnScroll();
  toggleScrollToTopButton();
  animateOnScroll("[class$=\"__heading\"", 0.8);
  animateOnScroll("[class$=\"__wrapper\"", 0.8);
  animateOnScroll(".headline__description", 0.8);
  animateOnScroll(".headline__picture--background", 0.8);
  animateOnScroll(".service__note", 0.8);
  animateOnScroll(".how-to-use__pane", 0.8);
  animateOnScroll(".how-to-use__picture--step", 0.6);
  animateOnScroll(".how-to-use__title", 0.9);
  animateOnScroll(".call-to-action__link--tel-number", 0.8);
  playVideoOnScroll(appPreviewVideoId);
  setZendeskLocale(zendeskLocale);
  openZendeskOnClick(inquiryButtonId);
  await appendStructuredData(mobileApplicationStructuredDataPath);
};
