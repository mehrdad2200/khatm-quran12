"use strict";
/* ===== هسته: تنظیمات، تاریخ، تم، صفحه‌ها، شروع‌کار ===== */
let N=354;const DAY=864e5,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const fa=x=>String(x).replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[d]);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const MON="فروردین اردیبهشت خرداد تیر مرداد شهریور مهر آبان آذر دی بهمن اسفند".split(" ");
const TRN={makarem:"ناصر مکارم شیرازی",fooladvand:"محمدمهدی فولادوند",ansarian:"حسین انصاریان",elahi:"مهدی الهی قمشه‌ای"};
/* قاری‌ها (everyayah.com) و خوانندگان ترجمهٔ صوتی */
const REC={alafasy:["مشاری العفاسی","Alafasy_128kbps"],husary:["حصری","Husary_128kbps"],basit:["عبدالباسط (مرتل)","Abdul_Basit_Murattal_192kbps"],minshawi:["منشاوی (مرتل)","Minshawy_Murattal_128kbps"],minshawiM:["منشاوی (مجوّد)","Minshawy_Mujawwad_192kbps"],parhizgar:["پرهیزگار","Parhizgar_48kbps"],mansoori:["کریم منصوری","Karim_Mansoori_40kbps"],sudais:["عبدالرحمن السدیس","Abdurrahmaan_As-Sudais_192kbps"],shuraym:["سعود الشریم","Saood_ash-Shuraym_128kbps"],shaatree:["ابوبکر الشاطری","Abu_Bakr_Ash-Shaatree_128kbps"],hudhaify:["الحذیفی","Hudhaify_128kbps"],ghamadi:["الغامدی","Ghamadi_40kbps"],ayyoub:["محمد ایوب","Muhammad_Ayyoub_128kbps"],basfar:["عبدالله بصفر","Abdullah_Basfar_192kbps"],rifai:["هانی الرفاعی","Hani_Rifai_192kbps"]};
const TRR={makarem:["ترجمهٔ مکارم شیرازی (خوانش کبیری)","translations/Makarem_Kabiri_16Kbps"],fooladvand:["ترجمهٔ فولادوند (خوانش هدایت‌فر)","translations/Fooladvand_Hedayatfar_40Kbps"]};
const STY={haram:"حرم",qadr:"شب قدر",ashura:"عاشورا",noor:"نور",firouzeh:"فیروزه",fatemiyya:"فاطمیه"};
const PV={haram:{night:["#06130f","#12a676","#0b6b66","#eef6f1"],day:["#eef6f1","#12a676","#0b6b66","#0d2b22"]},qadr:{night:["#070a1c","#4f5bd5","#7c4dbd","#eef0ff"],day:["#f0f0fb","#4f5bd5","#7c4dbd","#161a3d"]},ashura:{night:["#0b0809","#b3262d","#6f101c","#f6eeee"],day:["#f8efee","#b3262d","#6f101c","#2a1112"]},noor:{night:["#15110a","#e0b040","#8a6a22","#fbf3e0"],day:["#f8f3e5","#e8c04a","#a8801f","#1b3a30"]},firouzeh:{night:["#041a1d","#19c3bd","#1b7fc0","#e9fbfb"],day:["#e9f8f7","#0fb5b0","#1479b8","#0e3b3f"]},fatemiyya:{night:["#0a0f0d","#3f8a63","#1c4a3a","#f1efe6"],day:["#f1eadb","#2f6a4c","#1b3b2e","#1b2f26"]}};
const ic=n=>`<svg class="i"><use href="#i-${n}"/></svg>`;
const ls={get(k,d){try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
/* ---- تاریخ شمسی ---- */
const pf=new Intl.DateTimeFormat("en-u-ca-persian-nu-latn",{timeZone:"UTC",year:"numeric",month:"numeric",day:"numeric"});
const jal=ms=>{const o={};pf.formatToParts(ms).forEach(p=>o[p.type]=parseInt(p.value));return[o.year||o.relatedYear,o.month,o.day]};
function j2g(y,m,d){const b=Date.UTC(y+621,2,20,12)+Math.floor((m-1)*30.44+d-1)*DAY;for(let k=-6;k<=6;k++){const j=jal(b+k*DAY);if(j[0]===y&&j[1]===m&&j[2]===d)return b+k*DAY}return NaN}
const jstr=ms=>{const j=jal(ms);return fa(j[2])+" "+MON[j[1]-1]+" "+fa(j[0])};
const todayMs=()=>{const n=new Date();return Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),12)};
let TODAY=todayMs();
/* ---- تنظیمات ---- */
const tj=jal(TODAY);
let cfg=Object.assign({n:0,y:tj[0],m:tj[1],d:tj[2],grp:"",name:"",age:0,rec:"alafasy",trr:"makarem",tr:"makarem",rem:{on:false,t:"20:00"},sp:1,atr:false,rep:0,repN:1,gap:0,tsb:0,style:"haram",mode:"night",ho:0,hl:"ar",afat:true,fs:30,ui:1,showTr:true,autoScroll:true,memo:[],cd:[],ch:[],fav:{d:[],h:[]},seen:{},dl:{auto:true,d30:false,clean:true,wifi:true}},ls.get("khatm-cfg",{}));
(function migrate(){
 if(cfg.v!==3){const t=cfg.theme;if(t){cfg.style=({noor:"noor",firouzeh:"firouzeh",qadr:"qadr",ashura:"ashura"})[t]||"haram";cfg.mode=(t==="noor"||t==="firouzeh")?"day":"night"}
  if(cfg.v===2&&cfg.n){/* تاریخ شروع قبلی حفظ می‌شود */}else if(!cfg.n){const j=jal(todayMs());Object.assign(cfg,{y:j[0],m:j[1],d:j[2]})}
  delete cfg.theme;cfg.v=3}
 ["grp","name"].forEach(k=>{if(typeof cfg[k]!=="string")cfg[k]=(cfg[k]&&typeof cfg[k]==="object"&&(cfg[k].name||cfg[k].t))||""});if(!["ar","fa","both","ayah"].includes(cfg.hl))cfg.hl="ar";
 if(!STY[cfg.style])cfg.style="haram";if(!["day","night","auto"].includes(cfg.mode))cfg.mode="night";
 cfg.dl=Object.assign({auto:true,d30:false,clean:true,wifi:true},cfg.dl);cfg.fav=Object.assign({d:[],h:[]},cfg.fav);cfg.seen=cfg.seen||{};
 if(!REC[cfg.rec])cfg.rec="alafasy";if(!TRR[cfg.trr])cfg.trr="makarem";if(!TRN[cfg.tr])cfg.tr="makarem";
})();
/* ---- گروه کمتر از ۳۵۴ نفر: فقط اگر کاربر خودش فعال کرده باشد (cfg.gs)؛ وگرنه N=354 و ردیف‌ها دست‌نخورده است ---- */
/* cfg.gs = تعداد اعضای گروه، cfg.gd = تعداد روزهای یک ختم کامل برای هر نفر (برای نسخهٔ قبل: gd=gs) */
const PARTS0=PARTS.slice(),GD=()=>{const d=cfg.gd||(cfg.gs>=2&&cfg.gs<354?cfg.gs:0);return d>=2?d:0},GA=GD,GS=()=>cfg.gs||GD();
/* مرز گروه‌ها طوری انتخاب می‌شود که تعداد آیهٔ سهم هر نفر تا حد ممکن برابر باشد (فقط روی مرز ردیف‌ها) */
const _gb={};
function gBounds(M){if(_gb[M])return _gb[M];const e=[0];for(let g=1;g<M;g++){const t=g*6236/M;let best=0,bd=1e9;for(let k=0;k<354;k++){const d=Math.abs(PARTS0[k][0]-t);if(d<bd){bd=d;best=k}}e.push(Math.max(e[g-1]+1,Math.min(best,354-(M-g))))}e.push(354);return _gb[M]=e}
const gRows=(g,M)=>{const e=gBounds(M);return[e[g],e[g+1]-1]};
/* بخش g‌ام از D بخش: تا ۳۵۴ روز روی مرز ردیف‌ها، بیشتر از آن روی مرز آیه‌ها (به‌صورت مساوی) */
const gPart=(g,D)=>{if(D<=354){const[a,b]=gRows(g,D);return[PARTS0[a][0],PARTS0[b][1]]}return[Math.floor(g*6236/D),Math.floor((g+1)*6236/D)-1]};
/* شمارهٔ نفر در گروه (۱..M) ← شمارهٔ ردیف در چرخهٔ D روزه (۱..D)؛ نفرات روی چرخه پخش می‌شوند */
const gRow=(p,M,D)=>Math.min(D,Math.floor((p-1)*D/M)+1);
function gApply(){const D=GD();PARTS.length=0;if(!D){N=354;PARTS0.forEach(p=>PARTS.push(p));return}N=D;for(let g=0;g<D;g++)PARTS.push(gPart(g,D))}
gApply();
let done=ls.get("khatm-done",{}),START,CYC=0,rd=null,deferred=null;
const save=()=>ls.set("khatm-cfg",cfg);
function setup(){const s0=cfg.n?j2g(cfg.y,cfg.m,cfg.d):TODAY;CYC=cfg.n?Math.max(0,Math.floor((TODAY-s0)/DAY/N)):0;START=s0+CYC*N*DAY}
/* ---- تم روز/شب ---- */
function curMode(){return cfg.mode==="auto"?(matchMedia("(prefers-color-scheme: dark)").matches?"night":"day"):cfg.mode}
/* ایام فاطمیه: ۱۳–۱۵ جمادی‌الاولی، ۱–۳ و ۲۰ جمادی‌الثانیه (تم خودکار فقط همین روزها) */
function isFat(){try{const h=hij(TODAY,cfg.ho);return(h[1]===5&&h[2]>=13&&h[2]<=15)||(h[1]===6&&(h[2]<=3||h[2]===20))}catch(e){return false}}
const eStyle=()=>cfg.afat!==false&&isFat()?"fatemiyya":cfg.style;
function applyTheme(){const h=document.documentElement,st=eStyle();h.dataset.mode=curMode();h.dataset.style=st;h.style.setProperty("--ui",cfg.ui||1);
 const m=$("meta[name=theme-color]");m&&m.setAttribute("content",PV[st][curMode()][0])}
