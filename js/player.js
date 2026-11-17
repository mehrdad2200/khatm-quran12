/* ===== تلاوت: متن کلمه‌به‌کلمه، پنل پخش، هشدار سجده ===== */
const aid=i=>String(F[i][0]+1).padStart(3,"0")+String(F[i][1]+1).padStart(3,"0");
const aurlF=(folder,i)=>"https://everyayah.com/data/"+folder+"/"+aid(i)+".mp3";
const aurl=(i,tr)=>aurlF(tr?(TRR[cfg.trr]||TRR.makarem)[1]:(REC[cfg.rec]||REC.alafasy)[1],i);
const ap={a:null,pre:null,i:-1,on:false,ph:"ar",rng:null,rc:0,tok:0,raf:0,seek:0,panel:false,sajOK:-1,hv:null,ws:[],ts:[],lw:-2,lt:-2,gapT:0};
async function asrc(u){try{const c=await caches.open("khatm-audio"),r=await c.match(u);if(r)return URL.createObjectURL(await r.blob())}catch(e){}return u}
/* زمان‌بندی تقریبی کلمات: سهم هر کلمه از طول آیه به نسبت حروف، مدها و مکث‌ها */
const AWc={};
function wInfo(i){let o=AWc[i];if(o)return o;const[s,j]=F[i],ws=QURAN[s][j].split(" "),
wt=ws.map(w=>{let c=(w.match(/[ء-يٱ-ۓ]/g)||[]).length;c+=(w.match(/[ٰٓۤ]/g)||[]).length*1.2;if(/[ۖ-ۜ]/.test(w))c+=1.5;return c+.8}),tot=wt.reduce((a,b)=>a+b,0);let a=0;
const st=wt.map(x=>{const v=a/tot;a+=x;return v});return AWc[i]=o={ws,st,n:ws.length}}
function loadTR(k){return new Promise(res=>{if(window.TR&&TR[k])return res(true);const s=document.createElement("script");s.src="data/tr-"+k+".js";s.onload=()=>res(true);s.onerror=()=>{toast("ترجمه بارگذاری نشد (اینترنت را بررسی کنید)");res(false)};document.head.appendChild(s)})}
/* ---- همگام‌سازی هوشمند: مرز کلمه‌ها از روی انرژی واقعی صوت (به ثانیهٔ خود فایل، پس مستقل از سرعت پخش) ---- */
const ENVP={},ENVC={};let actx=null;
const envKey=(i,ph)=>(ph==="tr"?cfg.trr+"|"+cfg.tr:cfg.rec)+"|"+ph+i;
const trWords=i=>{const T=window.TR&&TR[cfg.tr];return T?T[F[i][0]][F[i][1]].split(/\s+/).filter(Boolean):[]};
function envFor(i,ph){const k=envKey(i,ph);return ENVP[k]||(ENVP[k]=envCalc(i,ph,k))}
async function envCalc(i,ph,key){
 try{let fr;if(ph==="ar")fr=wInfo(i).st;else{const w=trWords(i);if(!w.length){delete ENVP[key];return null}const wt=w.map(x=>x.length+1.5),tot=wt.reduce((a,b)=>a+b,0);let a=0;fr=wt.map(x=>{const v=a/tot;a+=x;return v})}
  const u=await asrc(aurl(i,ph==="tr")),r=await fetch(u);if(!r.ok)return null;
  actx=actx||new(window.AudioContext||window.webkitAudioContext)();
  const ab=await actx.decodeAudioData(await r.arrayBuffer()),x=ab.getChannelData(0),sr=ab.sampleRate,hop=Math.round(sr*.01),n=Math.floor(x.length/hop),e0=new Float32Array(n);
  for(let k=0;k<n;k++){let s=0;for(let q=k*hop,z=q+hop;q<z;q++)s+=x[q]*x[q];e0[k]=Math.sqrt(s/hop)}
  const e=new Float32Array(n);for(let k=0;k<n;k++)e[k]=((e0[k-1]||0)+e0[k]*2+(e0[k+1]||0))/4;
  let mx=0;for(let k=0;k<n;k++)if(e[k]>mx)mx=e[k];if(!(mx>0))return null;
  const th=mx*.07;let a=0;while(a<n&&e[a]<th)a++;let b=n-1;while(b>a&&e[b]<th)b--;const span=Math.max(10,b-a),K=fr.length,st=[Math.max(0,a-2)*.01],w=Math.max(3,Math.round(span/K*.32));
  for(let k=1;k<K;k++){const c=a+fr[k]*span;let best=-1,bs=9;for(let j=Math.round(c-w);j<=Math.round(c+w);j++){if(j<=0||j>=n)continue;const sc=e[j]/mx+.18*Math.abs(j-c)/w;if(sc<bs){bs=sc;best=j}}
   let t=(best<0?c:best)*.01;if(t<=st[k-1]+.03)t=st[k-1]+.03;st.push(t)}
  return ENVC[key]={st,a0:a*.01,end:b*.01,dur:ab.duration}}
 catch(e){return null}}
