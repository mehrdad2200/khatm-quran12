/* ===== نسخهٔ ۸: چندکاربره، پشتیبان همهٔ کاربران، استوری آیه/حدیث/دعا، قلم‌ها، گروه کمتر از ۳۵۴ نفر ===== */

/* ================== گروه کمتر از ۳۵۴ نفر ==================
   این بخش فقط وقتی کاربر خودش دکمه را بزند و دو بار تأیید کند فعال می‌شود؛ تا آن وقت هیچ چیز در برنامه تغییر نمی‌کند. */
const gf=x=>fa(x>=100?String(Math.round(x)):String(Math.round(x*10)/10)).replace(".","٫");
/* آمار سهم هر نفر وقتی قرآن در D روز ختم می‌شود */
function gsStats(D){let mn=1e9,mx=0;for(let g=0;g<D;g++){const[a,b]=gPart(g,D),v=b-a+1;if(v<mn)mn=v;if(v>mx)mx=v}
 return{D,avg:6236/D,min:mn,max:mx,pages:604/D,juz:30/D}}
function gsStatHtml(D,M){if(!(D>=2))return"";const z=gsStats(D),mo=D>=45?` (حدود ${gf(D/30)} ماه)`:"";
 return`<div class="gst"><div><b>${gf(z.avg)}</b><span>آیه در روز (تقریبی)</span></div><div><b>${gf(z.pages)}</b><span>صفحه در روز</span></div><div><b>${gf(z.juz)}</b><span>جزء در روز</span></div></div>
 <p class="muted" style="margin-top:12px">هر نفر در <b>${fa(D)} روز</b>${mo} یک ختم کامل می‌کند${M?` و گروه ${fa(M)} نفرهٔ شما در این مدت ${fa(M)} ختم کامل خواهد داشت`:""}. سهم هر نفر در یک روز بین <b>${fa(z.min)}</b> تا <b>${fa(z.max)}</b> آیه است (تقسیم روی مرز ${D<=354?"ردیف‌ها":"آیه‌ها"} انجام می‌شود).</p>`}
const GW={s:0,M:0,D:0,n:0,rev:0};
function gsClose(){const o=$("#gsw");o&&o.remove()}
/* بخش امروز (یا روز اول) شما در تقسیم‌بندی جدید؛ دقیقاً همان‌طور که بعد از تأیید در برنامه دیده می‌شود */
const labR=(i,j)=>{const x=F[i],y=F[j];return fa(x[1]+1)+" "+SURA_FA[x[0]]+" الی "+fa(y[1]+1)+" "+SURA_FA[y[0]]};
function gsPrev(M,D,p){let d=0,today=false;try{const s0=j2g(cfg.y,cfg.m,cfg.d),k=Math.round((TODAY-s0)/DAY);if(!isNaN(k)&&k>=0){d=k%D;today=true}}catch(e){}
 const row=gRow(p,M,D),R=gPart((row-1+d)%D,D);return{today,row,R,v:R[1]-R[0]+1}}
