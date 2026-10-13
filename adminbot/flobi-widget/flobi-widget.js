/* Flobi — Shortflow Admin AI 어시스턴트 위젯
 * 사용: new FlobiWidget(document.body,{live:true})
 * 목업 응답: ANS / match() / ask() — 실제 API 연결 시 ask()의 setTimeout 부분을 교체
 */
(function(){
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sv=(d,w=2)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const I={close:sv('<path d="M6 6l12 12M18 6L6 18"/>'),min:sv('<path d="M6 12h12"/>'),up:sv('<path d="M12 19V5M6 11l6-6 6 6"/>',2.4),right:sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),chev:sv('<path d="M9 6l6 6-6 6"/>')};
const SUGG=[
{k:'approval',q:'가입 신청한 유저는 어디서 승인해요?',t:'회원',tone:'g'},
{k:'content',q:'콘텐츠를 직접 등록하면 바로 공개되나요?',t:'콘텐츠',tone:'p'},
{k:'settle',q:'RS 요청 메일은 어떻게 보내요?',t:'정산',tone:'o'},
{k:'focus',q:'회사별 접속 기록은 어디서 봐요?',t:'대시보드',tone:'b'}];
const ANS={
approval:{text:'현재 승인을 기다리는 회사는 2곳이에요. Prompt Supply Inc.는 12일 넘게 대기 중이라 먼저 확인하시는 걸 추천드려요.',stat:['유저 승인 대기','2','곳'],rows:[['유저 승인','g','Prompt Supply Inc.','송재호 · 제작사','12d 23h 경과'],['유저 승인','g','Henan Yingxu Culture Media Co., Ltd','zhaohaojie · 제작사','4d 17h 경과']],act:'회원 관리에서 검토',src:'회원 관리 › 유저',steps:['질문 해석','유저 승인 대기열 조회','답변 정리']},
signups:{text:'최근 7일(10.7–10.13) 동안 3명이 새로 가입했어요. 플랫폼 2명, 제작사 1명이며 제작사 1명은 아직 승인 대기예요.',stat:['신규 가입 · 7일','3','명'],rows:[['플랫폼','b','Belive 담당자','Belive','10.9 가입'],['제작사','g','zhaohaojie','Henan Yingxu Culture…','10.8 가입'],['플랫폼','b','Adam Kamizelich','GOTOIT sp. z o.o.','10.7 가입']],act:'유저 목록 보기',src:'회원 관리 › 유저',steps:['질문 해석','users 테이블 조회 · 가입일 필터','답변 정리']},
content:{text:'이번 달은 구매 의사 6건이 접수됐고, 조회수는 ‘용염 왕비’가 22회로 가장 높아요. 상위 3개 콘텐츠가 전체 조회의 절반 이상을 차지해요.',stat:['구매 의사 접수','6','건'],rows:[['조회 1위','o','용염 왕비','ep.1','22회'],['조회 2위','o','마피아킹 - 평범한 여대생…','teaser 1','21회'],['조회 3위','o','바다의 여왕, 권력을 되찾다','ep.1','12회']],act:'콘텐츠 랭킹 보기',src:'운영 현황 › 콘텐츠 조회수 랭킹',steps:['질문 해석','콘텐츠 조회 로그 집계','답변 정리']},
edits:{text:'대기 중인 콘텐츠 수정 요청은 없어요. 콘텐츠 승인 대기도 0건이라, 지금 이 영역에서 처리할 항목은 없습니다.',stat:['수정 요청 대기','0','건'],rows:null,act:'수정 요청 내역',src:'운영 현황 › FOCUS',steps:['질문 해석','수정 요청 큐 조회','답변 정리']},
settle:{text:'정산은 진행중 7건, 완료 처리 대기 3건이에요. 예정 처리 건은 없어요.',stat:['정산 진행중','7','건'],rows:[['정산','o','정산 진행중','','7건'],['정산','o','완료 처리 대기','','3건'],['정산','o','정산 예정 처리','','0건']],act:'정산 화면 열기',src:'정산',steps:['질문 해석','정산 상태 집계','답변 정리']},
focus:{text:'지금 처리할 FOCUS 항목은 총 8건이에요. 구매 의사 6건, 유저 승인 2건이고 가장 오래된 건은 ‘악마의 키스 / ReelShort’(132일 경과)예요.',stat:['처리 대기','8','건'],rows:[['구매 의사','p','단일 / 악마의 키스 / ReelShort','','132d 경과'],['구매 의사','p','묶음 / 낮잠 공주의 스포일러 외 8개','','115d 21h 경과'],['유저 승인','g','송재호 ( Prompt Supply Inc. )','','12d 23h 경과']],act:'운영 현황에서 검토',src:'운영 현황 › FOCUS',steps:['질문 해석','FOCUS 대기열 조회','답변 정리']}};
const PAGES={ops:{name:'운영 현황',path:'대시보드 › 운영 현황',sum:[['처리 대기','8','건'],['구매 의사','6','건'],['유저 승인','2','건']]},users:{name:'유저',path:'회원 관리 › 유저',sum:[['전체 유저','118','명'],['Pending','2','명'],['Onboarding','2','명']]}};
function match(q){if(/수정/.test(q))return'edits';if(/정산/.test(q))return'settle';if(/가입|신규/.test(q))return'signups';if(/승인|회사/.test(q))return'approval';if(/콘텐츠|활동|조회|랭킹/.test(q))return'content';return'focus'}
function flobi(px,mood=''){return`<span class="flobi ${mood}" aria-hidden="true" style="font-size:${px}px"><i class="fb-ant"></i><i class="fb-ear l"></i><i class="fb-ear r"></i><span class="fb-head"><span class="fb-face"><i class="fb-eye l"></i><i class="fb-eye r"></i><i class="fb-mouth"></i><i class="fb-ck l"></i><i class="fb-ck r"></i></span></span></span>`}

const V={
flobi:{
launcher:()=>`<div class="l"><div class="l-say">무엇이든 물어보세요</div><button class="l-btn" aria-label="플로비 열기" data-open>${flobi(40)}<i class="badge"></i></button></div>`,
head:()=>`<div class="h" data-drag><div class="h-id"><span class="av">${flobi(26)}</span><div><b>플로비<span>AI</span></b><small><i></i>운영 데이터 어시스턴트</small></div></div><div class="h-ctl"><button data-min title="최소화">${I.min}</button><button data-close title="닫기">${I.close}</button></div></div>`,
welcome:()=>`<div class="w m"><span class="w-mas">${flobi(64,'happy')}</span><h3>안녕하세요, 플로비예요</h3><p>메뉴 위치부터 기능 사용법까지<br>궁금한 걸 편하게 물어보세요.</p><div class="w-chips">${SUGG.map(s=>`<button data-q="${esc(s.q)}"><small class="mono">${s.t}</small>${esc(s.q)}</button>`).join('')}</div></div>`,
compact:()=>`<div class="m ai"><span class="av">${flobi(20,'happy')}</span><div class="bub"><p>안녕하세요, 플로비예요. 무엇이든 물어보세요.</p></div></div>`,
user:q=>`<div class="m u"><div class="bub">${esc(q)}</div></div>`,
ai:a=>`<div class="m ai"><span class="av">${flobi(20)}</span><div class="bub"><p>${esc(a.text)}</p><div class="st"><small>${a.stat[0]}</small><b>${a.stat[1]}</b><em>${a.stat[2]}</em></div>${a.rows?`<ul class="rows">${a.rows.map(r=>`<li><div><b>${esc(r[2])}</b>${r[3]?`<small>${esc(r[3])}</small>`:''}</div><span>${r[4]}</span></li>`).join('')}</ul>`:''}</div></div>`,
think:()=>`<div class="m ai think"><span class="av">${flobi(20,'think')}</span><div class="bub"><span class="pix">${[0,1,2,3,4].map(i=>`<i style="animation-delay:${i*.12}s"></i>`).join('')}</span><small>데이터 확인 중</small></div></div>`,
input:()=>`<form class="in"><textarea aria-label="플로비에게 질문" rows="1" placeholder="플로비에게 물어보기"></textarea><button class="send" aria-label="질문 전송" type="submit" disabled>${I.up}</button></form>`,
resume:'아까 대화 이어서 할까요?',idle:'무엇이든 물어보세요'}};
class SFWidget{
constructor(host,o={}){Object.assign(this,{host,pal:'',s:'flobi',live:!!o.live,page:o.page||'ops',open:!!o.open,msgs:o.msgs||[],thinking:o.thinking||null,demo:!!o.demo,unread:false,pos:null,timers:[]});
this.el=document.createElement('div');host.appendChild(this.el);this.build();if(this.live)this.bind();}
build(){const v=V[this.s];this.el.className='sfw'+(this.live?'':' static')+(this.open?' open':'');this.el.dataset.s=this.s;if(this.pal)this.el.dataset.pal=this.pal;
this.el.innerHTML=v.launcher(this)+`<div class="win">${v.head(this)}<div class="b"></div><div class="sg"></div>${v.input(this)}</div>`;
this.win=this.el.querySelector('.win');this.b=this.el.querySelector('.b');this.sg=this.el.querySelector('.sg');this.ta=this.el.querySelector('textarea');this.l=this.el.querySelector('.l');
if(this.demo){this.l.classList.add('demo');const p=this.el.querySelector('[data-peek]');p&&p.classList.add('on')}
if(!this.live){this.el.querySelectorAll('button,textarea').forEach(x=>x.tabIndex=-1);this.ta.readOnly=true}
this.applyPos();this.render();}
render(){const v=V[this.s];let h=this.msgs.length?v.compact(this):v.welcome(this);
for(const m of this.msgs)h+=m.u?v.user(m.u):v.ai(ANS[m.a]);
if(this.thinking)h+=v.think(this,this.thinking);
this.b.innerHTML=h;
this.toBottom();this.updateLauncher();}
toBottom(){if(!this.msgs.length)return;const f=()=>this.b.scrollTop=this.b.scrollHeight;f();requestAnimationFrame(f);setTimeout(f,300);setTimeout(f,1200);document.fonts&&document.fonts.ready.then(f);window.addEventListener('load',f)}
updateLauncher(){const v=V[this.s],has=this.msgs.length>0,txt=has?v.resume:v.idle;
const t=this.el.querySelector('.l-label,.l-txt,.l-say');if(t)t.textContent=txt;this.el.classList.toggle('unread',this.unread);}
bind(){const e=this.el;
e.addEventListener('click',ev=>{const t=ev.target;
if(t.closest('[data-open]'))return this.setOpen(true);
if(t.closest('[data-peek]')){this.setOpen(true);return this.ask('처리 대기 항목을 요약해줘')}
if(t.closest('[data-min]'))return this.setOpen(false);
if(t.closest('[data-close]'))return this.close();
const q=t.closest('[data-q]');if(q)return this.ask(q.dataset.q);
const a=t.closest('.act');if(a){a.animate([{transform:'scale(.96)'},{transform:'none'}],{duration:200})}});
const form=e.querySelector('form');
form.addEventListener('submit',ev=>{ev.preventDefault();const q=this.ta.value.trim();if(!q)return;this.ta.value='';this.sizeTa();this.ask(q)});
this.ta.addEventListener('input',()=>this.sizeTa());
this.ta.addEventListener('keydown',ev=>{if(ev.key==='Enter'&&!ev.shiftKey&&!ev.isComposing){ev.preventDefault();form.requestSubmit()}});
const h=e.querySelector('[data-drag]');
h.addEventListener('pointerdown',ev=>{if(ev.button!==0||ev.target.closest('button'))return;const hr=this.host.getBoundingClientRect(),wr=this.win.getBoundingClientRect();
this.drag={dx:ev.clientX-wr.left,dy:ev.clientY-wr.top,hr,w:wr.width,h:wr.height};this.win.classList.add('dragging');h.setPointerCapture(ev.pointerId)});
h.addEventListener('pointermove',ev=>{const d=this.drag;if(!d)return;const x=Math.max(8,Math.min(d.hr.width-d.w-8,ev.clientX-d.hr.left-d.dx)),y=Math.max(8,Math.min(d.hr.height-d.h-8,ev.clientY-d.hr.top-d.dy));this.pos={x,y};this.applyPos()});
const up=()=>{if(!this.drag)return;this.drag=null;this.win.classList.remove('dragging')};h.addEventListener('pointerup',up);h.addEventListener('pointercancel',up);
this.onKey=ev=>{if((ev.metaKey||ev.ctrlKey)&&ev.key.toLowerCase()==='j'){ev.preventDefault();this.setOpen(!this.open)}else if(ev.key==='Escape'&&this.open)this.setOpen(false)};
document.addEventListener('keydown',this.onKey);
this.onResize=()=>{if(!this.pos)return;const hr=this.host.getBoundingClientRect(),wr=this.win.getBoundingClientRect();this.pos={x:Math.max(8,Math.min(hr.width-wr.width-8,this.pos.x)),y:Math.max(8,Math.min(hr.height-wr.height-8,this.pos.y))};this.applyPos()};
window.addEventListener('resize',this.onResize);
}
sizeTa(){const t=this.ta;t.style.height='auto';t.style.height=Math.min(96,t.scrollHeight)+'px';this.el.querySelector('.send').disabled=!t.value.trim()}
applyPos(){const s=this.win.style;if(this.pos){Object.assign(s,{left:this.pos.x+'px',top:this.pos.y+'px',right:'auto',bottom:'auto',transformOrigin:'50% 50%'})}else Object.assign(s,{left:'',top:'',right:'',bottom:'',transformOrigin:''})}
setOpen(o){this.open=o;this.el.classList.toggle('open',o);if(o){this.unread=false;this.updateLauncher();const p=this.el.querySelector('[data-peek]');p&&p.classList.remove('on');setTimeout(()=>this.live&&this.ta.focus({preventScroll:true}),260);this.toBottom()}this.onChange&&this.onChange()}
close(){this.timers.forEach(clearTimeout);this.timers=[];this.setOpen(false);this.msgs=[];this.thinking=null;this.unread=false;this.pos=null;this.applyPos();this.render()}
ask(q){if(this.thinking)return;this.msgs.push({u:q});const k=match(q);this.thinking={k,step:0};this.render();
const tick=(ms,fn)=>this.timers.push(setTimeout(fn,ms));
tick(1400,()=>{this.thinking=null;this.msgs.push({a:k});if(!this.open)this.unread=true;this.render()});}
setPage(p){this.page=p}
state(){return{open:this.open,msgs:this.msgs.slice(),page:this.page,pos:this.pos}}
destroy(){this.timers.forEach(clearTimeout);document.removeEventListener('keydown',this.onKey);window.removeEventListener('resize',this.onResize);this.el.remove()}}
window.FlobiWidget=SFWidget;window.FLOBI_SUGGESTIONS=SUGG;window.FLOBI_ANSWERS=ANS;
})();
