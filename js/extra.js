/* ===== قرآن کامل (سوره/جزء)، اشتراک‌گذاری استوری، نصب برنامه، اصلاحات ===== */
const arN=t=>String(t||"").replace(/ی/g,"ي").replace(/ک/g,"ك").replace(/‏/g,"");
/* ---- قرآن کامل ---- */
const JUZ=[[1,1],[2,142],[2,253],[3,93],[4,24],[4,148],[5,82],[6,111],[7,88],[8,41],[9,93],[11,6],[12,53],[15,1],[17,1],[18,75],[21,1],[23,1],[25,21],[27,56],[29,46],[33,31],[36,28],[39,32],[41,47],[46,1],[51,31],[58,1],[67,1],[78,1]];
const juzStart=k=>OFF[JUZ[k][0]-1]+JUZ[k][1]-1,juzEnd=k=>k<29?juzStart(k+1)-1:6235;
const surEnd=s=>(s<113?OFF[s+1]:6236)-1;
const QF={tab:"s",q:""};
const nrmF=t=>String(t).replace(/[يى]/g,"ی").replace(/ك/g,"ک").replace(/[ً-ٟ‌‏]/g,"").replace(/\s+/g,"").toLowerCase();
function quranPage(){
 return`<button class="chip" data-sub="menu">‹ بازگشت</button><h2 style="margin-top:12px">قرآن کامل</h2><p class="muted">هر سوره یا جزء را کامل بخوانید؛ با متن عربی، ترجمه، تلاوت و هم‌خوانی کلمه‌به‌کلمه.</p>
<div class="seg"><button data-act="q-tab" data-tab="s" class="${QF.tab==="s"?"on":""}">سوره‌ها</button><button data-act="q-tab" data-tab="j" class="${QF.tab==="j"?"on":""}">جزءها</button></div>
${QF.tab==="s"?`<div class="search">${ic("search")}<input id="qq" placeholder="جستجوی سوره (نام یا شماره)" value="${esc(QF.q)}"></div>`:""}<div id="ql">${qList(1)}</div>`}
function qItem(a,b,title,sub,num,ph){return`<div class="dli"><button class="item" data-act="q-open" data-a="${a}" data-b="${b}" data-t="${esc(title)}"><div class="dot">${fa(num)}</div><div><div class="t1">${esc(title)}</div><div class="t2">${sub}</div></div>${ic("prev")}</button><button class="dlb" data-act="q-open" data-a="${a}" data-b="${b}" data-t="${esc(title)}" data-play="1" aria-label="شنیدن">${ic("play")}</button></div>`}
function qList(ret){let h="";
 if(QF.tab==="s"){const q=nrmF(QF.q);for(let s=0;s<114;s++){const n=SURA_FA[s];if(q&&!nrmF("سوره"+n).includes(q)&&String(s+1)!==QF.q.trim()&&fa(s+1)!==QF.q.trim())continue;
  h+=qItem(OFF[s],surEnd(s),"سورهٔ "+n,fa(surEnd(s)-OFF[s]+1)+" آیه",s+1)}
  if(!h)h='<div class="card muted">چیزی پیدا نشد.</div>'}
 else for(let k=0;k<30;k++){const a=juzStart(k),b=juzEnd(k),x=F[a],y=F[b];h+=qItem(a,b,"جزء "+fa(k+1),"از "+SURA_FA[x[0]]+" آیهٔ "+fa(x[1]+1)+" تا "+SURA_FA[y[0]]+" آیهٔ "+fa(y[1]+1),k+1)}
 if(ret)return h;const el=$("#ql");el&&(el.innerHTML=h)}
ACT["q-tab"]=t=>{QF.tab=t.dataset.tab;more("quran")};
ACT["q-open"]=t=>{openR(-1,null,[+t.dataset.a,+t.dataset.b,t.dataset.t],!!t.dataset.play)};
document.addEventListener("input",e=>{if(e.target.id==="qq"){QF.q=e.target.value;qList()}});
/* ---- آمار و استوری ---- */
function readSet(){const m=new Uint8Array(6236);dset().forEach(d=>{const r=PARTS[rowOf(d)];for(let i=r[0];i<=r[1];i++)m[i]=1});return m}
function stats(){const m=readSet();let v=0;for(let i=0;i<6236;i++)v+=m[i];
 const all=(a,b)=>{for(let i=a;i<=b;i++)if(!m[i])return false;return true};let ju=0,su=0;for(let k=0;k<30;k++)if(all(juzStart(k),juzEnd(k)))ju++;for(let s=0;s<114;s++)if(all(OFF[s],surEnd(s)))su++;
 const d=clamp(diffNow());return{v,left:6236-v,ju,su,day:d+1,row:rowOf(d)+1,days:dset().size,streak:streak(),pct:v/6236}}
