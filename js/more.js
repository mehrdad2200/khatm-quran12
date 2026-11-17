/* ویژگی‌های تکمیلی: تقویم شخصی، بیشتر (دعا/آموزش/تسبیح/راهنما/درباره)، صوت، یادآور، پاداش */
const mlen=(y,m)=>m<=6?31:m<=11?30:(isNaN(j2g(y,12,30))?29:30);
function elapsed(y,m,d){const t=jal(TODAY);let Y=t[0]-y,M=t[1]-m,D=t[2]-d;if(D<0){M--;D+=mlen(t[1]===1?t[0]-1:t[0],t[1]===1?12:t[1]-1)}if(M<0){Y--;M+=12}
if(Y<0)return"";const p=[];Y&&p.push(fa(Y)+" سال");M&&p.push(fa(M)+" ماه");D&&p.push(fa(D)+" روز");return p.length?p.join(" و "):"امروز"}
const MT={death:["درگذشت","سالگرد درگذشت"],birth:["تولد","تولد"],wed:["ازدواج","سالگرد ازدواج"],other:["مناسبت","مناسبت"]};
function memoLine(m){const e=elapsed(m.y,m.m,m.d);return m.type==="death"?(e?e+" از درگذشت ایشان می‌گذرد":""):m.type==="birth"?(e?"سن: "+e:""):(e?e+" گذشته است":"")}
function qv(s,a){const T=window.TR&&TR[cfg.tr];return `<div class="v"><div class="ar" style="font-size:calc(var(--fs,28px)*.85)">${QURAN[s-1][a-1]}<span class="no">${fa(a)}</span></div>${T?`<div class="fa">${T[s-1][a-1]}</div>`:""}<div class="rw" style="margin-top:6px"><button class="stb" style="float:none" data-act="st-a" data-i="${OFF[s-1]+a-1}" aria-label="اشتراک در استوری">${ic("share")}<span>استوری</span></button></div></div>`}
function evSheet(i){const e=EV[i],k=e[0]+"-"+e[1],x=EVX[k]||{},q=x.q;
sheet(`<h2>${e[2]}</h2><p class="muted">${HM[e[0]-1]} ${e[1]>0?fa(e[1]):"(آخر ماه)"}</p><b class="mon" style="display:block;margin:12px 0 4px">اعمال و احکام</b><ul class="ul">${(x.a||EVG[e[3]]).map(t=>`<li>${t}</li>`).join("")}</ul>${x.h?`<div class="card hd">«${x.h[0]}»<small>${x.h[1]}</small></div>`:""}${q?qv(q[0],q[1]):""}${typeof evDuas==="function"?evDuas(e):""}<p class="muted" style="margin-top:8px">برای احکام دقیق به رسالهٔ مرجع تقلید خود مراجعه کنید.</p>`);
if(q&&!(window.TR&&TR[cfg.tr]))loadTR(cfg.tr)}
/* ---------- تقویم ---------- */
let cY,cM,cS;
function cal(){const el=$("#v-cal"),t=jal(TODAY);if(!cY){cY=t[0];cM=t[1];cS=t[2]}
const f=j2g(cY,cM,1),len=mlen(cY,cM),wd=(new Date(f).getUTCDay()+1)%7,dsn=dset();let g="";
for(let i=0;i<wd;i++)g+="<i></i>";
for(let d=1;d<=len;d++){const ms=f+(d-1)*DAY,ev=occOn(ms,cfg.ho),pe=cfg.memo.filter(m=>m.m===cM&&m.d===d),dd=cfg.n?Math.round((ms-START)/DAY):-1,dn=dd>=0&&dd<N&&dsn.has(dd);
g+=`<button class="cd ${ms===TODAY?"t":""} ${cS===d?"s":""}" data-cd="${d}"><b>${fa(d)}</b><small>${fa(hij(ms,cfg.ho)[2])}</small><span class="dts">${ev.length?'<i class="g"></i>':""}${pe.length?'<i class="p"></i>':""}${dn?'<i class="k"></i>':""}</span></button>`}
const h1=hij(f,cfg.ho),h2=hij(f+(len-1)*DAY,cfg.ho),ms=f+(cS-1)*DAY,ev=occOn(ms,cfg.ho),pe=cfg.memo.filter(m=>m.m===cM&&m.d===cS),dd=cfg.n?Math.round((ms-START)/DAY):-1;
let dt=`<div class="card"><b>${fa(cS)} ${MON[cM-1]} ${fa(cY)}</b><p class="muted">${fa(hij(ms,cfg.ho)[2])} ${HM[hij(ms,cfg.ho)[1]-1]} ${fa(hij(ms,cfg.ho)[0])} قمری</p>`;
ev.forEach(e=>dt+=`<button class="item" data-ev="${EV.indexOf(e)}"><div class="dot" style="background:var(--gold);color:#1a1405">${ic("star")}</div><div><div class="t1">${e[2]}</div><div class="t2">اعمال، احکام و حدیث</div></div>${ic("prev")}</button>`);
pe.forEach(m=>dt+=`<div class="mm">${ic("heart")}<div><b>${MT[m.type||"death"][1]}: ${m.name}${m.rel?" · "+m.rel:""}</b><span class="muted">${memoLine(m)}${m.note?" · "+m.note:""}</span></div></div>`);
if(dd>=0&&dd<N)dt+=`<button class="item" data-open="${dd}"><div class="dot">${fa(rowOf(dd)+1)}</div><div><div class="t1">بخش آن روز شما</div><div class="t2">${lab(rowOf(dd))}</div></div>${ic("prev")}</button>`;
dt+="</div>";
const M=memos(),up=occNext(TODAY,cfg.ho,90).map(({k,e})=>`<button class="item" data-ev="${EV.indexOf(e)}"><div class="dot" style="${e[3]==="m"?"background:#7f1d1d;color:#fff":"background:var(--gold);color:#1a1405"}">${fa(jal(TODAY+k*DAY)[2])}</div><div><div class="t1">${e[2]}</div><div class="t2">${jstr(TODAY+k*DAY)}${k?" · "+fa(k)+" روز دیگر":" · امروز"}</div></div></button>`).join("");
el.innerHTML=`<h2>تقویم</h2><div class="top" style="margin-top:6px"><button class="ib" data-cn="1" aria-label="ماه بعد">${ic("prev")}</button><div style="text-align:center"><b>${MON[cM-1]} ${fa(cY)}</b><div class="muted">${HM[h1[1]-1]}${h1[1]!==h2[1]?" – "+HM[h2[1]-1]:""} ${fa(h2[0])}</div></div><button class="ib" data-cn="-1" aria-label="ماه قبل">${ic("next")}</button></div>
<div class="cg"><span>ش</span><span>ی</span><span>د</span><span>س</span><span>چ</span><span>پ</span><span>ج</span>${g}</div>
<div class="lg"><i class="g"></i> مناسبت <i class="p"></i> رویداد شخصی <i class="k"></i> خوانده‌شده</div>${dt}
<div class="card"><b>رویدادهای شخصی</b><p class="muted">درگذشتگان، تولد، سالگرد ازدواج و هر مناسبت دلخواه. گذشتهٔ زمانی و یادآوری سالگرد خودکار است.</p>
${M.map(m=>`<div class="mm">${ic("heart")}<div><b>${MT[m.type||"death"][1]}: ${m.name}${m.rel?" · "+m.rel:""}</b><span class="muted">${fa(m.d)} ${MON[m.m-1]} ${fa(m.y)} · ${memoLine(m)}<br>${m.k?fa(m.k)+" روز تا سالگرد بعدی":"امروز"}${m.note?" · "+m.note:""}</span></div><button class="x" data-dm="${m.id}" aria-label="حذف">${ic("x")}</button></div>`).join("")}
<div class="field">نوع<select id="mt"><option value="death">درگذشت</option><option value="birth">تولد</option><option value="wed">سالگرد ازدواج</option><option value="other">مناسبت دیگر</option></select></div>
<div class="field">نام / عنوان<input id="mn" placeholder="نام یا عنوان"></div>
<div class="field">نسبت (اختیاری)<input id="mr" placeholder="مثلاً پدر"></div>
<div class="field">تاریخ (سال · ماه · روز)${dateFields("m",t[0]-1,1,"",{opt:1})}</div>
<div class="field">توضیح (اختیاری)<input id="mo" placeholder="مثلاً آرامگاه: …"></div>
<div class="row"><button class="btn g" id="ma">افزودن</button>${M.length?`<button class="btn" id="mi">${ic("down")} یادآور تقویم گوشی</button>`:""}</div></div>
<p class="mon">مناسبت‌های ۹۰ روز آینده</p>${up||'<div class="card muted">مناسبتی نیست.</div>'}
<p class="muted" style="margin-top:12px">تاریخ قمری محاسباتی است و ممکن است با رؤیت هلال یک روز تفاوت داشته باشد؛ از تنظیمات می‌توانید تصحیح کنید.</p>`;
$("#ma").onclick=()=>{const name=$("#mn").value.trim(),[y,m,d]=readDate("m");if(!name)return toast("نام یا عنوان را بنویسید");if(!(d>=1&&d<=31)||isNaN(j2g(y||1400,m,d)))return toast("تاریخ معتبر نیست");
cfg.memo.push({id:Date.now(),type:$("#mt").value,name,rel:$("#mr").value.trim(),y:y||1400,m,d,note:$("#mo").value.trim()});save();toast("ثبت شد");cal()};
if($("#mi"))$("#mi").onclick=icsOut}
/* ---------- بیشتر ---------- */
let sub="menu";
function more(s){if(s)sub=s;const el=$("#v-more"),back=`<button class="chip" data-sub="menu">‹ بازگشت</button>`;let h="";
if(sub==="menu"){const I=[["guide","راهنما و نکات ختم","info"],["edu","آموزش","trans"],["duas","دعاها و زیارات","book"],["hadith","احادیث","star"],["quran","قرآن کامل (سوره‌ها و جزءها)","book"],["story","اشتراک‌گذاری پیشرفت (استوری)","share"],["tasb","تسبیح‌شمار","flame"],["rows","همهٔ ردیف‌ها","list"],["about","دربارهٔ ما","heart"]];
h=`<h2>بیشتر</h2><p class="muted">راهنما، آموزش، دعا، حدیث و تسبیح</p>${I.map(i=>`<button class="item" data-sub="${i[0]}"><div class="dot" style="background:linear-gradient(135deg,var(--a1),var(--a2));color:#fff">${ic(i[2])}</div><div><div class="t1">${i[1]}</div></div>${ic("prev")}</button>`).join("")}`}
else if(sub==="duas")h=duasPage();
else if(sub==="edu")h=`${back}<h2 style="margin-top:12px">آموزش</h2>${EDU.map(e=>`<div class="card"><b>${e.t}</b><ul class="ul">${e.b.map(x=>`<li>${x}</li>`).join("")}</ul></div>`).join("")}`;
else if(sub==="hadith")h=hadithPage();
else if(sub==="quran")h=quranPage();
else if(sub==="tasb")h=back+tasbHTML();
else if(sub==="guide")h=`${back}<h2 style="margin-top:12px">راهنما و نکات ختم</h2><div class="card"><b>ختم گروهی چگونه است؟</b><p class="muted" style="margin-top:6px;line-height:2">قرآن به ۳۵۴ ردیف تقسیم شده و در مجموعه ۳۵۴ نفر شرکت دارند. همه با هم شروع می‌کنند و با هم تمام می‌کنند؛ هر نفر در روز اول ردیفِ هم‌شمارهٔ خودش را می‌خواند و هر روز یک ردیف جلو می‌رود. هر روز یک ختم کامل قرآن انجام می‌شود و پس از ۳۵۴ روز هر نفر یک ختم کامل خوانده است.</p></div>
<div class="card"><b>نکات مهم</b><ol class="ul">${NOTES.map(n=>`<li>${n}</li>`).join("")}</ol></div>
<div class="card"><b>کار با برنامه</b><ul class="ul"><li>در صفحهٔ «امروز» دکمهٔ «شروع خواندن» متن عربی و ترجمه را باز می‌کند؛ با «پخش» می‌توانید گوش دهید و هر کلمه هم‌زمان رنگ می‌گیرد.</li><li>روی هر کلمه بزنید تا تلاوت از همان‌جا ادامه یابد.</li><li>پس از خواندن «خواندم» را بزنید تا در برنامه ثبت شود.</li><li>در «تنظیمات» یادآور روزانه، تم روز/شب، دانلود آفلاین و پشتیبان‌گیری را تنظیم کنید.</li><li>در «تقویم» مناسبت‌ها، احکام روز و رویدادهای شخصی را ببینید.</li></ul></div>`;
else if(sub==="about")h=`${back}<div style="text-align:center;margin-top:10px"><div class="cal" style="-webkit-mask-image:url(img/bismillah.png);mask-image:url(img/bismillah.png);aspect-ratio:658/491"></div></div>
<h2 style="text-align:center">ختم قرآن؛ هر روز یک بخش</h2>
<div class="card"><p style="line-height:2.1">این برنامه برای شادی روح همهٔ درگذشتگان و رفتگان ما ساخته شده است. برای همهٔ آن‌ها صلوات و فاتحه‌ای بخوانید.</p></div>
<div class="card"><p class="muted" style="line-height:2">تهیه و تدوین: منتظران ظهور (هیئت آل یاسین). با نیت خوشنودی، سلامتی و تعجیل در فرج آقا امام زمان (عج) تلاوت شود.</p><div class="cal" style="-webkit-mask-image:url(img/faraj.png);mask-image:url(img/faraj.png);aspect-ratio:620/262;margin-top:10px"></div>
<div class="row"><a class="btn" href="https://instagram.com/aleyasin128" target="_blank" rel="noopener">اینستاگرام</a><a class="btn" href="https://t.me/aleyasin128" target="_blank" rel="noopener">تلگرام</a><a class="btn" href="https://eitaa.com/aleyasin128" target="_blank" rel="noopener">ایتا</a></div><p class="muted" style="margin-top:8px;text-align:center" dir="ltr">@ALEYASIN128</p></div>
<div class="card"><b>ارتباط با ما</b><p class="muted" style="margin:6px 0">در صورت هرگونه سؤال، پیشنهاد یا انتقاد با شماره‌های زیر تماس بگیرید:</p>
${[["آقای قهرمانی","09354209319"],["آقای ارشدی","09127001529"],["آقای میرزائی","09191299414"]].map(c=>`<a class="item" href="tel:${c[1]}"><div class="dot">${ic("heart")}</div><div><div class="t1">${c[0]}</div><div class="t2" dir="ltr" style="text-align:right">${c[1]}</div></div></a>`).join("")}</div>
<div class="card"><b>مشارکت در هزینه‌های طرح</b><p class="muted" style="margin:6px 0">کسانی که تمایل دارند در تأمین هزینه‌های مالی این طرح سهیم باشند می‌توانند مبلغ دلخواه را به کارت زیر واریز کنند:</p><div class="item" id="cc" style="justify-content:space-between"><div><div class="t1" dir="ltr" style="text-align:right">5047-0610-8210-8131</div><div class="t2">به نام حسین تاجیک</div></div><button class="chip on" data-copy="5047061082108131">کپی</button></div></div>
<p class="muted" style="text-align:center;margin:16px 0">اللهم عجل لولیک الفرج</p>`;
el.innerHTML=h;if(sub==="tasb")tasbBind();if(sub==="duas")duasBind();if(sub==="hadith")hadithBind();scrollTo(0,0)}
/* ---------- تسبیح‌شمار: هدف، لرزش و صدا، بازگشت، ذکر دلخواه و آمار روزانه/ماهانه/سالانه ---------- */
const TP=[{n:"صلوات",t:"اللهم صل علی محمد و آل محمد",c:[100]},{n:"استغفار",t:"استغفر الله ربی و اتوب الیه",c:[100]},{n:"تسبیحات حضرت زهرا (س)",t:"",c:[34,33,33],p:["اللهُ أکبر","الحمدلله","سبحان‌الله"]},{n:"فرج",t:"اللهم عجل لولیک الفرج",c:[100]},{n:"لا اله الا الله",t:"لا إله إلا الله",c:[100]},{n:"سبحان الله و بحمده",t:"سبحان الله و بحمده سبحان الله العظیم",c:[100]},{n:"لا حول و لا قوة",t:"لا حول و لا قوة إلا بالله العلی العظیم",c:[100]},{n:"یا حسین",t:"یا حسین",c:[100]},{n:"یا صاحب الزمان",t:"یا صاحب الزمان أدرکنی",c:[100]},{n:"آزاد",t:"ذکر آزاد",c:[0]}];
const TS=Object.assign({log:{},cust:[],o:{}},ls.get("khatm-tasbih",{}));TS.o=Object.assign({vib:true,snd:false,tg:0,per:"day",wake:false},TS.o);
const tsave=()=>ls.set("khatm-tasbih",TS);
const TALL=()=>TP.concat(TS.cust.map(x=>({n:x.n,t:x.t||x.n,c:[x.c||0],u:1})));
let tp=2,ph=0,tc=0,tcLog=[],tWake=null;
const tkey=t=>{const j=jal(t==null?TODAY:t);return j[0]*10000+j[1]*100+j[2]};
function tAdd(name,k){const key=tkey(),e=TS.log[key]||(TS.log[key]={n:0,by:{}});e.n+=k;e.by[name]=Math.max(0,(e.by[name]||0)+k);if(e.n<=0)delete TS.log[key];tsave()}
function tSum(per){const j=jal(TODAY),t0=tkey(),wk=new Set([...Array(7)].map((_,i)=>tkey(TODAY-i*DAY))),o={n:0,by:{}};
 Object.entries(TS.log).forEach(([k,e])=>{k=+k;const y=Math.floor(k/10000),m=Math.floor(k/100)%100;
  const ok=per==="all"||(per==="day"&&k===t0)||(per==="week"&&wk.has(k))||(per==="month"&&y===j[0]&&m===j[1])||(per==="year"&&y===j[0]);
  if(ok){o.n+=e.n;Object.entries(e.by).forEach(([d,c])=>o.by[d]=(o.by[d]||0)+c)}});return o}
