const welcome = document.getElementById("welcome");
const siteContent = document.getElementById("siteContent");
const envelope = document.getElementById("openGift");
const openGiftText = document.getElementById("openGiftText");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");

let giftOpened = false;

async function openGift() {
  if (giftOpened) return;
  giftOpened = true;
  envelope.classList.add("open");

  // La música empieza después de una acción directa de la persona.
  try {
    await music.play();
    musicToggle.classList.add("playing");
    musicLabel.textContent = "Música encendida";
  } catch (error) {
    musicLabel.textContent = "Pulsa para escuchar";
  }

  window.setTimeout(() => {
    welcome.classList.add("hidden");
    siteContent.classList.remove("hidden");
    document.body.classList.add("gift-opened");
    window.scrollTo({ top: 0, behavior: "smooth" });
    observeReveals();
  }, 850);
}

envelope.addEventListener("click", openGift);
openGiftText.addEventListener("click", openGift);

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.classList.add("playing");
      musicLabel.textContent = "Música encendida";
    } catch (error) {
      musicLabel.textContent = "No se pudo reproducir";
    }
  } else {
    music.pause();
    musicToggle.classList.remove("playing");
    musicLabel.textContent = "Música apagada";
  }
});

let observer;
function observeReveals() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("visible"));
    return;
  }
  observer?.disconnect();
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(element => observer.observe(element));
}