const STH=[["حرم","#03211b","#0c5240","#e0bd68","#f6efe0"],["فیروزه‌ای","#06223a","#0f6a86","#ecd9a0","#f4f9fb"],["حسینی","#0b0506","#561016","#f0cf94","#fbeee0"],["فاطمیه","#16141a","#4a3340","#ecc9a2","#fbf1ea"],["شب قدر","#080c2e","#2b2d78","#ffe08a","#f1f2ff"],["روشن","#f7f0df","#e3d4ac","#1c5a46","#1d3a30"]];
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function star8(c,x,y,r){c.beginPath();for(let k=0;k<16;k++){const a=k*Math.PI/8-Math.PI/2,rad=k%2?r*.62:r;c.lineTo(x+Math.cos(a)*rad,y+Math.sin(a)*rad)}c.closePath()}
let SG={t:0,name:false,occ:"auto"};
const OCCP=[["ایام فاطمیه",3,"السلام علیک یا فاطمة الزهراء"],["رحلت پیامبر اکرم (ص)",2,"اللهم صل علی محمد و آل محمد"],["شهادت امیرالمؤمنین (ع)",2,"السلام علیک یا امیرالمؤمنین"],["محرم و عاشورا",2,"السلام علیک یا اباعبدالله"],["اربعین حسینی",2,"السلام علیک یا اباعبدالله"],["ولادت اهل بیت (ع)",1,"اللهم صل علی محمد و آل محمد"],["ماه رمضان",4,"شهر رمضان الذی أنزل فیه القرآن"],["شب‌های قدر",4,"لیلة القدر خیر من ألف شهر"],["عید",5,"عیدکم مبارک"]];
function occAuto(){try{const ev=occOn(TODAY,cfg.ho);if(typeof isFat==="function"&&isFat())return OCCP[0];const e=ev[0];if(!e)return null;
 const n=e[2],fest=/ولادت|عید|مبعث|غدیر|میلاد|مباهله/.test(n);return[n,fest?1:(e[3]==="m"?2:5),fest?"اللهم صل علی محمد و آل محمد":"إنا لله و إنا إلیه راجعون"]}catch(e){return null}}
