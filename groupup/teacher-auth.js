(function () {
  var PASSWORD_HASH = "ceea983b";
  var AUTH_KEY = "groupupTeacherUnlocked";
  var isStudentLink = new URLSearchParams(window.location.search).has("game");

  if (isStudentLink) {
    return;
  }

  document.documentElement.classList.add("teacher-auth-pending");

  function hashPassword(input) {
    var hash = 0x811c9dc5;
    for (var i = 0; i < input.length; i += 1) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function isUnlocked() {
    try {
      return sessionStorage.getItem(AUTH_KEY) === PASSWORD_HASH;
    } catch (error) {
      return false;
    }
  }

  function setUnlocked() {
    try {
      sessionStorage.setItem(AUTH_KEY, PASSWORD_HASH);
    } catch (error) {
      return;
    }
  }

  function unlockTeacherView() {
    document.documentElement.classList.remove("teacher-auth-pending");
    document.getElementById("teacherGate")?.remove();
  }

  function showGate() {
    var gate = document.createElement("div");
    gate.id = "teacherGate";
    gate.innerHTML = [
      '<form class="teacher-gate-card" autocomplete="off">',
      '  <p class="teacher-gate-eyebrow">GroupUP</p>',
      "  <h1>Teacher Access</h1>",
      '  <label for="teacherPassword">Password</label>',
      '  <input id="teacherPassword" type="password" autocomplete="current-password" required>',
      '  <p class="teacher-gate-error" aria-live="polite"></p>',
      '  <button type="submit">Unlock GroupUP</button>',
      "</form>"
    ].join("");

    document.body.appendChild(gate);

    var form = gate.querySelector("form");
    var input = gate.querySelector("input");
    var error = gate.querySelector(".teacher-gate-error");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (hashPassword(input.value) === PASSWORD_HASH) {
        setUnlocked();
        unlockTeacherView();
        return;
      }

      error.textContent = "That password did not work.";
      input.value = "";
      input.focus();
    });

    input.focus();
  }

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
      return;
    }
    callback();
  }

  ready(function () {
    if (isUnlocked()) {
      unlockTeacherView();
      return;
    }
    showGate();
  });
}());
