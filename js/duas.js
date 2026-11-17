/* ===== دعاها و زیارات: دسته‌بندی، ماه‌های قمری، مناسبت‌ها ===== */
window.DUAS=window.DUAS||[];
const DCAT={ziyarat:["زیارات","book"],dua:["دعاها","star"],munajat:["مناجات","heart"],tawassul:["توسل و تعجیل فرج","flame"],hadith:["حدیث کسا","info"],qdua:["دعاهای قرآنی","book"],surah:["سوره‌های برگزیده","list"],my:["متن‌های من","plus"]};
/* فهرست ادعیه: زمان خواندن طبق سنت مشهور است. متن کامل هر مورد از فایل data/dua-<id>.js بارگذاری می‌شود (یا از بخش «افزودن متن») */
const DC=[
{id:"ashura",t:"زیارت عاشورا",by:"امام باقر (ع)",cat:"ziyarat",when:"مخصوص روز عاشورا؛ در سایر روزها هم مستحب است"},
{id:"waritha",t:"زیارت وارث",by:"زیارت امام حسین (ع)",cat:"ziyarat",when:"از زیارت‌های مشهور امام حسین (ع)"},
{id:"arbaeen",t:"زیارت اربعین",by:"امام صادق (ع)",cat:"ziyarat",when:"روز اربعین حسینی (۲۰ صفر)"},
{id:"yasin",t:"زیارت آل یاسین",by:"زیارت امام زمان (عج)",cat:"ziyarat",when:"مناسب جمعه‌ها و ایام ولادت امام زمان (عج)"},
{id:"aminallah",t:"زیارت امین‌الله",by:"زیارت امیرالمؤمنین (ع)",cat:"ziyarat",when:"زیارت امیرالمؤمنین (ع) از راه دور و نزدیک"},
{id:"kumayl",t:"دعای کمیل",by:"امام علی (ع) به کمیل بن زیاد",cat:"dua",when:"مرسوم: شب‌های جمعه و نیمهٔ شعبان و شب‌های قدر"},
{id:"nudba",t:"دعای ندبه",by:"امام صادق (ع)",cat:"dua",when:"مرسوم: صبح‌های جمعه و اعیاد فطر، قربان و غدیر"},
{id:"ahd",t:"دعای عهد",by:"امام صادق (ع)",cat:"dua",when:"مرسوم: هر صبح، به‌ویژه جمعه‌ها"},
{id:"iftitah",t:"دعای افتتاح",by:"امام زمان (عج)",cat:"dua",when:"شب‌های ماه مبارک رمضان"},
{id:"abuhamza",t:"دعای ابوحمزهٔ ثمالی",by:"امام سجاد (ع)",cat:"dua",when:"سحرهای ماه مبارک رمضان"},
{id:"jawshan",t:"دعای جوشن کبیر",by:"پیامبر اکرم (ص)",cat:"dua",when:"شب‌های قدر و ماه رمضان"},
{id:"arafa",t:"دعای عرفه",by:"امام حسین (ع)",cat:"dua",when:"روز عرفه (۹ ذی‌الحجه)"},
{id:"simat",t:"دعای سمات",by:"دعای عصر جمعه",cat:"dua",when:"مرسوم: عصر جمعه تا غروب"},
{id:"mojir",t:"دعای مجیر",by:"دعای ایام البیض",cat:"dua",when:"مرسوم: ایام البیض (۱۳، ۱۴ و ۱۵ هر ماه قمری) و ماه رمضان"},
{id:"shabaniyya",t:"مناجات شعبانیه",by:"امام علی (ع) و ائمه (ع)",cat:"munajat",when:"ماه شعبان"},
{id:"tawassul",t:"دعای توسل",by:"توسل به چهارده معصوم (ع)",cat:"tawassul",when:"مرسوم: شب‌های چهارشنبه و هنگام حاجت"},
{id:"faraj-bala",t:"دعای فرج (إلهی عظم البلاء)",by:"برای گشایش و فرج",cat:"tawassul",when:"هنگام گرفتاری و برای تعجیل فرج"},
{id:"kisa",t:"حدیث کسا",by:"حضرت فاطمهٔ زهرا (س)",cat:"hadith",when:"مناسب روزهای فاطمیه و هنگام حاجت"}];
/* برنامهٔ ماه‌ها و مناسبت‌ها: [ماه، روز (۰ = کل ماه)، عنوان، شناسه‌ها] */
const DMAP=[
[1,0,"ماه محرم",["ashura","waritha"]],[1,9,"تاسوعا",["ashura","waritha"]],[1,10,"عاشورا",["ashura","waritha"]],[1,11,"شام غریبان",["waritha"]],
[2,0,"ماه صفر",["arbaeen","waritha"]],[2,20,"اربعین حسینی",["arbaeen","waritha"]],
[3,9,"آغاز امامت امام زمان (عج)",["ahd","yasin","faraj-bala"]],
[6,3,"شهادت حضرت زهرا (س)",["kisa"]],[6,20,"ولادت حضرت زهرا (س)",["kisa"]],
[7,13,"ولادت امیرالمؤمنین (ع)",["aminallah"]],[7,27,"عید مبعث",["jawshan"]],
[8,0,"ماه شعبان",["shabaniyya"]],[8,3,"ولادت امام حسین (ع)",["waritha"]],[8,15,"نیمهٔ شعبان؛ ولادت امام زمان (عج)",["kumayl","yasin","ahd","faraj-bala","nudba"]],
[9,0,"ماه رمضان",["iftitah","abuhamza","mojir"]],[9,19,"شب قدر (۱۹)",["jawshan","kumayl"]],[9,21,"شب قدر (۲۱)",["jawshan","kumayl"]],[9,23,"شب قدر (۲۳)",["jawshan","kumayl"]],
[10,1,"عید فطر",["nudba"]],
[12,9,"روز عرفه",["arafa"]],[12,10,"عید قربان",["nudba"]],[12,18,"عید غدیر",["nudba","aminallah"]]];
const DWK={5:["nudba","ahd","simat","yasin"],4:["kumayl"],3:["tawassul"]};/* روز هفته (میلادی: ۵=جمعه، ۴=پنجشنبه (شب جمعه)، ۳=چهارشنبه) */
/* ---- منبع داده ---- */
let _bi=null;
function duaBuiltin(){if(!_bi)_bi=DU.map((d,i)=>({id:"bi"+i,t:d.t,by:d.s,cat:d.tasb?"tawassul":"dua",p:[[d.ar||"",d.fa||""]],tasb:d.tasb,builtin:1}));return _bi}
function duaFile(id){return DUAS.find(x=>x.id===id)}
function duaRec(id){let m=DC.find(x=>x.id===id)||duaBuiltin().find(x=>x.id===id),c=(cfg.cd||[]).find(x=>x.id===id),f=duaFile(id);
 if(!m&&c)m={id:c.id,t:c.t,by:c.by||"",cat:"my",custom:1};if(!m&&f)m=f;if(!m)return null;
 const r=Object.assign({},m,f||{});
 if(!r.p&&c){const A=(c.ar||"").split("\n"),B=(c.fa||"").split("\n"),n=Math.max(A.length,B.length);r.p=[...Array(n)].map((_,i)=>[A[i]||"",B[i]||""]);r.mine=1}
 return r}
