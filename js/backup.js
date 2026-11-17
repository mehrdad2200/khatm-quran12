/* ===== پشتیبان‌گیری و بازیابی (فایل JSON) ===== */
function bkData(){return{app:"khatm-quran",v:3,created:new Date().toISOString(),name:cfg.name,group:cfg.grp,cfg,done,hl:{items:(typeof HL!=="undefined"?HL.items:[])},dls:{full:DLS.full},tasbih:(typeof TS!=="undefined"?TS:null)}}
function bkName(){const j=jal(TODAY),d=j[0]+"-"+String(j[1]).padStart(2,"0")+"-"+String(j[2]).padStart(2,"0");return("ختم قرآن_"+d+"_"+(cfg.name||"کاربر")).replace(/[\\/:*?"<>|]/g,"-")+".json"}
async function bkExport(){const blob=new Blob([JSON.stringify(bkData(),null,1)],{type:"application/json"}),name=bkName();
 try{const f=new File([blob],name,{type:"application/json"});if(navigator.canShare&&navigator.canShare({files:[f]})&&/Android|iPhone|iPad/i.test(navigator.userAgent)){await navigator.share({files:[f],title:"پشتیبان ختم قرآن"});toast("پشتیبان ساخته شد ✓");return}}catch(e){if(e&&e.name==="AbortError")return}
 const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);toast("فایل پشتیبان ساخته شد ✓")}
function bkApply(o){if(!o||o.app!=="khatm-quran"||!o.cfg)throw 0;
 cfg=Object.assign(cfg,o.cfg);cfg.v=3;cfg.gs=o.cfg.gs||0;cfg.gd=o.cfg.gd||0;if(!cfg.gs&&!cfg.gd){delete cfg.n0;delete cfg.gp}typeof gApply==="function"&&gApply();done=o.done||{};save();ls.set("khatm-done",done);
 if(o.tasbih&&typeof TS!=="undefined"){Object.assign(TS,o.tasbih);TS.o=Object.assign({vib:true,snd:false,tg:0,per:"day",wake:false},TS.o);tsave()}
 if(o.hl&&o.hl.items&&typeof HL!=="undefined"){HL.items=o.hl.items;hsave()}}
function bkPick(){let i=$("#bkf");if(!i){i=document.createElement("input");i.type="file";i.id="bkf";i.accept=".json,application/json";i.style.display="none";document.body.appendChild(i)}
 i.value="";i.onchange=async()=>{const f=i.files[0];if(!f)return;try{const o=JSON.parse(await f.text());if(o&&o.kind==="all"&&typeof bkApplyAll==="function"){bkApplyAll(o);return}bkApply(o);const ob=$("#ob");ob&&ob.remove();applyTheme();setup();go("home");toast("پشتیبان با موفقیت بازیابی شد ✓");typeof afterOnboard==="function"&&afterOnboard()}catch(e){toast("فایل پشتیبان معتبر نیست")}};i.click()}
ACT["bk-export"]=bkExport;ACT["bk-import"]=bkPick;
