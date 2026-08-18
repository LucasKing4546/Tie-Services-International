/* RTG — minimal progressive enhancement. No dependencies. */
(function () {
  "use strict";

  // Mobile navigation
  var btn = document.querySelector(".navtoggle");
  var nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    });
  }

  // Scope ladder accordion. Closed by default; content is in the DOM for search engines.
  document.querySelectorAll(".rung-h[aria-expanded]").forEach(function (h) {
    h.addEventListener("click", function () {
      var rung = h.closest(".rung");
      var open = rung.classList.toggle("open");
      h.setAttribute("aria-expanded", open ? "true" : "false");
      var x = h.querySelector(".rung-x");
      if (x) x.textContent = open ? "\u2212" : "+";
    });
  });

  // Open the ladder rung named in the URL hash, e.g. /contract-manufacturing/#tier-3
  var m = location.hash.match(/^#tier-([1-4])$/);
  if (m) {
    var r = document.querySelectorAll(".rung")[parseInt(m[1], 10) - 1];
    if (r) { r.classList.add("open"); r.scrollIntoView(); }
  }

  // Forms are not wired to a backend in this build. See README, "Before launch".
  document.querySelectorAll("form.form").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (f.querySelector('input[name="website"]').value) return; // honeypot
      var ok = true;
      f.querySelectorAll("[required]").forEach(function (el) {
        var bad = !el.value || (el.type === "checkbox" && !el.checked);
        el.style.borderColor = bad ? "#A02F12" : "";
        if (bad) ok = false;
      });
      var msg = f.querySelector(".formmsg") || document.createElement("p");
      msg.className = "formmsg";
      msg.style.cssText = "margin-top:16px;padding:13px 15px;border-radius:3px;font-size:15px;" +
        (ok ? "background:#E6F3EB;border:1px solid #1D6A42;color:#12202B"
            : "background:#FCEFEB;border:1px solid #A02F12;color:#12202B");
      msg.textContent = ok
        ? "Validation passed. This build has no form handler attached — connect it to the CRM before launch (see README)."
        : "Please complete the required fields.";
      f.appendChild(msg);
    });
  });
})();