function tStatHTML(){const o=TS.o,per=[["day","امروز"],["week","هفته"],["month","این ماه"],["year","امسال"],["all","کل"]],S=tSum(o.per),by=Object.entries(S.by).sort((a,b)=>b[1]-a[1]);
 const bars=[...Array(7)].map((_,i)=>{const t=TODAY-(6-i)*DAY,e=TS.log[tkey(t)];return{n:e?e.n:0,d:jal(t)[2]}}),mx=Math.max(1,...bars.map(b=>b.n)),days=Object.keys(TS.log).length;
 return`<div class="card"><b>آمار ذکرها</b><div class="chips" style="margin-top:8px">${per.map(x=>`<button class="chip ${o.per===x[0]?"on":""}" data-act="t-per" data-p="${x[0]}">${x[1]}</button>`).join("")}</div>
<div class="tst"><div><b>${fa(S.n)}</b><span>${per.find(x=>x[0]===o.per)[1]}</span></div><div><b>${fa(tSum("day").n)}</b><span>امروز</span></div><div><b>${fa(tSum("month").n)}</b><span>این ماه</span></div><div><b>${fa(tSum("year").n)}</b><span>امسال</span></div></div>
<div class="tbars">${bars.map(b=>`<i style="height:${Math.max(3,b.n/mx*100)}%" title="${b.n}"></i>`).join("")}</div><div class="tbl">${bars.map(b=>`<span>${fa(b.d)}</span>`).join("")}</div>
<p class="muted" style="margin-top:6px;font-size:.76rem">هفت روز اخیر · ${fa(days)} روز ذکر ثبت شده</p>
${by.length?`<div style="margin-top:8px">${by.map(x=>`<div class="sr"><span>${esc(x[0])}</span><b>${fa(x[1])}</b></div>`).join("")}</div>`:'<p class="muted" style="margin-top:8px">هنوز ذکری در این بازه ثبت نشده است.</p>'}
<div class="row"><button class="btn dg sm" data-act="t-clr">پاک کردن آمار تسبیح</button></div></div>
`}
function tasbHTML(){const L=TALL();if(tp>=L.length)tp=0;const p=L[tp],tg=(TS.o.tg&&!p.p)?TS.o.tg:(p.c[ph]||0),txt=p.p?p.p[ph]:p.t,o=TS.o;
 const per=[["day","امروز"],["week","هفته"],["month","این ماه"],["year","امسال"],["all","کل"]],S=tSum(o.per),by=Object.entries(S.by).sort((a,b)=>b[1]-a[1]);
 const bars=[...Array(7)].map((_,i)=>{const t=TODAY-(6-i)*DAY,e=TS.log[tkey(t)];return{n:e?e.n:0,d:jal(t)[2]}}),mx=Math.max(1,...bars.map(b=>b.n));
 const days=Object.keys(TS.log).length;
 return `<h2 style="margin-top:12px">تسبیح‌شمار</h2><div class="chips">${L.map((x,i)=>`<button class="chip ${i===tp?"on":""}" data-tp="${i}">${esc(x.n)}</button>`).join("")}<button class="chip" data-act="t-add">${ic("plus")} ذکر دلخواه</button></div>
<div class="card" style="text-align:center"><p class="dua" style="font-size:1.4rem;font-family:'Scheherazade Khatm','Amiri Quran',serif">${esc(arN(txt))}</p><button class="tb" id="tb" aria-label="شمارش"><svg viewBox="0 0 100 100"><circle class="t" cx="50" cy="50" r="46"/><circle class="p" cx="50" cy="50" r="46" stroke-dasharray="289" stroke-dashoffset="${tg?289*(1-tc/tg):289}"/></svg><b id="tn">${fa(tc)}</b><small>${tg?"از "+fa(tg):"بدون هدف"}</small></button>
<div class="row"><button class="btn" data-act="t-undo">${ic("next")} یکی کم</button><button class="btn" id="tr">از نو</button>${p.u?`<button class="btn" data-act="t-del" style="color:#f24365">${ic("trash")}</button>`:""}</div>
<div class="field" style="text-align:right">هدف شمارش${p.p?" (برای تسبیحات حضرت زهرا (س) ثابت است)":""}<select id="t-tg" ${p.p?"disabled":""}>${[[0,"طبق ذکر انتخاب‌شده"],[10,"۱۰"],[33,"۳۳"],[34,"۳۴"],[100,"۱۰۰"],[313,"۳۱۳"],[500,"۵۰۰"],[1000,"۱۰۰۰"]].map(x=>`<option value="${x[0]}" ${o.tg===x[0]?"selected":""}>${x[1]}</option>`).join("")}</select></div>
<div class="sr"><span>لرزش هنگام شمارش</span><input type="checkbox" class="sw2" id="t-vib" ${o.vib?"checked":""}></div><div class="sr"><span>صدای کلیک</span><input type="checkbox" class="sw2" id="t-snd" ${o.snd?"checked":""}></div><div class="sr"><span>روشن ماندن صفحه</span><input type="checkbox" class="sw2" id="t-wake" ${o.wake?"checked":""}></div>
<p class="muted" style="margin-top:8px">مجموع ذکرهای شما: <b id="ttot">${fa(cfg.tsb||0)}</b></p></div>
<div id="tstats">${tStatHTML()}</div>
<div id="tform"></div>`}
function tClick(){try{const c=new(window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator(),g=c.createGain();o.frequency.value=720;g.gain.value=.05;o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.04);setTimeout(()=>c.close(),200)}catch(e){}}
function tasbBind(){const L=TALL(),p=L[tp];
 $("#tb").onclick=()=>{const tg=(TS.o.tg&&!p.p)?TS.o.tg:(p.c[ph]||0),nm=p.p?p.p[ph]:p.n;tc++;tcLog.push(nm);cfg.tsb=(cfg.tsb||0)+1;tAdd(nm,1);
  if(TS.o.vib&&navigator.vibrate)navigator.vibrate(tg&&tc>=tg?[30,40,30]:8);if(TS.o.snd)tClick();
  if(tg&&tc>=tg){if(p.p&&ph<p.p.length-1){ph++;tc=0;toast("مرحلهٔ بعد: "+p.p[ph])}else{toast("قبول باشد");tc=0;ph=0}save();return more()}
  save();$("#tstats").innerHTML=tStatHTML();$("#ttot").textContent=fa(cfg.tsb||0);$("#tn").textContent=fa(tc);$("#tb .p").style.strokeDashoffset=tg?289*(1-tc/tg):289};
 $("#tr").onclick=()=>{tc=0;ph=0;more()};
 $("#t-tg").onchange=e=>{TS.o.tg=+e.target.value;tsave();tc=0;more()};
 $("#t-vib").onchange=e=>{TS.o.vib=e.target.checked;tsave()};$("#t-snd").onchange=e=>{TS.o.snd=e.target.checked;tsave();if(e.target.checked)tClick()};
 $("#t-wake").onchange=async e=>{TS.o.wake=e.target.checked;tsave();tWakeSet()}}
