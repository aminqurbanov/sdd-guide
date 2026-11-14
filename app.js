// Clickable flows: each .step holds its detail in a hidden <p>.
document.querySelectorAll(".flow[data-detail]").forEach(flow => {
  const box = document.getElementById(flow.dataset.detail);
  const steps = [...flow.querySelectorAll(".step")];
  steps.forEach((s, i) => {
    s.querySelector(".num").textContent = i + 1;
    s.onclick = () => {
      steps.forEach(x => x.classList.remove("on"));
      s.classList.add("on");
      box.innerHTML = `<b>${i + 1}. ${s.querySelector("b").innerHTML}</b><p style="margin:6px 0 0">${s.querySelector("p").innerHTML}</p>`;
    };
  });
  if (steps[0]) steps[0].click();
});
document.querySelectorAll(".flow:not([data-detail]) .step").forEach((s, i, all) => {
  s.style.cursor = "default";
  s.querySelector(".num").textContent = [...s.parentNode.children].indexOf(s) + 1;
});

// Checklists with progress, remembered per browser.
document.querySelectorAll(".check").forEach(box => {
  const key = "sdd-" + box.dataset.list;
  const bar = box.querySelector(".progress i");
  const inputs = [...box.querySelectorAll("input")];
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || "{}"); } catch (e) {}
  inputs.forEach((x, i) => { x.checked = !!saved[i]; });
  const update = () => {
    bar.style.width = (inputs.filter(x => x.checked).length / inputs.length * 100) + "%";
    try { localStorage.setItem(key, JSON.stringify(Object.fromEntries(inputs.map((x, i) => [i, x.checked])))); } catch (e) {}
  };
  inputs.forEach(x => x.onchange = update);
  update();
});

// Highlight the current section in the nav.
const links = [...document.querySelectorAll("nav .links a")];
const obs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("section").forEach(s => obs.observe(s));

// Theme toggle.
document.getElementById("theme").onclick = () => {
  const r = document.documentElement;
  const dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  r.dataset.theme = dark ? "light" : "dark";
};
