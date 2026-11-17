/* ===== احادیث: پیش‌فرض + کتابخانهٔ hlib.ir (پس‌زمینه) + دلخواه ===== */
const HAPI="https://api.hlib.ir/api/v1/widget/",HCAP=50,HKEEP_DAYS=45;
let HL=Object.assign({items:[],last:0,cool:0,today:null},ls.get("khatm-hl",{}));
const hsave=()=>ls.set("khatm-hl",HL);
const hhash=s=>{let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return(h>>>0).toString(36)};
let _hb=null;
function hBuiltin(){if(!_hb)_hb=(window.HD||[]).map(x=>Object.assign({k:"b"},x)).concat(HADITH.map((x,i)=>({id:"b"+i,fa:x[0],at:x[1],by:imamOf(x[1]),k:"b"})));return _hb}
const hAll=()=>hBuiltin().concat(HL.items,(cfg.ch||[]).map(x=>Object.assign({k:"c"},x)));
/* مناسبت‌هایی که نام معصوم در عنوانشان نیست */
const EVMS={"12-18":["ali"],"1-9":["hussain"],"1-10":["hussain"],"1-11":["hussain"],"2-20":["hussain"],"7-27":["prophet"],"9-19":["ali"],"9-21":["ali"],"9-23":["ali"],"12-9":["hussain"],"12-24":["prophet","ali"],"3-12":["prophet"]};
function occMasoum(){const o=[];occOn(TODAY,cfg.ho).forEach(e=>{imamsIn(e[2]).forEach(k=>o.push(k));(EVMS[e[0]+"-"+e[1]]||[]).forEach(k=>o.push(k))});return[...new Set(o)]}
function hadithOfDay(){const key=Math.floor(TODAY/DAY),ms=occMasoum(),evs=occOn(TODAY,cfg.ho),all=hAll();let pool=[],why="حدیث روز";
if(ms.length){pool=all.filter(h=>ms.includes(h.by));if(pool.length)why="حدیث مناسبت · "+evs[0][2]}
if(!pool.length){if(HL.today&&HL.today.day===key&&HL.today.h){return{h:HL.today.h,why}}pool=all}
const sh=pool.filter(h=>(h.fa||"").length<=300);if(sh.length)pool=sh;
return{h:pool[(key*7919+13)%pool.length],why}}
function hadithBanner(){const{h,why}=hadithOfDay();if(!h)return"";
return`<button class="hb" data-act="h-open" data-id="${h.id}">${mimg(h.by)}<div class="tx"><b>${why}${h.by?" · "+MS[h.by]:""}</b><span>«${esc(h.fa)}»</span><small>${esc(h.at||"")}</small></div></button>`}
function hcard(h,full){return`<div class="hcard">${mimg(h.by)}<p class="t">${esc(h.t||(h.by?MS[h.by]:"حدیث"))}</p>${h.ar?`<div class="har">${esc(arN(h.ar))}</div>`:""}<div class="hfa">«${esc(h.fa)}»</div>${h.tip?`<p class="muted" style="margin-top:6px;font-size:.84rem;line-height:1.9">نکته: ${esc(h.tip)}</p>`:""}<small>${esc(h.at||(h.by?MS[h.by]:""))}${h.src&&!(h.at||"").includes(h.src)?" · "+esc(h.src):""}</small>
<div class="rw"><button class="chip" data-act="h-copy" data-id="${h.id}">${ic("copy")} کپی</button><button class="chip on" data-act="st-h" data-id="${h.id}">${ic("share")} استوری</button><button class="chip ${cfg.fav.h.includes(h.id)?"on":""}" data-act="h-fav" data-id="${h.id}">${ic("star")} علاقه‌مندی</button>${h.url?`<a class="chip" href="${esc(h.url)}" target="_blank" rel="noopener">${ic("link")} منبع در hlib.ir</a>`:""}${h.k==="c"?`<button class="chip" data-act="h-del" data-id="${h.id}" style="color:#f24365">${ic("trash")} حذف</button>`:""}</div></div>`}
const hById=id=>hAll().find(h=>h.id===id);
ACT["h-open"]=t=>{const h=hById(t.dataset.id);h&&sheet(hcard(h))};
ACT["h-copy"]=t=>{const h=hById(t.dataset.id);if(h)navigator.clipboard&&navigator.clipboard.writeText((h.ar?h.ar+"\n":"")+h.fa+"\n— "+(h.at||"")).then(()=>toast("حدیث کپی شد"))};
ACT["h-fav"]=t=>{const i=cfg.fav.h.indexOf(t.dataset.id);i>=0?cfg.fav.h.splice(i,1):cfg.fav.h.push(t.dataset.id);save();t.classList.toggle("on")};
ACT["h-del"]=t=>{cfg.ch=cfg.ch.filter(x=>x.id!==t.dataset.id);save();const s=$("#sheet");s&&s.remove();hList();hCount()};
/* ---- صفحهٔ احادیث ---- */
const HS={by:"",q:"",n:40,form:false};
function hFilter(){const q=nrm(HS.q).trim();return hAll().filter(h=>(!HS.by||h.by===HS.by)&&(!q||nrm((h.fa||"")+(h.at||"")+(h.t||"")).includes(q))).sort((a,b)=>(b.ts||0)-(a.ts||0))}
function hList(){const el=$("#hl");if(!el)return;const L=hFilter();el.innerHTML=(L.slice(0,HS.n).map(h=>hcard(h)).join("")||'<div class="card muted">حدیثی پیدا نشد.</div>')+(L.length>HS.n?`<div class="row"><button class="btn" data-act="h-more">نمایش بیشتر (${fa(L.length-HS.n)})</button></div>`:"")}
const hCount=()=>{const e=$("#hcnt");if(e)e.textContent=fa(hAll().length)+" حدیث · "+fa(HL.items.length)+" از کتابخانهٔ hlib.ir"};
ACT["h-more"]=()=>{HS.n+=40;hList()};
function hadithPage(){const back=`<button class="chip" data-sub="menu">‹ بازگشت</button>`;
return`${back}<h2 style="margin-top:12px">احادیث</h2><p class="muted" id="hcnt">${fa(hAll().length)} حدیث · ${fa(HL.items.length)} از کتابخانهٔ hlib.ir</p>
<div class="row" style="margin-top:10px"><button class="btn g sm" data-act="h-sync" id="hsy">${ic("cloud")} دریافت حدیث تازه</button><a class="btn sm" href="https://hlib.ir/" target="_blank" rel="noopener">${ic("link")} ورود به hlib.ir</a><button class="btn sm" data-act="h-form">${ic("plus")} افزودن حدیث دلخواه</button></div>
<p class="muted" style="margin-top:8px;font-size:.76rem">برنامه به‌آرامی و در پس‌زمینه از کتابخانهٔ حدیث hlib.ir حدیث دریافت می‌کند (حداکثر ${fa(HCAP)} حدیث برای هر معصوم؛ قدیمی‌ها به‌مرور جایگزین می‌شوند).</p>
<div id="hform"></div>
<div class="mav"><button data-act="h-by" data-by="" class="${HS.by?"":"on"}"><span style="font-size:1.4rem">✦</span>همه</button>${Object.keys(MS).map(k=>`<button data-act="h-by" data-by="${k}" class="${HS.by===k?"on":""}">${mimg(k)}${MS[k].replace(/ \(.*\)/,"")}</button>`).join("")}</div>
<div class="search">${ic("search")}<input id="hq" placeholder="جستجو در احادیث" value="${esc(HS.q)}"></div><div id="hl"></div>`}
function hadithBind(){hList();$("#hq").oninput=e=>{HS.q=e.target.value;HS.n=40;hList()};if(HS.form)ACT["h-form"]()}
ACT["h-by"]=t=>{HS.by=t.dataset.by;HS.n=40;$$(".mav button").forEach(b=>b.classList.toggle("on",b===t));hList()};
ACT["h-form"]=()=>{const f=$("#hform");if(!f)return;HS.form=true;f.innerHTML=`<div class="card"><b>افزودن حدیث</b><div class="field">گوینده<select id="hf-by">${Object.keys(MS).map(k=>`<option value="${k}">${MS[k]}</option>`).join("")}</select></div><div class="field">متن فارسی<textarea id="hf-fa"></textarea></div><div class="field">متن عربی (اختیاری)<textarea id="hf-ar" dir="rtl"></textarea></div><div class="field">منبع (اختیاری)<input id="hf-src" placeholder="مثلاً نهج‌البلاغه، حکمت ۱۲۰"></div><div class="row"><button class="btn g" data-act="h-add">ذخیره</button><button class="btn" data-act="h-cancel">انصراف</button></div></div>`};
ACT["h-cancel"]=()=>{HS.form=false;$("#hform").innerHTML=""};
ACT["h-add"]=()=>{const fa_=$("#hf-fa").value.trim();if(!fa_)return toast("متن فارسی را بنویسید");const by=$("#hf-by").value,src=$("#hf-src").value.trim();
cfg.ch.push({id:"c"+Date.now().toString(36),by,fa:fa_,ar:$("#hf-ar").value.trim(),at:MS[by]+(src?" — "+src:""),ts:Date.now()});save();HS.form=false;$("#hform").innerHTML="";hList();hCount();toast("حدیث اضافه شد")};
/* ---- همگام‌سازی با hlib.ir (آرام، برای جلوگیری از مسدود شدن) ---- */
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function hlGet(p){const r=await fetch(HAPI+p,{headers:{Accept:"application/json"}});if(r.status===429)throw{rate:1};if(!r.ok)throw{http:r.status};return r.json()}
function hlConv(x){if(!x||!x.text_fa)return null;return{id:"h"+hhash(x.text_fa),t:x.title||"",fa:x.text_fa,ar:x.text_ar||"",at:x.attribution||"",src:x.featured&&x.featured.source||"",url:x.featured&&x.featured.canonical_url||"",by:imamOf(x.attribution||""),ts:Date.now(),k:"h"}}
function hlAdd(it){if(!it||HL.items.some(h=>h.id===it.id))return false;
 const same=HL.items.filter(h=>h.by===it.by);
 if(same.length>=HCAP){const old=same.reduce((a,b)=>(a.ts<b.ts?a:b));if(Date.now()-old.ts<14*DAY)return false;HL.items=HL.items.filter(h=>h!==old)}
 HL.items.push(it);return true}