const envGet=(i,ph)=>ENVC[envKey(i,ph)]||null;
const wIdx=(st,t)=>{let w=0;for(let k=0;k<st.length;k++)if(st[k]<=t)w=k;else break;return w};
/* ---- باز کردن تلاوت (با هشدار سجدهٔ واجب پیش از شروع) ---- */
function openR(r,d,rng,play){const R=rng||PARTS[r],sj=sajIn(R);
 if(sj.length&&!(rd&&!$("#reader").hidden)){
  sheet(`<div class="cb"><div class="ck" style="background:linear-gradient(135deg,#e08a00,#b45f00)">${ic("warn")}</div><h2 style="text-align:center">هشدار: سجدهٔ واجب</h2><p style="text-align:center;line-height:2.1;margin-top:8px">در این بخش آیهٔ سجدهٔ واجب وجود دارد:<br><b>${sj.map(x=>"سورهٔ "+x.n+"، آیهٔ "+fa(x.a)).join(" و ")}</b><br>با خواندن یا شنیدن این آیه، سجده بلافاصله واجب می‌شود. پیش از رسیدن به آیه دوباره یادآوری می‌کنیم. اگر نمی‌توانید بخوانید، از دیگری بخواهید آن را بخواند.</p></div><div class="row"><button class="btn g" data-act="saj-go">متوجه شدم؛ شروع تلاوت</button></div>`,1);
  ACT["saj-go"]=()=>{const s=$("#sheet");s&&s.remove();ap.sajOK=-1;reader(r,d,rng,play)};return}
 ap.sajOK=-1;reader(r,d,rng,play)}
