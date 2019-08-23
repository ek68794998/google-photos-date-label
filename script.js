var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.target.classList.contains("RY3tic")) {
      var className = "dateLabel";

      for (let child of mutation.target.children) {
        if (child.classList.contains(className)) {
          return;
        }
      }

      var text =
        mutation.target.parentElement
        && mutation.target.parentElement.attributes
        && mutation.target.parentElement.attributes["aria-label"];

      if (text && text.value) {
        var labelFields = text.value.split(" - ");
        mutation.target.insertAdjacentHTML(
          "afterBegin",
          "<div class=" + className + ">" + labelFields[labelFields.length - 1] + "</div>")
      }
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