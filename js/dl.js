/* ===== دانلود آفلاین: بسته‌ها، تقویم ۷/۳۰ روز، دانلود خودکار، پاک‌سازی ===== */
const DLC="khatm-audio";
let DLS=Object.assign({bytes:{},full:{},auto:{}},ls.get("khatm-dls",{}));
const dsave=()=>ls.set("khatm-dls",DLS);
const kbps=f=>{const m=String(f).match(/(\d+)\s*kbps/i);return m?+m[1]:64};
let _let=null;const LET=()=>{if(!_let){_let=F.map(([s,j])=>(QURAN[s][j].match(/[ء-يٱ-ۓ]/g)||[]).length)}return _let};
/* برآورد حجم: حدود ۱۳ حرف در ثانیه برای تلاوت و کندتر برای ترجمهٔ فارسی */
const estB=(folder,ids,tr)=>{const L=LET();let n=0;ids.forEach(i=>n+=L[i]);return n/13*(tr?1.7:1)*kbps(folder)*125};
const recF=()=>REC[cfg.rec][1],trF=()=>TRR[cfg.trr][1];
const allIds=()=>F.map((_,i)=>i);
const rangeIds=R=>{const o=[];for(let i=R[0];i<=R[1];i++)o.push(i);return o};
async function cachedSet(){try{const c=await caches.open(DLC),k=await c.keys();return new Set(k.map(r=>r.url))}catch(e){return new Set()}}
const txtU=k=>new URL("data/tr-"+k+".js",location.href).href;
async function textCached(k){try{if(await (await caches.open(DLC)).match(txtU(k)))return true;return !!(await caches.match("data/tr-"+k+".js"))}catch(e){return false}}
/* روزهای پیش رو */
function dayPart(k){const d=clamp(diffNow())+k;if(d>=N||d<0)return null;return{d,R:PARTS[rowOf(d)],ms:START+d*DAY}}
function dayUrls(k){const p=dayPart(k);if(!p)return[];const o=[];rangeIds(p.R).forEach(i=>{o.push({u:aurlF(recF(),i),f:recF(),day:p.ms});if(cfg.atr)o.push({u:aurlF(trF(),i),f:trF(),day:p.ms})});return o}
/* ---- موتور دانلود ---- */
const DQ={run:false,cancel:false,total:0,done:0,bytes:0,fail:0,label:"",err:0};
async function dlRun(items,label){if(DQ.run){toast("یک دانلود در حال انجام است");return}
 if(!window.caches){toast("مرورگر از ذخیره‌سازی آفلاین پشتیبانی نمی‌کند");return}
 try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}
 const seen=new Set();items=items.filter(x=>!seen.has(x.u)&&seen.add(x.u));
 const c=await caches.open(DLC),have=await cachedSet(),todo=items.filter(x=>!have.has(x.u));
 Object.assign(DQ,{run:true,cancel:false,total:todo.length,done:0,bytes:0,fail:0,label,err:0});
 if(!todo.length){DQ.run=false;toast("همهٔ موارد از قبل ذخیره شده است ✓");dlUi(1);return}
 dlUi();let idx=0;
 const worker=async()=>{while(!DQ.cancel){const it=todo[idx++];if(!it)return;
  try{const r=await fetch(it.u,{mode:"cors"});if(!r.ok)throw 0;const b=await r.blob();await c.put(it.u,new Response(b,{headers:{"Content-Type":r.headers.get("Content-Type")||"audio/mpeg"}}));DQ.bytes+=b.size;DLS.bytes[it.f]=(DLS.bytes[it.f]||0)+b.size;if(it.day)DLS.auto[it.u]=it.day}
  catch(e){DQ.fail++;if(DQ.fail>=8&&DQ.fail>DQ.done*.5){DQ.cancel=true;DQ.err=1}}
  DQ.done++;dlUi();if(DQ.done%25===0&&!$("#dlp"))toast("ذخیره شد: "+fa(DQ.done)+" از "+fa(DQ.total))}};
 await Promise.all([worker(),worker(),worker()]);
 DQ.run=false;dsave();
 if(DQ.err)toast("دانلود ناموفق بود؛ اینترنت یا دسترسی به منبع صوتی را بررسی کنید");else if(DQ.cancel)toast("دانلود متوقف شد");else toast("دانلود کامل شد ✓");
 dlUi(1)}