matchMedia("(prefers-color-scheme: dark)").addEventListener&&matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{if(cfg.mode==="auto")applyTheme()});
function themeGrid(onclick){const md=curMode();return`<div class="tg">${Object.keys(STY).map(k=>{const p=PV[k][md];return`<button class="tsw ${cfg.style===k?"on":""}" data-sty="${k}" style="--pbg:${p[0]};--pa1:${p[1]};--pa2:${p[2]};--ptx:${p[3]}"><i></i>${STY[k]}</button>`}).join("")}</div>`}
function modeSeg(){return`<div class="seg" id="mseg">${[["day","روز","sun"],["night","شب","moon"],["auto","خودکار",""]].map(x=>`<button data-md="${x[0]}" class="${cfg.mode===x[0]?"on":""}">${x[2]?ic(x[2]):""}${x[1]}</button>`).join("")}</div>`}
/* ---- معصومین ---- */
const MS={prophet:"پیامبر اکرم (ص)",zahra:"حضرت زهرا (س)",ali:"امام علی",hasan:"امام حسن",hussain:"امام حسین",sajjad:"امام سجاد",baqir:"امام باقر",sadiq:"امام صادق",kazim:"امام کاظم",reza:"امام رضا",jawad:"امام جواد",hadi:"امام هادی",askari:"امام حسن عسکری",mahdi:"امام زمان (عج)"};
const MST=[["askari",/عسکری/],["mahdi",/(امام\s*زمان|مهدی|صاحب\s*الزمان|حجت)/],["zahra",/(فاطمه|زهرا)/],["hasan",/(امام\s*حسن|حسن\s*مجتبی|مجتبی)/],["hussain",/(حسین|سیدالشهدا|ابا\s*عبدالله)/],["sajjad",/(سجاد|زین\s*العابدین)/],["baqir",/باقر/],["sadiq",/صادق/],["kazim",/(کاظم|موسی\s*بن\s*جعفر)/],["reza",/(امام\s*رضا|علی\s*بن\s*موسی|رضا\s*\(ع)/],["jawad",/(جواد|امام\s*تقی)/],["hadi",/(هادی|امام\s*نقی)/],["ali",/(امیرالمؤمنین|امیر\s*المؤمنین|امام\s*علی|علی\s*\(ع|مولا)/],["prophet",/(رسول|پیامبر|پیغمبر|محمد\s*\(ص|حضرت\s*محمد)/]];
const nrm=s=>String(s||"").replace(/ي/g,"ی").replace(/ى/g,"ی").replace(/ك/g,"ک").replace(/[‌‏]/g," ");
function imamsIn(s){s=nrm(s);const r=[];MST.forEach(([k,re])=>{if(re.test(s))r.push(k)});if(r.includes("askari")){const i=r.indexOf("hasan");if(i>=0)r.splice(i,1)}return r}
function imamOf(s){s=nrm(s).split(/[—·|،:]/)[0];const r=imamsIn(s);return r[0]||""}
const mimg=(k,c="")=>k?`<i class="mi ${c}" style="-webkit-mask-image:url(img/masoum/${k}.png);mask-image:url(img/masoum/${k}.png)"></i>`:"";
/* ---- ردیف‌ها و قرآن ---- */
const F=[];QURAN.forEach((s,i)=>s.forEach((_,j)=>F.push([i,j])));
const lab=r=>{const x=F[PARTS[r][0]],y=F[PARTS[r][1]];return fa(x[1]+1)+" "+SURA_FA[x[0]]+" الی "+fa(y[1]+1)+" "+SURA_FA[y[0]]};
const clamp=d=>Math.max(0,Math.min(N-1,d)),rowOf=(d,n=cfg.n)=>(((n-1+d)%N)+N)%N;
const key=()=>cfg.n+"|"+cfg.y+"-"+cfg.m+"-"+cfg.d+"|"+CYC+(GA()?"|g"+GD():"");
const dset=()=>new Set(done[key()]||[]);
const diffNow=()=>Math.round((TODAY-START)/DAY);
function toggle(d){const s=dset();s.has(d)?s.delete(d):s.add(d);done[key()]=[...s];ls.set("khatm-done",done);navigator.vibrate&&navigator.vibrate(15)}
function streak(){const s=dset();let d=clamp(diffNow());if(!s.has(d))d--;let c=0;while(d>=0&&s.has(d)){c++;d--}return c}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),2600)}
/* آیه‌های سجدهٔ واجب: سجده ۱۵، فصلت ۳۷، نجم ۶۲، علق ۱۹ */
const SAJ=[[31,14,"سجده",15],[40,36,"فصلت",37],[52,61,"نجم",62],[95,18,"علق",19]];
const sajAt=i=>{const[s,j]=F[i];return SAJ.find(x=>x[0]===s&&x[1]===j)};
const sajIn=R=>{const o=[];for(let i=R[0];i<=R[1];i++){const x=sajAt(i);if(x)o.push({i,n:x[2],a:x[3]})}return o};
function sheet(h,keep){let s=$("#sheet");if(!s){s=document.createElement("div");s.id="sheet";s.className="sheetw";document.body.appendChild(s);s.onclick=e=>{if(e.target===s||e.target.closest("[data-sx]"))s.remove()}}
s.innerHTML=`<div class="sheet">${h}${keep?"":`<div class="row"><button class="btn" data-sx>بستن</button></div>`}</div>`;return s}
const fmtB=n=>n>=1e9?fa((n/1e9).toFixed(2))+" گیگابایت":n>=1e6?fa((n/1e6).toFixed(1))+" مگابایت":fa(Math.round(n/1e3))+" کیلوبایت";
/* ---- تاریخ قمری و مناسبت‌ها ---- */
const hdate=()=>{const h=hij(TODAY,cfg.ho);return fa(h[2])+" "+HM[h[1]-1]+" "+fa(h[0])};
function memos(){const cy=jal(TODAY)[0];return cfg.memo.map(m=>{let t=j2g(cy,m.m,m.d);if(isNaN(t)||t<TODAY)t=j2g(cy+1,m.m,m.d);return Object.assign({},m,{t,k:Math.round((t-TODAY)/DAY)})}).filter(x=>!isNaN(x.t)).sort((a,b)=>a.k-b.k)}
function banners(){let o="";occNext(TODAY,cfg.ho,3).forEach(({k,e})=>{o+=`<div class="bn ${e[3]==="m"?"m":""}">${ic(e[3]==="m"?"moon":"star")}<div><b>${e[2]}</b><span>${k?fa(k)+" روز دیگر":"امروز"}</span></div></div>`});
memos().filter(x=>x.k<=7).forEach(x=>o+=`<div class="bn m">${ic("heart")}<div><b>${MT[x.type||"death"][1]} ${esc(x.name)}${x.rel?" ("+esc(x.rel)+")":""}</b><span>${x.k?fa(x.k)+" روز دیگر":"امروز"}${(x.type||"death")==="death"?" · فاتحه‌ای بخوانید":""}</span></div></div>`);return o}
function icsOut(){const L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//khatm//FA"],cy=jal(TODAY)[0];
cfg.memo.forEach((m,i)=>{for(let y=cy;y<cy+10;y++){const t=j2g(y,m.m,m.d);if(isNaN(t)||t<TODAY)continue;const d=new Date(t),s=d.getUTCFullYear()+String(d.getUTCMonth()+1).padStart(2,"0")+String(d.getUTCDate()).padStart(2,"0");
L.push("BEGIN:VEVENT","UID:m"+i+"-"+y+"@khatm","DTSTAMP:20260101T000000Z","DTSTART;VALUE=DATE:"+s,"SUMMARY:"+MT[m.type||"death"][1]+" "+m.name,"BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:فاتحه","TRIGGER:-P1D","END:VALARM","END:VEVENT")}});
L.push("END:VCALENDAR");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([L.join("\r\n")],{type:"text/calendar"}));a.download="yadbood.ics";a.click()}
/* فیلد تاریخ: سال سمت راست، ماه وسط، روز سمت چپ (DOM اول = راست در RTL) */
/* انتخاب تاریخ با لیست (بدون تایپ): سال سمت راست، ماه وسط، روز سمت چپ */
const dayOpts=(m,d,ph)=>{const n=m<=6?31:30;let h=ph||!d?`<option value=""${d?"":" selected"}>روز</option>`:"";for(let i=1;i<=n;i++)h+=`<option value="${i}" ${+d===i?"selected":""}>${fa(i)}</option>`;return h};
const dateFields=(p,y,m,d,o={})=>{const cy=jal(TODAY)[0],lo=Math.min(o.from||1250,+y||9999),hi=Math.max(o.to||cy+5,+y||0);let ys=o.opt||!y?`<option value=""${y?"":" selected"}>سال</option>`:"";for(let i=hi;i>=lo;i--)ys+=`<option value="${i}" ${+y===i?"selected":""}>${fa(i)}</option>`;
return`<div class="grid3"><select id="${p}y" aria-label="سال">${ys}</select><select id="${p}M" data-dt="${p}" aria-label="ماه">${MON.map((x,i)=>`<option value="${i+1}" ${m===i+1?"selected":""}>${x}</option>`).join("")}</select><select id="${p}d" aria-label="روز">${dayOpts(m,d,o.opt)}</select></div>`};
document.addEventListener("change",e=>{const t=e.target,p=t.dataset&&t.dataset.dt;if(!p)return;const dd=$("#"+p+"d");if(!dd)return;const v=dd.value,n=+t.value<=6?31:30;dd.innerHTML=dayOpts(+t.value,+v>n?n:+v,!!dd.querySelector('option[value=""]'))});
const readDate=p=>[+$("#"+p+"y").value,+$("#"+p+"M").value,+$("#"+p+"d").value];
/* ---- صفحه‌ها ---- */
function home(){
const el=$("#v-home");
if(!cfg.n){el.innerHTML=`<h2>ختم قرآن</h2><div class="card hero"><div class="big" style="font-size:1.7rem">خوش آمدید</div><div class="row"><button class="btn p" data-go="set">ثبت مشخصات</button></div></div>`;return}
const diff=diffNow(),d=clamp(diff),r=rowOf(d),s=dset(),cnt=s.size,C=2*Math.PI*42,ok=s.has(d),sj=sajIn(PARTS[r]);
const msg=diff<0?`ختم گروهی ${fa(-diff)} روز دیگر (${jstr(START)}) شروع می‌شود؛ همه با هم آغاز می‌کنیم`:diff>=N?"دورهٔ "+fa(N)+" روزهٔ ختم تمام شد؛ تاریخ شروع دورهٔ تازه را ثبت کنید":"";
let up="";for(let k=d+1;k<=d+3&&k<N;k++)up+=`<button class="item" data-open="${k}"><div class="dot">${fa(k+1)}</div><div><div class="t1">ردیف ${fa(rowOf(k)+1)}</div><div class="t2">${lab(rowOf(k))}</div></div>${ic("prev")}</button>`;
el.innerHTML=`<div class="gr"><small>السلام علیکم</small><b>${esc(cfg.name)} عزیز</b><em>${jstr(TODAY)} · ${hdate()} قمری${CYC?" · دورهٔ "+fa(CYC+1):""}${cfg.grp?" · "+esc(cfg.grp):""}</em>${typeof userChip==="function"?userChip():""}</div>
${eStyle()==="fatemiyya"?`<div class="fb" aria-hidden="true"><i></i></div>`:""}
${typeof hadithBanner==="function"?hadithBanner():""}
${typeof todayDuaCard==="function"?todayDuaCard():""}
${msg?`<p class="muted" style="margin-top:10px">${msg}</p>`:""}${banners()}
${sj.length?`<button class="bn w" data-open="${d}">${ic("warn")}<div><b>هشدار: سجدهٔ واجب در بخش امروز</b><span>سورهٔ ${sj.map(x=>x.n+" آیهٔ "+fa(x.a)).join("، ")} · قبل از رسیدن به آیه به شما یادآوری می‌شود</span></div></button>`:""}
${(cfg.rem&&cfg.rem.on)||cfg.remAsk?"":`<div class="bn">${ic("bell")}<div><b>یادآور روزانه</b><span>هر شب ساعت ۲۰:۰۰ بخش امروز را یادآوری کنم؟</span></div><button class="chip on" data-remon>فعال کن</button><button class="chip" data-remno>بعداً</button></div>`}
<div class="card hero"><div class="top"><div><p class="muted">بخش امروز شما</p><div class="big">ردیف ${fa(r+1)}</div></div><div class="ring"><svg viewBox="0 0 100 100"><circle class="t" cx="50" cy="50" r="42"/><circle class="p" cx="50" cy="50" r="42" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-cnt/N)}"/></svg><b>${fa(Math.round(cnt/N*100))}٪</b></div></div>
<p class="range">${lab(r)}</p>
<div class="row"><button class="btn p" data-open="${d}">${ic("book")} شروع خواندن</button><button class="btn" data-listen="${d}" style="background:rgba(255,255,255,.2);color:#fff;border:0">${ic("play")} گوش دادن</button><button class="btn ${ok?"ok":""}" id="dn" style="${ok?"":"background:rgba(255,255,255,.2);color:#fff;border:0"}">${ic("check")} ${ok?"خوانده شد":"خواندم"}</button></div></div>
${d===N-1?`<div class="card"><b>دعای ختم قرآن</b><p class="dua">${DUA}</p></div>`:""}
<div class="stats"><div class="stat">${ic("flame")}<b>${fa(streak())}</b><span>روز پیاپی</span></div><div class="stat">${ic("check")}<b>${fa(cnt)}</b><span>بخش خوانده‌شده</span></div><div class="stat">${ic("cal")}<b>${fa(Math.max(0,N-1-d))}</b><span>روز تا پایان ختم</span></div></div>
<div class="card"><b>مرتبهٔ معنوی: ${lvl().L[1]}</b><div class="bar"><i style="width:${lvl().nx?Math.min(100,(cnt-lvl().L[0])/(lvl().nx[0]-lvl().L[0])*100):100}%"></i></div><p class="muted" style="margin-top:6px">${lvl().nx?fa(lvl().nx[0]-cnt)+" روز تا «"+lvl().nx[1]+"»":"بالاترین مرتبه"} · مجموع آیات شما: ${fa(vcount())}</p></div>
${up?`<p class="mon">روزهای پیش رو</p>${up}`:""}`;
$("#dn").onclick=()=>{const w=dset().has(d);toggle(d);home();if(!w)celebrate(d)}}
let planF="all";
function plan(){
const el=$("#v-plan");if(!cfg.n){el.innerHTML=`<h2>برنامهٔ من</h2><div class="card muted">ابتدا از تنظیمات شماره و تاریخ شروع را ثبت کنید.</div>`;return}
const s=dset(),diff=diffNow();let h="",last="";
for(let d=0;d<N;d++){const dt=START+d*DAY,j=jal(dt),isd=s.has(d);
if(planF==="todo"&&isd||planF==="done"&&!isd)continue;
const mk=MON[j[1]-1]+" "+fa(j[0]);if(mk!==last){h+=`<p class="mon">${mk}</p>`;last=mk}
const sj=sajIn(PARTS[rowOf(d)]);
h+=`<button class="item ${isd?"done":""} ${d===diff?"today":""}" data-open="${d}"><div class="dot">${isd?ic("check"):fa(j[2])}</div><div><div class="t1">ردیف ${fa(rowOf(d)+1)}${d===diff?" · امروز":""}</div><div class="t2">${lab(rowOf(d))}</div>${sj.length?`<div class="t2" style="color:#e08a00">⚠ سجدهٔ واجب: ${sj.map(x=>x.n).join("، ")}</div>`:""}${(ev=>ev.length?`<div class="t2" style="color:var(--gold)">✦ ${ev.map(e=>e[2]).join(" · ")}</div>`:"")(occOn(dt,cfg.ho))}</div>${ic("prev")}</button>`}
el.innerHTML=`<h2>برنامهٔ من</h2><p class="muted">از ${jstr(START)} تا ${jstr(START+(N-1)*DAY)}</p><div class="chips">${[["all","همه"],["todo","نخوانده"],["done","خوانده‌شده"]].map(c=>`<button class="chip ${planF===c[0]?"on":""}" data-f="${c[0]}">${c[1]}</button>`).join("")}</div>${h||'<div class="card muted">موردی نیست.</div>'}`}
function rows(q=""){
const el=$("#v-rows");if(!$("#rq")){el.innerHTML=`<h2>همهٔ ردیف‌ها</h2><p class="muted">${fa(N)} بخش قرآن${GA()?" (ختم "+fa(GD())+" روزه)":""}</p>
<div class="card"><b>بخش امروزِ یک نفر دیگر</b><div class="field">شمارهٔ ردیف او (۱ تا ${fa(N)})<input id="fr" type="text" inputmode="numeric" data-n min="1" max="${N}"></div><p id="frr" class="muted" style="margin-top:8px"></p></div>
<div class="search">${ic("search")}<input id="rq" placeholder="جستجوی سوره یا شمارهٔ ردیف"></div><div id="rl"></div>`;
$("#rq").oninput=e=>rows(e.target.value);
$("#fr").oninput=e=>{const n=+e.target.value,o=$("#frr");if(!(n>=1&&n<=N)){o.textContent="";return}const r=rowOf(((diffNow()%N)+N)%N,n);o.innerHTML=`امروز ردیف <b>${fa(r+1)}</b>: ${lab(r)} <button class="chip on" data-row="${r}">باز کردن</button>`}}
let h="";q=q.trim().replace(/[۰-۹]/g,c=>"۰۱۲۳۴۵۶۷۸۹".indexOf(c)).replace(/[يى]/g,"ی").replace(/ك/g,"ک");
for(let r=0;r<N;r++){if(q&&!(lab(r).replace(/[۰-۹]/g,c=>"۰۱۲۳۴۵۶۷۸۹".indexOf(c)).includes(q)||String(r+1)===q))continue;
const d=cfg.n?(((r-(cfg.n-1))%N)+N)%N:-1;
h+=`<button class="item" ${d>=0?`data-open="${d}"`:`data-row="${r}"`}><div class="dot">${fa(r+1)}</div><div><div class="t1">${lab(r)}</div><div class="t2">${d>=0?"روز "+fa(d+1)+" شما · "+jstr(START+d*DAY):"&nbsp;"}</div></div>${ic("prev")}</button>`}
$("#rl").innerHTML=h||'<div class="card muted">چیزی پیدا نشد.</div>'}
function ageDefaults(a){cfg.age=a;if(a>=65){cfg.fs=44;cfg.ui=1.25}else if(a>=50){cfg.fs=38;cfg.ui=1.15}else{cfg.fs=a<14?28:30;cfg.ui=1}}
function sets(){
const el=$("#v-set");
el.innerHTML=`<h2>تنظیمات</h2><p class="muted">اطلاعات فقط روی همین دستگاه ذخیره می‌شود.</p>
<div class="card"><b>مشخصات و شروع ختم</b>
<div class="field">نام هیئت، گروه یا خانواده<input id="sgrp" value="${esc(cfg.grp)}"></div>
<div class="field">نام<input id="sname" value="${esc(cfg.name)}"></div><div class="field">سن<input id="sage" type="text" inputmode="numeric" data-n value="${cfg.age||""}"></div>
<div class="field">شمارهٔ ردیف شما چند است؟ (۱ تا ${fa(N)})<input id="sn" type="text" inputmode="numeric" data-n min="1" max="${N}" value="${cfg.n||""}"></div>${typeof gsSettingsHtml==="function"?gsSettingsHtml():""}
<div class="field">تاریخ شروع ختم گروهی (سال · ماه · روز)${dateFields("s",cfg.y,cfg.m,cfg.d)}</div>
<p class="muted" style="margin-top:8px">در روز شروع، بخش هم‌شمارهٔ شما خوانده می‌شود و هر روز یک ردیف جلو می‌روید.</p>
<div class="row"><button class="btn g" id="sv">ذخیره</button></div></div>
${typeof usersCard==="function"?usersCard():""}
<div class="card"><b>ظاهر و تم</b>
<div class="field">حالت</div>${modeSeg()}
<div class="field">تم</div>${themeGrid()}
<div class="sr"><span>تم فاطمیه به‌طور خودکار در ایام فاطمیه<br><small class="muted">فقط در روزهای شهادت و ولادت حضرت زهرا (س)؛ بعد از آن به تم خودتان برمی‌گردد</small></span><input type="checkbox" class="sw2" id="afat" ${cfg.afat!==false?"checked":""}></div>
<div class="field">نوار بالای صفحه (قبلی/بعدی، تمام‌صفحه، خروج)<select id="stb"><option value="tap" ${(cfg.tbm||"tap")==="tap"?"selected":""}>با لمس بالای صفحه ظاهر و محو شود</option><option value="on" ${cfg.tbm==="on"?"selected":""}>همیشه روشن</option><option value="off" ${cfg.tbm==="off"?"selected":""}>خاموش</option></select></div>
${typeof fontsCard==="function"?fontsCard():""}
<div class="field">اندازهٔ متن قرآن<div class="stp"><button data-fsz="-1">−</button><b id="fsv">${fa(cfg.fs)}</b><button data-fsz="1">+</button></div></div>
<div class="field">اندازهٔ نوشته‌های برنامه<div class="seg" id="useg">${[[1,"عادی"],[1.15,"بزرگ"],[1.3,"خیلی بزرگ"]].map(x=>`<button data-ui="${x[0]}" class="${Math.abs((cfg.ui||1)-x[0])<.06?"on":""}">${x[1]}</button>`).join("")}</div></div>
<div class="field">تصحیح تاریخ قمری<select id="sho">${[-2,-1,0,1,2].map(o=>`<option value="${o}" ${cfg.ho===o?"selected":""}>${o?fa(o>0?"+"+o:o)+" روز":"بدون تغییر"}</option>`).join("")}</select></div></div>
<div class="card"><b>قاری و مترجم پیش‌فرض</b>
<div class="field">قاری قرآن<select id="arc2">${Object.entries(REC).map(([k,v])=>`<option value="${k}" ${cfg.rec===k?"selected":""}>${v[0]}</option>`).join("")}</select></div>
<div class="field">مترجم (متن فارسی)<select id="st">${Object.entries(TRN).map(([k,v])=>`<option value="${k}" ${cfg.tr===k?"selected":""}>${v}</option>`).join("")}</select></div>
<div class="field">خوانندهٔ معنی (ترجمهٔ صوتی)<select id="strr">${Object.entries(TRR).map(([k,v])=>`<option value="${k}" ${cfg.trr===k?"selected":""}>${v[0]}</option>`).join("")}</select></div>
<div class="field">هم‌خوانی کلمه‌به‌کلمه هنگام پخش<select id="shl">${HLM.map(x=>`<option value="${x[0]}" ${cfg.hl===x[0]?"selected":""}>${x[1]}</option>`).join("")}</select></div>
<div class="sr"><span>پخش ترجمهٔ صوتی پس از هر آیه</span><input type="checkbox" class="sw2" id="atr2" ${cfg.atr?"checked":""}></div>
<div class="field">سرعت پخش<select id="asp">${[.5,.75,1,1.25,1.5,2].map(x=>`<option value="${x}" ${cfg.sp===x?"selected":""}>${fa(x)}×</option>`).join("")}</select></div></div>
<div class="card"><b>یادآور روزانه</b><div class="field">ساعت یادآوری<input id="rt" type="time" value="${(cfg.rem&&cfg.rem.t)||"20:00"}"></div><div class="row"><button class="btn ${cfg.rem&&cfg.rem.on?"g":""}" id="ron">${cfg.rem&&cfg.rem.on?"خاموش کردن اعلان":"فعال‌سازی اعلان"}</button><button class="btn" id="rics">${ic("down")} یادآور تقویم گوشی</button></div><p class="muted" style="margin-top:8px">اعلان برنامه وقتی کار می‌کند که برنامه نصب یا باز باشد. برای یادآوری مطمئن، «یادآور تقویم گوشی» را اضافه کنید.</p></div>
<div class="card"><b>دانلود آفلاین</b><p class="muted" style="margin-top:6px">صوت، ترجمه و متن را برای استفاده بدون اینترنت ذخیره کنید؛ وضعیت هر روز روی تقویم دیده می‌شود.</p><div class="row"><button class="btn g" data-act="dl-open">${ic("cloud")} مدیریت دانلود آفلاین</button></div></div>
<div class="card"><b>ابزارها و پشتیبان‌گیری</b><p class="muted" style="margin-top:6px">یک فایل JSON با نام «ختم قرآن + تاریخ + نام شما» ساخته می‌شود که همهٔ پیشرفت و تنظیماتتان را دارد و می‌توانید آن را روی گوشی دیگر بازیابی کنید. «پشتیبان همهٔ کاربران» اطلاعات تک‌تک کاربران این دستگاه را در یک فایل می‌گذارد.</p>
<div class="row"><button class="btn g" data-act="bk-export">${ic("down")} ساخت فایل پشتیبان</button><button class="btn" data-act="bk-import">بازیابی از فایل</button></div>
<div class="row"><button class="btn" id="sh">${ic("share")} کپی لینک من</button><button class="btn" data-act="install">${ic("down")} نصب برنامه</button></div>
<div class="row"><button class="btn dg" id="rs">پاک کردن پیشرفت</button></div></div>
<div class="card"><b>ریست تنظیمات و بازنشانی</b><p class="muted" style="margin-top:6px">«بازنشانی کامل» همهٔ اطلاعات همهٔ کاربران این دستگاه (نام، پیشرفت ختم، تنظیمات، تسبیح و آمار، احادیث و ادعیهٔ افزوده‌شده، فایل‌های دانلودشده) را پاک می‌کند و برنامه مثل روز اول باز می‌شود. این کار برگشت‌پذیر نیست؛ اگر لازم است اول فایل پشتیبان بگیرید.</p>
<div class="row"><button class="btn" id="rst1">فقط بازگشت تنظیمات ظاهر و پخش</button><button class="btn dg" id="rst2">بازنشانی کامل و حذف همهٔ داده‌ها</button></div></div>`;
$("#sv").onclick=()=>{const n=+$("#sn").value,[y,m,d]=readDate("s");
if(!(n>=1&&n<=N&&Number.isInteger(n)))return toast("شمارهٔ ردیف باید بین ۱ تا "+fa(N)+" باشد");
if(isNaN(j2g(y,m,d)))return toast("تاریخ معتبر نیست");
const a=+$("#sage").value;if(a&&a!==cfg.age){ageDefaults(a);applyTheme()}
if(n!==cfg.n)delete cfg.gp;Object.assign(cfg,{n,m,y,d,grp:$("#sgrp").value.trim(),name:$("#sname").value.trim()||cfg.name});save();setup();toast("ذخیره شد");go("home")};
$("#ron").onclick=async()=>{await remEnable(!(cfg.rem&&cfg.rem.on),$("#rt").value);sets()};
$("#rt").onchange=e=>{cfg.rem=Object.assign({on:false},cfg.rem,{t:e.target.value});save();remSched()};$("#rics").onclick=remIcs;
$("#arc2").onchange=e=>{cfg.rec=e.target.value;save();toast("قاری پیش‌فرض: "+REC[cfg.rec][0])};
$("#strr").onchange=e=>{cfg.trr=e.target.value;save();toast("خوانندهٔ معنی تغییر کرد")};
$("#atr2").onchange=e=>{cfg.atr=e.target.checked;save()};$("#asp").onchange=e=>{cfg.sp=+e.target.value;save()};
$("#stb").onchange=e=>{cfg.tbm=e.target.value;save();typeof tbApply==="function"&&tbApply(true)};
$("#afat").onchange=e=>{cfg.afat=e.target.checked;save();applyTheme()};
$("#shl").onchange=e=>{cfg.hl=e.target.value;save();toast("حالت هم‌خوانی ذخیره شد")};
$("#rst1").onclick=()=>{if(!confirm("تنظیمات ظاهر و پخش به حالت اولیه برگردد؟ (پیشرفت و اطلاعات شما حفظ می‌شود)"))return;Object.assign(cfg,{rec:"alafasy",trr:"makarem",tr:"makarem",sp:1,atr:false,rep:0,repN:1,gap:0,style:"haram",mode:"night",ho:0,hl:"ar",afat:true,fs:30,ui:1,showTr:true,autoScroll:true,dfs:26,dtr:true,tbm:"tap"});delete cfg.dv;save();applyTheme();sets();toast("تنظیمات به حالت اولیه برگشت")};
$("#rst2").onclick=()=>{if(!confirm("همهٔ اطلاعات و داده‌ها برای همیشه پاک می‌شود. ادامه می‌دهید؟"))return;if(!confirm("آخرین تأیید: برنامه مثل روز اول می‌شود."))return;fullReset()};
$("#sho").onchange=e=>{cfg.ho=+e.target.value;save();toast("تاریخ قمری تصحیح شد")};
$("#st").onchange=e=>{cfg.tr=e.target.value;save();toast("مترجم پیش‌فرض: "+TRN[cfg.tr])};
$("#sh").onclick=async()=>{const u=location.origin+location.pathname+"#n="+cfg.n+"&s="+cfg.y+"-"+cfg.m+"-"+cfg.d;try{await navigator.clipboard.writeText(u);toast("لینک کپی شد")}catch(e){prompt("لینک:",u)}};

$("#rs").onclick=()=>{if(confirm("همهٔ تیک‌های خوانده‌شده پاک شود؟")){delete done[key()];ls.set("khatm-done",done);toast("پاک شد")}};typeof accSets==="function"&&accSets()}
/* ---- بازنشانی کامل ---- */
async function fullReset(){try{Object.keys(localStorage).filter(k=>/^khatm/.test(k)).forEach(k=>localStorage.removeItem(k))}catch(e){}
 try{sessionStorage.clear()}catch(e){}
 try{const ks=await caches.keys();await Promise.all(ks.filter(k=>/^khatm-(audio|duas|tr|fonts)/.test(k)||k==="khatm-audio").map(k=>caches.delete(k)))}catch(e){}
 try{if(window.indexedDB&&indexedDB.databases){(await indexedDB.databases()).forEach(d=>indexedDB.deleteDatabase(d.name))}}catch(e){}
 location.replace(location.pathname)}
