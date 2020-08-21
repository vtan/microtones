(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{697:function(e,t,n){"use strict";n.r(t);var s=n(0),r=n(8),c=n(27);function a(e){const t=Math.pow(2,e),n=1200*e;let s=Math.round(n/100);const r=n-100*s;return 12===s&&(s=0),{rootMultiplier:t,cents:n,nearest12EdoNote:s,diffFromNearest12EdoNote:r}}function i(e,t){let n=Math.abs(e.diffFromNearest12EdoNote)/100;return t&&(n=1-n),Math.pow(n,1/2.2)}function o({diffFromNearest12EdoNote:e}){return 0===e?"":e<0?`− ${Math.abs(e).toFixed(0)}¢`:`+ ${e.toFixed(0)}¢`}const l={sharp:["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],flat:["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]},d=[1,3,6,8,10],u=["q","w","e","r","t","y","u","i","o","p","[","]","\\","a","s","d","f","g","h","j","k","l",";","'","z","x","c","v","b","n","m",",",".","/"],p=Object.assign({},...u.map((e,t)=>({[e]:t})));function f(e){const t=[];let n=0,s=0;return e.forEach((e,r)=>{const c=e.note,a=d.indexOf(c.nearest12EdoNote)>=0,o=i(c,!a);let l=s,p=a?.5:1;if(a)0===n&&(s-=.25,l=s);else if(n>0){const e=.5*(n-1);s-=.25,l=s-e/2,p+=e/2,t[t.length-1-n].width+=e/2}const f={x:l,width:p,isShort:a,color:o,keyboardChar:u[r],pitch:e};t.push(f),f.isShort?++n:n=0,s+=a?.5:1}),t}function m(e){return`hsl(0, 0%, ${(100*e).toFixed(0)}%)`}function y(e,t,n){return n.map((n,s)=>s===e?t(n):n)}const b={numberOfTracks:4,steps:h(16,4),secondsPerStep:.2};function h(e,t){return[...Array(e)].map(e=>function(e){return[...Array(e)].map(e=>({type:"empty"}))}(t))}function g(e){return e.steps.map((t,n)=>({time:e.secondsPerStep*n,stepIndex:n}))}function k(e,t){const n=t.steps.map(e=>[]);return[...Array(t.numberOfTracks)].map((e,t)=>t).forEach((s,r)=>{(function(e,t,n){const s=[];let r;return n.steps.forEach((c,a)=>{const i=c[t];let o;switch(i.type){case"pitch":o={duration:n.secondsPerStep,frequency:e[i.pitchIndex].frequency,pitchIndex:i.pitchIndex},r=o;break;case"empty":r=void 0;break;case"hold":void 0!==r&&(r.duration+=n.secondsPerStep)}void 0!==o&&s.push([a,o])}),s})(e,r,t).forEach(([e,t])=>{n[e].push(t)})}),n}const v={waveform:"triangle",numberOfSubdivisions:12,displayedAccidental:"sharp",sequences:[b]};var S=n(52);const E=["triangle","sawtooth","square","sine","sine3"];function O(e){return"#sequence/1="+function(e){return btoa(S.deflate(JSON.stringify(e),{to:"string"}))}(function(e){const t=E.indexOf(e.waveform);if(t<0)throw new Error(`Invalid waveform: ${e.waveform}`);let n;switch(e.displayedAccidental){case"sharp":n=0;break;case"flat":n=1}const{numberOfSubdivisions:s}=e,r=e.sequences[0],{numberOfTracks:c,secondsPerStep:a,steps:i}=r,o=i.length,l=[];return i.forEach((e,t)=>e.forEach((e,n)=>{if("empty"!==e.type){let s;switch(e.type){case"pitch":s=e.pitchIndex;break;case"hold":s=-1}const r=[o*t+n,s];l.push(r)}})),{wf:t,ac:n,ns:s,s:[{ns:o,nt:c,ss:a,e:l}]}}(e))}function w(e){var t;if(e.startsWith("#sequence/1="))try{const n=e.substr("#sequence/1=".length);return function(e){const t=E[e.wf];if(void 0===t)throw new Error(`Invalid waveform index: ${e.wf}`);const n=e.ns,s=e.s[0];if(void 0===s)throw new Error("No sequence found");let r;switch(e.ac){case 0:r="sharp";break;case 1:r="flat";break;default:throw new Error(`Invalid accidental index: ${e.ac}`)}const c=s.ns,a=s.nt,i=s.ss,o=[...h(c,a).map(e=>[...e])];return s.e.forEach(([e,t])=>{const n=Math.floor(e/c),s=Math.floor(e%c),r=-1===t?{type:"hold"}:{type:"pitch",pitchIndex:t};o[n][s]=r}),{waveform:t,numberOfSubdivisions:n,displayedAccidental:r,sequences:[{numberOfTracks:a,secondsPerStep:i,steps:o}]}}((t=n,JSON.parse(S.inflate(atob(t),{to:"string"}))))}catch(t){return void console.warn(`Failed to import project: ${t}; hash: ${e}`)}}function q({sequences:e,selectedSequenceIndex:t}){const n=e[t];if(void 0===n){const n=`Invalid selectedSequenceIndex: ${t}; has ${e.length} sequences`;throw new Error(n)}return n}function x(e){return new c.b(c.c,{volume:-6,oscillator:{type:e},envelope:{attack:.005,decay:.1,release:1,sustain:.2}}).toDestination()}function I(e){return e<=10?4:e<=15?3:e<=21?2:1}function j(e,t){const n=function(e){const t=[];for(let n=0;n<e;++n){const s=a(n/e);t.push(s)}for(let e=0;e<12;++e){let n;t.forEach((s,r)=>{s.nearest12EdoNote===e&&(void 0===n||Math.abs(t[n].diffFromNearest12EdoNote)>Math.abs(s.diffFromNearest12EdoNote))&&(n=r)}),void 0!==n&&(t[n].nearestTo12EdoNote=e)}return t}(e),s=function(e,t,n,s){const r=[];for(let c=0;c<n;++c){const n=e*Math.pow(2,c-1);r.push(...s.map(e=>({octave:t+c,frequency:n*e.rootMultiplier,note:e})))}return r}(16.0352,0,10,n),r=I(e),c=s.slice(t,t+r*e+1);return{notes:n,pitches:s,keys:f(c)}}function P(e,t){switch(t.type){case"openPanel":return Object.assign(Object.assign({},e),{openPanel:t.panel});case"setNumberOfSubdivisions":{const n=4*t.numberOfSubdivisions;return K(e),Object.assign(Object.assign(Object.assign(Object.assign({},e),{numberOfSubdivisions:t.numberOfSubdivisions}),j(t.numberOfSubdivisions,n)),{keyboardOffset:n,sequences:[b],selectedSequenceIndex:0,sequencerPlayback:void 0,shareUrl:""})}case"setDisplayedAccidental":return Object.assign(Object.assign({},e),{displayedAccidental:t.displayedAccidental,shareUrl:""});case"setKeyboardOffset":{const{pitches:n,numberOfSubdivisions:s}=e,{keyboardOffset:r}=t,c=I(s),a=f(n.slice(r,r+c*s+1));return Object.assign(Object.assign({},e),{keyboardOffset:r,keys:a})}case"setWaveform":if(t.waveform!==e.waveform){const{waveform:n}=t;return e.synth.set({oscillator:{type:n}}),void 0!==e.sequencerPlayback&&e.sequencerPlayback.synth.set({oscillator:{type:n}}),Object.assign(Object.assign({},e),{waveform:n,shareUrl:""})}return e;case"triggerNoteOn":{const n=e.keys[t.keyIndex];if(void 0===n||e.pressedKeyIndices.indexOf(t.keyIndex)>=0)return e;{e.synth.triggerAttack(n.pitch.frequency);const s=[...e.pressedKeyIndices,t.keyIndex];return("sequencer"===e.openPanel&&void 0!==e.sequencerSelection?n=>A(n,{type:"pitch",pitchIndex:t.keyIndex+e.keyboardOffset}):e=>e)(Object.assign(Object.assign({},e),{pressedKeyIndices:s}))}}case"triggerNoteOff":{const n=e.keys[t.keyIndex];if(void 0===n||e.pressedKeyIndices.indexOf(t.keyIndex)<0)return e;{e.synth.triggerRelease(n.pitch.frequency);const s=e.pressedKeyIndices.filter(e=>e!==t.keyIndex);return Object.assign(Object.assign({},e),{pressedKeyIndices:s})}}case"setSequencerSelection":return Object.assign(Object.assign({},e),{sequencerSelection:t.selection});case"moveSequencerSelection":if(void 0===e.sequencerSelection)return Object.assign(Object.assign({},e),{sequencerSelection:{step:0,track:0}});{const n={step:e.sequencerSelection.step+t.diff.step,track:e.sequencerSelection.track+t.diff.track},s=q(e);return n.step>=0&&n.step<s.steps.length&&n.track>=0&&n.track<s.numberOfTracks?Object.assign(Object.assign({},e),{sequencerSelection:n}):e}case"setSelectedStep":return A(e,t.step);case"resizeSequenceSteps":{const n=y(e.selectedSequenceIndex,e=>function(e,t){if(e<1||e>256)return t;if(e<t.steps.length){const n=t.steps.slice(0,e);return Object.assign(Object.assign({},t),{steps:n})}if(e>t.steps.length){const n=e-t.steps.length,s=[...t.steps,...h(n,t.numberOfTracks)];return Object.assign(Object.assign({},t),{steps:s})}return t}(t.numberOfSteps,e),e.sequences),s=Object.assign(Object.assign({},e),{sequences:n}),r=N(s);return Object.assign(Object.assign({},s),{sequencerPlayback:r,shareUrl:""})}case"setSequenceTempo":if(t.secondsPerStep>0){const n=y(e.selectedSequenceIndex,e=>Object.assign(Object.assign({},e),{secondsPerStep:t.secondsPerStep}),e.sequences),s=Object.assign(Object.assign({},e),{sequences:n}),r=N(s);return Object.assign(Object.assign({},s),{sequencerPlayback:r,shareUrl:""})}return e;case"toggleSequencerPlaying":if(void 0===e.sequencerPlayback){const n=C(e,t.dispatch);return Object.assign(Object.assign({},e),{sequencerPlayback:n})}return K(e),Object.assign(Object.assign({},e),{sequencerPlayback:void 0});case"setSequencerPlaybackStepIndex":if(void 0===e.sequencerPlayback)return e;{const n=Object.assign(Object.assign({},e.sequencerPlayback),{currentStepIndex:t.stepIndex});return Object.assign(Object.assign({},e),{sequencerPlayback:n})}case"shareProject":{let t;try{const n=O(e),s=new URL(window.location.href);s.hash=n,t=s.toString()}catch(e){console.warn(`Failed to export project to URL: ${e}`)}return void 0===t?e:Object.assign(Object.assign({},e),{shareUrl:t})}}}function A(e,t){if(void 0===e.sequencerSelection)return e;{const n=q(e),s=function(e,t,n){const s=y(e.step,n=>y(e.track,e=>t,n),n.steps);return Object.assign(Object.assign({},n),{steps:s})}(e.sequencerSelection,t,n);void 0!==e.sequencerPlayback&&(e.sequencerPlayback.stepEventsRef[0]=k(e.pitches,s));const r=y(e.selectedSequenceIndex,e=>s,e.sequences);return Object.assign(Object.assign({},e),{sequences:r,shareUrl:""})}}function C(e,t,n=0){const s=x(e.waveform),r=q(e),a=n>=0&&n<r.steps.length?n:0,i=[k(e.pitches,r)],o=[...g(r)],l=new c.a((e,{stepIndex:n})=>{for(const t of i[0][n])s.triggerAttackRelease(t.frequency,t.duration,e);t({type:"setSequencerPlaybackStepIndex",stepIndex:n})},o),d=r.secondsPerStep*r.steps.length,u=r.secondsPerStep*a;return c.d.cancel(),c.d.start(),l.loopStart=0,l.loopEnd=d,l.loop=!0,l.start(0,u),{synth:s,stepEventsRef:i,dispatch:t,currentStepIndex:a}}function N(e){return void 0===e.sequencerPlayback?void 0:(K(e),C(e,e.sequencerPlayback.dispatch,e.sequencerPlayback.currentStepIndex))}function K(e){if(c.d.stop(),c.d.cancel(),void 0!==e.sequencerPlayback){const t=e.sequencerPlayback.synth;t.releaseAll(),t.disconnect()}}function M(e){window.addEventListener("keydown",(e=>t=>{if(!(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)){const n=p[t.key];void 0!==n&&(t.repeat||e({type:"triggerNoteOn",keyIndex:n}),t.preventDefault())}})(e),!0),window.addEventListener("keyup",(e=>t=>{const n=t.shiftKey||t.ctrlKey||t.altKey||t.metaKey,s=p[t.key];n||void 0===s||(e({type:"triggerNoteOff",keyIndex:s}),t.preventDefault())})(e),!0)}function F(e){const{dispatch:t}=e,n=s.useCallback(e=>n=>1&n.buttons?t({type:"triggerNoteOn",keyIndex:e}):null,[]),r=s.useCallback(e=>()=>t({type:"triggerNoteOff",keyIndex:e}),[]),c=s.useCallback((e,t,c)=>s.createElement("rect",{key:t,onMouseDown:n(t),onMouseUp:r(t),onMouseOver:n(t),onMouseOut:r(t),x:36*e.x,y:"0",width:36*e.width,height:e.isShort?"60%":"100%",stroke:"black",fill:c.indexOf(t)>=0?"#ffeb99":m(e.color)}),[]),a=s.useCallback((e,t)=>{const n=void 0===e.keyboardChar?null:s.createElement(R,{x:36*(e.x+e.width/2),y:"25%",fill:e.isShort?"white":"black"},e.keyboardChar),r=e.isShort||void 0===e.pitch.note.nearestTo12EdoNote?null:s.createElement(R,{x:36*(e.x+e.width/2),y:"95%",fill:"black",fillOpacity:.3},l.sharp[e.pitch.note.nearestTo12EdoNote]);return s.createElement(s.Fragment,{key:"l"+t},n,r)},[]),{keys:i,pressedKeyIndices:o,keyboardOffset:d,numberOfSubdivisons:u}=e,p=s.useMemo(()=>d/u,[d,u]),f=s.useCallback(e=>t({type:"setKeyboardOffset",keyboardOffset:u*parseInt(e.target.value)}),[u]);return s.createElement(T,null,s.createElement(U,null,s.createElement($,null,"Octave"),s.createElement("input",{type:"number",min:0,max:6,value:p,onChange:f})),s.createElement(D,null,i.map((e,t)=>e.isShort?null:c(e,t,o)),i.map((e,t)=>e.isShort?c(e,t,o):null),i.map((e,t)=>a(e,t))))}const T=r.a.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`,U=r.a.div`
  text-align: center;
  & input { text-align: right; }
`,$=r.a.div`
  font-size: 0.8rem;
`,D=r.a.svg`
  width: 100%;
  height: 120px;
  margin-left: 1rem;
`,R=r.a.text`
  pointer-events: none;
  text-anchor: middle;
  text-transform: uppercase;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`,L=[["tuning","Tuning"],["sequencer","Sequencer"],["synth","Synth"]],z=(e,t)=>()=>t({type:"openPanel",panel:e});function B({dispatch:e,openPanel:t}){return s.createElement(G,null,L.map(([n,r])=>s.createElement(J,{key:n,isActive:t===n,onClick:z(n,e)},r)),s.createElement(W,null),s.createElement(J,{href:"https://github.com/vtan/microtones",isActive:!1},"Source code"))}const G=r.a.nav`
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
`,J=r.a.a`
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
`,W=r.a.div`
  flex: auto;
`;var H=n(657);const _=r.a.span`
  margin-right: 1.5rem;
  font-weight: bold;
`,Q=r.a.p`
  margin: 0.25rem 0 0.5rem 0;
  color: #666;
  font-size: 0.8rem;
`;function V({dispatch:e,sequences:t,selectedSequenceIndex:n,displayedAccidental:r,pitches:c,selection:a,playback:i,shareUrl:d}){s.useEffect(()=>{const t=Y(e);return window.addEventListener("keydown",t,!0),()=>window.removeEventListener("keydown",t,!0)},[]);const u=s.useCallback(t=>()=>e({type:"setSequencerSelection",selection:t}),[]),p=s.useCallback(t=>e({type:"resizeSequenceSteps",numberOfSteps:parseInt(t.target.value)}),[]),f=s.useMemo(()=>q({sequences:t,selectedSequenceIndex:n}),[t,n]),m=s.useMemo(()=>60/(4*f.secondsPerStep),[f.secondsPerStep]),[y,b]=s.useState(m),h=s.useCallback(H.throttle(t=>{e({type:"setSequenceTempo",secondsPerStep:60/t/4})},500,{leading:!1}),[]),g=s.useCallback(e=>{const t=parseInt(e.target.value);h(t),b(t)},[h]),k=s.useCallback(()=>e({type:"shareProject"}),[]),v=s.useRef(null);return s.useEffect(()=>{""!==d&&(navigator.clipboard.writeText(d),null!==v.current&&v.current.select())},[d]),s.createElement(s.Fragment,null,s.createElement(Z,null,s.createElement(ee,{onClick:k},"Share & copy URL"),s.createElement(te,{ref:v,readOnly:!0,value:d,style:{width:"20rem"}})),s.createElement(Z,null,s.createElement(_,null,"Steps"),s.createElement(te,{onChange:p,type:"number",min:4,max:256,value:f.steps.length})),s.createElement(Z,null,s.createElement(_,null,"Tempo"),s.createElement(ne,null,y.toFixed(0)),s.createElement("input",{onChange:g,type:"range",min:40,max:200,value:y,style:{width:"16rem"}})),s.createElement(Z,null,s.createElement(ee,{onClick:()=>e({type:"toggleSequencerPlaying",dispatch:e})},void 0===i?"▶":"◼"),s.createElement(ee,{onClick:()=>function(e){e({type:"setSelectedStep",step:{type:"empty"}})}(e)},"Delete note"),s.createElement(ee,{onClick:()=>function(e){e({type:"setSelectedStep",step:{type:"hold"}})}(e)},"Hold note")),s.createElement(se,null,s.createElement("thead",null,s.createElement("tr",null,s.createElement("th",{key:-1}),[...Array(f.numberOfTracks)].map((e,t)=>s.createElement("th",{key:t},"Track ",t+1)))),s.createElement("tbody",null,f.steps.map((e,t)=>{const n=void 0!==a&&a.step===t,d=void 0!==i&&i.currentStepIndex===t;return s.createElement(re,{key:t,isCurrentlyPlayed:d},s.createElement(ce,{key:t},t+1),e.map((e,i)=>{const d=n&&void 0!==a&&a.track===i,p=function(e,t,n){switch(e.type){case"empty":return"_";case"pitch":const r=t[e.pitchIndex],c=l[n][r.note.nearest12EdoNote],a=o(r.note);return s.createElement(s.Fragment,null,c,s.createElement("sub",null,r.octave)," ",a);case"hold":return"|"}}(e,c,r);return s.createElement(ae,{key:i,isSelected:d,onClick:u({step:t,track:i})},p)}))}))),s.createElement(Q,null,"Use the keyboard to enter & delete notes, hold notes (",s.createElement("kbd",null,"↵"),"), start/stop playback (",s.createElement("kbd",null,"Space"),") and move the selection"))}const X={Backspace:()=>({type:"setSelectedStep",step:{type:"empty"}}),Delete:()=>({type:"setSelectedStep",step:{type:"empty"}}),Enter:()=>({type:"setSelectedStep",step:{type:"hold"}}),ArrowLeft:()=>({type:"moveSequencerSelection",diff:{track:-1,step:0}}),ArrowRight:()=>({type:"moveSequencerSelection",diff:{track:1,step:0}}),ArrowUp:()=>({type:"moveSequencerSelection",diff:{step:-1,track:0}}),ArrowDown:()=>({type:"moveSequencerSelection",diff:{step:1,track:0}})," ":e=>({type:"toggleSequencerPlaying",dispatch:e})},Y=e=>t=>{if(!(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)){const n=X[t.key];void 0!==n&&(t.preventDefault(),e(n(e)))}},Z=r.a.div`
  margin-bottom: 0.5rem;

  & > :not(:first-child) {
    margin-left: 0.5rem;
  }
`,ee=r.a.button`
  padding: 0.25rem 0.5rem;
  color: inherit;
  font: inherit;
`,te=r.a.input`
  padding: 0.125rem 0.5rem;
  color: inherit;
  font: inherit;
`,ne=r.a.span`
  display: inline-block;
  width: 2.5rem;
`,se=r.a.table`
  border-collapse: separate; border-spacing: 0;
`,re=r.a.tr`
  background-color: ${e=>e.isCurrentlyPlayed?"#dce8b1":"transparent"};
  height: 1.6rem;

  &:nth-of-type(4n-3) {
    background-color: ${e=>e.isCurrentlyPlayed?"#dce8b1":"#f0f0f0"};
  }
`,ce=r.a.td`
  width: 2rem;
  padding-right: 1rem;
  text-align: right;
  vertical-align: baseline;
`,ae=r.a.td`
  width: 6rem;
  background-color: ${e=>e.isSelected?"#ffeb99":"transparent"}
`;function ie({dispatch:e,waveform:t}){return s.createElement(s.Fragment,null,s.createElement(_,null,"Waveform"),s.createElement("select",{onChange:t=>e({type:"setWaveform",waveform:t.target.value}),value:t},E.map(e=>s.createElement("option",{key:e,value:e},e))))}function oe({dispatch:e,numberOfSubdivisions:t,displayedAccidental:n,notes:r,keys:c,pressedKeyIndices:a}){const u=s.useMemo(()=>a.map(e=>c[e].pitch.note.rootMultiplier),[a,c]),p=s.useMemo(()=>r.map(e=>m(i(e,d.indexOf(e.nearest12EdoNote)<0))),[r]);return s.createElement(s.Fragment,null,s.createElement("div",null,s.createElement(_,null,"Tuning"),s.createElement("select",{onChange:t=>e({type:"setNumberOfSubdivisions",numberOfSubdivisions:Number.parseInt(t.target.value)}),value:t},[12,17,19,24,31,5,7,8,9,10,11,13,14,15,16,18,20,21,22,23].map(e=>s.createElement("option",{key:e,value:e},e,"-EDO"))),s.createElement(Q,null,"Changing the tuning clears the sequencer")),s.createElement("div",null,s.createElement(_,null,"Accidental"),s.createElement("select",{onChange:t=>e({type:"setDisplayedAccidental",displayedAccidental:t.target.value}),value:n},s.createElement("option",{value:"sharp"},"#"),s.createElement("option",{value:"flat"},"b"))),s.createElement(le,null,s.createElement("tbody",null,r.map((e,t)=>{const r=l[n][e.nearest12EdoNote],c=o(e);return s.createElement("tr",{key:t,style:{backgroundColor:u.indexOf(e.rootMultiplier)>=0?"#ffeb99":"transparent"}},s.createElement("td",{style:{backgroundColor:p[t],width:"1lh"}}),s.createElement("td",null,t),s.createElement("td",null,r," ",c))}))))}const le=r.a.table`
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
`;function de(){return function(e){const t=void 0===e?"tuning":"sequencer",{waveform:n,numberOfSubdivisions:s,displayedAccidental:r,sequences:c}=e||v,a=4*s,i=x(n),{notes:o,pitches:l,keys:d}=j(s,a);return{openPanel:t,synth:i,waveform:n,numberOfSubdivisions:s,displayedAccidental:r,notes:o,pitches:l,keys:d,keyboardOffset:a,pressedKeyIndices:[],sequences:c,selectedSequenceIndex:0,shareUrl:""}}(w(window.location.hash))}const ue=r.a.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`,pe=r.a.main`
  flex: auto;
  padding: 1rem;
`;var fe=n(658);Object(fe.render)(s.createElement((function(){const[e,t]=s.useReducer(P,void 0,de),{openPanel:n,numberOfSubdivisions:r,displayedAccidental:c,waveform:a,notes:i,pitches:o,keys:l,keyboardOffset:d,pressedKeyIndices:u,sequences:p,selectedSequenceIndex:f,sequencerSelection:m,sequencerPlayback:y,shareUrl:b}=e;return s.useEffect(()=>M(t),[]),s.createElement(ue,null,s.createElement(B,{dispatch:t,openPanel:n}),s.createElement(pe,null,s.createElement(F,{dispatch:t,keys:l,keyboardOffset:d,numberOfSubdivisons:r,pressedKeyIndices:u}),"sequencer"===n?s.createElement(V,{dispatch:t,sequences:p,selectedSequenceIndex:f,displayedAccidental:c,pitches:o,selection:m,playback:y,shareUrl:b}):"tuning"===n?s.createElement(oe,{dispatch:t,numberOfSubdivisions:r,displayedAccidental:c,notes:i,keys:l,pressedKeyIndices:u}):"synth"===n?s.createElement(ie,{dispatch:t,waveform:a}):null))}),null),document.getElementById("root"))}},[[697,1,2]]]);
//# sourceMappingURL=main.a2030ff5f5f4ba443050.js.map