const occCur=()=>SG.occ==="none"?null:SG.occ==="auto"?occAuto():OCCP[+SG.occ]||null;
const appUrl=()=>(location.origin+location.pathname).replace(/index\.html$/,"");
async function drawStory(cv){const T=STH[SG.t],[,c1,c2,ac,tx]=T,S=stats(),O=occCur(),c=cv.getContext("2d"),W=1080,H=1920;cv.width=W;cv.height=H;
 try{await Promise.all([document.fonts.load("700 50px Vazirmatn","آ"),document.fonts.load("50px 'Uthman Taha'","بِسْمِ"),document.fonts.load("50px 'Scheherazade Khatm'","ب")])}catch(e){}
 const g=c.createLinearGradient(0,0,W*.3,H);g.addColorStop(0,c1);g.addColorStop(1,c2);c.fillStyle=g;c.fillRect(0,0,W,H);
 c.globalAlpha=.09;c.strokeStyle=ac;c.lineWidth=2;for(let y=0;y<H+120;y+=120)for(let x=0;x<W+120;x+=120){star8(c,x+((y/120)%2?60:0),y,52);c.stroke()}c.globalAlpha=1;
 const v=c.createRadialGradient(W/2,H*.42,200,W/2,H*.42,H*.75);v.addColorStop(0,"rgba(0,0,0,0)");v.addColorStop(1,"rgba(0,0,0,.45)");c.fillStyle=v;c.fillRect(0,0,W,H);
 c.strokeStyle=ac;c.globalAlpha=.7;c.lineWidth=3;rr(c,36,36,W-72,H-72,44);c.stroke();c.lineWidth=1;rr(c,56,56,W-112,H-112,34);c.stroke();c.globalAlpha=1;
 c.direction="rtl";c.textAlign="center";c.textBaseline="alphabetic";const F_="Vazirmatn,Tahoma,sans-serif",AR="'Uthman Taha','Scheherazade Khatm',serif";
 c.fillStyle=ac;c.font="60px "+AR;c.fillText("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",W/2,165);
 c.fillStyle=tx;c.font="800 100px "+F_;c.fillText("ختم قرآن",W/2,285);c.globalAlpha=.8;c.font="500 40px "+F_;c.fillText("هر روز یک بخش",W/2,342);c.globalAlpha=1;
 if(O){c.font="700 38px "+F_;const w=Math.min(900,c.measureText(O[0]).width+90);c.fillStyle=ac;c.globalAlpha=.18;rr(c,W/2-w/2,372,w,68,34);c.fill();c.globalAlpha=.8;c.strokeStyle=ac;c.lineWidth=2;c.stroke();c.globalAlpha=1;c.fillStyle=ac;c.fillText(O[0],W/2,418)}
 if(SG.name&&cfg.name){c.fillStyle=tx;c.globalAlpha=.9;c.font="600 38px "+F_;c.fillText(cfg.name+(cfg.grp?" · "+cfg.grp:""),W/2,490);c.globalAlpha=1}
 const cx=W/2,cy=745,R=200;c.lineWidth=32;c.lineCap="round";c.strokeStyle="rgba(255,255,255,.14)";c.beginPath();c.arc(cx,cy,R,0,Math.PI*2);c.stroke();
 c.strokeStyle=ac;c.beginPath();c.arc(cx,cy,R,-Math.PI/2,-Math.PI/2+Math.PI*2*Math.max(.004,S.pct));c.stroke();
 c.fillStyle=tx;c.font="800 140px "+F_;c.fillText(fa(Math.round(S.pct*100))+"٪",cx,cy+36);c.globalAlpha=.8;c.font="500 38px "+F_;c.fillText("از یک ختم کامل",cx,cy+102);c.globalAlpha=1;
 c.fillStyle=tx;c.font="800 88px "+F_;c.fillText("روز "+fa(S.day)+" از "+fa(N),W/2,1050);c.fillStyle=ac;c.font="600 46px "+F_;c.fillText("ردیف امروز: "+fa(S.row),W/2,1112);
 const cells=[["آیات خوانده‌شده",fa(S.v)],["آیات باقی‌مانده",fa(S.left)],["جزء کامل",fa(S.ju)+" از ۳۰"],["سورهٔ کامل",fa(S.su)+" از ۱۱۴"],["روزهای خوانده‌شده",fa(S.days)],["روز پیاپی",fa(S.streak)]];
 cells.forEach((x,i)=>{const col=i%2,row=Math.floor(i/2),w=460,h=125,px=W/2+(col?-w-12:12),py=1160+row*(h+16);
  c.fillStyle="rgba(255,255,255,.1)";rr(c,px,py,w,h,28);c.fill();c.strokeStyle=ac;c.globalAlpha=.5;c.lineWidth=2;c.stroke();c.globalAlpha=1;
  c.fillStyle=tx;c.font="800 52px "+F_;c.fillText(x[1],px+w/2,py+64);c.globalAlpha=.78;c.font="500 30px "+F_;c.fillText(x[0],px+w/2,py+104);c.globalAlpha=1});
 c.fillStyle=tx;c.globalAlpha=.85;c.font="500 34px "+F_;c.fillText(jstr(TODAY)+" · "+hdate(),W/2,1640);c.globalAlpha=1;
 c.fillStyle=ac;c.font="58px "+AR;c.fillText(arN(O?O[2]:"تَقَبَّلَ اللهُ مِنَّا وَ مِنكُم"),W/2,1715);
 c.fillStyle=tx;c.font="600 34px "+F_;c.fillText("شما هم هر روز یک بخش با ما قرآن بخوانید",W/2,1778);
 c.globalAlpha=.7;c.direction="ltr";c.font="500 27px "+F_;c.fillText(appUrl().replace(/^https?:\/\//,""),W/2,1822);c.direction="rtl";c.globalAlpha=1}
function storySheet(){sheet(`<h2>اشتراک‌گذاری برای استوری</h2><p class="muted">تصویر ۹:۱۶ مناسب استوری اینستاگرام.</p>
<div class="field">مناسبت<select id="sg-o"><option value="auto" ${SG.occ==="auto"?"selected":""}>خودکار (طبق تاریخ امروز${occAuto()?": "+esc(occAuto()[0]):""})</option><option value="none" ${SG.occ==="none"?"selected":""}>بدون مناسبت</option>${OCCP.map((x,i)=>`<option value="${i}" ${SG.occ===String(i)?"selected":""}>${x[0]}</option>`).join("")}</select></div>
<div class="field">طرح</div><div class="dsw" style="justify-content:center">${STH.map((x,i)=>`<button data-act="sg-t" data-i="${i}" class="${SG.t===i?"on":""}" style="background:linear-gradient(135deg,${x[1]},${x[2]});color:${x[3]}" aria-label="${x[0]}">${x[0].slice(0,2)}</button>`).join("")}</div>
<div class="sr"><span>نمایش نام${cfg.name?" ("+esc(cfg.name)+")":""}</span><input type="checkbox" class="sw2" id="sg-n" ${SG.name?"checked":""}></div>
<canvas id="sgc" style="width:62%;max-width:300px;aspect-ratio:9/16;display:block;margin:10px auto;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.5)"></canvas>
<div class="row"><button class="btn g" data-act="sg-share">${ic("share")} اشتراک / ذخیره تصویر</button></div>`);
 const pick=()=>{const O=occCur();if(O)SG.t=O[1];$$(".dsw button").forEach((b,k)=>b.classList.toggle("on",k===SG.t))};
 if(SG.occ!=="none"&&!SG.touched)pick();
 $("#sg-o").onchange=e=>{SG.occ=e.target.value;SG.touched=0;pick();drawStory($("#sgc"))};
 $("#sg-n").onchange=e=>{SG.name=e.target.checked;drawStory($("#sgc"))};drawStory($("#sgc"))}
ACT["sg-t"]=t=>{SG.t=+t.dataset.i;SG.touched=1;$$(".dsw button").forEach(b=>b.classList.toggle("on",b===t));drawStory($("#sgc"))};
ACT["sg-share"]=async()=>{const cv=$("#sgc");await drawStory(cv);cv.toBlob(async b=>{if(!b)return toast("ساخت تصویر ممکن نشد");const f=new File([b],"khatm-story.png",{type:"image/png"});
 try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:"ختم قرآن",text:"هر روز یک بخش قرآن؛ شما هم به ما بپیوندید:\n"+appUrl()});return}}catch(e){if(e&&e.name==="AbortError")return}
 const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="khatm-story.png";a.click();toast("تصویر ذخیره شد؛ آن را در استوری بگذارید")},"image/png")};