const GCH=M=>{const a=[30,60,100,180,365];if(M>=2&&M<=1000&&!a.includes(M))a.push(M);return a.sort((x,y)=>x-y)};
function gsDraw(){let o=$("#gsw");if(!o){o=document.createElement("div");o.id="gsw";o.className="ob gsw";document.body.appendChild(o)}
 const s=GW.s,M=GW.M,D=GW.D,back=(t,to)=>`<button class="back" data-act="gs-back" data-s="${to}">‹ ${t}</button>`;let h="";
 if(s===0)h=`<button class="back" data-act="gs-cancel">‹ انصراف</button><h2>گروه شما چند نفر است؟</h2>
  <p class="muted">برنامه به‌طور معمول برای گروه ۳۵۴ نفره است. اگر گروه شما تعداد دیگری است، قرآن را می‌شود به اندازهٔ گروه شما و در هر مدتی که می‌خواهید تقسیم کرد.</p>
  <div class="field">تعداد اعضای گروه (۱ تا ۲۰۰۰ نفر)<input id="gw1" type="text" inputmode="numeric" data-n value="${M||""}" placeholder="مثلاً ۱۰۰"></div>
  <div class="row"><button class="btn g big" data-act="gs-next">ادامه</button></div>`;
 else if(s===1)h=`${back("تغییر تعداد",0)}<h2>ختم را در چند روز تمام کنید؟</h2>
  <p class="muted">با ${fa(M)} نفر، هر نفر قرآن را در چند روز یک بار ختم کند؟ هرچه روزها بیشتر باشد سهم روزانه سبک‌تر می‌شود.</p>
  <div class="chips wrap" style="justify-content:center">${GCH(M).map(x=>`<button class="chip ${x===D?"on":""}" data-act="gs-d" data-d="${x}">${x===365?"یک سال (۳۶۵ روز)":x===M&&![30,60,100,180].includes(x)?fa(x)+" روز (هم‌اندازهٔ گروه)":fa(x)+" روز"}</button>`).join("")}</div>
  <div class="field">یا تعداد روز دلخواه (۲ تا ۱۰۰۰)<input id="gw3" type="text" inputmode="numeric" data-n value="${D||""}" placeholder="مثلاً ۱۲۰"></div>
  <div id="gwst">${gsStatHtml(D,M)}</div>
  <div class="row"><button class="btn g big" data-act="gs-next">ادامه؛ شمارهٔ من چند است؟</button></div>`;
 else if(s===2)h=`${back("بازگشت",1)}<h2>شمارهٔ ردیف شما چند است؟</h2>
  <p class="muted">در گروه ${fa(M)} نفره‌ای که قرآن را در ${fa(D)} روز ختم می‌کند، شمارهٔ شما از ۱ تا ${fa(M)} چند است؟ مسئول گروه شمارهٔ شما را مشخص می‌کند.</p>
  <div class="field">شمارهٔ شما (۱ تا ${fa(M)})<input id="gw2" type="text" inputmode="numeric" data-n value="${GW.n||""}"></div>
  <div class="row"><button class="btn g big" data-act="gs-next">ادامه</button></div>`;
 else if(s===3){const z=gsPrev(M,D,GW.n);h=`${back("بازگشت",2)}<h2>تأیید اول</h2>
  <div class="card" style="text-align:center"><b>گروه ${fa(M)} نفره · ختم ${fa(D)} روزه</b><p class="muted" style="margin-top:4px">شمارهٔ شما ${fa(GW.n)} ← ردیف ${fa(z.row)} از ${fa(D)}</p>
  <p class="muted" style="margin-top:8px">بخش ${z.today?"امروز":"روز اول"} شما:<br><b style="color:var(--tx)">${labR(z.R[0],z.R[1])}</b><br>(حدود ${fa(z.v)} آیه)</p></div>
  <p class="muted" style="margin-top:10px">تاریخ شروع ختم همان است که الان ثبت شده (${jstr(j2g(cfg.y,cfg.m,cfg.d))}) و از تنظیمات قابل تغییر است. پیشرفت قبلی شما پاک نمی‌شود؛ اگر به حالت ۳۵۴ نفره برگردید همان‌جاست و برای حالت جدید از صفر شمرده می‌شود.</p>
  <div class="row"><button class="btn g big" data-act="gs-next">تأیید اول</button></div>`}
 else if(s===4)h=`${back("بازگشت",3)}<div class="cb"><div class="ck" style="background:linear-gradient(135deg,#e08a00,#b45f00)">${ic("warn")}</div></div><h2>تأیید نهایی</h2>
  <p class="muted">برنامهٔ ختم شما به <b>گروه ${fa(M)} نفره با ختم ${fa(D)} روزه</b> تغییر می‌کند و شمارهٔ شما <b>${fa(GW.n)}</b> ثبت می‌شود. مطمئن هستید؟</p>
  <div class="row"><button class="btn g big" data-act="gs-apply">بله، تغییر انجام شود</button></div><div class="row"><button class="btn" data-act="gs-cancel" style="width:100%">انصراف و ماندن در حالت فعلی</button></div>`;
 else if(s===10)h=`<button class="back" data-act="gs-cancel">‹ انصراف</button><h2>بازگشت به حالت ۳۵۴ نفره</h2>
  <p class="muted">ختم ${fa(GD())} روزه به حالت اولیهٔ ۳۵۴ نفره برمی‌گردد و شمارهٔ ردیف شما <b>${fa(cfg.n0||1)}</b> می‌شود (شمارهٔ قبلی شما). پیشرفت هر دو حالت جدا نگه داشته می‌شود.</p>
  <div class="row"><button class="btn g big" data-act="gs-next">تأیید اول</button></div>`;
 else if(s===11)h=`${back("بازگشت",10)}<div class="cb"><div class="ck" style="background:linear-gradient(135deg,#e08a00,#b45f00)">${ic("warn")}</div></div><h2>تأیید نهایی</h2>
  <p class="muted">برنامه به حالت ۳۵۴ نفره برمی‌گردد. مطمئن هستید؟</p>
  <div class="row"><button class="btn g big" data-act="gs-apply">بله، برگردان</button></div><div class="row"><button class="btn" data-act="gs-cancel" style="width:100%">انصراف</button></div>`;
 o.innerHTML=`<div class="st">${h}</div>`;const i=$("#gw1")||$("#gw2");i&&setTimeout(()=>i.focus(),50)}
ACT["gs-open"]=()=>{GW.s=0;GW.M=cfg.gs||GD()||0;GW.D=GD()||0;GW.n=cfg.gp||0;GW.rev=0;gsDraw()};
ACT["gs-revert"]=()=>{GW.s=10;GW.rev=1;gsDraw()};
ACT["gs-cancel"]=()=>gsClose();
ACT["gs-back"]=t=>{GW.s=+t.dataset.s;gsDraw()};
ACT["gs-d"]=t=>{const D=+t.dataset.d;GW.D=D;const i=$("#gw3");if(i)i.value=D;$("#gwst").innerHTML=gsStatHtml(D,GW.M);document.querySelectorAll("#gsw .chip[data-d]").forEach(c=>c.classList.toggle("on",+c.dataset.d===D))};
document.addEventListener("input",e=>{if(e.target.id==="gw3"){const D=+e.target.value||0;GW.D=D;const st=$("#gwst");if(st)st.innerHTML=gsStatHtml(D,GW.M);document.querySelectorAll("#gsw .chip[data-d]").forEach(c=>c.classList.toggle("on",+c.dataset.d===D))}});
ACT["gs-next"]=()=>{const s=GW.s;
 if(s===0){const v=+($("#gw1").value||0);if(!(Number.isInteger(v)&&v>=1&&v<=2000))return toast("تعداد باید بین ۱ تا ۲۰۰۰ نفر باشد");if(v!==GW.M)GW.n=0;GW.M=v;if(!GW.D)GW.D=v>=2&&v<=1000?v:365;GW.s=1}
 else if(s===1){const v=+($("#gw3").value||0);if(!(Number.isInteger(v)&&v>=2&&v<=1000))return toast("تعداد روز باید بین ۲ تا ۱۰۰۰ باشد");if(v===354&&GW.M===354)return toast("گروه ۳۵۴ نفره با ختم ۳۵۴ روزه همان حالت پیش‌فرض برنامه است");GW.D=v;GW.s=2}
 else if(s===2){const v=+($("#gw2").value||0);if(!(Number.isInteger(v)&&v>=1&&v<=GW.M))return toast("شماره باید بین ۱ تا "+fa(GW.M)+" باشد");GW.n=v;GW.s=3}
 else if(s===3)GW.s=4;
 else if(s===10)GW.s=11;
 gsDraw()};