const HLM=[["ar","کلمه‌به‌کلمهٔ عربی (هم‌زمان با قاری)"],["fa","کلمه‌به‌کلمهٔ معنی فارسی (هم‌زمان با ترجمهٔ صوتی)"],["both","هر دو هم‌زمان (عربی و فارسی)"],["ayah","فقط آیه (بدون کلمه‌به‌کلمه)"]];
/* ---- ناوبری ---- */
const V={home,plan,cal:()=>cal(),more:()=>more(),rows:()=>rows($("#rq")?$("#rq").value:""),set:sets};
let cur="home";
function renderAll(){V[cur]()}
function go(v){cur=v;$$(".view").forEach(e=>e.classList.toggle("on",e.id==="v-"+v));$$("#nav button").forEach(b=>b.classList.toggle("on",b.dataset.v===(v==="rows"?"more":v)));V[v]();scrollTo(0,0);if(v==="plan"){const t=$(".item.today");t&&t.scrollIntoView({block:"center"})}}
let setTaps=0,setT;
$("#nav").onclick=e=>{const b=e.target.closest("button");if(!b)return;
 if(b.dataset.v==="set"){setTaps++;clearTimeout(setT);setT=setTimeout(()=>setTaps=0,3500);if(setTaps>=10){setTaps=0;credit();return}}
 if(b.dataset.v==="more")sub="menu";go(b.dataset.v)};