const duaList=()=>[...DC.map(x=>x.id),...duaBuiltin().map(x=>x.id),...(cfg.cd||[]).filter(c=>!DC.some(x=>x.id===c.id)).map(c=>c.id)].map(duaRec).filter(Boolean);
/* متن هر دعا در فایل جداگانهٔ data/dua-<id>.js است: هنگام باز کردن بارگذاری می‌شود و اگر کاربر «دانلود» بزند برای استفادهٔ آفلاین در حافظهٔ دستگاه می‌ماند */
const DFILES=new Set(["ashura","waritha","yasin","arbaeen","aminallah","shabaniyya","kisa","tawassul","kumayl","ahd","iftitah","mojir","abuhamza","jawshan","simat","arafa","nudba","faraj-bala"]);
const DCK="khatm-duas",dUrl=id=>"data/dua-"+id+".js";let DDL=new Set(),DBUSY={};
async function duaScan(){try{const c=await caches.open(DCK);DDL=new Set((await c.keys()).map(r=>(r.url.match(/dua-([^\/.]+)\.js/)||[])[1]).filter(Boolean))}catch(e){}}
async function duaLoad(id){if(duaFile(id))return 1;if(!DFILES.has(id))return 0;
 try{let r=null;try{r=await (await caches.open(DCK)).match(dUrl(id))}catch(e){}
  if(!r)r=await fetch(dUrl(id));if(!r||!r.ok)return 0;(0,Function)(await r.text())();return duaFile(id)?1:0}catch(e){return 0}}