ACT["gs-apply"]=()=>{
 if(GW.rev){cfg.n=Math.min(354,Math.max(1,cfg.n0||1));cfg.gs=0;cfg.gd=0;delete cfg.gp;delete cfg.n0;toast("به حالت ۳۵۴ نفره برگشت")}
 else{if(!GA())cfg.n0=cfg.n||0;cfg.gs=GW.M;cfg.gd=GW.D;cfg.gp=GW.n;cfg.n=gRow(GW.n,GW.M,GW.D);toast("ختم "+fa(GW.D)+" روزهٔ گروه "+fa(GW.M)+" نفره ثبت شد")}
 save();gApply();setup();gsClose();
 if($("#ob")&&!GW.rev){onboard(5);return}
 if($("#ob")){onboard(4);return}
 if(cur==="set")sets();else renderAll()};
function gsSettingsHtml(){const D=GD();
 if(!D)return`<button class="chip" style="margin-top:10px;white-space:normal;text-align:right" data-act="gs-open">گروه ما کمتر از ۳۵۴ نفر است (یا مدت ختم را می‌خواهیم خودمان تعیین کنیم)؛ آیا مایل به تغییر هستید؟</button>`;
 const z=gsStats(D),M=cfg.gs||D;
 return`<div class="bn" style="margin-top:10px">${ic("info")}<div><b>گروه ${fa(M)} نفره · ختم ${fa(D)} روزه</b><span>${cfg.gp?"شمارهٔ شما "+fa(cfg.gp)+" (ردیف "+fa(cfg.n)+" از "+fa(D)+") · ":""}تقریباً روزی ${gf(z.avg)} آیه (حدود ${gf(z.pages)} صفحه)</span></div></div>
 <div class="row"><button class="btn sm" data-act="gs-open">تغییر تعداد نفرات و مدت</button><button class="btn sm dg" data-act="gs-revert">بازگشت به ۳۵۴ نفره</button></div>`}

/* ================== تنظیمات کرکره‌ای ================== */
const ACCS=new Set(["مشخصات و شروع ختم"]);
function accSets(){const el=$("#v-set");if(!el)return;
 el.querySelectorAll(":scope>.card").forEach(c=>{const b=c.firstElementChild;if(!b||b.tagName!=="B"||c.classList.contains("accd"))return;
  const title=b.textContent.trim(),body=document.createElement("div"),h=document.createElement("button");body.className="accb";
  while(b.nextSibling)body.appendChild(b.nextSibling);
  h.type="button";h.className="acch";h.innerHTML=b.innerHTML+'<i class="chev"></i>';b.replaceWith(h);c.appendChild(body);c.classList.add("accd");
  const op=ACCS.has(title);c.classList.toggle("open",op);h.setAttribute("aria-expanded",op);
  h.onclick=()=>{const o=c.classList.toggle("open");o?ACCS.add(title):ACCS.delete(title);h.setAttribute("aria-expanded",o)}})}

/* ================== چندکاربره ==================
   داده‌های کاربر فعال مثل همیشه در کلیدهای khatm-cfg / khatm-done / khatm-tasbih است (بقیهٔ برنامه هیچ تغییری نکرده)؛
   کاربران دیگر در khatm-u-<id> نگه‌داری می‌شوند و با «ورود» جابه‌جا می‌شوند. کتابخانهٔ احادیث و دانلودها بین همه مشترک است. */
const UK="khatm-users";
function uReg(){let r=ls.get(UK,null);if(!r||!Array.isArray(r.list)||!r.list.length){r={act:"u1",list:[{id:"u1"}]};ls.set(UK,r)}if(!r.list.some(x=>x.id===r.act))r.act=r.list[0].id;return r}
const uCount=()=>{const r=ls.get(UK,null);return r&&Array.isArray(r.list)?r.list.length:1};
function uSnap(){const cp=x=>x==null?x:JSON.parse(JSON.stringify(x));return{cfg:cp(cfg),done:cp(done),tasbih:typeof TS!=="undefined"?cp(TS):null}}
function uFlush(){save();ls.set("khatm-done",done);typeof tsave==="function"&&tsave();const r=uReg();const me=r.list.find(x=>x.id===r.act);if(me)me.name=cfg.name;ls.set("khatm-u-"+r.act,uSnap());ls.set(UK,r);return r}
function uInfo(u,r){const c=u.id===r.act?cfg:(ls.get("khatm-u-"+u.id,{}).cfg||{});return{id:u.id,act:u.id===r.act,name:c.name||u.name||"کاربر",n:c.n,gd:c.gd||(c.gs&&c.gs<354?c.gs:0),gs:c.gs,grp:c.grp}}
function uSwitch(id){const r=uFlush();if(id===r.act)return;const p=ls.get("khatm-u-"+id,null);if(!p||!p.cfg)return toast("اطلاعات این کاربر پیدا نشد");
 ls.set("khatm-cfg",p.cfg);ls.set("khatm-done",p.done||{});
 try{if(p.tasbih)ls.set("khatm-tasbih",p.tasbih);else localStorage.removeItem("khatm-tasbih")}catch(e){}
 r.act=id;ls.set(UK,r);try{sessionStorage.setItem("khatm-sw",p.cfg.name||"")}catch(e){}
 location.reload()}