function credit(){const o=document.createElement("div");o.className="cr";o.innerHTML=`<div><i></i><small>ساخت و توسعه</small><b>مهرداد آزادگان</b><p>برای بستن لمس کنید</p></div>`;o.onclick=()=>{o.style.transition="opacity .6s";o.style.opacity=0;setTimeout(()=>o.remove(),600)};document.body.appendChild(o)}
const ACT={};
document.addEventListener("click",e=>{const t=e.target.closest("button,a");if(!t)return;
if(t.dataset.act&&ACT[t.dataset.act])return ACT[t.dataset.act](t,e);
if(t.dataset.go)go(t.dataset.go);
else if(t.dataset.sty){cfg.style=t.dataset.sty;save();applyTheme();if($("#ob"))$$("#ob .tsw").forEach(x=>x.classList.toggle("on",x===t));else sets()}
else if(t.dataset.md){cfg.mode=t.dataset.md;save();applyTheme();if($("#ob")){$$("#mseg button").forEach(x=>x.classList.toggle("on",x===t));$$("#ob .tsw").forEach(x=>{const p=PV[x.dataset.sty][curMode()];x.style.cssText=`--pbg:${p[0]};--pa1:${p[1]};--pa2:${p[2]};--ptx:${p[3]}`})}else sets()}
else if(t.dataset.fsz){cfg.fs=Math.max(20,Math.min(60,cfg.fs+t.dataset.fsz*2));save();$("#fsv").textContent=fa(cfg.fs)}
else if(t.dataset.ui){cfg.ui=+t.dataset.ui;save();applyTheme();sets()}
else if(t.dataset.sub){if(t.dataset.sub==="story")return storySheet();if(t.dataset.sub==="rows")go("rows");else{if(cur!=="more")go("more");more(t.dataset.sub)}}
else if(t.dataset.cn){cM+=+t.dataset.cn;if(cM>12){cM=1;cY++}if(cM<1){cM=12;cY--}cS=1;cal()}
else if(t.dataset.cd){cS=+t.dataset.cd;cal()}
else if(t.dataset.ev){evSheet(+t.dataset.ev)}
else if(t.dataset.qs){const q=QS[+t.dataset.qs],a=OFF[q[1]-1],en=(q[1]<114?OFF[q[1]]:6236)-1;openR(-1,null,q[2]?[a+q[2]-1,a+q[3]-1,q[0]]:[a,en,"سورهٔ "+q[0]])}
else if(t.dataset.tp){tp=+t.dataset.tp;ph=0;tc=0;more()}
else if(t.dataset.copy){navigator.clipboard&&navigator.clipboard.writeText(t.dataset.copy).then(()=>toast("شمارهٔ کارت کپی شد"))}
else if(t.dataset.gift){const m=cfg.memo.find(x=>x.id==t.dataset.gift);if(m){m.gifts=(m.gifts||0)+1;save();toast("ثواب این تلاوت به روح "+m.name+" هدیه شد");t.disabled=true}}
else if(t.dataset.bonus){const sh=$("#sheet");sh&&sh.remove();openR(rowOf(+t.dataset.bonus),null)}
else if(t.dataset.listen!=null){const d=+t.dataset.listen;openR(rowOf(d),d,null,true)}
else if("remon"in t.dataset){cfg.remAsk=1;remEnable(true,"20:00").then(home)}
else if("remno"in t.dataset){cfg.remAsk=1;save();home()}
else if(t.dataset.open!=null){const d=+t.dataset.open;openR(rowOf(d),d)}
else if(t.dataset.row!=null)openR(+t.dataset.row,null);
else if(t.dataset.f){planF=t.dataset.f;plan()}
else if(t.dataset.dm){cfg.memo=cfg.memo.filter(x=>x.id!=t.dataset.dm);save();cal()}
});
addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferred=e;if(typeof installOffer==="function")installOffer()});
/* لینک اشتراک */
(function(){const hp=new URLSearchParams(location.hash.slice(1));
if(hp.get("n")){const s=(hp.get("s")||"").split("-").map(Number);cfg.n=Math.min(N,Math.max(1,+hp.get("n")||1));if(s.length===3&&!isNaN(j2g(...s)))[cfg.y,cfg.m,cfg.d]=s;save();history.replaceState(null,"",location.pathname)}})();
/* ---- شروع‌کار (کاربر جدید / بازیابی) ---- */
const ob0={sd:null,mode:0};
function onboard(s=0){
let o=$("#ob");if(!o){o=document.createElement("div");o.id="ob";o.className="ob";document.body.appendChild(o)}
const j=jal(TODAY),td=jstr(TODAY),sd=ob0.sd||{y:cfg.y,m:cfg.m,d:cfg.d};
const S=[
`<div class="bism">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</div><h2>به ختم قرآن خوش آمدید</h2><p class="muted">آیا قبلاً از این برنامه استفاده کرده‌اید؟</p><button class="btn g big" id="onx">نه، اولین بار است؛ ورود به‌عنوان کاربر جدید</button><button class="tiny" data-act="bk-import">بله، قبلاً استفاده کرده‌ام (بازیابی پشتیبان)</button>`,
`<h2>نام هیئت، گروه یا خانوادهٔ شما</h2><p class="muted">نام دسته‌ای که تصمیم دارید با آن ختم قرآن بگیرید؛ مثلاً «هیئت یاس»، «خانوادهٔ احمدی» یا «دوستان».</p><div class="field">نام گروه<input id="o1" value="${esc(cfg.grp)}" placeholder="نام هیئت / گروه / خانواده"></div>`,
`<h2>نام شما چیست؟</h2><p class="muted">برای خوشامدگویی و ساخت فایل پشتیبان.</p><div class="field">نام<input id="o1" value="${esc(cfg.name)}" placeholder="مثلاً علی" autocomplete="given-name"></div>`,
`<h2>چند سال دارید؟</h2><p class="muted">برای تنظیم اندازهٔ مناسب خط و نوشته‌ها. برای بالای ۵۰ سال، نوشته‌ها خودکار بزرگ‌تر می‌شود.</p><div class="field">سن<input id="o1" type="text" inputmode="numeric" data-n value="${cfg.age||""}"></div>`,
`<h2>شمارهٔ ردیف شما چند است؟</h2><p class="muted">شمارهٔ ردیف شما (۱ تا ${fa(N)}) را مسئول گروه به شما می‌دهد. همه با هم شروع می‌کنیم؛ روز اول هر نفر بخشِ هم‌شمارهٔ خودش را می‌خواند و هر روز یک ردیف جلو می‌رود.</p><div class="field">شمارهٔ ردیف<input id="o1" type="text" inputmode="numeric" data-n value="${cfg.n||""}"></div>${typeof gsSettingsHtml==="function"&&!GA()?gsSettingsHtml():""}<button class="tiny" data-act="ob-num1">شماره‌ام را نمی‌دانم (شمارهٔ ۱ ثبت شود)</button>`,
`<h2>از چه روزی ختم را شروع کنیم؟</h2><p class="muted">امروز ${td} است.</p><div class="chips wrap" style="justify-content:center"><button class="chip ${ob0.mode?"":"on"}" data-act="ob-sd0">از امروز (${td})</button><button class="chip ${ob0.mode?"on":""}" data-act="ob-sd1">روز دیگر</button></div>${ob0.mode?`<div class="field">تاریخ شروع (سال · ماه · روز)${dateFields("o",sd.y,sd.m,sd.d)}</div>`:""}`,
`<h2>حالت و تم دلخواه</h2><p class="muted">بعداً در تنظیمات قابل تغییر است</p>${modeSeg()}${themeGrid()}`];
o.innerHTML=`<div class="st">${s>0?`<button class="back" data-act="ob-back" data-s="${s-1}">‹ بازگشت</button>`:""}${S[s]}${s>0?`<div class="row"><button class="btn g" id="onx">${s===6?"شروع ختم":"ادامه"}</button></div><div class="dots">${S.slice(1).map((_,i)=>`<i class="${i===s-1?"on":""}"></i>`).join("")}</div>`:""}</div>`;
const i=$("#o1");i&&(i.focus(),i.addEventListener("keydown",e=>{if(e.key==="Enter")$("#onx").click()}));
ACT["ob-back"]=t=>onboard(+t.dataset.s);
ACT["ob-num1"]=()=>{$("#o1").value=1;$("#onx").click()};
ACT["ob-sd0"]=()=>{ob0.mode=0;ob0.sd=null;onboard(5)};
ACT["ob-sd1"]=()=>{ob0.mode=1;ob0.sd=ob0.sd||{y:j[0],m:j[1],d:j[2]};onboard(5)};
$("#onx").onclick=()=>{const v=i?i.value.trim():"";
if(s===1){if(!v)return toast("لطفاً نام گروه را بنویسید");cfg.grp=v}
if(s===2){if(!v)return toast("لطفاً نام خود را بنویسید");cfg.name=v}
if(s===3){const a=+v;if(!(a>=3&&a<=120))return toast("سن را درست وارد کنید");ageDefaults(a);applyTheme()}
if(s===4){const n=+v;if(!(Number.isInteger(n)&&n>=1&&n<=N))return toast("شمارهٔ ردیف باید بین ۱ تا "+fa(N)+" باشد");cfg.n=n}
if(s===5){if(ob0.mode){const[y,m,d]=readDate("o");if(isNaN(j2g(y,m,d)))return toast("تاریخ معتبر نیست");Object.assign(cfg,{y,m,d});ob0.sd={y,m,d}}else Object.assign(cfg,{y:j[0],m:j[1],d:j[2]})}
if(s<6)return onboard(s+1);
cfg.v=3;cfg.ob=1;save();o.remove();setup();go("home");typeof afterOnboard==="function"&&afterOnboard()}}
/* ---- ورودی عددی: ارقام فارسی/عربی ---- */
document.addEventListener("input",e=>{const t=e.target;if(t.dataset&&"n"in t.dataset){const o=t.value,v=o.replace(/[۰-۹]/g,c=>"۰۱۲۳۴۵۶۷۸۹".indexOf(c)).replace(/[٠-٩]/g,c=>"٠١٢٣٤٥٦٧٨٩".indexOf(c)).replace(/[^0-9]/g,"");if(v!==o){let p=null;try{p=t.selectionStart}catch(x){}t.value=v;try{if(p!=null){const q=Math.max(0,p-(o.length-v.length));t.setSelectionRange(q,q)}}catch(x){}}}});
function stars(){const e=$("#stars");for(let k=0;k<16;k++){const i=document.createElement("i");i.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${(Math.random()*4).toFixed(1)}s`;e.appendChild(i)}}