ACT["story"]=()=>storySheet();
/* ---- نصب برنامه ---- */
const isStandalone=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone;
const isIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent);
function installSheet(first){if(isStandalone())return toast("برنامه از قبل نصب شده است ✓");
 const how=deferred?"":`<p style="line-height:2.1">${isIOS()?"در سافاری روی دکمهٔ «اشتراک‌گذاری» بزنید و «Add to Home Screen» را انتخاب کنید.":"از منوی مرورگر (⋮) گزینهٔ «نصب برنامه» یا «Add to Home screen» را بزنید."}</p>`;
 sheet(`<div class="cb"><div class="ck">${ic("down")}</div><h2 style="text-align:center">نصب برنامه</h2><p style="text-align:center;line-height:2.1">با نصب، برنامه مثل یک اپ جدا باز می‌شود، سریع‌تر است و آفلاین هم کار می‌کند.</p>${how}</div>
<div class="row">${deferred?`<button class="btn g" data-act="ins-go">نصب</button>`:""}<button class="btn" data-act="ins-no">${first?"فعلاً نه":"بستن"}</button></div>`);}
ACT["ins-go"]=async()=>{const s=$("#sheet");s&&s.remove();cfg.inst=1;save();if(deferred){deferred.prompt();deferred=null}};
ACT["ins-no"]=()=>{cfg.inst=1;save();const s=$("#sheet");s&&s.remove()};
ACT["install"]=()=>installSheet(false);
let insShown=0;
function installOffer(){if(cfg.inst||insShown||isStandalone()||!cfg.ob)return;insShown=1;
 setTimeout(()=>{if(cfg.inst||isStandalone()||$("#insbar"))return;const b=document.createElement("div");b.id="insbar";
  b.innerHTML=`<span>${ic("down")}</span><b>نصب برنامه روی گوشی</b><button class="go" data-act="ins-bar">${deferred?"نصب":"راهنما"}</button><button class="x" data-act="ins-no2" aria-label="بستن">${ic("x")}</button>`;
  document.body.appendChild(b);requestAnimationFrame(()=>requestAnimationFrame(()=>b.classList.add("on")));
  setTimeout(()=>insHide(),20000)},60000)}
function insHide(){const b=$("#insbar");if(!b)return;b.classList.remove("on");setTimeout(()=>b.remove(),700)}
ACT["ins-bar"]=()=>{insHide();if(deferred){cfg.inst=1;save();deferred.prompt();deferred=null}else installSheet(true)};
ACT["ins-no2"]=()=>{cfg.inst=1;save();insHide()};
/* ---- تمام‌صفحه: بازگشت خودکار به بالا ---- */
["fullscreenchange","webkitfullscreenchange","resize"].forEach(n=>addEventListener(n,()=>{if(n==="resize"&&!document.fullscreenElement)return;[0,150,450].forEach(t=>setTimeout(()=>{window.scrollTo(0,0);document.documentElement.scrollTop=0;document.body.scrollTop=0;const a=$("#app");a&&(a.scrollTop=0)},t))}));