const uLine=i=>i.gd?"ختم "+fa(i.gd)+" روزه · ردیف "+fa(i.n||"؟"):"ردیف "+fa(i.n||"؟");
function uRow(i,full){const ch=[...String(i.name)][0]||"؟";
 return`<div class="uit ${i.act?"on":""}"><div class="uav">${esc(ch)}</div><div class="uin"><b>${esc(i.name)}</b><small>${uLine(i)}</small></div><div class="uac">${i.act?'<span class="ubd">فعال</span>':`<button class="chip on" data-act="u-sw" data-id="${i.id}">ورود</button>`}${full?`<button class="dlb" data-act="u-bk" data-id="${i.id}" aria-label="پشتیبان این کاربر">${ic("down")}</button>${i.act?"":`<button class="dlb" data-act="u-del" data-id="${i.id}" aria-label="حذف کاربر">${ic("trash")}</button>`}`:""}</div></div>`}
function usersCard(){const r=uReg(),L=r.list.map(u=>uInfo(u,r));
 return`<div class="card" id="ucard"><b>${ic("users")} کاربران این دستگاه</b><p class="muted" style="margin-top:6px">اگر چند نفر از یک گوشی استفاده می‌کنند، هرکس با شمارهٔ ردیف خودش وارد می‌شود؛ پیشرفت، ردیف و تنظیمات هر نفر جداست و می‌توانید بین کاربران جابه‌جا شوید.</p>
 ${L.map(i=>uRow(i,true)).join("")}
 <div class="row"><button class="btn g" data-act="u-add">${ic("plus")} افزودن کاربر</button><button class="btn" data-act="bk-all">${ic("down")} پشتیبان همهٔ کاربران</button></div></div>`}
function userChip(){if(uCount()<2)return"";return`<button class="chip uch" data-act="u-list">${ic("users")} تغییر کاربر</button>`}
ACT["u-list"]=()=>{const r=uFlush(),L=r.list.map(u=>uInfo(u,r));sheet(`<h2>تغییر کاربر</h2><p class="muted">با زدن «ورود»، برنامه با ردیف و پیشرفت همان نفر باز می‌شود.</p>${L.map(i=>uRow(i,false)).join("")}<div class="row"><button class="btn g" data-act="u-add">${ic("plus")} افزودن کاربر</button></div>`)};
ACT["u-sw"]=t=>uSwitch(t.dataset.id);
ACT["u-add"]=()=>{sheet(`<h2>افزودن کاربر</h2><p class="muted">کاربر جدید با همان گروه${cfg.grp?" («"+esc(cfg.grp)+"»)":""} و تاریخ شروع ختم ساخته می‌شود${GA()?" (ختم "+fa(GD())+" روزه)":""}.</p>
 <div class="field">نام<input id="ua-n" maxlength="40" autocomplete="off"></div>
 <div class="field">شمارهٔ ردیف او (۱ تا ${fa(N)})<input id="ua-r" type="text" inputmode="numeric" data-n></div>
 <div class="field">سن (اختیاری؛ برای اندازهٔ مناسب خط)<input id="ua-a" type="text" inputmode="numeric" data-n></div>
 <div class="row"><button class="btn g" data-act="u-addgo" data-sw="1">افزودن و ورود به او</button><button class="btn" data-act="u-addgo">فقط افزودن</button></div>`);setTimeout(()=>{const i=$("#ua-n");i&&i.focus()},60)};
ACT["u-addgo"]=t=>{const name=($("#ua-n").value||"").trim(),n=+($("#ua-r").value||0),a=+($("#ua-a").value||0);
 if(!name)return toast("نام را بنویسید");
 if(!(Number.isInteger(n)&&n>=1&&n<=N))return toast("شمارهٔ ردیف باید بین ۱ تا "+fa(N)+" باشد");
 if(a&&!(a>=3&&a<=120))return toast("سن را درست وارد کنید");
 const r=uFlush(),id="u"+Date.now().toString(36);
 const c={v:3,ob:1,n,y:cfg.y,m:cfg.m,d:cfg.d,grp:cfg.grp,name,age:a||0,style:cfg.style,mode:cfg.mode,rec:cfg.rec,trr:cfg.trr,tr:cfg.tr,ho:cfg.ho,afat:cfg.afat,tbm:cfg.tbm,fp:cfg.fp,fq:cfg.fq,inst:cfg.inst,remAsk:1};
 if(GA()){c.gs=cfg.gs||0;c.gd=cfg.gd||0}if(a){const f=a>=65?[44,1.25]:a>=50?[38,1.15]:[a<14?28:30,1];c.fs=f[0];c.ui=f[1]}
 ls.set("khatm-u-"+id,{cfg:c,done:{},tasbih:null});r.list.push({id,name});ls.set(UK,r);
 if(t.dataset.sw)return uSwitch(id);
 const s=$("#sheet");s&&s.remove();toast("کاربر «"+name+"» اضافه شد");if(cur==="set")sets();else renderAll()};
ACT["u-del"]=t=>{const r=uReg(),u=r.list.find(x=>x.id===t.dataset.id);if(!u||u.id===r.act)return;const i=uInfo(u,r);
 if(!confirm("کاربر «"+i.name+"» و همهٔ پیشرفت و تنظیمات او پاک شود؟ (اگر لازم است اول از همین کاربر پشتیبان بگیرید)"))return;
 if(!confirm("آخرین تأیید: حذف «"+i.name+"» برگشت‌پذیر نیست. ادامه می‌دهید؟"))return;
 try{localStorage.removeItem("khatm-u-"+u.id)}catch(e){}
 r.list=r.list.filter(x=>x.id!==u.id);ls.set(UK,r);toast("کاربر حذف شد");sets()};