function dlRanges(rngs){const o=[];rngs.forEach(R=>rangeIds(R).forEach(i=>{o.push({u:aurlF(recF(),i),f:recF()});if(cfg.atr)o.push({u:aurlF(trF(),i),f:trF()})}));dlRun(o,"صوت این بخش")}
async function dlText(keys){if(!window.caches)return;let k=0;const c=await caches.open(DLC);for(const x of keys){try{if(await c.match(txtU(x))){k++;continue}const r=await fetch("data/tr-"+x+".js");if(r.ok){await c.put(txtU(x),r.clone());k++}}catch(e){}}return k}
function dlDays(n){const o=[];for(let k=0;k<n;k++)o.push(...dayUrls(k));return o}
/* ---- پاک‌سازی ---- */
async function dlClean(){if(!cfg.dl.clean||!window.caches)return;const lim=TODAY-30*DAY,keep=new Set(dlDays(cfg.dl.d30?30:7).map(x=>x.u));
 const c=await caches.open(DLC);let n=0;for(const [u,day] of Object.entries(DLS.auto)){if(day<lim&&!keep.has(u)){const f=u.split("/data/")[1].split("/").slice(0,-1).join("/");if(DLS.full[f])continue;if(await c.delete(u))n++;delete DLS.auto[u]}}
 if(n)dsave();return n}
async function dlWipe(folder){const c=await caches.open(DLC),k=await c.keys();let n=0;for(const r of k){if(r.url.includes("/data/"+folder+"/")){await c.delete(r);n++}}DLS.bytes[folder]=0;delete DLS.full[folder];for(const u of Object.keys(DLS.auto))if(u.includes("/data/"+folder+"/"))delete DLS.auto[u];dsave();return n}
/* ---- خودکار با هر بار باز شدن ---- */
async function dlAuto(){if(!cfg.dl.auto||!cfg.n||!navigator.onLine||DQ.run)return;
 const cn=navigator.connection;if(cn&&(cn.saveData||(cfg.dl.wifi&&cn.type==="cellular")))return;
 await dlText([cfg.tr]);await dlRun(dlDays(cfg.dl.d30?30:7),cfg.dl.d30?"۳۰ روز آینده (خودکار)":"۷ روز آینده (خودکار)");await dlClean()}
/* ---- پنل ---- */
async function dlStats(){const set=await cachedSet(),ids=allIds(),cnt=f=>ids.filter(i=>set.has(aurlF(f,i))).length;
 const st={set,rec:cnt(recF()),tr:cnt(trF()),txt:{}};for(const k of Object.keys(TRN))st.txt[k]=await textCached(k);
 try{st.est=navigator.storage&&navigator.storage.estimate?await navigator.storage.estimate():null}catch(e){st.est=null}return st}
function dlProg(){if(!DQ.run)return"";const p=DQ.total?Math.round(DQ.done/DQ.total*100):0;
 return`<div class="card" id="dlprog"><b>در حال دانلود: ${DQ.label}</b><div class="bar"><i style="width:${p}%"></i></div><p class="muted" style="margin-top:6px">${fa(p)}٪ · ${fa(DQ.done)} از ${fa(DQ.total)} فایل · ${fmtB(DQ.bytes)}${DQ.fail?" · "+fa(DQ.fail)+" خطا":""}</p><div class="row"><button class="btn dg sm" data-act="dl-cancel">توقف</button></div></div>`}