async function duaDl(id,rm){const c=await caches.open(DCK);if(rm){await c.delete(dUrl(id));DDL.delete(id)}else{const r=await fetch(dUrl(id));if(!r.ok)throw 0;await c.put(dUrl(id),r);DDL.add(id)}}
const DSZ={ashura:20,waritha:12,yasin:15,arbaeen:8,aminallah:8,shabaniyya:14,kisa:16,tawassul:30,kumayl:50,ahd:12,iftitah:25,mojir:25,abuhamza:110,jawshan:90,simat:45,arafa:150,nudba:30,"faraj-bala":3};
function loadDuaFiles(){duaScan()}
/* ---- وضعیت صفحه ---- */
const DS={tab:"cat",cat:null,id:null,q:"",form:null};
const dHas=r=>r.p&&r.p.some(x=>x[0]||x[1]);
const dAvail=r=>dHas(r)||DFILES.has(r.id);
function dlBtn(r){if(!DFILES.has(r.id))return"";const on=DDL.has(r.id),bz=DBUSY[r.id];
 return`<button class="dlb ${on?"on":""}" data-act="d-dl" data-id="${r.id}" aria-label="${on?"حذف نسخهٔ آفلاین":"دانلود برای استفادهٔ آفلاین"}" title="${on?"ذخیره شده برای آفلاین (برای حذف لمس کنید)":"دانلود برای آفلاین"}">${bz?"…":ic(on?"check":"down")}</button>`}
function ditem(r){const has=dAvail(r);return`<div class="dli"><button class="item" data-act="d-open" data-id="${r.id}"><div class="dot">${ic(DCAT[r.cat]?DCAT[r.cat][1]:"book")}</div><div><div class="t1">${esc(r.t)}</div><div class="t2">${esc(r.by||"")}${r.when?" · "+esc(r.when):""}</div></div>${has?"":`<span class="muted" style="font-size:.7rem;white-space:nowrap">متن اضافه نشده</span>`}${ic("prev")}</button>${dlBtn(r)}</div>`}
function todaySuggest(){const h=hij(TODAY,cfg.ho),wd=new Date(TODAY).getUTCDay(),ids=new Set(),why=[];
 DMAP.forEach(x=>{if(x[0]===h[1]&&(x[1]===h[2]||x[1]===0)){x[3].forEach(i=>ids.add(i));if(x[1])why.push(x[2])}});
 (DWK[wd]||[]).forEach(i=>ids.add(i));if(wd===5)why.push("جمعه");if(wd===4)why.push("شب جمعه");if(wd===3)why.push("شب چهارشنبه");
 return{why,list:[...ids].map(duaRec).filter(Boolean)}}
function todayDuaCard(){const ts=todaySuggest();if(!ts.list.length)return"";
 return`<div class="card"><b>امروز چه بخوانیم؟</b><p class="muted">${ts.why.length?ts.why.join(" · "):hdate()}</p><div class="chips wrap">${ts.list.map(r=>`<button class="chip on" data-act="d-open" data-id="${r.id}">${esc(r.t)}</button>`).join("")}</div></div>`}
function evDuas(e){const ids=new Set();DMAP.forEach(x=>{if(x[0]===e[0]&&x[1]===e[1])x[3].forEach(i=>ids.add(i))});const L=[...ids].map(duaRec).filter(Boolean);
 return L.length?`<b class="mon" style="display:block;margin:12px 0 4px">دعا و زیارت مناسب</b><div class="chips wrap">${L.map(r=>`<button class="chip on" data-act="d-open" data-id="${r.id}">${esc(r.t)}</button>`).join("")}</div>`:""}