function hlPrune(){const lim=Date.now()-HKEEP_DAYS*DAY;const cnt={};HL.items.forEach(h=>cnt[h.by]=(cnt[h.by]||0)+1);
 HL.items=HL.items.filter(h=>{if(h.ts<lim&&cnt[h.by]>20){cnt[h.by]--;return false}return true})}
let hlBusy=false;
async function hlHarvest(max=25,manual){if(hlBusy)return 0;if(!navigator.onLine)return manual&&toast("اینترنت در دسترس نیست"),0;
 if(HL.cool>Date.now()){manual&&toast("برای جلوگیری از محدودیت، کمی بعد تلاش کنید");return 0}
 hlBusy=true;let added=0,dup=0;const b=$("#hsy");
 try{for(let k=0;k<max;k++){const j=await hlGet("random");const it=hlConv(j&&j.data);if(hlAdd(it)){added++;dup=0}else if(++dup>=10)break;
  if(b)b.textContent="در حال دریافت… "+fa(k+1)+"/"+fa(max);if(added&&added%4===0){hsave();hCount()}
  await sleep(1600+Math.random()*900)}}
 catch(e){if(e&&e.rate){HL.cool=Date.now()+20*60000;manual&&toast("سرور درخواست‌ها را محدود کرد؛ بعداً ادامه می‌دهیم")}else manual&&toast("اتصال به hlib.ir ممکن نشد")}
 hlPrune();HL.last=Date.now();hsave();hlBusy=false;hCount();if(b)b.innerHTML=`${ic("cloud")} دریافت حدیث تازه`;hList();manual&&added&&toast(fa(added)+" حدیث تازه اضافه شد");return added}
async function hlToday(){const key=Math.floor(TODAY/DAY);if(HL.today&&HL.today.day===key)return;if(!navigator.onLine||HL.cool>Date.now())return;
 try{const j=await hlGet("today"),it=hlConv(j&&j.data&&j.data[0]);if(it){HL.today={day:key,h:it};hlAdd(it);hsave()}}catch(e){if(e&&e.rate)HL.cool=Date.now()+20*60000}}
ACT["h-sync"]=()=>hlHarvest(30,true);
/* هر بار باز شدن برنامه: چند حدیث تازه در پس‌زمینه */
function hadithBoot(){setTimeout(async()=>{await hlToday();if(Date.now()-HL.last>3*3600e3)hlHarvest(25)},7000)}
