const menuHtml = `<div class="flusher-menu">
<ul class="flusher-menu-base" style="display: none; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit;">
  <li class="flusher-enable" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Overlay <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;">
        <svg class="flusher-toggle" style="width: auto; height: 100%; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="28px" height="17px" viewBox="0 0 28 18">
          <g>
            <path opacity="0.4" fill-rule="evenodd" d="m11.52999,4.0252a8.96,8.96 0 0 0 -1.516,5a8.96,8.96 0 0 0 1.515,5l-6.515,0a5,5 0 1 1 0,-10l6.515,0l0.001,0z" id="svg_2"></path>
            <rect x="10.01399" y="0.0252" width="18" height="18" rx="9" id="svg_3"></rect>
          </g>
          <path d="m17.92725,13.1244c-0.607,0.281 -1.291,-0.124 -1.367,-0.806c-0.108,-0.972 -0.163,-1.961 -0.163,-2.964s0.055,-1.992 0.163,-2.963c0.076,-0.682 0.76,-1.087 1.367,-0.806a22.47,22.47 0 0 1 2.423,1.31c0.82,0.51 1.6,1.067 2.338,1.665c0.502,0.407 0.502,1.182 0,1.588a23.04,23.04 0 0 1 -2.338,1.665a22.51,22.51 0 0 1 -2.422,1.31l-0.001,0.001z" fill="#061726" id="svg_4"></path>
        </svg>
      </span>
    </div>
  </li>
  <li class="flusher-flush" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Flush <span style="right: 4px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;">
        <svg class="flusher-toggle" style="width: auto; height: 100%; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="28px" height="17px" viewBox="0 0 28 18">
          <g>
            <path opacity="0.4" fill-rule="evenodd" d="m11.52999,4.0252a8.96,8.96 0 0 0 -1.516,5a8.96,8.96 0 0 0 1.515,5l-6.515,0a5,5 0 1 1 0,-10l6.515,0l0.001,0z" id="svg_2"></path>
            <rect x="10.01399" y="0.0252" width="18" height="18" rx="9" id="svg_3"></rect>
          </g>
          <path d="m17.92725,13.1244c-0.607,0.281 -1.291,-0.124 -1.367,-0.806c-0.108,-0.972 -0.163,-1.961 -0.163,-2.964s0.055,-1.992 0.163,-2.963c0.076,-0.682 0.76,-1.087 1.367,-0.806a22.47,22.47 0 0 1 2.423,1.31c0.82,0.51 1.6,1.067 2.338,1.665c0.502,0.407 0.502,1.182 0,1.588a23.04,23.04 0 0 1 -2.338,1.665a22.51,22.51 0 0 1 -2.422,1.31l-0.001,0.001z" fill="#061726" id="svg_4"></path>
        </svg>
      </span>
    </div>
  </li>
  <li class="flusher-layoutMenu" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Layout <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; right: 3px;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m3.25 9 3.5-3.5-3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>
    </div>
  </li>
  <li class="flusher-settings" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Settings <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; right: 3px;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m3.25 9 3.5-3.5-3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>
    </div>
  </li>
</ul>
<ul class="flusher-menu-settings" style="display: none; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit;">
  <li class="flusher-spam" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Spam <span style="right: 4px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;">
        <svg class="flusher-toggle" style="width: auto; height: 100%; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="28px" height="17px" viewBox="0 0 28 18">
          <g>
            <path opacity="0.4" fill-rule="evenodd" d="m11.52999,4.0252a8.96,8.96 0 0 0 -1.516,5a8.96,8.96 0 0 0 1.515,5l-6.515,0a5,5 0 1 1 0,-10l6.515,0l0.001,0z" id="svg_2"></path>
            <rect x="10.01399" y="0.0252" width="18" height="18" rx="9" id="svg_3"></rect>
          </g>
          <path d="m17.92725,13.1244c-0.607,0.281 -1.291,-0.124 -1.367,-0.806c-0.108,-0.972 -0.163,-1.961 -0.163,-2.964s0.055,-1.992 0.163,-2.963c0.076,-0.682 0.76,-1.087 1.367,-0.806a22.47,22.47 0 0 1 2.423,1.31c0.82,0.51 1.6,1.067 2.338,1.665c0.502,0.407 0.502,1.182 0,1.588a23.04,23.04 0 0 1 -2.338,1.665a22.51,22.51 0 0 1 -2.422,1.31l-0.001,0.001z" fill="#061726" id="svg_4"></path>
        </svg>
      </span>
    </div>
  </li>
  <li class="flusher-font" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Font <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
    </div>
  </li>
  <li class="flusher-store" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Web Store <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; right: 3px;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m3.25 9 3.5-3.5-3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>
    </div>
  </li>
  <li class="flusher-home" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Report Bug <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; right: 3px;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m3.25 9 3.5-3.5-3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>
    </div>
  </li>
</ul>
<ul class="flusher-menu-layout" style="display: none; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit;">
  <li class="flusher-messageMenu" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Message <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; right: 3px;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m3.25 9 3.5-3.5-3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>
    </div>
  </li>
  <li class="flusher-overlayMenu" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Overlay <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; right: 3px;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m3.25 9 3.5-3.5-3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>
    </div>
  </li>
</ul>
<ul class="flusher-menu-message" style="display: none; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit;">
  <li class="flusher-reply" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Reply <span style="right: 4px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;">
        <svg class="flusher-toggle" style="width: auto; height: 100%; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="28px" height="17px" viewBox="0 0 28 18">
          <g>
            <path opacity="0.4" fill-rule="evenodd" d="m11.52999,4.0252a8.96,8.96 0 0 0 -1.516,5a8.96,8.96 0 0 0 1.515,5l-6.515,0a5,5 0 1 1 0,-10l6.515,0l0.001,0z" id="svg_2"></path>
            <rect x="10.01399" y="0.0252" width="18" height="18" rx="9" id="svg_3"></rect>
          </g>
          <path d="m17.92725,13.1244c-0.607,0.281 -1.291,-0.124 -1.367,-0.806c-0.108,-0.972 -0.163,-1.961 -0.163,-2.964s0.055,-1.992 0.163,-2.963c0.076,-0.682 0.76,-1.087 1.367,-0.806a22.47,22.47 0 0 1 2.423,1.31c0.82,0.51 1.6,1.067 2.338,1.665c0.502,0.407 0.502,1.182 0,1.588a23.04,23.04 0 0 1 -2.338,1.665a22.51,22.51 0 0 1 -2.422,1.31l-0.001,0.001z" fill="#061726" id="svg_4"></path>
        </svg>
      </span>
    </div>
  </li>
  <li class="flusher-time" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border-top: none; border-right: none; border-bottom: 0px; border-left: none; border-image: initial; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s; display: block;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 16px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer; transition: opacity 100ms ease 0s; display: flex;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Show Time <svg class="flusher-toggle" style="width: auto; height: 100%; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="28px" height="18px" viewBox="0 0 28 18">
        <g>
          <path opacity="0.4" fill-rule="evenodd" d="m11.52999,4.0252a8.96,8.96 0 0 0 -1.516,5a8.96,8.96 0 0 0 1.515,5l-6.515,0a5,5 0 1 1 0,-10l6.515,0l0.001,0z" id="svg_2"></path>
          <rect x="10.01399" y="0.0252" width="18" height="18" rx="9" id="svg_3"></rect>
        </g>
        <path d="m17.92725,13.1244c-0.607,0.281 -1.291,-0.124 -1.367,-0.806c-0.108,-0.972 -0.163,-1.961 -0.163,-2.964s0.055,-1.992 0.163,-2.963c0.076,-0.682 0.76,-1.087 1.367,-0.806a22.47,22.47 0 0 1 2.423,1.31c0.82,0.51 1.6,1.067 2.338,1.665c0.502,0.407 0.502,1.182 0,1.588a23.04,23.04 0 0 1 -2.338,1.665a22.51,22.51 0 0 1 -2.422,1.31l-0.001,0.001z" fill="#061726" id="svg_4"></path>
      </svg>
    </div>
  </li>
  <li class="flusher-background" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Background <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
    </div>
  </li>
</ul>
<ul class="flusher-menu-overlay" style="display: none; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit;">
  <li class="flusher-position" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Position <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
    </div>
  </li>
  <li class="flusher-size" style="width: auto; height: auto; margin: 0px; padding: 0px; opacity: 0.8; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: rgb(255, 255, 255); position: relative; list-style: none; text-align: left; white-space: nowrap; min-width: 102px; max-width: 140px; transition: opacity 100ms ease 0s;">
    <div style="width: auto; height: auto; margin: 0px; padding: 6px 14px 6px 7px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; cursor: pointer;">
      <span aria-hidden="true" style="width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; color: inherit; position: absolute; left: 3px; display: none;">
        <svg style="stroke: currentcolor; width: auto; height: auto; margin: 0px; padding: 0px; background: none; opacity: 1; font: 12px sans-serif; box-sizing: content-box; border: none; visibility: visible; text-size-adjust: auto; text-decoration: none; fill: currentcolor;" class="RumbleElm" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 10 10">
          <path d="m6.75 9 -3.5-3.5 3.5-3.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </span>Size <span style="right: 5px;position: absolute;width: auto;height: auto;margin: 0px;padding: 0px 0px 0px 14px;background: none;opacity: 1;font: 600 12px sans-serif;box-sizing: content-box;border: none;visibility: visible;text-size-adjust: auto;text-decoration: none;color: inherit;float: right;"></span>
    </div>
  </li>
</ul>
</div>`;

const parser = new DOMParser();
const doc = parser.parseFromString(menuHtml, 'text/html');
export const menu = doc.body.firstChild;