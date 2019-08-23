function appendDateLabelToPhoto(target) {
  var photoContainer = target.parentElement && target.parentElement.parentElement;
  if (!photoContainer || !photoContainer.classList.contains("nV0gYe")) {
    // Prevent thumbnails from having two date labels added.
    return;
  }

  var className = "dateLabel";

  var existingDateLabels = target.getElementsByClassName(className);
  if (existingDateLabels && existingDateLabels.length > 0) {
    // Prevent a second date label from being added.
    return;
  }

  var text =
    target.parentElement.attributes
    && target.parentElement.attributes["aria-label"];

  if (text && text.value) {
    // The field comes as something like "Photo - Landscape - [datestamp]", so split it.
    var labelFields = text.value.split(" - ");

    target.insertAdjacentHTML(
      "afterBegin",
      "<div class='" + className + "' style='opacity: 0'>" + labelFields[labelFields.length - 1] + "</div>");

    setTimeout(() => target.getElementsByClassName(className)[0].style.opacity = "", 1);
  }
}

for (let photoTarget of document.getElementsByClassName("RY3tic")) {
  appendDateLabelToPhoto(photoTarget);
}

var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.target.classList.contains("RY3tic")) {
      appendDateLabelToPhoto(mutation.target);
    }
  });
});

mutationObserver.observe(document.documentElement, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true,
});