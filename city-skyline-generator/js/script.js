const canv = document.querySelector("#canv");
const ctx = canv.getContext("2d");

const colorPalette = ['#410404', '#5F1113', '#A11819']
;

const rand = (max) => {
  return Math.floor(Math.random() * max);
};

const makeRects = (maxX) => {
  let rects = "";
  for (let i = 0; i < 60; i++) {
    rects += `
      <rect
        x="${rand(maxX + 50) - 50}"
        y="0"
        width="${rand(200) + 20}"
        height="${rand(300) + 20}"
    fill="${colorPalette[0]}"
      />
    `;
  }
  return rects;
};

const makeSVG = () => {
  const w = document.body.offsetWidth;
  const h = document.body.offsetHeight;
  const svg = `<svg width="${w}" height="${h}" id="svg" xmlns="http://www.w3.org/2000/svg">
    ${makeRects(w)}
  </svg>`
  
  // <svg id="svg2" xmlns="http://www.w3.org/2000/svg">
  // ${makePolys(w)}
  // </svg>`
  
  window.globalSVGStore = svg;
  return svg;
};

const setup = () => {
  const v = canvg.Canvg.fromString(ctx, makeSVG());
  v.start();
};

setup();
window.onresize = setup;

function download(filename, text) {
  var pom = document.createElement("a");
  pom.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  pom.setAttribute("download", filename);

  if (document.createEvent) {
    var event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}

const downloadSvgButton = document.querySelector("#download-svg-button");
downloadSvgButton.addEventListener("click", () => {
  download("art.svg", window.globalSVGStore);
});

const downloadPngButton = document.querySelector("#download-png-button");
downloadPngButton.addEventListener("click", () => {
  canv.toBlob(function (blob) {
    saveAs(blob, "art.png");
  });
});

const rejiggerButton = document.querySelector("#rejigger-button");
rejiggerButton.addEventListener("click", () => {
  setup();
});
