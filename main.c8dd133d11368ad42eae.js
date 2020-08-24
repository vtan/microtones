(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{724:function(e,t,n){"use strict";n.r(t);var s=n(0),r=n(7);function a(e){const t=Math.pow(2,e),n=1200*e;let s=Math.round(n/100);const r=n-100*s;return 12===s&&(s=0),{rootMultiplier:t,cents:n,nearest12EdoNote:s,diffFromNearest12EdoNote:r}}function c(e,t){let n=Math.abs(e.diffFromNearest12EdoNote)/100;return t&&(n=1-n),Math.pow(n,1/2.2)}function o({diffFromNearest12EdoNote:e}){return 0===e?"":e<0?`− ${Math.abs(e).toFixed(0)}¢`:`+ ${e.toFixed(0)}¢`}const i={sharp:["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],flat:["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]},l=[1,3,6,8,10],d=["q","w","e","r","t","y","u","i","o","p","[","]","\\","a","s","d","f","g","h","j","k","l",";","'","z","x","c","v","b","n","m",",",".","/"],u=Object.assign({},...d.map((e,t)=>({[e]:t})));function p(e){const t=[];let n=0,s=0;return e.forEach((e,r)=>{const a=e.note,o=l.indexOf(a.nearest12EdoNote)>=0,i=c(a,!o);let u=s,p=o?.5:1;if(o)0===n&&(s-=.25,u=s);else if(n>0){const e=.5*(n-1);s-=.25,u=s-e/2,p+=e/2;t[t.length-1-n].width+=e/2}const f={x:u,width:p,isShort:o,color:i,keyboardChar:d[r],pitch:e};t.push(f),f.isShort?++n:n=0,s+=o?.5:1}),t}function f(e){return`hsl(0, 0%, ${(100*e).toFixed(0)}%)`}function m(e,t,n){return n.map((n,s)=>s===e?t(n):n)}const b={numberOfTracks:4,steps:y(16,4),secondsPerStep:.2};function y(e,t){return[...Array(e)].map(e=>function(e){return[...Array(e)].map(e=>({type:"empty"}))}(t))}function h(e){return e.steps.map((t,n)=>({time:e.secondsPerStep*n,stepIndex:n}))}function g(e,t){const n=t.steps.map(e=>[]);return[...Array(t.numberOfTracks)].map((e,t)=>t).forEach((s,r)=>{(function(e,t,n){const s=[];let r;return n.steps.forEach((a,c)=>{const o=a[t];let i;switch(o.type){case"pitch":i={duration:n.secondsPerStep,frequency:e[o.pitchIndex].frequency,pitchIndex:o.pitchIndex},r=i;break;case"empty":r=void 0;break;case"hold":void 0!==r&&(r.duration+=n.secondsPerStep)}void 0!==i&&s.push([c,i])}),s})(e,r,t).forEach(([e,t])=>{n[e].push(t)})}),n}const k={waveform:"triangle",numberOfSubdivisions:12,displayedAccidental:"sharp",sequence:b};var v=n(23);const E=["triangle","sawtooth","square","sine","sine3"];function O(e){return new v.b(v.c,{volume:-6,oscillator:{type:e},envelope:{attack:.005,decay:.1,release:1,sustain:.2}}).toDestination()}function S(e,t){const n=function(e){const t=[];for(let n=0;n<e;++n){const s=a(n/e);t.push(s)}for(let e=0;e<12;++e){let n;t.forEach((s,r)=>{s.nearest12EdoNote===e&&(void 0===n||Math.abs(t[n].diffFromNearest12EdoNote)>Math.abs(s.diffFromNearest12EdoNote))&&(n=r)}),void 0!==n&&(t[n].nearestTo12EdoNote=e)}return t}(e),s=function(e,t,n,s){const r=[];for(let a=0;a<n;++a){const n=e*Math.pow(2,a-1);r.push(...s.map(e=>({octave:t+a,frequency:n*e.rootMultiplier,note:e})))}return r}(16.0352,0,10,n),r=w(e),c=s.slice(t,t+r*e+1);return{notes:n,pitches:s,keys:p(c)}}function w(e){return e<=10?4:e<=15?3:e<=21?2:1}var q=n(51);function x(e){return"#sequence/1="+function(e){return btoa(q.deflate(JSON.stringify(e),{to:"string"}))}(function(e){const t=E.indexOf(e.waveform);if(t<0)throw new Error("Invalid waveform: "+e.waveform);let n;switch(e.displayedAccidental){case"sharp":n=0;break;case"flat":n=1}const{numberOfSubdivisions:s,sequence:r}=e,{numberOfTracks:a,secondsPerStep:c,steps:o}=r,i=o.length,l=[];o.forEach((e,t)=>e.forEach((e,n)=>{if("empty"!==e.type){let s;switch(e.type){case"pitch":s=e.pitchIndex;break;case"hold":s=-1}const r=[i*t+n,s];l.push(r)}}));return{wf:t,ac:n,ns:s,s:[{ns:i,nt:a,ss:c,e:l}]}}(e))}function j(e){var t;if(e.startsWith("#sequence/1="))try{const n=e.substr("#sequence/1=".length);return function(e){const t=E[e.wf];if(void 0===t)throw new Error("Invalid waveform index: "+e.wf);const n=e.ns,s=e.s[0];if(void 0===s)throw new Error("No sequence found");let r;switch(e.ac){case 0:r="sharp";break;case 1:r="flat";break;default:throw new Error("Invalid accidental index: "+e.ac)}const a=s.ns,c=s.nt,o=s.ss,i=[...y(a,c).map(e=>[...e])];s.e.forEach(([e,t])=>{const n=Math.floor(e/a),s=Math.floor(e%a),r=-1===t?{type:"hold"}:{type:"pitch",pitchIndex:t};i[n][s]=r});return{waveform:t,numberOfSubdivisions:n,displayedAccidental:r,sequence:{numberOfTracks:c,secondsPerStep:o,steps:i}}}((t=n,JSON.parse(q.inflate(atob(t),{to:"string"}))))}catch(t){return void console.warn(`Failed to import project: ${t}; hash: ${e}`)}}function P(e,t,n=0){const s=O(e.waveform),r=e.sequence,a=n>=0&&n<r.steps.length?n:0,c=[g(e.pitches,r)],o=[...h(r)],i=new v.a((e,{stepIndex:n})=>{for(const t of c[0][n])s.triggerAttackRelease(t.frequency,t.duration,e);t(n)},o),l=r.secondsPerStep*r.steps.length,d=r.secondsPerStep*a;return v.d.cancel(),v.d.start(),i.loopStart=0,i.loopEnd=l,i.loop=!0,i.start(0,d),{synth:s,stepEventsRef:c,onPlaybackStep:t,currentStepIndex:a}}function I(e){return void 0===e.sequencerPlayback?void 0:(A(e),P(e,e.sequencerPlayback.onPlaybackStep,e.sequencerPlayback.currentStepIndex))}function A(e){if(v.d.stop(),v.d.cancel(),void 0!==e.sequencerPlayback){const t=e.sequencerPlayback.synth;t.releaseAll(),t.disconnect()}}function C(e,t){switch(t.type){case"openPanel":return Object.assign(Object.assign({},e),{openPanel:t.panel});case"setNumberOfSubdivisions":{const n=4*t.numberOfSubdivisions;return A(e),Object.assign(Object.assign(Object.assign(Object.assign({},e),{numberOfSubdivisions:t.numberOfSubdivisions}),S(t.numberOfSubdivisions,n)),{keyboardOffset:n,sequence:b,sequencerPlayback:void 0,shareUrl:""})}case"setDisplayedAccidental":return Object.assign(Object.assign({},e),{displayedAccidental:t.displayedAccidental,shareUrl:""});case"setKeyboardOffset":{const{pitches:n,numberOfSubdivisions:s}=e,{keyboardOffset:r}=t,a=w(s),c=p(n.slice(r,r+a*s+1));return Object.assign(Object.assign({},e),{keyboardOffset:r,keys:c})}case"setWaveform":if(t.waveform!==e.waveform){const{waveform:n}=t;return e.synth.set({oscillator:{type:n}}),void 0!==e.sequencerPlayback&&e.sequencerPlayback.synth.set({oscillator:{type:n}}),Object.assign(Object.assign({},e),{waveform:n,shareUrl:""})}return e;case"triggerNoteOn":{const n=e.keys[t.keyIndex];if(void 0===n||e.pressedKeyIndices.indexOf(t.keyIndex)>=0)return e;{e.synth.triggerAttack(n.pitch.frequency);const s=[...e.pressedKeyIndices,t.keyIndex];return("sequencer"===e.openPanel&&void 0!==e.sequencerSelection?n=>N(n,{type:"pitch",pitchIndex:t.keyIndex+e.keyboardOffset}):e=>e)(Object.assign(Object.assign({},e),{pressedKeyIndices:s}))}}case"triggerNoteOff":{const n=e.keys[t.keyIndex];if(void 0===n||e.pressedKeyIndices.indexOf(t.keyIndex)<0)return e;{e.synth.triggerRelease(n.pitch.frequency);const s=e.pressedKeyIndices.filter(e=>e!==t.keyIndex);return Object.assign(Object.assign({},e),{pressedKeyIndices:s})}}case"setSequencerSelection":return Object.assign(Object.assign({},e),{sequencerSelection:t.selection});case"moveSequencerSelection":if(void 0===e.sequencerSelection)return Object.assign(Object.assign({},e),{sequencerSelection:{step:0,track:0}});{const n={step:e.sequencerSelection.step+t.diff.step,track:e.sequencerSelection.track+t.diff.track};return n.step>=0&&n.step<e.sequence.steps.length&&n.track>=0&&n.track<e.sequence.numberOfTracks?Object.assign(Object.assign({},e),{sequencerSelection:n}):e}case"setSelectedStep":return N(e,t.step);case"resizeSequenceSteps":{const n=function(e,t){if(e<1||e>256)return t;if(e<t.steps.length){const n=t.steps.slice(0,e);return Object.assign(Object.assign({},t),{steps:n})}if(e>t.steps.length){const n=e-t.steps.length,s=[...t.steps,...y(n,t.numberOfTracks)];return Object.assign(Object.assign({},t),{steps:s})}return t}(t.numberOfSteps,e.sequence),s=Object.assign(Object.assign({},e),{sequence:n}),r=I(s);return Object.assign(Object.assign({},s),{sequencerPlayback:r,shareUrl:""})}case"setSequenceTempo":if(t.secondsPerStep>0){const n=Object.assign(Object.assign({},e.sequence),{secondsPerStep:t.secondsPerStep}),s=Object.assign(Object.assign({},e),{sequence:n}),r=I(s);return Object.assign(Object.assign({},s),{sequencerPlayback:r,shareUrl:""})}return e;case"toggleSequencerPlaying":if(void 0===e.sequencerPlayback){const n=P(e,e=>t.dispatch({type:"setSequencerPlaybackStepIndex",stepIndex:e}));return Object.assign(Object.assign({},e),{sequencerPlayback:n})}return A(e),Object.assign(Object.assign({},e),{sequencerPlayback:void 0});case"setSequencerPlaybackStepIndex":if(void 0===e.sequencerPlayback)return e;{const n=Object.assign(Object.assign({},e.sequencerPlayback),{currentStepIndex:t.stepIndex});return Object.assign(Object.assign({},e),{sequencerPlayback:n})}case"shareProject":{let t;try{const n=x(e),s=new URL(window.location.href);s.hash=n,t=s.toString()}catch(e){console.warn("Failed to export project to URL: "+e)}return void 0===t?e:Object.assign(Object.assign({},e),{shareUrl:t})}}}function N(e,t){if(void 0===e.sequencerSelection)return e;{const n=function(e,t,n){const s=m(e.step,n=>m(e.track,e=>t,n),n.steps);return Object.assign(Object.assign({},n),{steps:s})}(e.sequencerSelection,t,e.sequence);return void 0!==e.sequencerPlayback&&(e.sequencerPlayback.stepEventsRef[0]=g(e.pitches,n)),Object.assign(Object.assign({},e),{sequence:n,shareUrl:""})}}function K(e){window.addEventListener("keydown",(e=>t=>{if(!(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)){const n=u[t.key];void 0!==n&&(t.repeat||e({type:"triggerNoteOn",keyIndex:n}),t.preventDefault())}})(e),!0),window.addEventListener("keyup",(e=>t=>{const n=t.shiftKey||t.ctrlKey||t.altKey||t.metaKey,s=u[t.key];n||void 0===s||(e({type:"triggerNoteOff",keyIndex:s}),t.preventDefault())})(e),!0)}function M(e){const{dispatch:t}=e,n=s.useCallback(e=>n=>1&n.buttons?t({type:"triggerNoteOn",keyIndex:e}):null,[]),r=s.useCallback(e=>()=>t({type:"triggerNoteOff",keyIndex:e}),[]),a=s.useCallback((e,t,a)=>s.createElement("rect",{key:t,onMouseDown:n(t),onMouseUp:r(t),onMouseOver:n(t),onMouseOut:r(t),x:36*e.x,y:"0",width:36*e.width,height:e.isShort?"60%":"100%",stroke:"black",fill:a.indexOf(t)>=0?"#ffeb99":f(e.color)}),[]),c=s.useCallback((e,t)=>{const n=void 0===e.keyboardChar?null:s.createElement($,{x:36*(e.x+e.width/2),y:"25%",fill:e.isShort?"white":"black"},e.keyboardChar),r=e.isShort||void 0===e.pitch.note.nearestTo12EdoNote?null:s.createElement($,{x:36*(e.x+e.width/2),y:"95%",fill:"black",fillOpacity:.3},i.sharp[e.pitch.note.nearestTo12EdoNote]);return s.createElement(s.Fragment,{key:"l"+t},n,r)},[]),{keys:o,pressedKeyIndices:l,keyboardOffset:d,numberOfSubdivisons:u}=e,p=s.useMemo(()=>d/u,[d,u]),m=s.useCallback(e=>t({type:"setKeyboardOffset",keyboardOffset:u*parseInt(e.target.value)}),[u]);return s.createElement(F,null,s.createElement(T,null,s.createElement(U,null,"Octave"),s.createElement(D,{type:"number",min:0,max:6,value:p,onChange:m})),s.createElement(R,null,o.map((e,t)=>e.isShort?null:a(e,t,l)),o.map((e,t)=>e.isShort?a(e,t,l):null),o.map((e,t)=>c(e,t))))}const F=r.a.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`,T=r.a.div`
  text-align: center;
  & input { text-align: right; }
`,U=r.a.div`
  font-size: 0.8rem;
`,D=r.a.input`
  width: 2.5rem;
`,R=r.a.svg`
  width: 100%;
  height: 120px;
  margin-left: 1rem;
`,$=r.a.text`
  pointer-events: none;
  text-anchor: middle;
  text-transform: uppercase;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`,z=[["tuning","Tuning"],["sequencer","Sequencer"],["synth","Synth"]],L=(e,t)=>()=>t({type:"openPanel",panel:e});function B({dispatch:e,openPanel:t}){return s.createElement(G,null,z.map(([n,r])=>s.createElement(J,{key:n,isActive:t===n,onClick:L(n,e)},r)),s.createElement(W,null),s.createElement(J,{href:"https://github.com/vtan/microtones",isActive:!1},"Source code"))}const G=r.a.nav`
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
`;var H=n(682);const _=r.a.span`
  margin-right: 1.5rem;
  font-weight: bold;
`,Q=r.a.p`
  margin: 0.25rem 0 0.5rem 0;
  color: #666;
  font-size: 0.8rem;
`;function V({dispatch:e,sequence:t,displayedAccidental:n,pitches:r,selection:a,playback:c,shareUrl:l}){s.useEffect(()=>{const t=Y(e);return window.addEventListener("keydown",t,!0),()=>window.removeEventListener("keydown",t,!0)},[]);const d=s.useCallback(t=>()=>e({type:"setSequencerSelection",selection:t}),[]),u=s.useCallback(t=>e({type:"resizeSequenceSteps",numberOfSteps:parseInt(t.target.value)}),[]),p=s.useMemo(()=>60/(4*t.secondsPerStep),[t.secondsPerStep]),[f,m]=s.useState(p),b=s.useCallback(H.throttle(t=>{e({type:"setSequenceTempo",secondsPerStep:60/t/4})},500,{leading:!1}),[]),y=s.useCallback(e=>{const t=parseInt(e.target.value);b(t),m(t)},[b]),h=s.useCallback(()=>e({type:"shareProject"}),[]),g=s.useRef(null);return s.useEffect(()=>{""!==l&&(navigator.clipboard.writeText(l),null!==g.current&&g.current.select())},[l]),s.createElement(s.Fragment,null,s.createElement(Z,null,s.createElement(ee,{onClick:h},"Share & copy URL"),s.createElement(te,{ref:g,readOnly:!0,value:l,style:{width:"20rem"}})),s.createElement(Z,null,s.createElement(_,null,"Steps"),s.createElement(te,{onChange:u,type:"number",min:4,max:256,value:t.steps.length})),s.createElement(Z,null,s.createElement(_,null,"Tempo"),s.createElement(ne,null,f.toFixed(0)),s.createElement(se,{onChange:y,type:"range",min:40,max:200,value:f})),s.createElement(Z,null,s.createElement(ee,{onClick:()=>e({type:"toggleSequencerPlaying",dispatch:e}),style:{width:"3.5rem"}},void 0===c?"Play":"Stop"),s.createElement(ee,{onClick:()=>function(e){e({type:"setSelectedStep",step:{type:"empty"}})}(e),disabled:void 0===a},"Delete note"),s.createElement(ee,{onClick:()=>function(e){e({type:"setSelectedStep",step:{type:"hold"}})}(e),disabled:void 0===a},"Hold note")),s.createElement(re,null,s.createElement("thead",null,s.createElement("tr",null,s.createElement("th",{key:-1}),[...Array(t.numberOfTracks)].map((e,t)=>s.createElement("th",{key:t},"Track ",t+1)))),s.createElement("tbody",null,t.steps.map((e,t)=>{const l=void 0!==a&&a.step===t,u=void 0!==c&&c.currentStepIndex===t;return s.createElement(ae,{key:t,isCurrentlyPlayed:u},s.createElement(ce,{key:t},t+1),e.map((e,c)=>{const u=l&&void 0!==a&&a.track===c,p=function(e,t,n){switch(e.type){case"empty":return"_";case"pitch":const r=t[e.pitchIndex],a=i[n][r.note.nearest12EdoNote],c=o(r.note);return s.createElement(s.Fragment,null,a,s.createElement("sub",null,r.octave)," ",c);case"hold":return s.createElement("small",null,"hold")}}(e,r,n);return s.createElement(oe,{key:c,isSelected:u,onClick:d({step:t,track:c})},p)}))}))),s.createElement(Q,null,"Use the keyboard to enter & delete notes, hold notes (",s.createElement("kbd",null,"↵"),"), start/stop playback (",s.createElement("kbd",null,"Space"),") and move the selection"))}const X={Backspace:()=>({type:"setSelectedStep",step:{type:"empty"}}),Delete:()=>({type:"setSelectedStep",step:{type:"empty"}}),Enter:()=>({type:"setSelectedStep",step:{type:"hold"}}),ArrowLeft:()=>({type:"moveSequencerSelection",diff:{track:-1,step:0}}),ArrowRight:()=>({type:"moveSequencerSelection",diff:{track:1,step:0}}),ArrowUp:()=>({type:"moveSequencerSelection",diff:{step:-1,track:0}}),ArrowDown:()=>({type:"moveSequencerSelection",diff:{step:1,track:0}})," ":e=>({type:"toggleSequencerPlaying",dispatch:e})},Y=e=>t=>{if(!(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)){const n=X[t.key];void 0!==n&&(t.preventDefault(),e(n(e)))}},Z=r.a.div`
  margin-bottom: 0.5rem;

  & > :not(:first-child) {
    margin-left: 0.5rem;
  }
`,ee=r.a.button`
  padding: 0.25rem 0.5rem;
  border: 1px solid #bbb;
  border-radius: 4px;
  background-color: #f0f0f0;
  color: inherit;
  font: inherit;

  &:disabled {
    background-color: #ddd;
  }
  &:hover:not(:disabled) {
    background-color: #f8f8f8;
  }
`,te=r.a.input`
  padding: 0.125rem 0.5rem;
  color: inherit;
  font: inherit;
`,ne=r.a.span`
  display: inline-block;
  width: 2.5rem;
`,se=r.a.input`
  width: 16rem;
  height: 0.75rem;
`,re=r.a.table`
  margin-top: 2rem;
  border-collapse: separate;
  border-spacing: 0;
`,ae=r.a.tr`
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
`,oe=r.a.td`
  width: 6rem;
  background-color: ${e=>e.isSelected?"#ffeb99":"transparent"}

  & small {
    font-size: 70%;
  }
`;function ie({dispatch:e,waveform:t}){return s.createElement(s.Fragment,null,s.createElement(_,null,"Waveform"),s.createElement("select",{onChange:t=>e({type:"setWaveform",waveform:t.target.value}),value:t},E.map(e=>s.createElement("option",{key:e,value:e},e))))}function le({dispatch:e,numberOfSubdivisions:t,displayedAccidental:n,notes:r,keys:a,pressedKeyIndices:d}){const u=s.useMemo(()=>d.map(e=>a[e].pitch.note.rootMultiplier),[d,a]),p=s.useMemo(()=>r.map(e=>f(c(e,l.indexOf(e.nearest12EdoNote)<0))),[r]);return s.createElement(s.Fragment,null,s.createElement("div",null,s.createElement(_,null,"Tuning"),s.createElement("select",{onChange:t=>e({type:"setNumberOfSubdivisions",numberOfSubdivisions:Number.parseInt(t.target.value)}),value:t},[12,17,19,24,31,5,7,8,9,10,11,13,14,15,16,18,20,21,22,23].map(e=>s.createElement("option",{key:e,value:e},e,"-EDO"))),s.createElement(Q,null,"Changing the tuning clears the sequencer")),s.createElement("div",null,s.createElement(_,null,"Accidental"),s.createElement("select",{onChange:t=>e({type:"setDisplayedAccidental",displayedAccidental:t.target.value}),value:n},s.createElement("option",{value:"sharp"},"#"),s.createElement("option",{value:"flat"},"b"))),s.createElement(de,null,s.createElement("tbody",null,r.map((e,t)=>{const r=i[n][e.nearest12EdoNote],a=o(e);return s.createElement("tr",{key:t,style:{backgroundColor:u.indexOf(e.rootMultiplier)>=0?"#ffeb99":"transparent"}},s.createElement("td",{style:{backgroundColor:p[t],width:"1lh"}}),s.createElement("td",null,t),s.createElement("td",null,r," ",a))}))))}const de=r.a.table`
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
`;function ue(){return function(e){const t=void 0===e?"tuning":"sequencer",{waveform:n,numberOfSubdivisions:s,displayedAccidental:r,sequence:a}=e||k,c=4*s,o=O(n),{notes:i,pitches:l,keys:d}=S(s,c);return{openPanel:t,synth:o,waveform:n,numberOfSubdivisions:s,displayedAccidental:r,notes:i,pitches:l,keys:d,keyboardOffset:c,pressedKeyIndices:[],sequence:a,shareUrl:""}}(j(window.location.hash))}const pe=r.a.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`,fe=r.a.main`
  flex: auto;
  padding: 1rem;
`;var me=n(683);Object(me.render)(s.createElement((function(){const[e,t]=s.useReducer(C,void 0,ue),{openPanel:n,numberOfSubdivisions:r,displayedAccidental:a,waveform:c,notes:o,pitches:i,keys:l,keyboardOffset:d,pressedKeyIndices:u,sequence:p,sequencerSelection:f,sequencerPlayback:m,shareUrl:b}=e;return s.useEffect(()=>K(t),[]),s.createElement(pe,null,s.createElement(B,{dispatch:t,openPanel:n}),s.createElement(fe,null,s.createElement(M,{dispatch:t,keys:l,keyboardOffset:d,numberOfSubdivisons:r,pressedKeyIndices:u}),"sequencer"===n?s.createElement(V,{dispatch:t,sequence:p,displayedAccidental:a,pitches:i,selection:f,playback:m,shareUrl:b}):"tuning"===n?s.createElement(le,{dispatch:t,numberOfSubdivisions:r,displayedAccidental:a,notes:o,keys:l,pressedKeyIndices:u}):"synth"===n?s.createElement(ie,{dispatch:t,waveform:c}):null))}),null),document.getElementById("root"))}},[[724,1,2]]]);
//# sourceMappingURL=main.c8dd133d11368ad42eae.js.map