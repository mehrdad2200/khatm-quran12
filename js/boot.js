/* ===== راه‌اندازی: اسپلش، ناوبری (قبلی/بعدی/تمام‌صفحه/خروج)، کارهای پس‌زمینه ===== */
(function(){const sp=$("#splash");let gone=0;const hide=()=>{if(gone)return;gone=1;sp.classList.add("out");setTimeout(()=>sp.remove(),1100);try{if(!cfg.ob&&(!cfg.name||!cfg.n))onboard(0);else typeof installOffer==="function"&&installOffer()}catch(e){window.__err=String(e&&e.message)}};
 let sw=null;try{sw=sessionStorage.getItem("khatm-sw");if(sw!==null)sessionStorage.removeItem("khatm-sw")}catch(e){}
 setTimeout(hide,sw!==null?120:1800);if(sw!==null)setTimeout(()=>toast("وارد شدید: «"+(sw||"کاربر")+"»"),500);sp.addEventListener("click",hide)})();
try{applyTheme();typeof applyFonts==="function"&&applyFonts();setup();home();stars();window.__ok=1}catch(e){window.__err=String(e&&e.message)+" @boot";window.showRec&&showRec()}
function afterOnboard(){typeof installOffer==="function"&&installOffer();setTimeout(()=>{typeof dlAuto==="function"&&dlAuto()},4000)}

if("serviceWorker"in navigator&&/^https?:/.test(location.protocol))navigator.serviceWorker.register("sw.js").catch(()=>{});
document.addEventListener("visibilitychange",()=>{if(document.hidden)return;remSched();const t=todayMs();if(t!==TODAY){TODAY=t;setup();applyTheme();renderAll()}});
try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
remSched();
hadithBoot();if(cfg.n)setTimeout(dlAuto,6000);
if(typeof loadDuaFiles==="function")loadDuaFiles();
/* ---- ناوبری: هر گام یک مدخل تاریخچه دارد؛ برگشت گوشی فقط یک گام به عقب می‌رود و هرگز خروج نیست ---- */
(function(){
 const snap=()=>JSON.stringify({c:cur,s:typeof sub!=="undefined"?sub:"menu",d:typeof DS!=="undefined"?DS.id:null,r:rd?{r:rd.r,d:rd.d,g:rd.rng||null}:null});
 let idx=1,last="",quiet=0,skip=0;
 try{history.replaceState({i:0,base:1},"");history.pushState({i:1,s:snap()},"");last=snap()}catch(e){}
 function btns(){const b=$("#tb-back"),f=$("#tb-fwd");if(b)b.disabled=idx<=1}
 function push(){if(quiet)return;const s=snap();if(s===last)return;last=s;try{history.pushState({i:++idx,s},"")}catch(e){}btns()}
 const wrap=n=>{const f=window[n];if(typeof f!=="function")return;window[n]=function(){const r=f.apply(this,arguments);push();return r}};
["go","more","reader","closeReader"].forEach(wrap);
 function restore(str){const o=JSON.parse(str);quiet=1;last=str;try{
  if(o.r){if(typeof apClose==="function")apClose(true);reader(o.r.r,o.r.d,o.r.g)}
  else{const r=$("#reader");if(r&&!r.hidden)closeReader();
   if(typeof sub!=="undefined")sub=o.s;if(typeof DS!=="undefined"){DS.id=o.d;DS.form=null}go(o.c)}
 }catch(e){}quiet=0}
 addEventListener("popstate",e=>{
  if(skip){skip=0;return}
  const st=e.state||{},was=idx;
  const ov=$("#sheet")||$("#dlp")||$(".cr");
  if(ov){ov.classList.contains("cr")?ov.click():ov.remove();skip=1;history.go(was-(st.i||0));return}
  if($("#ob")){skip=1;history.go(was-(st.i||0));return}
  if(st.base||st.i==null){toast("برای خروج، دکمهٔ ✕ بالای صفحه را بزنید");skip=1;history.go(1);return}
  idx=st.i;if(st.s)restore(st.s);btns()});
 $("#tb-back").onclick=()=>history.back();
 $("#tb-fwd").onclick=()=>history.forward();
 const fsOn=()=>document.fullscreenElement||document.webkitFullscreenElement;
 $("#tb-full").onclick=()=>{const d=document,h=d.documentElement;try{if(fsOn()){(d.exitFullscreen||d.webkitExitFullscreen).call(d)}else{const rq=h.requestFullscreen||h.webkitRequestFullscreen;if(!rq)return toast("این مرورگر تمام‌صفحه را پشتیبانی نمی‌کند");rq.call(h)}}catch(e){toast("تمام‌صفحه ممکن نشد")}};
 let leaving=false;
 $("#tb-x").onclick=()=>{if(leaving)return;leaving=true;const o=$("#exitov");o.hidden=false;requestAnimationFrame(()=>o.classList.add("on"));
  setTimeout(()=>o.classList.remove("on"),2000);
  setTimeout(()=>{o.hidden=true;try{if(fsOn())document.exitFullscreen()}catch(e){}
   try{window.close()}catch(e){}skip=1;try{history.go(-(idx+1))}catch(e){}
   setTimeout(()=>{leaving=false;skip=0;$("#byebye").hidden=false},700)},3000)};
 btns();
 /* نوار بالا: لمس بالای صفحه آن را نشان می‌دهد/محو می‌کند (یا همیشه روشن/خاموش) */
 const tb=$("#topbar");let tbT=0;const mark=()=>document.body.classList.toggle("tbh",tb.classList.contains("hid")&&(cfg.tbm||"tap")!=="on");new MutationObserver(mark).observe(tb,{attributes:true,attributeFilter:["class"]});
 window.tbApply=(show)=>{const m=cfg.tbm||"tap";clearTimeout(tbT);
  if(m==="on")tb.classList.remove("hid");else if(m==="off")tb.classList.add("hid");
  else if(show===false)tb.classList.add("hid");else{tb.classList.remove("hid");tbT=setTimeout(()=>tb.classList.add("hid"),5000)}};
 document.addEventListener("click",e=>{if((cfg.tbm||"tap")!=="tap")return;
  if(e.target.closest("#topbar button,a,input,select,textarea,.sheetw"))return;
  const h=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--tbh"))||56;
  if(e.clientY>h+10)return;tbApply(tb.classList.contains("hid"))});
 tbApply(true)})();