function duasPage(){
 if(DS.id)return duaDetail();
 const back=`<button class="chip" data-sub="menu">‹ بازگشت</button>`,all=duaList(),q=nrm(DS.q).trim();
 let h=`${back}<h2 style="margin-top:12px">دعاها و زیارات</h2><p class="muted">دسته‌بندی بر اساس نوع، ماه‌های قمری و مناسبت‌ها</p>
<div class="search">${ic("search")}<input id="dq" placeholder="جستجوی دعا یا زیارت" value="${esc(DS.q)}"></div>
<div class="row" style="margin-top:8px"><button class="btn sm ${[...DFILES].every(i=>DDL.has(i))?"":"g"}" data-act="d-dlall">${ic([...DFILES].every(i=>DDL.has(i))?"check":"cloud")} ${[...DFILES].every(i=>DDL.has(i))?"همهٔ ادعیه آفلاین است":"دانلود همهٔ ادعیه برای آفلاین (حدود ۶۰۰ کیلوبایت)"}</button></div><p class="muted" style="font-size:.74rem;margin-top:4px">با دکمهٔ ⬇ مقابل هر دعا می‌توانید فقط همان را دانلود کنید.</p>`;
 if(q){const L=all.filter(r=>nrm(r.t+(r.by||"")).includes(q));return h+(L.map(ditem).join("")||'<div class="card muted">چیزی پیدا نشد.</div>')}
 h+=`<div class="seg">${[["cat","دسته‌بندی"],["mon","ماه‌ها و مناسبت‌ها"],["fav","علاقه‌مندی‌ها"]].map(x=>`<button data-act="d-tab" data-tab="${x[0]}" class="${DS.tab===x[0]?"on":""}">${x[1]}</button>`).join("")}</div>`;
 if(DS.tab==="cat"){
  if(!DS.cat){
   const cnt=k=>k==="qdua"?QD.length:k==="surah"?QS.length:all.filter(r=>r.cat===k&&(k==="my"||dAvail(r))).length;
   h+=`<div class="cats">${Object.keys(DCAT).filter(k=>k==="my"||cnt(k)>0).map(k=>`<button class="cat" data-act="d-cat" data-cat="${k}"><div class="dot">${ic(DCAT[k][1])}</div><b>${DCAT[k][0]}</b><small>${fa(cnt(k))} مورد</small></button>`).join("")}</div>`}
  else{h+=`<div class="row" style="margin-top:12px"><button class="chip" data-act="d-cat" data-cat="">‹ همهٔ دسته‌ها</button></div><h2 style="margin-top:10px">${DCAT[DS.cat][0]}</h2>`;
   if(DS.cat==="qdua"){h+=QD.map(q=>`<div class="card">${q[2]?[...Array(q[2]-q[1]+1)].map((_,k)=>qv(q[0],q[1]+k)).join(""):qv(q[0],q[1])}<p class="muted">${SURA_FA[q[0]-1]} · آیهٔ ${fa(q[1])}${q[2]?"–"+fa(q[2]):""}</p></div>`).join("");if(!(window.TR&&TR[cfg.tr]))loadTR(cfg.tr).then(()=>sub==="duas"&&more("duas"))}
   else if(DS.cat==="surah")h+=QS.map((q,i)=>`<button class="item" data-qs="${i}"><div class="dot">${ic("book")}</div><div><div class="t1">${q[0]==="حمد"||q[0]==="آیةالکرسی"?q[0]:"سورهٔ "+q[0]}</div></div>${ic("prev")}</button>`).join("");
   else{const L=all.filter(r=>r.cat===DS.cat);h+=(L.map(ditem).join("")||'<div class="card muted">هنوز موردی نیست.</div>')+(DS.cat==="my"?"":"")+`<div class="row"><button class="btn" data-act="d-addform">${ic("plus")} افزودن متن دلخواه</button></div>`}}}
 else if(DS.tab==="mon"){
  h+=HM.map((mn,mi)=>{const m=mi+1,ev=EV.map((e,i)=>({e,i})).filter(x=>x.e[0]===m),gen=DMAP.filter(x=>x[0]===m&&x[1]===0);
   const body=gen.map(x=>`<p class="muted" style="margin-top:8px">${x[2]}</p><div class="chips wrap">${x[3].map(duaRec).filter(Boolean).map(r=>`<button class="chip on" data-act="d-open" data-id="${r.id}">${esc(r.t)}</button>`).join("")}</div>`).join("")+
   ev.map(({e,i})=>{const ids=[...new Set(DMAP.filter(x=>x[0]===m&&x[1]===e[1]).flatMap(x=>x[3]))].map(duaRec).filter(Boolean);return`<div style="margin-top:10px"><button class="item" data-ev="${i}" style="margin-top:0"><div class="dot" style="background:${e[3]==="m"?"#7f1d1d;color:#fff":"var(--gold);color:#1a1405"}">${fa(e[1]>0?e[1]:"آخر")}</div><div><div class="t1">${e[2]}</div><div class="t2">اعمال، احکام و حدیث</div></div>${ic("prev")}</button>${ids.length?`<div class="chips wrap" style="margin-top:6px">${ids.map(r=>`<button class="chip on" data-act="d-open" data-id="${r.id}">${esc(r.t)}</button>`).join("")}</div>`:""}</div>`}).join("");
   const cur_=hij(TODAY,cfg.ho)[1]===m;
   return`<div class="acc ${cur_?"on":""}"><button data-act="d-acc">${mn}${cur_?" · ماه جاری":""}${ic("prev")}</button><div>${body||'<p class="muted" style="margin-top:8px">مناسبت ثبت‌شده‌ای نیست.</p>'}</div></div>`}).join("")+
  `<p class="mon">روزهای هفته</p><div class="card"><div class="t2">جمعه: ${(DWK[5]||[]).map(duaRec).filter(Boolean).map(r=>esc(r.t)).join("، ")}<br>شب جمعه (پنجشنبه): ${(DWK[4]||[]).map(duaRec).filter(Boolean).map(r=>esc(r.t)).join("، ")}<br>شب چهارشنبه: ${(DWK[3]||[]).map(duaRec).filter(Boolean).map(r=>esc(r.t)).join("، ")}</div></div>`}
 else{const L=all.filter(r=>cfg.fav.d.includes(r.id));h+=L.map(ditem).join("")||'<div class="card muted">با ستارهٔ بالای هر دعا، آن را اینجا نگه دارید.</div>'}
 return h+(DS.form?dForm():"")}