/* ---- پشتیبان‌گیری از یک کاربر یا همهٔ کاربران ---- */
function bkSaveFile(obj,name){const blob=new Blob([JSON.stringify(obj,null,1)],{type:"application/json"});
 return(async()=>{try{const f=new File([blob],name,{type:"application/json"});if(navigator.canShare&&navigator.canShare({files:[f]})&&/Android|iPhone|iPad/i.test(navigator.userAgent)){await navigator.share({files:[f],title:"پشتیبان ختم قرآن"});toast("پشتیبان ساخته شد ✓");return}}catch(e){if(e&&e.name==="AbortError")return}
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);toast("فایل پشتیبان ساخته شد ✓")})()}
const bkDate=()=>{const j=jal(TODAY);return j[0]+"-"+String(j[1]).padStart(2,"0")+"-"+String(j[2]).padStart(2,"0")};
const bkSafe=s=>String(s).replace(/[\\/:*?"<>|]/g,"-");
function bkUserData(id){const r=uFlush();if(id===r.act)return bkData();const p=ls.get("khatm-u-"+id,null);if(!p||!p.cfg)return null;
 return{app:"khatm-quran",v:3,created:new Date().toISOString(),name:p.cfg.name,group:p.cfg.grp,cfg:p.cfg,done:p.done||{},hl:{items:HL.items},dls:{full:DLS.full},tasbih:p.tasbih||null}}
ACT["u-bk"]=t=>{const d=bkUserData(t.dataset.id);if(!d)return toast("اطلاعات این کاربر پیدا نشد");bkSaveFile(d,bkSafe("ختم قرآن_"+bkDate()+"_"+(d.name||"کاربر"))+".json")};
function bkAllData(){const r=uFlush();
 return{app:"khatm-quran",kind:"all",v:4,created:new Date().toISOString(),act:r.act,
  users:r.list.map(u=>{const p=u.id===r.act?uSnap():ls.get("khatm-u-"+u.id,{});return{id:u.id,name:(p.cfg&&p.cfg.name)||u.name||"",cfg:p.cfg||{},done:p.done||{},tasbih:p.tasbih||null}}),
  hl:{items:HL.items},dls:{full:DLS.full}}}
ACT["bk-all"]=()=>bkSaveFile(bkAllData(),bkSafe("ختم قرآن_همه کاربران_"+bkDate())+".json");
function bkApplyAll(o){if(!o||!Array.isArray(o.users)||!o.users.length||!o.users.every(u=>u&&u.cfg&&typeof u.cfg==="object"))throw 0;
 if(!confirm("این فایل شامل "+fa(o.users.length)+" کاربر است. کاربران فعلی این دستگاه با آنها جایگزین می‌شوند. ادامه می‌دهید؟"))return false;
 try{Object.keys(localStorage).filter(k=>/^khatm-u-/.test(k)).forEach(k=>localStorage.removeItem(k))}catch(e){}
 const seen=new Set(),list=[];
 o.users.forEach((u,i)=>{let id=String(u.id||"u"+(i+1)).replace(/[^\w-]/g,"")||"u"+(i+1);while(seen.has(id))id+="x";seen.add(id);u.cfg.v=3;u.cfg.ob=u.cfg.ob||1;list.push({id,name:u.name||u.cfg.name||""});ls.set("khatm-u-"+id,{cfg:u.cfg,done:u.done||{},tasbih:u.tasbih||null})});
 const act=list.some(x=>x.id===String(o.act))?String(o.act):list[0].id,p=ls.get("khatm-u-"+act);
 ls.set("khatm-cfg",p.cfg);ls.set("khatm-done",p.done||{});try{if(p.tasbih)ls.set("khatm-tasbih",p.tasbih);else localStorage.removeItem("khatm-tasbih")}catch(e){}
 if(o.hl&&Array.isArray(o.hl.items))ls.set("khatm-hl",Object.assign(ls.get("khatm-hl",{}),{items:o.hl.items}));
 ls.set(UK,{act,list});try{sessionStorage.setItem("khatm-sw",p.cfg.name||"")}catch(e){}
 location.reload();return true}

/* ================== قلم‌ها ==================
   سه قلم عربی و قلم وزیرمتن همراه برنامه است؛ بقیه از Google Fonts هنگام انتخاب دانلود و روی دستگاه ذخیره می‌شود (بعد از آن آفلاین کار می‌کند). */
const FPS={vazir:["وزیرمتن (پیش‌فرض)","Vazirmatn",""],nsans:["نوتو سنس عربی","Noto Sans Arabic","Noto+Sans+Arabic:wght@400;600;700;800"],nnaskh:["نوتو نسخ","Noto Naskh Arabic","Noto+Naskh+Arabic:wght@400;600;700"],plex:["آی‌بی‌ام پلکس عربی","IBM Plex Sans Arabic","IBM+Plex+Sans+Arabic:wght@400;600;700"],mirza:["میرزا","Mirza","Mirza:wght@400;600;700"],kufi:["نوتو کوفی","Noto Kufi Arabic","Noto+Kufi+Arabic:wght@400;600;700;800"]};
const FQS={uthman:["عثمان طاها (پیش‌فرض)","Uthman Taha",""],amiriq:["امیری قرآن","Amiri Quran",""],schz:["شهرزاد","Scheherazade Khatm",""],nnaskh:["نوتو نسخ","Noto Naskh Arabic","Noto+Naskh+Arabic:wght@400;700"],amiri:["امیری","Amiri","Amiri:wght@400;700"],lateef:["لطیف","Lateef","Lateef:wght@400;700"],schzn:["شهرزاد نو","Scheherazade New","Scheherazade+New:wght@400;700"],nsans:["نوتو سنس عربی","Noto Sans Arabic","Noto+Sans+Arabic:wght@400;700"]};
const FLD={};
function fontLink(spec){if(!spec||FLD[spec])return;FLD[spec]=1;const l=document.createElement("link");l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family="+spec+"&display=swap";document.head.appendChild(l)}
function applyFonts(){const root=document.documentElement,p=FPS[cfg.fp],q=FQS[cfg.fq];
 if(p&&cfg.fp!=="vazir"){fontLink(p[2]);root.style.setProperty("--font",`"${p[1]}",Vazirmatn,Tahoma,system-ui,sans-serif`)}else root.style.removeProperty("--font");
 if(q&&cfg.fq!=="uthman"){fontLink(q[2]);root.style.setProperty("--ar",`"${q[1]}","Uthman Taha","Scheherazade Khatm","Amiri Quran","Traditional Arabic",serif`)}else root.style.removeProperty("--ar")}
const fpName=()=>(FPS[cfg.fp]||FPS.vazir)[0],fqName=()=>(FQS[cfg.fq]||FQS.uthman)[0];
function fontsCard(){return`<div class="field">قلم‌ها</div>
 <div class="sr"><span>قلم فارسی (متن برنامه و ترجمه‌ها)<br><small id="fpn">${fpName()}</small></span><button class="chip" data-act="f-open" data-k="p">تغییر</button></div>
 <div class="sr"><span>قلم عربی قرآن<br><small id="fqn">${fqName()}</small></span><button class="chip" data-act="f-open" data-k="q">تغییر</button></div>`}
function fontSheet(k){const L=k==="p"?FPS:FQS,cur=k==="p"?(cfg.fp||"vazir"):(cfg.fq||"uthman");
 Object.values(L).forEach(x=>fontLink(x[2]));
 const sample=k==="p"?"به نام خداوند بخشنده مهربان ۱۲۳۴۵":"بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ";
 sheet(`<h2>${k==="p"?"قلم فارسی":"قلم عربی قرآن"}</h2><p class="muted">قلم‌های تازه یک‌بار از اینترنت گرفته می‌شود و بعد روی گوشی می‌ماند (آفلاین هم کار می‌کند).</p>
 ${Object.entries(L).map(([id,x])=>`<button class="fopt ${id===cur?"on":""}" data-act="f-pick" data-k="${k}" data-id="${id}"><small>${x[0]}${id===cur?" ✓":""}</small><div style="font-family:'${x[1]}',${k==="p"?"Vazirmatn":"'Amiri Quran'"},serif;font-size:${k==="p"?"1.1rem":"1.55rem"};line-height:2.1">${sample}</div></button>`).join("")}`)}
ACT["f-open"]=t=>fontSheet(t.dataset.k);
ACT["f-pick"]=t=>{const k=t.dataset.k,id=t.dataset.id;if(k==="p")cfg.fp=id==="vazir"?undefined:id;else cfg.fq=id==="uthman"?undefined:id;if(cfg.fp===undefined)delete cfg.fp;if(cfg.fq===undefined)delete cfg.fq;save();applyFonts();fontSheet(k);
 const a=$("#fpn"),b=$("#fqn");a&&(a.textContent=fpName());b&&(b.textContent=fqName());toast("قلم تغییر کرد")};
const cvFonts=()=>({per:`${(FPS[cfg.fp]||FPS.vazir)[1]==="Vazirmatn"?"Vazirmatn":'"'+FPS[cfg.fp][1]+'",Vazirmatn'},Tahoma,sans-serif`,ar:`${cfg.fq&&FQS[cfg.fq]&&cfg.fq!=="uthman"?'"'+FQS[cfg.fq][1]+'",':""}'Uthman Taha','Scheherazade Khatm',serif`});
async function cvReady(f){try{await Promise.all([document.fonts.load("700 50px "+f.per,"آ"),document.fonts.load("500 50px "+f.per,"آ"),document.fonts.load("50px "+f.ar,"بِسْمِ")])}catch(e){}}

/* ================== استوری آیه، حدیث و دعا ================== */
const SX={t:-1,ar:true,fa:true,name:false,o:null,k:0};
const STY2T={haram:0,firouzeh:1,ashura:2,fatemiyya:3,qadr:4,noor:5};
const lum=h=>{const n=parseInt(h.slice(1),16);return(.299*(n>>16)+.587*((n>>8)&255)+.114*(n&255))/255};
const IMG={};
function loadImg(src){return IMG[src]||(IMG[src]=new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src}))}
function wrapLines(c,text,maxW){const words=String(text).split(/\s+/).filter(Boolean),L=[];let cur="";
 for(const w of words){const t=cur?cur+" "+w:w;if(cur&&c.measureText(t).width>maxW){L.push(cur);cur=w}else cur=t}if(cur)L.push(cur);return L}
function fitText(c,text,fontFn,maxW,maxH,maxSz,minSz,lh){
 for(let sz=maxSz;sz>=minSz;sz-=2){c.font=fontFn(sz);const L=wrapLines(c,text,maxW),h=L.length*sz*lh;if(h<=maxH)return{sz,L,h,lh,trunc:false}}
 const sz=minSz;c.font=fontFn(sz);let L=wrapLines(c,text,maxW);const mx=Math.max(1,Math.floor(maxH/(sz*lh)));
 if(L.length>mx){L=L.slice(0,mx);L[mx-1]=L[mx-1].replace(/\s*\S*$/,"")+" …"}return{sz,L,h:L.length*sz*lh,lh,trunc:true}}
function fitLine(c,text,fontFn,maxW,maxSz,minSz){let sz=maxSz;for(;sz>minSz;sz-=2){c.font=fontFn(sz);if(c.measureText(text).width<=maxW)break}c.font=fontFn(sz);return sz}
const KIND={ayah:"آیهٔ قرآن",hadith:"حدیث شریف",dua:"دعا"};
async function drawCard(cv,tok){const o=SX.o;if(!o)return;
 const T=STH[SX.t],[,c1,c2,ac,tx]=T,FN=cvFonts(),W=1080,H=1920,light=lum(c1)>.6;
 const cal=o.by?loadImg("img/masoum/"+o.by+".png"):null;
 const [ ,img]=await Promise.all([cvReady(FN),cal]);if(tok!==SX.k)return;
 cv.width=W;cv.height=H;const c=cv.getContext("2d");
 const g=c.createLinearGradient(0,0,W*.3,H);g.addColorStop(0,c1);g.addColorStop(1,c2);c.fillStyle=g;c.fillRect(0,0,W,H);
 c.globalAlpha=.08;c.strokeStyle=ac;c.lineWidth=2;for(let y=0;y<H+120;y+=120)for(let x=0;x<W+120;x+=120){star8(c,x+((y/120)%2?60:0),y,52);c.stroke()}c.globalAlpha=1;
 const v=c.createRadialGradient(W/2,H*.45,200,W/2,H*.45,H*.8);v.addColorStop(0,"rgba(0,0,0,0)");v.addColorStop(1,light?"rgba(90,60,10,.18)":"rgba(0,0,0,.5)");c.fillStyle=v;c.fillRect(0,0,W,H);
 c.strokeStyle=ac;c.globalAlpha=.7;c.lineWidth=3;rr(c,36,36,W-72,H-72,44);c.stroke();c.lineWidth=1;rr(c,56,56,W-112,H-112,34);c.stroke();c.globalAlpha=1;
 c.direction="rtl";c.textAlign="center";c.textBaseline="alphabetic";
 const PF=(s,w)=>`${w||500} ${s}px ${FN.per}`,AF=s=>`${s}px ${FN.ar}`;
 /* سربرگ */
 const kl=KIND[o.kind]||"";c.font=PF(36,700);const pw=c.measureText(kl).width+150;
 c.fillStyle=ac;c.globalAlpha=.16;rr(c,W/2-pw/2,132,pw,72,36);c.fill();c.globalAlpha=.85;c.strokeStyle=ac;c.lineWidth=2;c.stroke();c.globalAlpha=1;
 star8(c,W/2-pw/2+38,168,13);c.fillStyle=ac;c.fill();star8(c,W/2+pw/2-38,168,13);c.fill();
 c.fillStyle=ac;c.font=PF(36,700);c.fillText(kl,W/2,181);
 let hy;
 if(img){const hh=230,ww=img.width*hh/img.height,mw=Math.min(ww,720),mh=img.height*mw/img.width,t=document.createElement("canvas");t.width=img.width;t.height=img.height;const x=t.getContext("2d");x.drawImage(img,0,0);x.globalCompositeOperation="source-in";x.fillStyle=ac;x.fillRect(0,0,t.width,t.height);c.drawImage(t,W/2-mw/2,240,mw,mh);hy=240+mh+40}
 else{c.fillStyle=tx;const sz=fitLine(c,o.head,s=>PF(s,800),860,86,44);c.fillText(o.head,W/2,330);hy=330+20}
 if(o.sub){c.fillStyle=tx;c.globalAlpha=.82;const sz=fitLine(c,o.sub,s=>PF(s,500),860,38,24);c.fillText(o.sub,W/2,hy+(img?30:42));c.globalAlpha=1;hy+=(img?30:42)}
 /* کادر متن */
 const pY=Math.max(hy+50,img?560:480),pB=1580,pX=84,pW=W-168;
 c.fillStyle=light?"rgba(255,255,255,.5)":"rgba(0,0,0,.26)";rr(c,pX,pY,pW,pB-pY,48);c.fill();
 c.strokeStyle=ac;c.globalAlpha=.55;c.lineWidth=2;rr(c,pX,pY,pW,pB-pY,48);c.stroke();c.globalAlpha=1;
 [[pX,pY],[pX+pW,pY],[pX,pB],[pX+pW,pB]].forEach(p=>{star8(c,p[0],p[1],20);c.fillStyle=ac;c.fill()});
 const mW=pW-150,top=pY+64,bot=pB-64,aH=bot-top,useA=SX.ar&&o.ar,useF=SX.fa&&o.fa,orn=(useA&&(useF||o.num))?96:0,ARt=useA?arN(o.ar):"";
 let A=null,B=null;
 if(useA&&useF){A=fitText(c,ARt,AF,mW,aH*.58-orn/2,80,30,1.95);B=fitText(c,o.fa,s=>PF(s),mW,aH-A.h-orn,52,24,1.85);
  if(B.trunc&&A.sz>34){A=fitText(c,ARt,AF,mW,aH*.4-orn/2,80,30,1.95);B=fitText(c,o.fa,s=>PF(s),mW,aH-A.h-orn,52,24,1.85)}}
 else if(useA)A=fitText(c,ARt,AF,mW,aH-orn,96,30,1.95);
 else if(useF)B=fitText(c,o.fa,s=>PF(s),mW,aH,64,24,1.9);
 const total=(A?A.h:0)+orn+(B?B.h:0);let y=top+Math.max(0,(aH-total)/2);
 if(A){c.font=AF(A.sz);c.fillStyle=tx;A.L.forEach((l,i)=>c.fillText(l,W/2,y+i*A.sz*A.lh+A.sz*A.lh*.72));y+=A.h}
 if(orn){const oy=y+orn/2;c.strokeStyle=ac;c.globalAlpha=.7;c.lineWidth=2;c.beginPath();c.moveTo(pX+90,oy);c.lineTo(W/2-58,oy);c.moveTo(W/2+58,oy);c.lineTo(pX+pW-90,oy);c.stroke();c.globalAlpha=1;
  star8(c,W/2,oy,o.num?(o.num>99?54:44):20);c.fillStyle=ac;c.fill();if(o.num){c.fillStyle=c1;c.font=PF(o.num>99?26:32,800);c.fillText(fa(o.num),W/2,oy+10)}y+=orn}
 if(B){c.font=PF(B.sz);c.fillStyle=tx;c.globalAlpha=A?.92:1;B.L.forEach((l,i)=>c.fillText(l,W/2,y+i*B.sz*B.lh+B.sz*B.lh*.72));c.globalAlpha=1}
 /* پاورقی */
 c.fillStyle=tx;if(o.src){c.globalAlpha=.8;const sz=fitLine(c,o.src,s=>PF(s),880,32,22);c.fillText(o.src,W/2,1636);c.globalAlpha=1}
 if(SX.name&&cfg.name){c.globalAlpha=.9;c.font=PF(34,600);c.fillText(cfg.name+(cfg.grp?" · "+cfg.grp:""),W/2,1692);c.globalAlpha=1}
 star8(c,W/2-130,1735,10);c.fillStyle=ac;c.fill();star8(c,W/2+130,1735,10);c.fill();
 c.fillStyle=ac;c.font=PF(46,800);c.fillText("ختم قرآن",W/2,1748);
 c.fillStyle=tx;c.globalAlpha=.85;c.font=PF(30,500);c.fillText("شما هم هر روز یک بخش با ما قرآن بخوانید",W/2,1798);
 c.globalAlpha=.7;c.direction="ltr";c.font=PF(26,500);c.fillText(appUrl().replace(/^https?:\/\//,""),W/2,1840);c.direction="rtl";c.globalAlpha=1}
function stOpen(o){SX.o=o;if(SX.t<0)SX.t=STY2T[cfg.style]||0;SX.ar=!!o.ar;SX.fa=!!(o.fa||o.faLazy);
 sheet(`<h2>استوری ${KIND[o.kind]||""}</h2><p class="muted">تصویر ۹:۱۶ آمادهٔ استوری اینستاگرام، واتس‌اپ و تلگرام.</p>
 <div class="field">طرح</div><div class="dsw" style="justify-content:center">${STH.map((x,i)=>`<button data-act="st-t" data-i="${i}" class="${SX.t===i?"on":""}" style="background:linear-gradient(135deg,${x[1]},${x[2]});color:${x[3]}" aria-label="${x[0]}">${x[0].slice(0,2)}</button>`).join("")}</div>
 ${o.ar?`<div class="sr"><span>متن عربی</span><input type="checkbox" class="sw2" id="st-ar" ${SX.ar?"checked":""}></div>`:""}
 ${o.fa||o.faLazy?`<div class="sr"><span>ترجمهٔ فارسی</span><input type="checkbox" class="sw2" id="st-fa" ${SX.fa?"checked":""}></div>`:""}
 <div class="sr"><span>نمایش نام${cfg.name?" ("+esc(cfg.name)+")":""}</span><input type="checkbox" class="sw2" id="st-n" ${SX.name?"checked":""}></div>
 <canvas id="stc" style="width:62%;max-width:300px;aspect-ratio:9/16;display:block;margin:10px auto;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.5)"></canvas>
 <div class="row"><button class="btn g" data-act="st-share">${ic("share")} اشتراک در استوری</button><button class="btn" data-act="st-save">${ic("down")} ذخیره تصویر</button></div>`);
 const rd_=()=>drawCard($("#stc"),++SX.k);
 $("#st-ar")&&($("#st-ar").onchange=e=>{SX.ar=e.target.checked;if(!SX.ar&&!SX.fa&&$("#st-fa")){SX.fa=true;$("#st-fa").checked=true}rd_()});
 $("#st-fa")&&($("#st-fa").onchange=e=>{SX.fa=e.target.checked;if(!SX.fa&&!SX.ar&&$("#st-ar")){SX.ar=true;$("#st-ar").checked=true}rd_()});
 $("#st-n").onchange=e=>{SX.name=e.target.checked;rd_()};rd_()}
ACT["st-t"]=t=>{SX.t=+t.dataset.i;$$(".dsw button").forEach(b=>b.classList.toggle("on",b===t));drawCard($("#stc"),++SX.k)};
async function stOut(share){const cv=$("#stc");if(!cv)return;const tok=++SX.k;await drawCard(cv,tok);const o=SX.o;
 cv.toBlob(async b=>{if(!b)return toast("ساخت تصویر ممکن نشد");const f=new File([b],"khatm-"+o.kind+".png",{type:"image/png"});
  if(share){try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:o.head,text:(o.head+(o.sub?" · "+o.sub:""))+"\nختم قرآن: "+appUrl()});return}}catch(e){if(e&&e.name==="AbortError")return}}
  const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=f.name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);toast("تصویر ذخیره شد؛ آن را در استوری بگذارید")},"image/png")}
