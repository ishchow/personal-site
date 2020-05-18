function openTarget() {
    console.log("in open target");

    var hash = location.hash.substring(1);
    if (hash) {
        var details = document.getElementById(hash);
    }
    if (details && details.tagName.toLowerCase() === "details") {
        details.open = true;
        details.scrollIntoView();
    }
}

window.addEventListener("hashchange", openTarget);
window.addEventListener("DOMContentLoaded", openTarget);