function dForm(){const f=DS.form;return`<div class="card" id="dform"><b>${f.id?"افزودن متن برای «"+esc(duaRec(f.id).t)+"»":"افزودن متن دلخواه"}</b><p class="muted" style="margin-top:4px">متن را از منبع معتبر (مفاتیح‌الجنان و …) کپی کنید. هر سطر عربی با سطر هم‌شمارهٔ ترجمه جفت می‌شود.</p>${f.id?"":`<div class="field">عنوان<input id="df-t"></div>`}<div class="field">متن عربی (هر سطر یک بند)<textarea id="df-ar" dir="rtl"></textarea></div><div class="field">ترجمهٔ فارسی (هر سطر یک بند)<textarea id="df-fa"></textarea></div><div class="row"><button class="btn g" data-act="d-save">ذخیره</button><button class="btn" data-act="d-cancel">انصراف</button></div></div>`}
function duaDetail(){const r=duaRec(DS.id);if(!r){DS.id=null;return duasPage()}
 if(DFILES.has(r.id)&&!duaFile(r.id)){if(DS.fail===r.id)return`<div class="row" style="margin-top:0"><button class="chip" data-act="d-back">‹ بازگشت</button></div><h2 style="margin-top:12px">${esc(r.t)}</h2><div class="card"><p style="line-height:2.1">متن این دعا هنوز روی دستگاه نیست و اتصال اینترنت برقرار نیست. با اینترنت یک بار دکمهٔ دانلود را بزنید تا همیشه آفلاین باشد.</p><div class="row"><button class="btn g" data-act="d-retry" data-id="${r.id}">تلاش دوباره</button></div></div>`;
  duaLoad(r.id).then(ok=>{DS.fail=ok?null:r.id;if(DS.id===r.id&&cur==="more"&&sub==="duas")dgo()});
  return`<div class="row" style="margin-top:0"><button class="chip" data-act="d-back">‹ بازگشت</button></div><h2 style="margin-top:12px">${esc(r.t)}</h2><div class="card muted">در حال بارگذاری متن…</div>`}
 const has=dHas(r),fs=cfg.dfs||26,tr=cfg.dtr!==false,fv=cfg.fav.d.includes(r.id);
 return`<div class="row" style="margin-top:0"><button class="chip" data-act="d-back">‹ بازگشت</button></div><h2 style="margin-top:12px">${esc(r.t)}</h2><p class="muted">${esc(r.by||"")}${r.when?" · "+esc(r.when):""}</p>
<div class="chips wrap"><button class="chip ${fv?"on":""}" data-act="d-fav" data-id="${r.id}">${ic("star")} علاقه‌مندی</button><button class="chip" data-act="d-look">${ic("text")} ظاهر و رنگ</button><button class="chip" data-act="d-fs" data-k="-2">A−</button><button class="chip" data-act="d-fs" data-k="2">A+</button><button class="chip ${tr?"on":""}" data-act="d-tr">${ic("trans")} ترجمه</button>${DFILES.has(r.id)?`<button class="chip ${DDL.has(r.id)?"on":""}" data-act="d-dl" data-id="${r.id}">${ic(DDL.has(r.id)?"check":"down")} ${DDL.has(r.id)?"آفلاین شد":"دانلود برای آفلاین"}</button>`:""}${has?`<button class="chip" data-act="d-copy" data-id="${r.id}">${ic("copy")} کپی</button><button class="chip" data-act="d-share" data-id="${r.id}">${ic("share")} اشتراک</button>`:""}${r.mine&&!r.builtin?`<button class="chip" data-act="d-del" data-id="${r.id}" style="color:#f24365">${ic("trash")} حذف متن</button>`:""}</div>
${r.partial?`<div class="bn w">${ic("warn")}<div><b>متن ناقص</b><span>${esc(r.note||"بخشی از متن موجود نیست")}</span></div></div>`:""}
${has?`<div class="dwrap" style="--dfs:${fs}px;${dvStyle()}">${r.p.map(x=>`${x[3]?`<h3 class="dh">${esc(x[3])}</h3>`:""}<div class="dp"><button class="stb" data-act="st-d" data-id="${r.id}" data-k="${r.p.indexOf(x)}" aria-label="اشتراک در استوری">${ic("share")}<span>استوری</span></button>${x[2]?`<p class="dn">${esc(x[2])}</p>`:""}${x[0]?`<div class="ar">${esc(arN(x[0]))}</div>`:""}${tr&&x[1]?`<div class="fa" ${x[0]?"":'style="font-size:1rem"'}>${esc(x[1])}</div>`:""}</div>`).join("")}</div>${r.src?`<p class="muted" style="margin-top:10px">منبع: ${esc(r.src)}</p>`:""}${r.tasb?`<div class="row"><button class="btn g" data-sub="tasb">باز کردن تسبیح</button></div>`:""}`
 :`<div class="card"><p style="line-height:2.1">متن کامل این مورد هنوز در برنامه نیست. برای جلوگیری از هرگونه اشتباه در متن، فقط متن معتبر وارد می‌شود. می‌توانید متن را از مفاتیح‌الجنان کپی و همین‌جا اضافه کنید؛ در پشتیبان‌گیری هم ذخیره می‌شود.</p><div class="row"><button class="btn g" data-act="d-addform" data-id="${r.id}">${ic("plus")} افزودن متن</button></div></div>`}
${DS.form?dForm():""}`}
function duasBind(){const q=$("#dq");if(q)q.oninput=e=>{DS.q=e.target.value;const p=e.target.selectionStart;more("duas");const n=$("#dq");n.focus();n.setSelectionRange(p,p)}}
const dgo=()=>{DS.busy=0;more("duas")};
ACT["d-tab"]=t=>{DS.tab=t.dataset.tab;DS.cat=null;dgo()};
ACT["d-cat"]=t=>{DS.cat=t.dataset.cat||null;dgo()};
ACT["d-open"]=t=>{const s=$("#sheet");s&&s.remove();DS.id=t.dataset.id;DS.form=null;DS.q="";if(cur!=="more")go("more");sub="duas";more("duas")};
ACT["d-back"]=()=>{DS.id=null;DS.form=null;dgo()};
ACT["d-acc"]=t=>t.closest(".acc").classList.toggle("on");
ACT["d-fav"]=t=>{const i=cfg.fav.d.indexOf(t.dataset.id);i>=0?cfg.fav.d.splice(i,1):cfg.fav.d.push(t.dataset.id);save();t.classList.toggle("on")};
ACT["d-fs"]=t=>{cfg.dfs=Math.max(18,Math.min(54,(cfg.dfs||26)+ +t.dataset.k));save();dgo()};
ACT["d-tr"]=()=>{cfg.dtr=cfg.dtr===false;save();dgo()};
const dText=r=>r.t+"\n\n"+r.p.map(x=>[x[0],x[1]].filter(Boolean).join("\n")).join("\n\n");
ACT["d-copy"]=t=>{const r=duaRec(t.dataset.id);navigator.clipboard&&navigator.clipboard.writeText(dText(r)).then(()=>toast("کپی شد"))};
ACT["d-share"]=t=>{const r=duaRec(t.dataset.id);if(navigator.share)navigator.share({title:r.t,text:dText(r)}).catch(()=>{});else navigator.clipboard&&navigator.clipboard.writeText(dText(r)).then(()=>toast("کپی شد"))};
ACT["d-addform"]=t=>{DS.form={id:t.dataset.id||""};DS.busy=0;more("duas");const f=$("#dform");f&&f.scrollIntoView({block:"center"})};
ACT["d-cancel"]=()=>{DS.form=null;dgo()};
ACT["d-save"]=()=>{const f=DS.form,ar=$("#df-ar").value.trim(),fa_=$("#df-fa").value.trim();if(!ar&&!fa_)return toast("متن را وارد کنید");
 const id=f.id||"u"+Date.now().toString(36),t=f.id?null:($("#df-t").value.trim());if(!f.id&&!t)return toast("عنوان را بنویسید");
 cfg.cd=(cfg.cd||[]).filter(x=>x.id!==id);cfg.cd.push({id,t:t||undefined,by:"",ar,fa:fa_});save();DS.form=null;DS.id=id;toast("متن ذخیره شد");dgo()};