async function tWakeSet(){try{if(TS.o.wake&&sub==="tasb"&&navigator.wakeLock){tWake=await navigator.wakeLock.request("screen")}else if(tWake){await tWake.release();tWake=null}}catch(e){}}
ACT["t-undo"]=()=>{if(!tcLog.length||tc<=0)return toast("چیزی برای برگرداندن نیست");const nm=tcLog.pop();tc--;cfg.tsb=Math.max(0,(cfg.tsb||0)-1);tAdd(nm,-1);save();more()};
ACT["t-per"]=t=>{TS.o.per=t.dataset.p;tsave();more()};
ACT["t-clr"]=()=>{if(confirm("همهٔ آمار تسبیح پاک شود؟")){TS.log={};tsave();cfg.tsb=0;save();more()}};
ACT["t-add"]=()=>{const f=$("#tform");if(!f)return;f.innerHTML=`<div class="card"><b>ذکر دلخواه</b><div class="field">نام ذکر<input id="tf-n"></div><div class="field">متن ذکر (اختیاری)<input id="tf-t" dir="rtl"></div><div class="field">هدف (۰ = بدون هدف)<input id="tf-c" type="text" inputmode="numeric" data-n value="100"></div><div class="row"><button class="btn g" data-act="t-save">ذخیره</button><button class="btn" data-act="t-cancel">انصراف</button></div></div>`;f.scrollIntoView({block:"center"})};
ACT["t-cancel"]=()=>{$("#tform").innerHTML=""};
ACT["t-save"]=()=>{const n=$("#tf-n").value.trim();if(!n)return toast("نام ذکر را بنویسید");TS.cust.push({n,t:$("#tf-t").value.trim(),c:Math.max(0,+$("#tf-c").value||0)});tsave();tp=TP.length+TS.cust.length-1;ph=0;tc=0;more()};
ACT["t-del"]=()=>{const i=tp-TP.length;if(i<0||!confirm("این ذکر حذف شود؟ (آمار قبلی می‌ماند)"))return;TS.cust.splice(i,1);tsave();tp=2;tc=0;more()};
/* ---------- یادآور ---------- */
let remT;
function remFire(force){const r=cfg.rem||{};if(!r.on||!("Notification"in window)||Notification.permission!=="granted")return;const today=String(TODAY);if(!force&&cfg.remLast===today)return;
const diff=diffNow();if(diff<0)return;const d=clamp(diff);if(dset().has(d)&&!force)return;
const m=memos().find(x=>x.k===1),body=m?`فردا سالگرد ${m.name} است؛ فاتحه‌ای بخوانید.`:`بخش امروز شما: ردیف ${fa(rowOf(d)+1)} (${lab(rowOf(d))})`;
cfg.remLast=today;save();navigator.serviceWorker&&navigator.serviceWorker.ready?navigator.serviceWorker.ready.then(g=>g.showNotification("ختم قرآن",{body,icon:"icons/icon-192.png",badge:"icons/icon-192.png",tag:"khatm",lang:"fa",dir:"rtl"})).catch(()=>new Notification("ختم قرآن",{body})):new Notification("ختم قرآن",{body})}
function remSched(){clearTimeout(remT);const r=cfg.rem||{};if(!r.on)return;const[h,mi]=(r.t||"20:00").split(":").map(Number),n=new Date(),t=new Date(n.getFullYear(),n.getMonth(),n.getDate(),h,mi);
if(n>=t)remFire();else remT=setTimeout(()=>{remFire();remSched()},t-n)}
async function remEnable(on,t){cfg.rem={on,t:t||(cfg.rem&&cfg.rem.t)||"20:00"};if(on&&"Notification"in window&&Notification.permission!=="granted"){const p=await Notification.requestPermission();if(p!=="granted"){cfg.rem.on=false;save();return toast("اجازهٔ اعلان داده نشد")}}save();remSched();toast(on?"یادآور روزانه فعال شد":"یادآور خاموش شد")}
function remIcs(){const[h,mi]=((cfg.rem&&cfg.rem.t)||"20:00").split(":"),d=new Date(Math.max(TODAY,START)),s=d.getUTCFullYear()+String(d.getUTCMonth()+1).padStart(2,"0")+String(d.getUTCDate()).padStart(2,"0")+"T"+h+mi+"00";
const L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//khatm//FA","BEGIN:VEVENT","UID:daily@khatm","DTSTAMP:20260101T000000Z","DTSTART:"+s,"DURATION:PT15M","RRULE:FREQ=DAILY;COUNT="+N,"SUMMARY:ختم قرآن؛ بخش امروز","BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:وقت تلاوت قرآن","TRIGGER:PT0M","END:VALARM","END:VEVENT","END:VCALENDAR"];
const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([L.join("\r\n")],{type:"text/calendar"}));a.download="khatm-daily.ics";a.click()}
/* ---------- پاداش معنوی ---------- */
function lvl(){const n=dset().size;let L=LEVELS[0],nx=LEVELS[1];LEVELS.forEach((x,i)=>{if(n>=x[0]){L=x;nx=LEVELS[i+1]}});return{L,nx,n}}
function vcount(){let v=0;dset().forEach(d=>{const r=PARTS[rowOf(d)];v+=r[1]-r[0]+1});return v}
function celebrate(d){const{L,nx,n}=lvl(),r=PARTS[rowOf(d)],v=r[1]-r[0]+1,M=memos().slice(0,3),sk=streak();
sheet(`<div class="cb"><div class="ck">${ic("check")}</div><div class="bism" style="font-size:1.6rem">قَبِلَ اللهُ مِنكُم</div><p style="text-align:center;line-height:2">تلاوت امروزتان قبول باشد؛ ${fa(v)} آیه خواندید${sk>1?" و "+fa(sk)+" روز پیاپی است که با قرآن همراهید":""}.</p>
<div class="card hd" style="margin-top:8px">«از قاری قرآن بلای دنیا دور می‌شود و از شنونده قرآن بلای آخرت.»<small>رسول خدا (ص) · کنزالعمال ۴۰۳۱</small></div>
<div class="card"><b>مرتبهٔ معنوی: ${L[1]}</b><div class="bar"><i style="width:${nx?Math.min(100,(n-L[0])/(nx[0]-L[0])*100):100}%;background:var(--gold)"></i></div><p class="muted">${nx?fa(nx[0]-n)+" روز تا «"+nx[1]+"»":"به بالاترین مرتبه رسیدید"} · مجموع آیات شما: ${fa(vcount())}</p></div>
${M.length?`<p class="muted">ثواب این تلاوت را هدیه کنید:</p><div class="chips" style="flex-wrap:wrap">${M.map(m=>`<button class="chip" data-gift="${m.id}">به روح ${m.name}</button>`).join("")}</div>`:""}
<div class="row"><button class="btn g" data-bonus="${d+1}">یک بخش دیگر هم بخوانم</button><button class="btn" data-sub="tasb" data-sx>تسبیح</button></div></div>`)}
