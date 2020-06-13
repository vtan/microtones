(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{681:function(e,t,n){"use strict";n.r(t);var s=n(0),r=n(8),c=n(26);function a(e){const t=Math.pow(2,e),n=1200*e;let s=Math.round(n/100);const r=n-100*s;return 12===s&&(s=0),{rootMultiplier:t,cents:n,nearest12EdoNote:s,diffFromNearest12EdoNote:r}}function i(e,t){let n=Math.abs(e.diffFromNearest12EdoNote)/100;return t&&(n=1-n),Math.pow(n,1/2.2)}function o({diffFromNearest12EdoNote:e}){return 0===e?"":e<0?`− ${Math.abs(e).toFixed(0)}¢`:`+ ${e.toFixed(0)}¢`}const l={sharp:["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"],flat:["C","D♭","D","E♭","E","F","G♭","G","A♭","A","B♭","B"]},d=[1,3,6,8,10],u=["q","w","e","r","t","y","u","i","o","p","[","]","\\","a","s","d","f","g","h","j","k","l",";","'","z","x","c","v","b","n","m",",",".","/"],p=Object.assign({},...u.map((e,t)=>({[e]:t})));function m(e){const t=[];let n=0,s=0;return e.forEach((e,r)=>{const c=e.note,a=d.indexOf(c.nearest12EdoNote)>=0,o=i(c,!a);let l=s,p=a?.5:1;if(a)0===n&&(s-=.25,l=s);else if(n>0){const e=.5*(n-1);s-=.25,l=s-e/2,p+=e/2,t[t.length-1-n].width+=e/2}const m={x:l,width:p,isShort:a,color:o,keyboardChar:u[r],pitch:e};t.push(m),m.isShort?++n:n=0,s+=a?.5:1}),t}function f(e){return`hsl(0, 0%, ${(100*e).toFixed(0)}%)`}function y(e,t,n){return n.map((n,s)=>s===e?t(n):n)}const b={numberOfTracks:4,steps:g(16,4),secondsPerStep:.2};function g(e,t){return[...Array(e)].map(e=>function(e){return[...Array(e)].map(e=>({type:"empty"}))}(t))}function h(e){return e.steps.map((t,n)=>({time:e.secondsPerStep*n,stepIndex:n}))}function k(e,t){const n=t.steps.map(e=>[]);return[...Array(t.numberOfTracks)].map((e,t)=>t).forEach((s,r)=>{(function(e,t,n){const s=[];let r;return n.steps.forEach((c,a)=>{const i=c[t];let o;switch(i.type){case"pitch":o={duration:n.secondsPerStep,frequency:e[i.pitchIndex].frequency,pitchIndex:i.pitchIndex},r=o;break;case"empty":r=void 0;break;case"hold":void 0!==r&&(r.duration+=n.secondsPerStep)}void 0!==o&&s.push([a,o])}),s})(e,r,t).forEach(([e,t])=>{n[e].push(t)})}),n}const v=["triangle","sawtooth","square","sine","sine3"],S=function(){const e=O("triangle"),{notes:t,pitches:n,keys:s}=x(12,48);return{openPanel:"tuning",synth:e,waveform:"triangle",numberOfSubdivisions:12,displayedAccidental:"sharp",notes:t,pitches:n,keys:s,keyboardOffset:48,pressedKeyIndices:[],sequences:[b],selectedSequenceIndex:0}}();function E({sequences:e,selectedSequenceIndex:t}){const n=e[t];if(void 0===n){const n=`Invalid selectedSequenceIndex: ${t}; has ${e.length} sequences`;throw new Error(n)}return n}function O(e){return new c.b(c.c,{volume:-6,oscillator:{type:e},envelope:{attack:.005,decay:.1,release:1,sustain:.2}}).toDestination()}function q(e){return e<=10?4:e<=15?3:e<=21?2:1}function x(e,t){const n=function(e){const t=[];for(let n=0;n<e;++n){const s=a(n/e);t.push(s)}for(let e=0;e<12;++e){let n;t.forEach((s,r)=>{s.nearest12EdoNote===e&&(void 0===n||Math.abs(t[n].diffFromNearest12EdoNote)>Math.abs(s.diffFromNearest12EdoNote))&&(n=r)}),void 0!==n&&(t[n].nearestTo12EdoNote=e)}return t}(e),s=function(e,t,n,s){const r=[];for(let c=0;c<n;++c){const n=e*Math.pow(2,c-1);r.push(...s.map(e=>({octave:t+c,frequency:n*e.rootMultiplier,note:e})))}return r}(16.0352,0,10,n),r=q(e),c=s.slice(t,t+r*e+1);return{notes:n,pitches:s,keys:m(c)}}function w(e,t){switch(t.type){case"openPanel":return Object.assign(Object.assign({},e),{openPanel:t.panel});case"setNumberOfSubdivisions":{const n=4*t.numberOfSubdivisions;return C(e),Object.assign(Object.assign(Object.assign(Object.assign({},e),{numberOfSubdivisions:t.numberOfSubdivisions}),x(t.numberOfSubdivisions,n)),{keyboardOffset:n,sequences:[b],selectedSequenceIndex:0,sequencerPlayback:void 0})}case"setDisplayedAccidental":return Object.assign(Object.assign({},e),{displayedAccidental:t.displayedAccidental});case"setKeyboardOffset":{const{pitches:n,numberOfSubdivisions:s}=e,{keyboardOffset:r}=t,c=q(s),a=m(n.slice(r,r+c*s+1));return Object.assign(Object.assign({},e),{keyboardOffset:r,keys:a})}case"setWaveform":if(t.waveform!==e.waveform){const{waveform:n}=t;return e.synth.set({oscillator:{type:n}}),void 0!==e.sequencerPlayback&&e.sequencerPlayback.synth.set({oscillator:{type:n}}),Object.assign(Object.assign({},e),{waveform:n})}return e;case"triggerNoteOn":{const n=e.keys[t.keyIndex];if(void 0===n||e.pressedKeyIndices.indexOf(t.keyIndex)>=0)return e;{e.synth.triggerAttack(n.pitch.frequency);const s=[...e.pressedKeyIndices,t.keyIndex];return("sequencer"===e.openPanel&&void 0!==e.sequencerSelection?n=>I(n,{type:"pitch",pitchIndex:t.keyIndex+e.keyboardOffset}):e=>e)(Object.assign(Object.assign({},e),{pressedKeyIndices:s}))}}case"triggerNoteOff":{const n=e.keys[t.keyIndex];if(void 0===n||e.pressedKeyIndices.indexOf(t.keyIndex)<0)return e;{e.synth.triggerRelease(n.pitch.frequency);const s=e.pressedKeyIndices.filter(e=>e!==t.keyIndex);return Object.assign(Object.assign({},e),{pressedKeyIndices:s})}}case"setSequencerSelection":return Object.assign(Object.assign({},e),{sequencerSelection:t.selection});case"moveSequencerSelection":if(void 0===e.sequencerSelection)return Object.assign(Object.assign({},e),{sequencerSelection:{step:0,track:0}});{const n={step:e.sequencerSelection.step+t.diff.step,track:e.sequencerSelection.track+t.diff.track},s=E(e);return n.step>=0&&n.step<s.steps.length&&n.track>=0&&n.track<s.numberOfTracks?Object.assign(Object.assign({},e),{sequencerSelection:n}):e}case"setSelectedStep":return I(e,t.step);case"resizeSequenceSteps":{const n=y(e.selectedSequenceIndex,e=>function(e,t){if(e<1||e>256)return t;if(e<t.steps.length){const n=t.steps.slice(0,e);return Object.assign(Object.assign({},t),{steps:n})}if(e>t.steps.length){const n=e-t.steps.length,s=[...t.steps,...g(n,t.numberOfTracks)];return Object.assign(Object.assign({},t),{steps:s})}return t}(t.numberOfSteps,e),e.sequences),s=Object.assign(Object.assign({},e),{sequences:n}),r=P(s);return Object.assign(Object.assign({},s),{sequencerPlayback:r})}case"setSequenceTempo":if(t.secondsPerStep>0){const n=y(e.selectedSequenceIndex,e=>Object.assign(Object.assign({},e),{secondsPerStep:t.secondsPerStep}),e.sequences),s=Object.assign(Object.assign({},e),{sequences:n}),r=P(s);return Object.assign(Object.assign({},s),{sequencerPlayback:r})}return e;case"toggleSequencerPlaying":if(void 0===e.sequencerPlayback){const n=j(e,t.dispatch);return Object.assign(Object.assign({},e),{sequencerPlayback:n})}return C(e),Object.assign(Object.assign({},e),{sequencerPlayback:void 0});case"setSequencerPlaybackStepIndex":if(void 0===e.sequencerPlayback)return e;{const n=Object.assign(Object.assign({},e.sequencerPlayback),{currentStepIndex:t.stepIndex});return Object.assign(Object.assign({},e),{sequencerPlayback:n})}}}function I(e,t){if(void 0===e.sequencerSelection)return e;{const n=E(e),s=function(e,t,n){const s=y(e.step,n=>y(e.track,e=>t,n),n.steps);return Object.assign(Object.assign({},n),{steps:s})}(e.sequencerSelection,t,n);void 0!==e.sequencerPlayback&&(e.sequencerPlayback.stepEventsRef[0]=k(e.pitches,s));const r=y(e.selectedSequenceIndex,e=>s,e.sequences);return Object.assign(Object.assign({},e),{sequences:r})}}function j(e,t,n=0){const s=O(e.waveform),r=E(e),a=n>=0&&n<r.steps.length?n:0,i=[k(e.pitches,r)],o=[...h(r)],l=new c.a((e,{stepIndex:n})=>{for(const t of i[0][n])s.triggerAttackRelease(t.frequency,t.duration,e);t({type:"setSequencerPlaybackStepIndex",stepIndex:n})},o),d=r.secondsPerStep*r.steps.length,u=r.secondsPerStep*a;return c.d.cancel(),c.d.start(),l.loopStart=0,l.loopEnd=d,l.loop=!0,l.start(0,u),{synth:s,stepEventsRef:i,dispatch:t,currentStepIndex:a}}function P(e){return void 0===e.sequencerPlayback?void 0:(C(e),j(e,e.sequencerPlayback.dispatch,e.sequencerPlayback.currentStepIndex))}function C(e){if(c.d.stop(),c.d.cancel(),void 0!==e.sequencerPlayback){const t=e.sequencerPlayback.synth;t.releaseAll(),t.disconnect()}}function A(e){window.addEventListener("keydown",(e=>t=>{if(!(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)){const n=p[t.key];void 0!==n&&(t.repeat||e({type:"triggerNoteOn",keyIndex:n}),t.preventDefault())}})(e),!0),window.addEventListener("keyup",(e=>t=>{const n=t.shiftKey||t.ctrlKey||t.altKey||t.metaKey,s=p[t.key];n||void 0===s||(e({type:"triggerNoteOff",keyIndex:s}),t.preventDefault())})(e),!0)}function N(e){const{dispatch:t}=e,n=s.useCallback(e=>n=>1&n.buttons?t({type:"triggerNoteOn",keyIndex:e}):null,[]),r=s.useCallback(e=>()=>t({type:"triggerNoteOff",keyIndex:e}),[]),c=s.useCallback((e,t,c)=>s.createElement("rect",{key:t,onMouseDown:n(t),onMouseUp:r(t),onMouseOver:n(t),onMouseOut:r(t),x:36*e.x,y:"0",width:36*e.width,height:e.isShort?"60%":"100%",stroke:"black",fill:c.indexOf(t)>=0?"#ffeb99":f(e.color)}),[]),a=s.useCallback((e,t)=>{const n=void 0===e.keyboardChar?null:s.createElement(T,{x:36*(e.x+e.width/2),y:"25%",fill:e.isShort?"white":"black"},e.keyboardChar),r=e.isShort||void 0===e.pitch.note.nearestTo12EdoNote?null:s.createElement(T,{x:36*(e.x+e.width/2),y:"95%",fill:"black",fillOpacity:.3},l.sharp[e.pitch.note.nearestTo12EdoNote]);return s.createElement(s.Fragment,{key:"l"+t},n,r)},[]),{keys:i,pressedKeyIndices:o,keyboardOffset:d,numberOfSubdivisons:u,sequencerPlayback:p}=e,m=s.useMemo(()=>{const e=void 0===p?[]:p.stepEventsRef[0][p.currentStepIndex].map(e=>e.pitchIndex-d);return[...o,...e]},[o,d,p]),y=s.useMemo(()=>d/u,[d,u]),b=s.useCallback(e=>t({type:"setKeyboardOffset",keyboardOffset:u*parseInt(e.target.value)}),[u]);return s.createElement(K,null,s.createElement(M,null,s.createElement(F,null,"Octave"),s.createElement("input",{type:"number",min:0,max:6,value:y,onChange:b})),s.createElement(D,null,i.map((e,t)=>e.isShort?null:c(e,t,m)),i.map((e,t)=>e.isShort?c(e,t,m):null),i.map((e,t)=>a(e,t))))}const K=r.a.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`,M=r.a.div`
  text-align: center;
  & input { text-align: right; }
`,F=r.a.div`
  font-size: 0.8rem;
`,D=r.a.svg`
  width: 100%;
  height: 120px;
  margin-left: 1rem;
`,T=r.a.text`
  pointer-events: none;
  text-anchor: middle;
  text-transform: uppercase;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`,$=[["tuning","Tuning"],["sequencer","Sequencer"],["synth","Synth"]],z=(e,t)=>()=>t({type:"openPanel",panel:e});function R({dispatch:e,openPanel:t}){return s.createElement(B,null,$.map(([n,r])=>s.createElement(L,{key:n,isActive:t===n,onClick:z(n,e)},r)),s.createElement(G,null),s.createElement(L,{href:"https://github.com/vtan/microtones",isActive:!1},"Source code"))}const B=r.a.nav`
  display: flex;
  border-bottom: 1px solid #e0e0e0;

  @media (min-width: 768px) {
    position: -webkit-sticky;
    position: sticky;
    box-sizing: border-box;
    width: 15rem;
    height: 100vh;
    top: 0;
    left: 0;

    flex-direction: column;
    padding-top: 1rem;
    border: unset;
    border-right: 1px solid #e0e0e0;
  }
`,L=r.a.a`
  display: inline-block;

  padding: 0.5rem;
  @media (min-width: 768px) {
    padding: 1rem;
  }

  background-color: ${e=>e.isActive?"#ffeb99":"transparent"};
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: ${e=>e.isActive?"#ffeb99":"#f3f3f3"};
  }
  &:visited {
    color: black;
  }
`,G=r.a.div`
  flex: auto;
`;var U=n(649);const W=r.a.span`
  margin-right: 1.5rem;
  font-weight: bold;
`,J=r.a.p`
  margin: 0.25rem 0 0.5rem 0;
  color: #666;
  font-size: 0.8rem;
`;function H({dispatch:e,sequences:t,selectedSequenceIndex:n,displayedAccidental:r,pitches:c,selection:a,playback:i}){s.useEffect(()=>{const t=Q(e);return window.addEventListener("keydown",t,!0),()=>window.removeEventListener("keydown",t,!0)},[]);const d=s.useCallback(t=>()=>e({type:"setSequencerSelection",selection:t}),[]),u=s.useCallback(t=>e({type:"resizeSequenceSteps",numberOfSteps:parseInt(t.target.value)}),[]),p=s.useMemo(()=>E({sequences:t,selectedSequenceIndex:n}),[t,n]),m=s.useMemo(()=>60/(4*p.secondsPerStep),[p.secondsPerStep]),[f,y]=s.useState(m),b=s.useCallback(U.throttle(t=>{e({type:"setSequenceTempo",secondsPerStep:60/t/4})},500,{leading:!1}),[]),g=s.useCallback(e=>{const t=parseInt(e.target.value);b(t),y(t)},[b]);return s.createElement(s.Fragment,null,s.createElement("div",null,s.createElement(W,null,"Steps"),s.createElement("input",{onChange:u,type:"number",min:4,max:256,value:p.steps.length})),s.createElement("div",null,s.createElement(W,null,"Tempo"),s.createElement(Y,null,f.toFixed(0)),s.createElement("input",{onChange:g,type:"range",min:40,max:200,value:f})),s.createElement(V,null,s.createElement(X,{onClick:()=>e({type:"toggleSequencerPlaying",dispatch:e})},void 0===i?"▶":"◼"),s.createElement(Z,null),s.createElement(X,{onClick:()=>function(e){e({type:"setSelectedStep",step:{type:"empty"}})}(e)},"Delete"),s.createElement(X,{onClick:()=>function(e){e({type:"setSelectedStep",step:{type:"hold"}})}(e)},"Hold")),s.createElement(ee,null,s.createElement("thead",null,s.createElement("tr",null,s.createElement("th",{key:-1}),[...Array(p.numberOfTracks)].map((e,t)=>s.createElement("th",{key:t},"Track ",t+1)))),s.createElement("tbody",null,p.steps.map((e,t)=>{const n=void 0!==a&&a.step===t,u=void 0!==i&&i.currentStepIndex===t;return s.createElement(te,{key:t,isCurrentlyPlayed:u},s.createElement(ne,{key:t},t+1),e.map((e,i)=>{const u=n&&void 0!==a&&a.track===i,p=function(e,t,n){switch(e.type){case"empty":return"_";case"pitch":const r=t[e.pitchIndex],c=l[n][r.note.nearest12EdoNote],a=o(r.note);return s.createElement(s.Fragment,null,c,s.createElement("sub",null,r.octave)," ",a);case"hold":return"|"}}(e,c,r);return s.createElement(se,{key:i,isSelected:u,onClick:d({step:t,track:i})},p)}))}))),s.createElement(J,null,"Use the keyboard to enter & delete notes, hold notes (",s.createElement("kbd",null,"↵"),"), start/stop playback (",s.createElement("kbd",null,"Space"),") and move the selection"))}const _={Backspace:()=>({type:"setSelectedStep",step:{type:"empty"}}),Delete:()=>({type:"setSelectedStep",step:{type:"empty"}}),Enter:()=>({type:"setSelectedStep",step:{type:"hold"}}),ArrowLeft:()=>({type:"moveSequencerSelection",diff:{track:-1,step:0}}),ArrowRight:()=>({type:"moveSequencerSelection",diff:{track:1,step:0}}),ArrowUp:()=>({type:"moveSequencerSelection",diff:{step:-1,track:0}}),ArrowDown:()=>({type:"moveSequencerSelection",diff:{step:1,track:0}})," ":e=>({type:"toggleSequencerPlaying",dispatch:e})},Q=e=>t=>{if(!(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)){const n=_[t.key];void 0!==n&&(t.preventDefault(),e(n(e)))}},V=r.a.div`
  margin-bottom: 0.5rem;
`,X=r.a.button`
  margin: 0 0.25rem;
  padding: 0.5rem;

  background-color: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  font: inherit;

  &:hover {
    background-color: #f3f3f3;
  }
`,Y=r.a.span`
  display: inline-block;
  width: 2.5rem;
`,Z=r.a.div`
  display: inline-block;
  width: 1rem;
`,ee=r.a.table`
  border-collapse: separate; border-spacing: 0;
`,te=r.a.tr`
  background-color: ${e=>e.isCurrentlyPlayed?"#dce8b1":"transparent"};

  &:nth-of-type(4n-3) {
    background-color: ${e=>e.isCurrentlyPlayed?"#dce8b1":"#f0f0f0"};
  }
`,ne=r.a.td`
  width: 2rem;
  padding-right: 1rem;
  text-align: right;
`,se=r.a.td`
  width: 6rem;
  background-color: ${e=>e.isSelected?"#ffeb99":"transparent"}
`;function re({dispatch:e,waveform:t}){return s.createElement(s.Fragment,null,s.createElement(W,null,"Waveform"),s.createElement("select",{onChange:t=>e({type:"setWaveform",waveform:t.target.value}),value:t},v.map(e=>s.createElement("option",{key:e,value:e},e))))}function ce({dispatch:e,numberOfSubdivisions:t,displayedAccidental:n,notes:r,keys:c,pressedKeyIndices:a}){const u=s.useMemo(()=>a.map(e=>c[e].pitch.note.rootMultiplier),[a,c]),p=s.useMemo(()=>r.map(e=>f(i(e,d.indexOf(e.nearest12EdoNote)<0))),[r]);return s.createElement(s.Fragment,null,s.createElement("div",null,s.createElement(W,null,"Tuning"),s.createElement("select",{onChange:t=>e({type:"setNumberOfSubdivisions",numberOfSubdivisions:Number.parseInt(t.target.value)}),value:t},[12,17,19,24,31,5,7,8,9,10,11,13,14,15,16,18,20,21,22,23].map(e=>s.createElement("option",{key:e,value:e},e,"-EDO"))),s.createElement(J,null,"Changing the tuning clears the sequencer")),s.createElement("div",null,s.createElement(W,null,"Accidental"),s.createElement("select",{onChange:t=>e({type:"setDisplayedAccidental",displayedAccidental:t.target.value}),value:n},s.createElement("option",{value:"sharp"},"♯"),s.createElement("option",{value:"flat"},"♭"))),s.createElement(ae,null,s.createElement("tbody",null,r.map((e,t)=>{const r=l[n][e.nearest12EdoNote],c=o(e);return s.createElement("tr",{key:t,style:{backgroundColor:u.indexOf(e.rootMultiplier)>=0?"#ffeb99":"transparent"}},s.createElement("td",{style:{backgroundColor:p[t],width:"1lh"}}),s.createElement("td",null,t),s.createElement("td",null,r," ",c))}))))}const ae=r.a.table`
  margin: 0.5rem 0 0 0;
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
  line-height: 1.5rem;

  & tr {
    margin: 0;
    padding: 0;
  }
  & td { margin: 0; padding: 0 0.5rem; }
`;const ie=r.a.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`,oe=r.a.main`
  flex: auto;
  padding: 1rem;
`;var le=n(650);Object(le.render)(s.createElement((function(){const[e,t]=s.useReducer(w,S),{openPanel:n,numberOfSubdivisions:r,displayedAccidental:c,waveform:a,notes:i,pitches:o,keys:l,keyboardOffset:d,pressedKeyIndices:u,sequences:p,selectedSequenceIndex:m,sequencerSelection:f,sequencerPlayback:y}=e;return s.useEffect(()=>A(t),[]),s.createElement(ie,null,s.createElement(R,{dispatch:t,openPanel:n}),s.createElement(oe,null,s.createElement(N,{dispatch:t,keys:l,keyboardOffset:d,numberOfSubdivisons:r,pressedKeyIndices:u,sequencerPlayback:y}),"sequencer"===n?s.createElement(H,{dispatch:t,sequences:p,selectedSequenceIndex:m,displayedAccidental:c,pitches:o,selection:f,playback:y}):"tuning"===n?s.createElement(ce,{dispatch:t,numberOfSubdivisions:r,displayedAccidental:c,notes:i,keys:l,pressedKeyIndices:u}):"synth"===n?s.createElement(re,{dispatch:t,waveform:a}):null))}),null),document.getElementById("root"))}},[[681,1,2]]]);
//# sourceMappingURL=main.384c9baf0fb8093dbc32.js.map