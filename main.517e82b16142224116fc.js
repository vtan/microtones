(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{724:function(e,t,n){"use strict";n.r(t);var s=n(0),a=n(7);function r(e){const t=Math.pow(2,e),n=1200*e;let s=Math.round(n/100);const a=n-100*s;return 12===s&&(s=0),{rootMultiplier:t,cents:n,nearest12EdoNote:s,diffFromNearest12EdoNote:a}}function c(e,t){let n=Math.abs(e.diffFromNearest12EdoNote)/100;return t&&(n=1-n),Math.pow(n,1/2.2)}function i({diffFromNearest12EdoNote:e}){return 0===e?"":e<0?`− ${Math.abs(e).toFixed(0)}¢`:`+ ${e.toFixed(0)}¢`}const l={sharp:["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],flat:["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]},o=[1,3,6,8,10],u=["q","w","e","r","t","y","u","i","o","p","[","]","\\","a","s","d","f","g","h","j","k","l",";","'","z","x","c","v","b","n","m",",",".","/"],d=Object.assign({},...u.map((e,t)=>({[e]:t})));function p(e){const t=[];let n=0,s=0;return e.forEach((e,a)=>{const r=e.note,i=o.indexOf(r.nearest12EdoNote)>=0,l=c(r,!i);let d=s,p=i?.5:1;if(i)0===n&&(s-=.25,d=s);else if(n>0){const e=.5*(n-1);s-=.25,d=s-e/2,p+=e/2;t[t.length-1-n].width+=e/2}const m={x:d,width:p,isShort:i,color:l,keyboardChar:u[a],pitch:e};t.push(m),m.isShort?++n:n=0,s+=i?.5:1}),t}function m(e){return`hsl(0, 0%, ${(100*e).toFixed(0)}%)`}function y(e,t,n){return n.map((n,s)=>s===e?t(n):n)}const f={numberOfTracks:4,steps:b(16,4),secondsPerStep:.2};function b(e,t){return[...Array(e)].map(e=>function(e){return[...Array(e)].map(e=>({type:"empty"}))}(t))}function h(e){return e.steps.map((t,n)=>({time:e.secondsPerStep*n,stepIndex:n}))}function g(e,t){const n=t.steps.map(e=>[]);return[...Array(t.numberOfTracks)].map((e,t)=>t).forEach((s,a)=>{(function(e,t,n){const s=[];let a;return n.steps.forEach((r,c)=>{const i=r[t];let l;switch(i.type){case"pitch":l={duration:n.secondsPerStep,frequency:e[i.pitchIndex].frequency,pitchIndex:i.pitchIndex},a=l;break;case"empty":a=void 0;break;case"hold":void 0!==a&&(a.duration+=n.secondsPerStep)}void 0!==l&&s.push([c,l])}),s})(e,a,t).forEach(([e,t])=>{n[e].push(t)})}),n}const k={synth:{volume:-6,waveform:"triangle",amplitudeAttack:.01,amplitudeDecay:.1,amplitudeSustain:.2,amplitudeRelease:.2},numberOfSubdivisions:12,displayedAccidental:"sharp",sequence:f};var v=n(23);const S=["triangle","sawtooth","square","sine","sine3"];function E(e){const{volume:t,waveform:n}=e;return{volume:t,oscillator:{type:n},envelope:{attack:e.amplitudeAttack,decay:e.amplitudeDecay,sustain:e.amplitudeSustain,release:e.amplitudeRelease}}}function O(e){return new v.b(v.c,E(e)).toDestination()}function x(e,t){const n=function(e){const t=[];for(let n=0;n<e;++n){const s=r(n/e);t.push(s)}for(let e=0;e<12;++e){let n;t.forEach((s,a)=>{s.nearest12EdoNote===e&&(void 0===n||Math.abs(t[n].diffFromNearest12EdoNote)>Math.abs(s.diffFromNearest12EdoNote))&&(n=a)}),void 0!==n&&(t[n].nearestTo12EdoNote=e)}return t}(e),s=function(e,t,n,s){const a=[];for(let r=0;r<n;++r){const n=e*Math.pow(2,r-1);a.push(...s.map(e=>({octave:t+r,frequency:n*e.rootMultiplier,note:e})))}return a}(16.0352,0,10,n),a=q(e),c=s.slice(t,t+a*e+1);return{notes:n,pitches:s,keys:p(c)}}function q(e){return e<=10?4:e<=15?3:e<=21?2:1}var w=n(51);function j(e){return"#sequence/1="+function(e){return btoa(w.deflate(JSON.stringify(e),{to:"string"}))}(function(e){let t;switch(e.displayedAccidental){case"sharp":t=0;break;case"flat":t=1}const{numberOfSubdivisions:n,sequence:s}=e,{numberOfTracks:a,secondsPerStep:r,steps:c}=s,i=c.length,l=[];c.forEach((e,t)=>e.forEach((e,n)=>{if("empty"!==e.type){let s;switch(e.type){case"pitch":s=e.pitchIndex;break;case"hold":s=-1}const a=[i*t+n,s];l.push(a)}}));const o={ns:i,nt:a,ss:r,e:l};return{sy:e.synth,ac:t,ns:n,s:[o]}}(e))}function P(e){var t;if(e.startsWith("#sequence/1="))try{const n=e.substr("#sequence/1=".length);return function(e){const t=e.sy,n=e.ns,s=e.s[0];if(void 0===s)throw new Error("No sequence found");let a;switch(e.ac){case 0:a="sharp";break;case 1:a="flat";break;default:throw new Error("Invalid accidental index: "+e.ac)}const r=s.ns,c=s.nt,i=s.ss,l=[...b(r,c).map(e=>[...e])];s.e.forEach(([e,t])=>{const n=Math.floor(e/r),s=Math.floor(e%r),a=-1===t?{type:"hold"}:{type:"pitch",pitchIndex:t};l[n][s]=a});return{synth:t,numberOfSubdivisions:n,displayedAccidental:a,sequence:{numberOfTracks:c,secondsPerStep:i,steps:l}}}((t=n,JSON.parse(w.inflate(atob(t),{to:"string"}))))}catch(t){return void console.warn(`Failed to import project: ${t}; hash: ${e}`)}}function C(e,t,n=0){const s=O(e.synth),a=e.sequence,r=n>=0&&n<a.steps.length?n:0,c=[g(e.pitches,a)],i=[...h(a)],l=new v.a((e,{stepIndex:n})=>{for(const t of c[0][n])s.triggerAttackRelease(t.frequency,t.duration,e);t(n)},i),o=a.secondsPerStep*a.steps.length,u=a.secondsPerStep*r;return v.d.cancel(),v.d.start(),l.loopStart=0,l.loopEnd=o,l.loop=!0,l.start(0,u),{synth:s,stepEventsRef:c,onPlaybackStep:t,currentStepIndex:r}}function I(e){return void 0===e.sequencerPlayback?void 0:(A(e),C(e,e.sequencerPlayback.onPlaybackStep,e.sequencerPlayback.currentStepIndex))}function A(e){if(v.d.stop(),v.d.cancel(),void 0!==e.sequencerPlayback){const t=e.sequencerPlayback.synth;t.releaseAll(),t.disconnect()}}function N(e,t){switch(t.type){case"openPanel":return Object.assign(Object.assign({},e),{openPanel:t.panel});case"setNumberOfSubdivisions":{const n=4*t.numberOfSubdivisions;return A(e),Object.assign(Object.assign(Object.assign(Object.assign({},e),{numberOfSubdivisions:t.numberOfSubdivisions}),x(t.numberOfSubdivisions,n)),{keyboardOffset:n,sequence:f,sequencerPlayback:void 0,shareUrl:""})}case"setDisplayedAccidental":return Object.assign(Object.assign({},e),{displayedAccidental:t.displayedAccidental,shareUrl:""});case"setKeyboardOffset":{const{pitches:n,numberOfSubdivisions:s}=e,{keyboardOffset:a}=t,r=q(s),c=p(n.slice(a,a+r*s+1));return Object.assign(Object.assign({},e),{keyboardOffset:a,keys:c})}case"updateSynth":{const n=Object.assign(Object.assign({},e.synth),t.synthDiff),s=E(n);return e.playbackSynth.set(s),void 0!==e.sequencerPlayback&&e.sequencerPlayback.synth.set(s),Object.assign(Object.assign({},e),{synth:n,shareUrl:""})}case"triggerNoteOn":{const n=e.keys[t.keyIndex];if(void 0===n||e.pressedKeyIndices.indexOf(t.keyIndex)>=0)return e;{e.playbackSynth.triggerAttack(n.pitch.frequency);const s=[...e.pressedKeyIndices,t.keyIndex];return("sequencer"===e.openPanel&&void 0!==e.sequencerSelection?n=>T(n,{type:"pitch",pitchIndex:t.keyIndex+e.keyboardOffset}):e=>e)(Object.assign(Object.assign({},e),{pressedKeyIndices:s}))}}case"triggerNoteOff":{const n=e.keys[t.keyIndex];if(void 0===n||e.pressedKeyIndices.indexOf(t.keyIndex)<0)return e;{e.playbackSynth.triggerRelease(n.pitch.frequency);const s=e.pressedKeyIndices.filter(e=>e!==t.keyIndex);return Object.assign(Object.assign({},e),{pressedKeyIndices:s})}}case"setSequencerSelection":return Object.assign(Object.assign({},e),{sequencerSelection:t.selection});case"moveSequencerSelection":if(void 0===e.sequencerSelection)return Object.assign(Object.assign({},e),{sequencerSelection:{step:0,track:0}});{const n={step:e.sequencerSelection.step+t.diff.step,track:e.sequencerSelection.track+t.diff.track};return n.step>=0&&n.step<e.sequence.steps.length&&n.track>=0&&n.track<e.sequence.numberOfTracks?Object.assign(Object.assign({},e),{sequencerSelection:n}):e}case"setSelectedStep":return T(e,t.step);case"resizeSequenceSteps":{const n=function(e,t){if(e<1||e>256)return t;if(e<t.steps.length){const n=t.steps.slice(0,e);return Object.assign(Object.assign({},t),{steps:n})}if(e>t.steps.length){const n=e-t.steps.length,s=[...t.steps,...b(n,t.numberOfTracks)];return Object.assign(Object.assign({},t),{steps:s})}return t}(t.numberOfSteps,e.sequence),s=Object.assign(Object.assign({},e),{sequence:n}),a=I(s);return Object.assign(Object.assign({},s),{sequencerPlayback:a,shareUrl:""})}case"setSequenceTempo":if(t.secondsPerStep>0){const n=Object.assign(Object.assign({},e.sequence),{secondsPerStep:t.secondsPerStep}),s=Object.assign(Object.assign({},e),{sequence:n}),a=I(s);return Object.assign(Object.assign({},s),{sequencerPlayback:a,shareUrl:""})}return e;case"toggleSequencerPlaying":if(void 0===e.sequencerPlayback){const n=C(e,e=>t.dispatch({type:"setSequencerPlaybackStepIndex",stepIndex:e}));return Object.assign(Object.assign({},e),{sequencerPlayback:n})}return A(e),Object.assign(Object.assign({},e),{sequencerPlayback:void 0});case"setSequencerPlaybackStepIndex":if(void 0===e.sequencerPlayback)return e;{const n=Object.assign(Object.assign({},e.sequencerPlayback),{currentStepIndex:t.stepIndex});return Object.assign(Object.assign({},e),{sequencerPlayback:n})}case"shareProject":{let t;try{const n=j(e),s=new URL(window.location.href);s.hash=n,t=s.toString()}catch(e){console.warn("Failed to export project to URL: "+e)}return void 0===t?e:Object.assign(Object.assign({},e),{shareUrl:t})}}}function T(e,t){if(void 0===e.sequencerSelection)return e;{const n=function(e,t,n){const s=y(e.step,n=>y(e.track,e=>t,n),n.steps);return Object.assign(Object.assign({},n),{steps:s})}(e.sequencerSelection,t,e.sequence);return void 0!==e.sequencerPlayback&&(e.sequencerPlayback.stepEventsRef[0]=g(e.pitches,n)),Object.assign(Object.assign({},e),{sequence:n,shareUrl:""})}}function K(e,t){window.addEventListener("keydown",(e=>t=>{if(!(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)){const n=d[t.key];void 0!==n&&(t.repeat||e(n),t.preventDefault())}})(e),!0),window.addEventListener("keyup",(e=>t=>{const n=t.shiftKey||t.ctrlKey||t.altKey||t.metaKey,s=d[t.key];n||void 0===s||(e(s),t.preventDefault())})(t),!0)}function M(e){const{dispatch:t}=e,n=s.useCallback(e=>n=>1&n.buttons?t({type:"triggerNoteOn",keyIndex:e}):null,[]),a=s.useCallback(e=>()=>t({type:"triggerNoteOff",keyIndex:e}),[]),r=s.useCallback((e,t,r)=>s.createElement("rect",{key:t,onMouseDown:n(t),onMouseUp:a(t),onMouseOver:n(t),onMouseOut:a(t),x:36*e.x,y:"0",width:36*e.width,height:e.isShort?"60%":"100%",stroke:"black",fill:r.indexOf(t)>=0?"#ffeb99":m(e.color)}),[]),c=s.useCallback((e,t)=>{const n=void 0===e.keyboardChar?null:s.createElement(z,{x:36*(e.x+e.width/2),y:"25%",fill:e.isShort?"white":"black"},e.keyboardChar),a=e.isShort||void 0===e.pitch.note.nearestTo12EdoNote?null:s.createElement(z,{x:36*(e.x+e.width/2),y:"95%",fill:"black",fillOpacity:.3},l.sharp[e.pitch.note.nearestTo12EdoNote]);return s.createElement(s.Fragment,{key:"l"+t},n,a)},[]),{keys:i,pressedKeyIndices:o,keyboardOffset:u,numberOfSubdivisons:d}=e,p=s.useMemo(()=>u/d,[u,d]),y=s.useCallback(e=>t({type:"setKeyboardOffset",keyboardOffset:d*parseInt(e.target.value)}),[d]);return s.createElement(D,null,s.createElement(F,null,s.createElement(U,null,"Octave"),s.createElement(R,{type:"number",min:0,max:6,value:p,onChange:y})),s.createElement($,null,i.map((e,t)=>e.isShort?null:r(e,t,o)),i.map((e,t)=>e.isShort?r(e,t,o):null),i.map((e,t)=>c(e,t))))}const D=a.a.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`,F=a.a.div`
  text-align: center;
  & input { text-align: right; }
`,U=a.a.div`
  font-size: 0.8rem;
`,R=a.a.input`
  width: 2.5rem;
`,$=a.a.svg`
  width: 100%;
  height: 120px;
  margin-left: 1rem;
`,z=a.a.text`
  pointer-events: none;
  text-anchor: middle;
  text-transform: uppercase;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`,L=[["tuning","Tuning"],["sequencer","Sequencer"],["synth","Synth"]],V=(e,t)=>()=>t({type:"openPanel",panel:e});function B({dispatch:e,openPanel:t}){return s.createElement(G,null,L.map(([n,a])=>s.createElement(J,{key:n,isActive:t===n,onClick:V(n,e)},a)),s.createElement(W,null),s.createElement(J,{href:"https://github.com/vtan/microtones",isActive:!1},"Source code"))}const G=a.a.nav`
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
`,J=a.a.a`
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
`,W=a.a.div`
  flex: auto;
`,H=a.a.div`
  margin-bottom: 0.5rem;

  & > :not(:first-child) {
    margin-left: 0.5rem;
  }
`,_=a.a.span`
  display: inline-block;
  min-width: 6rem;
  margin-right: 0.5rem;
  font-weight: bold;
`,Q=a.a.p`
  margin: 0.25rem 0 0.5rem 0;
  color: #666;
  font-size: 0.8rem;
`;var X=n(682);const Y=e=>e.toString(),Z=({initialValue:e,min:t,max:n,step:a=1,onThrottledChange:r,valueToString:c=Y})=>{const[i,l]=s.useState(e),o=s.useMemo(()=>c(i),[c,i]),u=s.useCallback(X.throttle(r,300,{leading:!1}),[]),d=s.useCallback(e=>{const s=parseFloat(e.target.value);!isNaN(s)&&s>=t&&s<=n&&(u(s),l(s))},[u]);return s.createElement(s.Fragment,null,s.createElement(ee,null,o),s.createElement(te,{onChange:d,type:"range",min:t,max:n,step:a,value:i}))},ee=a.a.span`
  display: inline-block;
  width: 3rem;
`,te=a.a.input`
  width: 16rem;
  height: 0.75rem;
`;function ne({dispatch:e,sequence:t,displayedAccidental:n,pitches:a,selection:r,playbackStepIndex:c,shareUrl:o}){s.useEffect(()=>{const t=ae(e);return window.addEventListener("keydown",t,!0),()=>window.removeEventListener("keydown",t,!0)},[]);const u=s.useCallback(t=>()=>e({type:"setSequencerSelection",selection:t}),[]),d=s.useCallback(t=>e({type:"resizeSequenceSteps",numberOfSteps:parseInt(t.target.value)}),[]),p=s.useMemo(()=>60/(4*t.secondsPerStep),[t.secondsPerStep]),m=s.useCallback(t=>{const n=60/Math.round(t)/4;e({type:"setSequenceTempo",secondsPerStep:n})},[]),y=s.useCallback(()=>e({type:"shareProject"}),[]),f=s.useRef(null);return s.useEffect(()=>{""!==o&&(navigator.clipboard.writeText(o),null!==f.current&&f.current.select())},[o]),s.createElement(s.Fragment,null,s.createElement(H,null,s.createElement(re,{onClick:y},"Share & copy URL"),s.createElement(ce,{ref:f,readOnly:!0,value:o,style:{width:"20rem"}})),s.createElement(H,null,s.createElement(_,null,"Steps"),s.createElement(ce,{onChange:d,type:"number",min:4,max:256,value:t.steps.length})),s.createElement(H,null,s.createElement(_,null,"Tempo"),s.createElement(Z,{onThrottledChange:m,initialValue:p,min:40,max:200})),s.createElement(H,null,s.createElement(re,{onClick:()=>e({type:"toggleSequencerPlaying",dispatch:e}),style:{width:"3.5rem"}},void 0===c?"Play":"Stop"),s.createElement(re,{onClick:()=>function(e){e({type:"setSelectedStep",step:{type:"empty"}})}(e),disabled:void 0===r},"Delete note"),s.createElement(re,{onClick:()=>function(e){e({type:"setSelectedStep",step:{type:"hold"}})}(e),disabled:void 0===r},"Hold note")),s.createElement(ie,null,s.createElement("thead",null,s.createElement("tr",null,s.createElement("th",{key:-1}),[...Array(t.numberOfTracks)].map((e,t)=>s.createElement("th",{key:t},"Track ",t+1)))),s.createElement("tbody",null,t.steps.map((e,t)=>{const o=void 0!==r&&r.step===t,d=c===t;return s.createElement(le,{key:t,isCurrentlyPlayed:d},s.createElement(oe,{key:t},t+1),e.map((e,c)=>{const d=o&&void 0!==r&&r.track===c,p=function(e,t,n){switch(e.type){case"empty":return"_";case"pitch":const a=t[e.pitchIndex],r=l[n][a.note.nearest12EdoNote],c=i(a.note);return s.createElement(s.Fragment,null,r,s.createElement("sub",null,a.octave)," ",c);case"hold":return s.createElement("small",null,"hold")}}(e,a,n);return s.createElement(ue,{key:c,isSelected:d,onClick:u({step:t,track:c})},p)}))}))),s.createElement(Q,null,"Use the keyboard to enter & delete notes, hold notes (",s.createElement("kbd",null,"↵"),"), start/stop playback (",s.createElement("kbd",null,"Space"),") and move the selection"))}const se={Backspace:()=>({type:"setSelectedStep",step:{type:"empty"}}),Delete:()=>({type:"setSelectedStep",step:{type:"empty"}}),Enter:()=>({type:"setSelectedStep",step:{type:"hold"}}),ArrowLeft:()=>({type:"moveSequencerSelection",diff:{track:-1,step:0}}),ArrowRight:()=>({type:"moveSequencerSelection",diff:{track:1,step:0}}),ArrowUp:()=>({type:"moveSequencerSelection",diff:{step:-1,track:0}}),ArrowDown:()=>({type:"moveSequencerSelection",diff:{step:1,track:0}})," ":e=>({type:"toggleSequencerPlaying",dispatch:e})},ae=e=>t=>{if(!(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)){const n=se[t.key];void 0!==n&&(t.preventDefault(),e(n(e)))}},re=a.a.button`
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
`,ce=a.a.input`
  padding: 0.125rem 0.5rem;
  color: inherit;
  font: inherit;
`,ie=a.a.table`
  margin-top: 2rem;
  border-collapse: separate;
  border-spacing: 0;
`,le=a.a.tr`
  background-color: ${e=>e.isCurrentlyPlayed?"#dce8b1":"transparent"};
  height: 1.6rem;

  &:nth-of-type(4n-3) {
    background-color: ${e=>e.isCurrentlyPlayed?"#dce8b1":"#f0f0f0"};
  }
`,oe=a.a.td`
  width: 2rem;
  padding-right: 1rem;
  text-align: right;
  vertical-align: baseline;
`,ue=a.a.td`
  width: 6rem;
  background-color: ${e=>e.isSelected?"#ffeb99":"transparent"}

  & small {
    font-size: 70%;
  }
`,de=(e,t)=>n=>e({type:"updateSynth",synthDiff:{[t]:n}}),pe=e=>e+" dB",me=e=>e+" s",ye=e=>(100*e).toFixed(0)+"%";function fe({dispatch:e,synth:t}){const n=s.useCallback(t=>{const n=t.target.value;e({type:"updateSynth",synthDiff:{waveform:n}})},[]),a=s.useCallback(de(e,"volume"),[]),r=s.useCallback(de(e,"amplitudeAttack"),[]),c=s.useCallback(de(e,"amplitudeDecay"),[]),i=s.useCallback(de(e,"amplitudeSustain"),[]),l=s.useCallback(de(e,"amplitudeRelease"),[]);return s.createElement(s.Fragment,null,s.createElement(H,null,s.createElement(_,null,"Waveform"),s.createElement("select",{onChange:n,value:t.waveform},S.map(e=>s.createElement("option",{key:e,value:e},e)))),s.createElement(H,null,s.createElement(_,null,"Volume"),s.createElement(Z,{onThrottledChange:a,initialValue:t.volume,min:-20,max:0,valueToString:pe})),s.createElement(H,null,s.createElement(_,null,"Attack"),s.createElement(Z,{onThrottledChange:r,initialValue:t.amplitudeAttack,min:.01,max:.5,step:.01,valueToString:me})),s.createElement(H,null,s.createElement(_,null,"Decay"),s.createElement(Z,{onThrottledChange:c,initialValue:t.amplitudeDecay,min:.01,max:.5,step:.01,valueToString:me})),s.createElement(H,null,s.createElement(_,null,"Sustain"),s.createElement(Z,{onThrottledChange:i,initialValue:t.amplitudeSustain,min:.01,max:1,step:.01,valueToString:ye})),s.createElement(H,null,s.createElement(_,null,"Release"),s.createElement(Z,{onThrottledChange:l,initialValue:t.amplitudeRelease,min:.1,max:1.5,step:.1,valueToString:me})))}function be({dispatch:e,numberOfSubdivisions:t,displayedAccidental:n,notes:a,keys:r,pressedKeyIndices:u}){const d=s.useMemo(()=>u.map(e=>r[e].pitch.note.rootMultiplier),[u,r]),p=s.useMemo(()=>a.map(e=>m(c(e,o.indexOf(e.nearest12EdoNote)<0))),[a]);return s.createElement(s.Fragment,null,s.createElement("div",null,s.createElement(_,null,"Tuning"),s.createElement("select",{onChange:t=>e({type:"setNumberOfSubdivisions",numberOfSubdivisions:Number.parseInt(t.target.value)}),value:t},[12,17,19,24,31,5,7,8,9,10,11,13,14,15,16,18,20,21,22,23].map(e=>s.createElement("option",{key:e,value:e},e,"-EDO"))),s.createElement(Q,null,"Changing the tuning clears the sequencer")),s.createElement("div",null,s.createElement(_,null,"Accidental"),s.createElement("select",{onChange:t=>e({type:"setDisplayedAccidental",displayedAccidental:t.target.value}),value:n},s.createElement("option",{value:"sharp"},"#"),s.createElement("option",{value:"flat"},"b"))),s.createElement(he,null,s.createElement("tbody",null,a.map((e,t)=>{const a=l[n][e.nearest12EdoNote],r=i(e);return s.createElement("tr",{key:t,style:{backgroundColor:d.indexOf(e.rootMultiplier)>=0?"#ffeb99":"transparent"}},s.createElement("td",{style:{backgroundColor:p[t],width:"1lh"}}),s.createElement("td",null,t),s.createElement("td",null,a," ",r))}))))}const he=a.a.table`
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
`;function ge(){return function(e){const t=void 0===e?"tuning":"sequencer",{synth:n,numberOfSubdivisions:s,displayedAccidental:a,sequence:r}=e||k,c=4*s,i=O(n),{notes:l,pitches:o,keys:u}=x(s,c);return{openPanel:t,playbackSynth:i,synth:n,numberOfSubdivisions:s,displayedAccidental:a,notes:l,pitches:o,keys:u,keyboardOffset:c,pressedKeyIndices:[],sequence:r,shareUrl:""}}(P(window.location.hash))}const ke=a.a.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`,ve=a.a.main`
  flex: auto;
  padding: 1rem;
`;var Se=n(683);Object(Se.render)(s.createElement((function(){const[e,t]=s.useReducer(N,void 0,ge),{openPanel:n,numberOfSubdivisions:a,displayedAccidental:r,synth:c,notes:i,pitches:l,keys:o,keyboardOffset:u,pressedKeyIndices:d,sequence:p,sequencerSelection:m,sequencerPlayback:y,shareUrl:f}=e;return s.useEffect(()=>{K(e=>t({type:"triggerNoteOn",keyIndex:e}),e=>t({type:"triggerNoteOff",keyIndex:e}))},[]),s.createElement(ke,null,s.createElement(B,{dispatch:t,openPanel:n}),s.createElement(ve,null,s.createElement(M,{dispatch:t,keys:o,keyboardOffset:u,numberOfSubdivisons:a,pressedKeyIndices:d}),"sequencer"===n?s.createElement(ne,{dispatch:t,sequence:p,displayedAccidental:r,pitches:l,selection:m,playbackStepIndex:y&&y.currentStepIndex,shareUrl:f}):"tuning"===n?s.createElement(be,{dispatch:t,numberOfSubdivisions:a,displayedAccidental:r,notes:i,keys:o,pressedKeyIndices:d}):"synth"===n?s.createElement(fe,{dispatch:t,synth:c}):null))}),null),document.getElementById("root"))}},[[724,1,2]]]);
//# sourceMappingURL=main.517e82b16142224116fc.js.map