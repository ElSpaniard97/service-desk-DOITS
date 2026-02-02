(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const year = document.getElementById("year");
  const form = document.getElementById("ticketForm");
  const clearBtn = document.getElementById("clearBtn");

  year.textContent = new Date().getFullYear();

  // Theme
  const storedTheme = localStorage.getItem("do_theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    root.setAttribute("data-theme", storedTheme);
  }

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("do_theme", next);
  });

  // Ticket form -> mailto draft
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const requestType = document.getElementById("requestType").value;
    const priority = document.getElementById("priority").value;
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const device = document.getElementById("device").value.trim();
    const location = document.getElementById("location").value.trim();
    const summary = document.getElementById("summary").value.trim();
    const details = document.getElementById("details").value.trim();

    // Edit this to your real support email:
    const to = "support@darkoakit.com";

    const subject = `[${priority}] ${summary}`;

    const bodyLines = [
      `Company: Dark Oak IT Solutions`,
      `Request Type: ${requestType}`,
      `Priority: ${priority}`,
      ``,
      `Requester: ${fullName}`,
      `Email: ${email}`,
      device ? `Device/Asset: ${device}` : null,
      location ? `Location: ${location}` : null,
      ``,
      `Summary: ${summary}`,
      ``,
      `Details:`,
      details,
      ``,
      `---`,
      `If possible, attach screenshots / logs to this email.`,
    ].filter(Boolean);

    const body = encodeURIComponent(bodyLines.join("\n"));
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${body}`;

    window.location.href = mailto;
  });

  clearBtn.addEventListener("click", () => {
    form.reset();
  });
})();