function dlUi(full){const p=$("#dlprog");if(!$("#dlp"))return;if(full||!p||!DQ.run)return full&&dlRender();const pc=DQ.total?Math.round(DQ.done/DQ.total*100):0;p.querySelector("i").style.width=pc+"%";p.querySelector("p").textContent=fa(pc)+"٪ · "+fa(DQ.done)+" از "+fa(DQ.total)+" فایل · "+fmtB(DQ.bytes)+(DQ.fail?" · "+fa(DQ.fail)+" خطا":"")}
function pkg(t,sub,state,btns){return`<div class="pk"><div class="h"><div><b>${t}</b><br><small>${sub}</small></div></div><div class="bar"><i style="width:${state}%"></i></div><div class="row">${btns}</div></div>`}
async function dlRender(){const el=$("#dlp .rb>div");if(!el)return;const st=await dlStats(),ids=allIds(),rf=recF(),tf=trF();
 const pct=(a,b)=>Math.round(a/b*100),cr=pct(st.rec,6236),ct=pct(st.tr,6236);
 const strip=[...Array(7)].map((_,k)=>{const p=dayPart(k);if(!p)return"";const ar=rangeIds(p.R);const a=ar.filter(i=>st.set.has(aurlF(rf,i))).length,b=ar.filter(i=>st.set.has(aurlF(tf,i))).length,n=ar.length;
  const cl=(x,on)=>!on?"":x===n?"ok":x>0?"pt":"";const jd=jal(p.ms);
  return`<div class="dd ${k===0?"t":""}"><b>${fa(jd[2])}</b><small>${MON[jd[1]-1]}</small><small>ردیف ${fa(rowOf(p.d)+1)}</small><div class="ms"><u class="${cl(a,1)}">صوت</u><u class="${cl(b,cfg.atr||b>0)}">معنی</u><u class="${st.txt[cfg.tr]?"ok":""}">متن</u></div></div>`}).join("");
 const est=st.est&&st.est.quota?`<p class="muted">فضای استفاده‌شده: ${fmtB(st.est.usage||0)} از ${fmtB(st.est.quota)}</p>`:"";
 const rEst=estB(rf,ids),tEst=estB(tf,ids,1),d7=dlDays(7),d30=dlDays(30);
 const dEst=a=>fmtB(a.reduce((s,x)=>s+(x.f===rf?estB(rf,[0]):0),0)&&0)||"";
 const sz=n=>{const a=dlDays(n);let s=0;const L=LET();for(let k=0;k<n;k++){const p=dayPart(k);if(!p)continue;const r=rangeIds(p.R);s+=estB(rf,r);if(cfg.atr)s+=estB(tf,r,1)}return s};
 el.innerHTML=`${dlProg()}<div class="card"><b>وضعیت ۷ روز آینده</b><p class="muted" style="margin-top:4px">برای هر روز مشخص است صوت، ترجمهٔ صوتی و متن ترجمه ذخیره شده یا نه (سبز = کامل، زرد = ناقص).</p><div class="chips" style="margin-top:10px">${strip}</div>
<div class="row"><button class="btn g sm" data-act="dl-d7">دانلود ۷ روز آینده (≈${fmtB(sz(7))})</button><button class="btn sm" data-act="dl-d30">دانلود ۳۰ روز آینده (≈${fmtB(sz(30))})</button></div></div>
<div class="card"><b>دانلود خودکار</b>
<div class="sr"><span>هر بار که برنامه را باز می‌کنم، خودکار دانلود شود<small>بار اول ۷ روز آینده؛ بعد از آن هر روز فقط یک روز جدید.</small></span><input type="checkbox" class="sw2" id="dl-auto" ${cfg.dl.auto?"checked":""}></div>
<div class="sr"><span>به‌جای ۷ روز، ۳۰ روز آینده را نگه دار</span><input type="checkbox" class="sw2" id="dl-30" ${cfg.dl.d30?"checked":""}></div>
<div class="sr"><span>پاک‌کردن خودکار صوت‌های ۳۰ روز گذشته<small>فقط فایل‌هایی که خودکار دانلود شده‌اند؛ دانلودهای کامل حفظ می‌شوند.</small></span><input type="checkbox" class="sw2" id="dl-clean" ${cfg.dl.clean?"checked":""}></div>
<div class="sr"><span>در اینترنت همراه دانلود خودکار انجام نشود</span><input type="checkbox" class="sw2" id="dl-wifi" ${cfg.dl.wifi?"checked":""}></div>
<p class="muted" style="margin-top:6px">قاری: ${REC[cfg.rec][0]}${cfg.atr?" · معنی: "+TRR[cfg.trr][0]:""} (در تنظیمات قابل تغییر است؛ هر کس بر اساس انتخاب و ردیف خودش دانلود می‌کند)</p></div>
<p class="mon">بسته‌های کامل</p>
${pkg("متن ترجمه‌های فارسی (۴ مترجم)","حدود ۶ مگابایت · "+Object.keys(TRN).map(k=>TRN[k]+(st.txt[k]?" ✓":"")).join("، "),pct(Object.values(st.txt).filter(Boolean).length,4),`<button class="btn g" data-act="dl-txt">دانلود همه</button>`)}
${pkg("صوت کل قرآن · "+REC[cfg.rec][0],`${fa(st.rec)} از ${fa(6236)} آیه ذخیره شده · حجم کل حدود ${fmtB(rEst)}${DLS.bytes[rf]?" · ذخیره‌شده: "+fmtB(DLS.bytes[rf]):""}`,cr,`<button class="btn g" data-act="dl-rec">${cr===100?"کامل است ✓":"دانلود کل قرآن"}</button>${st.rec?`<button class="btn dg" data-act="dl-wipe" data-f="${rf}">حذف</button>`:""}`)}
${pkg("ترجمهٔ صوتی کل قرآن · "+TRR[cfg.trr][0],`${fa(st.tr)} از ${fa(6236)} آیه ذخیره شده · حجم کل حدود ${fmtB(tEst)}`,ct,`<button class="btn g" data-act="dl-tr">${ct===100?"کامل است ✓":"دانلود کل ترجمهٔ صوتی"}</button>${st.tr?`<button class="btn dg" data-act="dl-wipe" data-f="${tf}">حذف</button>`:""}`)}
<div class="card"><b>همه چیز یک‌جا</b><p class="muted" style="margin-top:4px">متن ترجمه‌ها + صوت کل قرآن + ترجمهٔ صوتی؛ حجم تقریبی ${fmtB(rEst+tEst+6e6)}. بهتر است با وای‌فای و شارژ کافی انجام شود.</p><div class="row"><button class="btn g" data-act="dl-all">شروع دانلود همه</button></div></div>${est}
<p class="muted" style="margin-top:10px;font-size:.76rem">حجم‌ها تخمینی‌اند. در حین دانلود برنامه را باز نگه دارید؛ اگر قطع شد، دوباره بزنید و از همان‌جا ادامه می‌یابد.</p>`;
 const sw=(id,f)=>{const e=$("#"+id);if(e)e.onchange=()=>{f(e.checked);save()}};sw("dl-auto",v=>cfg.dl.auto=v);sw("dl-30",v=>cfg.dl.d30=v);sw("dl-clean",v=>cfg.dl.clean=v);sw("dl-wifi",v=>cfg.dl.wifi=v)}
