let timeoutId = null;
let currentTooltip = null;
let cursorX = 0;
let cursorY = 0;

function initTooltip(container) {
    disableCssTooltips(container);
    trackMousePosition();

    let nodes = container.querySelectorAll('.qp-node');

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        node.addEventListener("mouseover", function() {
            if (timeoutId != null) {
                return;
            }
            timeoutId = window.setTimeout(function () {
                currentTooltip = container.querySelector(".qp-tt").cloneNode(true);
                document.body.appendChild(currentTooltip);
                currentTooltip.style.left = cursorX + 'px';
                currentTooltip.style.top = cursorY + 'px';
            }, 500);
        });
        node.addEventListener("mouseout", function (event) {
            // http://stackoverflow.com/questions/4697758/prevent-onmouseout-when-hovering-child-element-of-the-parent-absolute-div-withou
            var e = event.toElement || event.relatedTarget;
            if (e.parentNode == node || e == node) {
                return;
            }

            window.clearTimeout(timeoutId);
            timeoutId = null;
            if (currentTooltip != null) {
                document.body.removeChild(currentTooltip);
                currentTooltip = null;
            }
        });
    }
}

function disableCssTooltips(container) {
    let root = container.querySelector(".qp-root");
    root.className += " qp-noCssTooltip";
}

function trackMousePosition() {
    document.onmousemove = function(e){
        cursorX = e.pageX;
        cursorY = e.pageY;
    }
}

module.exports.initTooltip = initTooltip;