/* ---- صفحهٔ تلاوت ---- */
function reader(r,d,rng,play){
rd={r,d,rng};const el=$("#reader"),hasD=d!=null,ok=hasD&&dset().has(d),T=window.TR&&TR[cfg.tr],R=rng||PARTS[r];
if(ap.rng&&(ap.rng[0]!==R[0]||ap.rng[1]!==R[1])){apClose(true)}ap.rng=R;
const prevTop=$(".rb",el)?$(".rb",el).scrollTop:0;
let b="";for(let i=R[0];i<=R[1];i++){const[s,j]=F[i],inf=wInfo(i);
if(j===0){b+=`<div class="sura">سورهٔ ${SURA_FA[s]}</div>`;if(s!==0&&s!==8)b+=`<div class="bsm">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</div>`}
const sj=sajAt(i);if(sj)b+=`<div class="bn w">${ic("warn")}<div><b>هشدار: آیهٔ بعد سجدهٔ واجب دارد</b><span>سورهٔ ${sj[2]}، آیهٔ ${fa(sj[3])}؛ بعد از خواندن یا شنیدن آن سجده کنید.</span></div></div>`;
b+=`<div class="v" data-i="${i}"><div class="ar">${inf.ws.map((w,k)=>`<span class="w" data-w="${k}">${w}</span>`).join(" ")}<button class="no" data-ay="${i}" aria-label="گزینه‌های آیه">${fa(j+1)}</button></div>${cfg.showTr&&T?`<div class="fa">${T[s][j].split(/\s+/).map((w,k)=>`<span class="tw" data-t="${k}">${w}</span>`).join(" ")}</div>`:""}</div>`}
el.style.setProperty("--fs",cfg.fs+"px");
el.innerHTML=`<div class="rh"><button class="ib" data-x aria-label="بستن">${ic("x")}</button><div class="tt"><b>${rng?rng[2]:"ردیف "+fa(r+1)}${hasD?" · "+jstr(START+d*DAY):""}</b><span class="muted">${rng?"":lab(r)}</span></div><button class="ib" data-fs="-1" aria-label="کوچک‌تر">${ic("text")}</button><button class="ib" data-fs="1" aria-label="بزرگ‌تر" style="font-weight:800">A+</button><button class="ib lbl ${cfg.showTr?"on":""}" data-tr aria-label="ترجمه">${ic("trans")}ترجمه</button></div>
<div class="rb"><div>${b}</div></div><div id="bot"></div>
<div class="rf">${hasD?`<button class="btn sq" data-mv="-1" aria-label="روز قبل" ${d<=0?"disabled":""}>${ic("prev")}</button><button class="btn ${ok?"ok":"g"}" data-dn>${ic("check")} ${ok?"خوانده شد":"خواندم"}</button><button class="btn sq" data-mv="1" aria-label="روز بعد" ${d>=N-1?"disabled":""}>${ic("next")}</button>`:`<button class="btn g" data-x>بستن</button>`}</div>`;
el.hidden=false;document.body.style.overflow="hidden";$(".rb",el).scrollTop=prevTop;
ap.hv=null;ap.lw=ap.lt=-2;renderBot();if(ap.on||ap.panel)apShow(ap.i,apProg(),ap.ph);
if(play)apStart();
if(cfg.showTr&&!T)loadTR(cfg.tr).then(o=>{if(o&&!el.hidden&&rd&&rd.r===r)reader(r,d,rng)});
if(!cfg.seen.word){const c=document.createElement("div");c.className="coach";c.innerHTML=`نکته: هنگام پخش، هر کلمه که خوانده می‌شود رنگ می‌گیرد (عربی، معنی فارسی یا هر دو؛ از «تنظیمات پخش» انتخاب کنید) و با هر سرعتی هماهنگ می‌ماند. <b>روی هر کلمه بزنید</b> تا تلاوت دقیقاً از همان‌جا ادامه یابد.<br><button data-act="coach-ok">متوجه شدم</button>`;el.appendChild(c)}}
ACT["coach-ok"]=t=>{cfg.seen.word=1;save();const c=$(".coach");c&&c.remove()};
function renderBot(){const b=$("#bot");if(!b)return;
if(!ap.panel){b.innerHTML=`<div class="ab"><button class="btn g" data-pa="start">${ic("play")} گوش دادن به تلاوت</button><button class="btn" data-pa="dl">${ic("down")} ذخیرهٔ صوت برای آفلاین</button></div>`;return}
const rp=cfg.rep|0;
b.innerHTML=`<div class="pw"><div class="pnb"><i id="pnbi"></i></div><div class="pn">
<button class="pb" data-pa="close" aria-label="بستن پخش">${ic("x")}</button>
<button class="pb" data-pa="prev" aria-label="آیهٔ قبل">${ic("skp")}</button>
<button class="pb main" data-pa="toggle" aria-label="پخش/توقف">${ic(ap.on?"pause":"play")}</button>
<button class="pb" data-pa="next" aria-label="آیهٔ بعد">${ic("skn")}</button>
<button class="pb ${rp?"on":""}" data-pa="rep" aria-label="تکرار">${ic("repeat")}${rp?`<sup>${rp===1?"1":"∞"}</sup>`:""}</button>
<button class="pb sp" data-pa="speed" aria-label="سرعت">${cfg.sp}x</button>
<button class="pb" data-pa="set" aria-label="تنظیمات پخش">${ic("gear")}</button>
<div class="rc" title="${REC[cfg.rec][0]}">${REC[cfg.rec][0][0]}</div></div></div>`}
/* ---- هایلایت کلمه‌به‌کلمه ---- */
function apProg(){const a=ap.a;if(!a||!(a.duration>0))return 0;const d=a.duration,lead=Math.min(.35,d*.05),tail=Math.min(.3,d*.04);return Math.max(0,Math.min(1,(a.currentTime-lead)/Math.max(.1,d-lead-tail)))}
function clearV(v){v.classList.remove("pl");$$(".w.on,.w.rd,.tw.on,.tw.rd",v).forEach(e=>e.classList.remove("on","rd"))}
function apShow(i,f,ph){if(i<0)return;const v=$(`#reader .v[data-i="${i}"]`);if(!v)return;
if(ap.hv!==v){ap.hv&&clearV(ap.hv);ap.hv=v;v.classList.add("pl");ap.ws=$$(".w",v);ap.ts=$$(".tw",v);ap.lw=ap.lt=-2;if(cfg.autoScroll)v.scrollIntoView({block:"center",behavior:"smooth"})}
const m=cfg.hl||"ar",inf=wInfo(i),A=envGet(i,"ar"),Tr=envGet(i,"tr"),live=ap.a&&ap.i===i&&ap.ph===ph&&ap.a.duration>0,t=live?ap.a.currentTime:null;
let wi=-1;const aw=m==="ar"||m==="both";
if(aw){if(ph!=="ar")wi=inf.n;else{wi=0;if(A&&t!=null)wi=wIdx(A.st,t);else for(let k=0;k<inf.n;k++)if(inf.st[k]<=f)wi=k}}
if(wi!==ap.lw){ap.lw=wi;ap.ws.forEach((e,k)=>{e.classList.toggle("on",aw&&ph==="ar"&&k===wi);e.classList.toggle("rd",aw&&k<wi)})}
const nT=ap.ts.length;let ti=-1;
if(nT){if(ph==="tr"&&(m==="fa"||m==="both")){ti=Tr&&t!=null?wIdx(Tr.st,t):Math.min(nT-1,Math.floor(f*nT))}
 else if(ph==="ar"&&((m==="fa"&&!cfg.atr)||m==="both")){const p=A&&t!=null?Math.max(0,Math.min(1,(t-A.a0)/Math.max(.2,A.end-A.a0))):f;ti=Math.min(nT-1,Math.floor(p*nT))}}
if(ti!==ap.lt){ap.lt=ti;ap.ts.forEach((e,k)=>{e.classList.toggle("on",k===ti);e.classList.toggle("rd",ti>=0&&k<ti)})}
const R=ap.rng,bi=$("#pnbi");if(R&&bi)bi.style.width=((i-R[0]+(ph==="tr"?1:f))/(R[1]-R[0]+1)*100)+"%"}
function apLoop(){cancelAnimationFrame(ap.raf);const t=()=>{if(!ap.on||!ap.a)return;if(ap.a.duration>0)apShow(ap.i,apProg(),ap.ph);ap.raf=requestAnimationFrame(t)};ap.raf=requestAnimationFrame(t)}
/* ---- موتور صوت ---- */
function apInit(){if(ap.a)return;const a=ap.a=new Audio();a.preload="auto";
a.preservesPitch=a.mozPreservesPitch=a.webkitPreservesPitch=true;
a.onloadedmetadata=()=>{a.defaultPlaybackRate=a.playbackRate=cfg.sp||1;if(ap.seekT!=null){a.currentTime=Math.min(ap.seekT,Math.max(0,a.duration-.05));ap.seekT=null}else if(ap.seek>0&&a.duration>0){const d=a.duration,lead=Math.min(.35,d*.05),tail=Math.min(.3,d*.04);a.currentTime=lead+ap.seek*Math.max(.1,d-lead-tail)}ap.seek=0};
a.onended=apEnded;
a.onerror=()=>{if(!ap.on)return;toast("فایل صوتی در دسترس نیست (اینترنت یا منبع صوتی را بررسی کنید)");apPause()};
if("mediaSession"in navigator){const m=navigator.mediaSession;m.setActionHandler("play",()=>apResume());m.setActionHandler("pause",()=>apPause());m.setActionHandler("nexttrack",()=>apPlay(ap.i+1));m.setActionHandler("previoustrack",()=>apPlay(ap.i-1))}}
async function apPlay(i,frac=0,ph="ar",keepRc){const R=ap.rng;if(!R)return;apInit();
if(i<R[0]||i>R[1]){if(cfg.rep===2&&i>R[1])return apPlay(R[0]);if(i>R[1]){apPause();toast("تلاوت به پایان رسید")}return}
if(sajAt(i)&&ph==="ar"&&ap.sajOK!==i){apPause();ap.panel=true;renderBot();apShow(i,0,"ar");
 sheet(`<div class="cb"><div class="ck" style="background:linear-gradient(135deg,#e08a00,#b45f00)">${ic("warn")}</div><h2 style="text-align:center">سجدهٔ واجب</h2><p style="text-align:center;line-height:2.1;margin-top:8px">آیهٔ بعد (سورهٔ ${sajAt(i)[2]}، آیهٔ ${fa(sajAt(i)[3])}) سجدهٔ واجب دارد. پس از شنیدن آن سجده کنید. آماده‌اید؟</p></div><div class="row"><button class="btn g" data-act="saj-ok" data-i="${i}" data-f="${frac}">آماده‌ام؛ ادامه</button></div>`,1);return}
const tok=++ap.tok;clearTimeout(ap.gapT);ap.i=i;ap.ph=ph;ap.on=true;ap.panel=true;if(!keepRc)ap.rc=0;
const u=await asrc(aurl(i,ph==="tr"));if(tok!==ap.tok)return;
if(frac&&typeof frac==="object"){ap.seekT=frac.t;frac=0}else ap.seekT=null;
ap.seek=frac;ap.a.src=u;ap.a.defaultPlaybackRate=ap.a.playbackRate=cfg.sp||1;ap.a.play().catch(()=>{});envFor(i,ph);
if(ph==="ar"&&cfg.atr&&(cfg.hl==="fa"||cfg.hl==="both"))envFor(i,"tr");
apShow(i,frac,ph);renderBot();apLoop();
if("mediaSession"in navigator&&window.MediaMetadata)navigator.mediaSession.metadata=new MediaMetadata({title:SURA_FA[F[i][0]]+" · آیهٔ "+fa(F[i][1]+1),artist:REC[cfg.rec][0],album:"ختم قرآن"});
const nx=i+1;if(nx<=R[1]){try{const pu=aurl(nx);caches.match(pu).then(m=>{if(!m){ap.pre=ap.pre||new Audio();ap.pre.preload="auto";ap.pre.src=pu}})}catch(e){}}}
ACT["saj-ok"]=t=>{const s=$("#sheet");s&&s.remove();ap.sajOK=+t.dataset.i;apPlay(+t.dataset.i,+t.dataset.f)};
function apEnded(){if(ap.ph==="ar"){ap.rc++;if(ap.rc<(cfg.repN||1))return apPlay(ap.i,0,"ar",true);ap.rc=0;if(cfg.atr)return apPlay(ap.i,0,"tr")}
const nxt=()=>cfg.rep===1?apPlay(ap.i):apPlay(ap.i+1);const g=(cfg.gap||0)*1000;if(g){clearTimeout(ap.gapT);ap.gapT=setTimeout(()=>ap.on&&nxt(),g)}else nxt()}
function apPause(){clearTimeout(ap.gapT);ap.a&&ap.a.pause();ap.on=false;cancelAnimationFrame(ap.raf);renderBot()}
function apResume(){if(ap.a&&ap.a.src&&ap.i>=0&&ap.rng&&ap.i>=ap.rng[0]&&ap.i<=ap.rng[1]){ap.on=true;ap.a.play().catch(()=>{});apLoop();renderBot()}else apStart()}
function apStart(){if(!ap.rng)return;apPlay(ap.rng[0])}
function apClose(silent){ap.tok++;clearTimeout(ap.gapT);ap.a&&ap.a.pause();ap.on=false;ap.panel=false;ap.i=-1;cancelAnimationFrame(ap.raf);ap.hv&&clearV(ap.hv);ap.hv=null;if(!silent)renderBot()}
const apStop=()=>apClose(true);
/* ---- تنظیمات پخش ---- */
function apSettings(){sheet(`<h2>تنظیمات پخش</h2>
<div class="field">قاری<select id="pa-rec">${Object.entries(REC).map(([k,v])=>`<option value="${k}" ${cfg.rec===k?"selected":""}>${v[0]}</option>`).join("")}</select></div>
<div class="field">خوانندهٔ معنی<select id="pa-trr">${Object.entries(TRR).map(([k,v])=>`<option value="${k}" ${cfg.trr===k?"selected":""}>${v[0]}</option>`).join("")}</select></div>
<div class="field">هم‌خوانی کلمه‌به‌کلمه<select id="pa-hl">${HLM.map(x=>`<option value="${x[0]}" ${cfg.hl===x[0]?"selected":""}>${x[1]}</option>`).join("")}</select></div>
<div class="sr"><span>پخش ترجمهٔ صوتی پس از هر آیه</span><input type="checkbox" class="sw2" id="pa-atr" ${cfg.atr?"checked":""}></div>
<div class="field">تکرار هر آیه<select id="pa-rn">${[1,2,3,5,10].map(x=>`<option value="${x}" ${cfg.repN===x?"selected":""}>${fa(x)} بار</option>`).join("")}</select></div>
<div class="field">مکث بین آیه‌ها<select id="pa-gap">${[0,1,2,3,5].map(x=>`<option value="${x}" ${cfg.gap===x?"selected":""}>${x?fa(x)+" ثانیه":"بدون مکث"}</option>`).join("")}</select></div>
<div class="field">سرعت<select id="pa-sp">${[.5,.75,1,1.25,1.5,2].map(x=>`<option value="${x}" ${cfg.sp===x?"selected":""}>${fa(x)}×</option>`).join("")}</select></div>
<div class="sr"><span>پیمایش خودکار همراه تلاوت</span><input type="checkbox" class="sw2" id="pa-as" ${cfg.autoScroll?"checked":""}></div>
<div class="row"><button class="btn" data-act="pa-dl">${ic("down")} ذخیرهٔ صوت این بخش برای آفلاین</button></div>`);
const g=(i,f)=>$("#"+i).onchange=e=>{f(e.target);save()};
g("pa-hl",t=>{cfg.hl=t.value;ap.hv&&clearV(ap.hv);ap.hv=null;ap.lw=ap.lt=-2;if(ap.i>=0)apShow(ap.i,apProg(),ap.ph)});
g("pa-rec",t=>{cfg.rec=t.value;const w=ap.on,i=ap.i;if(w){apPlay(i)}renderBot()});
g("pa-trr",t=>cfg.trr=t.value);g("pa-atr",t=>cfg.atr=t.checked);g("pa-rn",t=>cfg.repN=+t.value);g("pa-gap",t=>cfg.gap=+t.value);
g("pa-sp",t=>{cfg.sp=+t.value;ap.a&&(ap.a.playbackRate=cfg.sp);renderBot()});g("pa-as",t=>cfg.autoScroll=t.checked)}
ACT["pa-dl"]=()=>{typeof dlRanges==="function"&&dlRanges([ap.rng||PARTS[rd.r]])};
/* ---- گزینه‌های یک آیه ---- */
function ayText(i){const[s,j]=F[i],T=window.TR&&TR[cfg.tr];return QURAN[s][j]+" ﴿"+fa(j+1)+"﴾"+(T?"\n"+T[s][j]:"")+"\n— سورهٔ "+SURA_FA[s]+"، آیهٔ "+fa(j+1)}
function ayahSheet(i){const[s,j]=F[i];sheet(`<div class="ar" style="font-size:calc(var(--fs,30px)*.8)">${QURAN[s][j]}</div><p class="muted" style="margin-top:6px">سورهٔ ${SURA_FA[s]} · آیهٔ ${fa(j+1)}</p>
<div class="row"><button class="btn g" data-act="ay-play" data-i="${i}">${ic("play")} پخش از این آیه</button><button class="btn" data-act="ay-rep" data-i="${i}">${ic("repeat")} تکرار این آیه</button></div>
<div class="row"><button class="btn" data-act="ay-copy" data-i="${i}">${ic("copy")} کپی</button><button class="btn" data-act="ay-share" data-i="${i}">${ic("share")} اشتراک متن</button></div>
<div class="row"><button class="btn g" data-act="st-a" data-i="${i}">${ic("share")} اشتراک در استوری (تصویر زیبا)</button></div>`)}
ACT["ay-play"]=t=>{const s=$("#sheet");s&&s.remove();apPlay(+t.dataset.i)};
ACT["ay-rep"]=t=>{const s=$("#sheet");s&&s.remove();cfg.rep=1;save();apPlay(+t.dataset.i)};
ACT["ay-copy"]=t=>{navigator.clipboard&&navigator.clipboard.writeText(ayText(+t.dataset.i)).then(()=>toast("آیه کپی شد"))};
ACT["ay-share"]=t=>{const x=ayText(+t.dataset.i);if(navigator.share)navigator.share({text:x}).catch(()=>{});else navigator.clipboard&&navigator.clipboard.writeText(x).then(()=>toast("آیه کپی شد"))};
/* ---- رویدادها ---- */
function closeReader(){apClose(true);$("#reader").hidden=true;document.body.style.overflow="";rd=null;renderAll()}
function mv(k){const nd=rd.d+k;if(nd<0||nd>=N)return;apClose(true);ap.rng=null;reader(rowOf(nd),nd);$(".rb").scrollTop=0}
let sx=0,sy=0;
$("#reader").addEventListener("touchstart",e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
$("#reader").addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(rd&&rd.d!=null&&Math.abs(dx)>110&&Math.abs(dy)<45)mv(dx<0?1:-1)},{passive:true});
$("#reader").addEventListener("click",e=>{if(!rd)return;
const wd=e.target.closest(".w,.tw");
if(wd){const v=wd.closest(".v"),i=+v.dataset.i;let f=0;const isA=wd.classList.contains("w");
 if(isA){f=wInfo(i).st[+wd.dataset.w]}else{const nT=$$(".tw",v).length;f=+wd.dataset.t/nT}
 envFor(i,"ar").then(E=>{const k=+(isA?wd.dataset.w:0);let fr=f;if(E)fr={t:isA?E.st[k]:E.a0+f*(E.end-E.a0)};apPlay(i,fr,"ar")});return}
const t=e.target.closest("button");if(!t)return;
if("x"in t.dataset)closeReader();
else if(t.dataset.ay!=null)ayahSheet(+t.dataset.ay);
else if(t.dataset.fs){cfg.fs=Math.max(20,Math.min(60,cfg.fs+t.dataset.fs*4));save();reader(rd.r,rd.d,rd.rng)}
else if("tr"in t.dataset){cfg.showTr=!cfg.showTr;save();reader(rd.r,rd.d,rd.rng)}
else if(t.dataset.mv)mv(+t.dataset.mv);
else if(t.dataset.pa){const a=t.dataset.pa;
 if(a==="start")apStart();else if(a==="toggle")ap.on?apPause():apResume();
 else if(a==="close")apClose();else if(a==="next")apPlay((ap.i<0?ap.rng[0]-1:ap.i)+1);else if(a==="prev")apPlay(Math.max(ap.rng[0],ap.i-1));
 else if(a==="rep"){cfg.rep=((cfg.rep|0)+1)%3;save();renderBot();toast(["بدون تکرار","تکرار آیه","تکرار کل بخش"][cfg.rep])}
 else if(a==="speed"){const L=[.5,.75,1,1.25,1.5,2],k=(L.indexOf(cfg.sp)+1)%L.length;cfg.sp=L[k];save();ap.a&&(ap.a.playbackRate=cfg.sp);renderBot()}
 else if(a==="set")apSettings();else if(a==="dl")typeof dlRanges==="function"&&dlRanges([ap.rng||PARTS[rd.r]])}
else if("dn"in t.dataset){const w=dset().has(rd.d);toggle(rd.d);const{r,d,rng}=rd;reader(r,d,rng);if(!w)celebrate(d)}});
document.addEventListener("keydown",e=>{const r=$("#reader");if(!r||r.hidden||!rd)return;const inp=/INPUT|SELECT|TEXTAREA/.test(e.target.tagName);
if(e.key==="Escape")closeReader();else if(!inp&&rd.d!=null&&e.key==="ArrowLeft")mv(1);else if(!inp&&rd.d!=null&&e.key==="ArrowRight")mv(-1);else if(!inp&&e.key===" "){e.preventDefault();ap.on?apPause():apResume()}});
