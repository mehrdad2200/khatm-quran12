const CACHE="khatm-v16";
const SHELL=["./", "index.html", "manifest.json", "css/styles.css", "js/islamic.js", "js/data2.js", "js/app.js", "js/more.js", "js/hadith.js", "js/duas.js", "js/player.js", "js/dl.js", "js/backup.js", "js/boot.js", "img/bismillah.png", "img/faraj.png", "img/fatemiyya.png", "img/masoum/ali.png", "img/masoum/askari.png", "img/masoum/baqir.png", "img/masoum/hadi.png", "img/masoum/hasan.png", "img/masoum/hussain.png", "img/masoum/jawad.png", "img/masoum/kazim.png", "img/masoum/mahdi.png", "img/masoum/prophet.png", "img/masoum/reza.png", "img/masoum/sadiq.png", "img/masoum/sajjad.png", "img/masoum/zahra.png", "data/quran.js", "data/hd-default.js", "js/extra.js", "js/v8.js", "fonts/vazirmatn-arabic.woff2", "fonts/vazirmatn-latin.woff2", "fonts/amiri-quran.woff2", "fonts/ScheherazadeRegOT.ttf", "fonts/UthmanicHafs.woff2", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-512-maskable.png", "data/tr-makarem.js", "icons/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>fetch(new Request(u,{cache:"reload"})).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE&&x!=="khatm-audio"&&x!=="khatm-duas"&&x!=="khatm-fonts").map(x=>caches.delete(x)))));self.clients.claim()});
// صفحه، کد و فایل‌های دعا: اول حافظه (اجرای فوری) و به‌روزرسانی در پس‌زمینه برای دفعهٔ بعد؛ تصویر، فونت و متن قرآن/ترجمه: اول حافظه
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  /* قلم‌های Google Fonts (فقط اگر کاربر قلم تازه انتخاب کرده): بار اول از اینترنت، بعد از آن روی دستگاه می‌ماند و آفلاین کار می‌کند */
  if(r.method==="GET"&&(u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com")){e.respondWith(caches.open("khatm-fonts").then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{if(res&&(res.ok||res.type==="opaque"))c.put(r,res.clone());return res}))));return}
  if(r.method!=="GET"||u.origin!==location.origin)return;
  if(/\/data\/dua-/.test(u.pathname)){e.respondWith(caches.open("khatm-duas").then(c=>c.match(r)).then(m=>m||fetch(r)));return}
  const put=res=>{if(res&&res.ok){const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c))}return res};
  /* نصب یک‌باره: همهٔ فایل‌های برنامه فقط یک بار دانلود و در دستگاه نگه داشته می‌شوند؛ فقط با انتشار نسخهٔ جدید (تغییر این فایل) دوباره گرفته می‌شوند */
  e.respondWith(caches.match(r,{ignoreSearch:r.mode==="navigate"}).then(m=>m||(r.mode==="navigate"?caches.match("index.html"):null)).then(m=>m||fetch(r).then(put).catch(()=>r.mode==="navigate"?caches.match("index.html"):Response.error())));
});