ACT["st-share"]=()=>stOut(true);ACT["st-save"]=()=>stOut(false);
function ayTr(i){const[s,j]=F[i],T=window.TR&&TR[cfg.tr];return T?T[s][j]:""}
ACT["st-a"]=t=>{const i=+t.dataset.i,[s,j]=F[i];
 stOpen({kind:"ayah",head:"سورهٔ "+SURA_FA[s],sub:"آیهٔ "+fa(j+1),ar:QURAN[s][j],fa:ayTr(i),faLazy:true,num:j+1,src:"ترجمهٔ "+TRN[cfg.tr]});
 if(!(window.TR&&TR[cfg.tr]))loadTR(cfg.tr).then(()=>{if(SX.o&&SX.o.kind==="ayah"&&$("#stc")){SX.o.fa=ayTr(i);drawCard($("#stc"),++SX.k)}})};
ACT["st-h"]=t=>{const h=hById(t.dataset.id);if(!h)return;
 stOpen({kind:"hadith",head:h.by?MS[h.by]:(h.t||"حدیث"),sub:h.at||(h.t||""),ar:h.ar?arN(h.ar):"",fa:"«"+h.fa+"»",by:h.by||"",src:""})};
ACT["st-d"]=t=>{const r=duaRec(t.dataset.id);if(!r||!r.p)return;const x=r.p[+t.dataset.k];if(!x)return;
 stOpen({kind:"dua",head:r.t,sub:r.by||"",ar:x[0]?arN(x[0]):"",fa:x[1]||"",src:r.src?"منبع: "+r.src:""})};