ACT["d-del"]=t=>{if(!confirm("متن افزوده‌شده حذف شود؟"))return;cfg.cd=(cfg.cd||[]).filter(x=>x.id!==t.dataset.id);save();DS.id=DC.some(x=>x.id===t.dataset.id)?DS.id:null;dgo()};

ACT["d-retry"]=()=>{DS.fail=null;dgo()};
ACT["d-dl"]=async t=>{const id=t.dataset.id;if(DBUSY[id])return;const rm=DDL.has(id);DBUSY[id]=1;t.textContent="…";
 try{await duaDl(id,rm);toast(rm?"نسخهٔ آفلاین حذف شد":"برای استفادهٔ آفلاین ذخیره شد")}catch(e){toast("دانلود ممکن نشد؛ اتصال اینترنت را بررسی کنید")}
 delete DBUSY[id];dgo()};
ACT["d-dlall"]=async t=>{const L=[...DFILES].filter(i=>!DDL.has(i));if(!L.length)return toast("همهٔ ادعیه از قبل آفلاین است");
 let n=0;for(const id of L){t.textContent="در حال دانلود… "+fa(++n)+"/"+fa(L.length);try{await duaDl(id)}catch(e){toast("دانلود ناتمام ماند؛ دوباره تلاش کنید");break}}
 dgo()};

