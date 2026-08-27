const intro=document.getElementById("intro");
const start=document.getElementById("start");
const music=document.getElementById("music");
const sound=document.getElementById("sound");

start.addEventListener("click",async()=>{
  intro.classList.add("hide");
  sound.classList.add("show");
  try{await music.play();sound.classList.add("playing")}catch(e){}
});

sound.addEventListener("click",async()=>{
  if(music.paused){await music.play();sound.classList.add("playing")}
  else{music.pause();sound.classList.remove("playing")}
});

// Фон суреттерін CSS айнымалысына беру
document.querySelectorAll(".page").forEach(page=>{
  const bg=page.dataset.bg;
  page.style.setProperty("--bg",`url("${bg}")`);
});

// Скролл арқылы жұмсақ пайда болу
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.18});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));

// Кері санақ: той күнін осы жерден өзгертіңіз
const target=new Date("2026-09-13T19:00:00+05:00").getTime();
function countdown(){
  let d=target-Date.now();
  if(d<0)d=0;
  const vals=[
    Math.floor(d/86400000),
    Math.floor(d/3600000)%24,
    Math.floor(d/60000)%60,
    Math.floor(d/1000)%60
  ];
  document.querySelectorAll("#countdown b").forEach((el,i)=>el.textContent=String(vals[i]).padStart(2,"0"));
}
countdown();setInterval(countdown,1000);

// RSVP
document.getElementById("confirm").addEventListener("click",()=>{
  const name=document.getElementById("guest").value.trim();
  const choice=document.querySelector('input[name="rsvp"]:checked');
  const sent=document.getElementById("sent");
  if(!name || !choice){sent.textContent="Есіміңізді жазып, жауап нұсқасын таңдаңыз.";return}
  sent.textContent=`Рақмет, ${name}! Жауабыңыз қабылданды.`;
});