function dlOpen(){let p=$("#dlp");if(!p){p=document.createElement("div");p.id="dlp";p.className="reader";p.style.zIndex=60;document.body.appendChild(p)}
 p.hidden=false;p.innerHTML=`<div class="rh"><button class="ib" data-act="dl-close" aria-label="بستن">${ic("x")}</button><div class="tt"><b>دانلود آفلاین</b><span class="muted">صوت، ترجمه و متن بدون نیاز به اینترنت</span></div></div><div class="rb"><div><div class="card muted">در حال بررسی…</div></div></div>`;dlRender()}
ACT["dl-open"]=dlOpen;
ACT["dl-close"]=()=>{const p=$("#dlp");p&&p.remove()};
ACT["dl-cancel"]=()=>{DQ.cancel=true};
ACT["dl-d7"]=async()=>{await dlText([cfg.tr]);dlRun(dlDays(7),"۷ روز آینده")};
ACT["dl-d30"]=async()=>{await dlText([cfg.tr]);dlRun(dlDays(30),"۳۰ روز آینده")};
ACT["dl-txt"]=async()=>{toast("در حال ذخیرهٔ ترجمه‌ها…");const k=await dlText(Object.keys(TRN));toast("ترجمه‌ها ذخیره شد ✓");dlRender()};
ACT["dl-rec"]=async()=>{const f=recF();await dlRun(allIds().map(i=>({u:aurlF(f,i),f})),"صوت کل قرآن");if(!DQ.cancel&&!DQ.err){DLS.full[f]=1;dsave()}};
ACT["dl-tr"]=async()=>{const f=trF();await dlRun(allIds().map(i=>({u:aurlF(f,i),f})),"ترجمهٔ صوتی کل قرآن");if(!DQ.cancel&&!DQ.err){DLS.full[f]=1;dsave()}};
ACT["dl-all"]=async()=>{if(!confirm("حجم دانلود زیاد است. ادامه دهیم؟"))return;await dlText(Object.keys(TRN));const a=recF(),b=trF();await dlRun([...allIds().map(i=>({u:aurlF(a,i),f:a})),...allIds().map(i=>({u:aurlF(b,i),f:b}))],"همه چیز");if(!DQ.cancel&&!DQ.err){DLS.full[a]=1;DLS.full[b]=1;dsave()}};
ACT["dl-wipe"]=async t=>{if(!confirm("فایل‌های ذخیره‌شده حذف شود؟"))return;await dlWipe(t.dataset.f);toast("حذف شد");dlRender()};