/* ---- ظاهر خواندن دعا: پس‌زمینه، رنگ، اندازه و خط (مناسب چشم) ---- */
const DBG=[["پیش‌فرض","",""],["کاغذی","#f4ecd8","#2b2418"],["سبز ملایم","#dfeadf","#1d2b20"],["آبی مه‌آلود","#dde7ee","#1b2832"],["شب گرم","#1c1812","#e6dcc4"],["خاکستری","#23272b","#d9dde0"],["مشکی","#000000","#c9ccc9"]];
const DFF=[["","پیش‌فرض برنامه"],["'Scheherazade Khatm'","شهرزاد"],["'Amiri Quran'","امیری"],["'Uthman Taha'","عثمان طاها (اگر نصب باشد)"]];
const dv=()=>Object.assign({bg:"",fg:"",ffs:0,lh:2.3,ff:""},cfg.dv);
function dvStyle(){const v=dv();return(v.bg?`--dbg:${v.bg};`:"")+(v.fg?`--dfg:${v.fg};`:"")+(v.ffs?`--ffs:${v.ffs}px;`:"")+`--dlh:${v.lh};`+(v.ff?`--dff:${v.ff},var(--ar);`:"")}
function dLook(){const v=dv();
 sheet(`<h2>ظاهر خواندن دعا</h2><p class="muted">رنگ و اندازه‌ای انتخاب کنید که چشمتان کمتر خسته شود.</p>
<div class="field">پس‌زمینه و رنگ نوشته</div><div class="dsw">${DBG.map((x,i)=>`<button data-act="d-bg" data-i="${i}" class="${v.bg===x[1]&&v.fg===x[2]?"on":""}" style="background:${x[1]||"var(--card)"};color:${x[2]||"var(--tx)"}" aria-label="${x[0]}">آ</button>`).join("")}</div>
<div class="row"><label class="chip" style="gap:6px">پس‌زمینه <input type="color" id="dv-bg" value="${v.bg||"#000000"}" style="width:34px;min-height:28px;padding:0;border:0"></label><label class="chip" style="gap:6px">نوشته <input type="color" id="dv-fg" value="${v.fg||"#ffffff"}" style="width:34px;min-height:28px;padding:0;border:0"></label></div>
<div class="field">اندازهٔ متن عربی: <b id="dv-a-v">${fa(cfg.dfs||26)}</b><input type="range" id="dv-a" min="18" max="54" step="2" value="${cfg.dfs||26}"></div>
<div class="field">اندازهٔ ترجمهٔ فارسی: <b id="dv-f-v">${fa(v.ffs||Math.round((cfg.dfs||26)*.58))}</b><input type="range" id="dv-f" min="12" max="32" step="1" value="${v.ffs||Math.round((cfg.dfs||26)*.58)}"></div>
<div class="field">فاصلهٔ خطوط<select id="dv-l">${[[1.8,"فشرده"],[2.3,"عادی"],[2.8,"باز"],[3.3,"بسیار باز"]].map(x=>`<option value="${x[0]}" ${v.lh===x[0]?"selected":""}>${x[1]}</option>`).join("")}</select></div>
<div class="field">قلم عربی<select id="dv-ff">${DFF.map(x=>`<option value="${x[0].replace(/"/g,"&quot;")}" ${v.ff===x[0]?"selected":""}>${x[1]}</option>`).join("")}</select></div>
<div class="row"><button class="btn" data-act="d-lookreset">بازگشت به پیش‌فرض</button><button class="btn g" data-act="d-lookok">تمام</button></div>`);
 const up=()=>{save();const w=$(".dwrap");w&&w.setAttribute("style","--dfs:"+(cfg.dfs||26)+"px;"+dvStyle())};
 const set=(k,val)=>{cfg.dv=Object.assign(dv(),{[k]:val});up()};
 $("#dv-bg").oninput=e=>set("bg",e.target.value);$("#dv-fg").oninput=e=>set("fg",e.target.value);
 $("#dv-a").oninput=e=>{cfg.dfs=+e.target.value;$("#dv-a-v").textContent=fa(cfg.dfs);up()};
 $("#dv-f").oninput=e=>{set("ffs",+e.target.value);$("#dv-f-v").textContent=fa(+e.target.value)};
 $("#dv-l").onchange=e=>set("lh",+e.target.value);$("#dv-ff").onchange=e=>set("ff",e.target.value)}
ACT["d-look"]=()=>dLook();
ACT["d-bg"]=t=>{const x=DBG[+t.dataset.i];cfg.dv=Object.assign(dv(),{bg:x[1],fg:x[2]});save();const w=$(".dwrap");w&&w.setAttribute("style","--dfs:"+(cfg.dfs||26)+"px;"+dvStyle());$$(".dsw button").forEach(b=>b.classList.toggle("on",b===t))};
ACT["d-lookreset"]=()=>{delete cfg.dv;cfg.dfs=26;save();const s=$("#sheet");s&&s.remove();dgo()};
ACT["d-lookok"]=()=>{const s=$("#sheet");s&&s.remove();dgo()};
