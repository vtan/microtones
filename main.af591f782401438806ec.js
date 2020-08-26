(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{724:function(e,t,n){"use strict";n.r(t);var s=n(0),r=n(7);function a(e){const t=Math.pow(2,e),n=1200*e;let s=Math.round(n/100);const r=n-100*s;return 12===s&&(s=0),{rootMultiplier:t,cents:n,nearest12EdoNote:s,diffFromNearest12EdoNote:r}}function c(e,t){let n=Math.abs(e.diffFromNearest12EdoNote)/100;return t&&(n=1-n),Math.pow(n,1/2.2)}function i({diffFromNearest12EdoNote:e}){return 0===e?"":e<0?`− ${Math.abs(e).toFixed(0)}¢`:`+ ${e.toFixed(0)}¢`}const l={sharp:["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],flat:["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"]},o=[1,3,6,8,10],u=["q","w","e","r","t","y","u","i","o","p","[","]","\\","a","s","d","f","g","h","j","k","l",";","'","z","x","c","v","b","n","m",",",".","/"],d=Object.assign({},...u.map((e,t)=>({[e]:t})));function p(e){const t=[];let n=0,s=0;return e.forEach((e,r)=>{const a=e.note,i=o.indexOf(a.nearest12EdoNote)>=0,l=c(a,!i);let d=s,p=i?.5:1;if(i)0===n&&(s-=.25,d=s);else if(n>0){const e=.5*(n-1);s-=.25,d=s-e/2,p+=e/2;t[t.length-1-n].width+=e/2}const m={x:d,width:p,isShort:i,color:l,keyboardChar:u[r],pitch:e};t.push(m),m.isShort?++n:n=0,s+=i?.5:1}),t}function m(e){return`hsl(0, 0%, ${(100*e).toFixed(0)}%)`}function b(e,t,n){return n.map((n,s)=>s===e?t(n):n)}const h={numberOfTracks:4,steps:f(16,4),secondsPerStep:.2};function f(e,t){return[...Array(e)].map(e=>function(e){return[...Array(e)].map(e=>({type:"empty"}))}(t))}function y(e){return e.steps.map((t,n)=>({time:e.secondsPerStep*n,stepIndex:n}))}function g(e,t){const n=t.steps.map(e=>[]);return[...Array(t.numberOfTracks)].map((e,t)=>t).forEach((s,r)=>{(function(e,t,n){const s=[];let r;return n.steps.forEach((a,c)=>{const i=a[t];let l;switch(i.type){case"pitch":l={duration:n.secondsPerStep,frequency:e[i.pitchIndex].frequency,pitchIndex:i.pitchIndex},r=l;break;case"empty":r=void 0;break;case"hold":void 0!==r&&(r.duration+=n.secondsPerStep)}void 0!==l&&s.push([c,l])}),s})(e,r,t).forEach(([e,t])=>{n[e].push(t)})}),n}const k={instrument:{synth:{volume:-6,waveform:"triangle",attack:.01,decay:.1,sustain:.2,release:.2},lowPassFilter:{frequency:12800},reverb:{wet:.1,decay:1.5}},numberOfSubdivisions:12,displayedAccidental:"sharp",sequence:h};var v=n(19);class E{constructor(e){this.instrument=e;const{synth:t,lowPassFilter:n,reverb:s}=e;this.reverb=new v.d(w(s)).toDestination(),this.lowPassFilter=new v.a(O(n)).connect(this.reverb),this.synth=new v.c(v.e,S(t)).connect(this.lowPassFilter)}free(){this.synth.releaseAll(),this.synth.disconnect(),this.lowPassFilter.disconnect(),this.reverb.disconnect()}set(e){e.synth!==this.instrument.synth&&this.synth.set(S(e.synth)),e.lowPassFilter!==this.instrument.lowPassFilter&&this.lowPassFilter.set(O(e.lowPassFilter)),e.reverb!==this.instrument.reverb&&this.reverb.set(w(e.reverb)),this.instrument=e}}function S(e){const{volume:t,waveform:n}=e;return{volume:t,oscillator:{type:n},envelope:{attack:e.attack,decay:e.decay,sustain:e.sustain,release:e.release}}}function O(e){return Object.assign(Object.assign({},e),{type:"lowpass"})}function w(e){return Object.assign({},e)}function x(e,t){const n=function(e){const t=[];for(let n=0;n<e;++n){const s=a(n/e);t.push(s)}for(let e=0;e<12;++e){let n;t.forEach((s,r)=>{s.nearest12EdoNote===e&&(void 0===n||Math.abs(t[n].diffFromNearest12EdoNote)>Math.abs(s.diffFromNearest12EdoNote))&&(n=r)}),void 0!==n&&(t[n].nearestTo12EdoNote=e)}return t}(e),s=function(e,t,n,s){const r=[];for(let a=0;a<n;++a){const n=e*Math.pow(2,a-1);r.push(...s.map(e=>({octave:t+a,frequency:n*e.rootMultiplier,note:e})))}return r}(16.0352,0,10,n),r=q(e),c=s.slice(t,t+r*e+1);return{notes:n,pitches:s,keys:p(c)}}function q(e){return e<=10?4:e<=15?3:e<=21?2:1}var P=n(51);function j(e){return"#sequence/1="+function(e){return btoa(P.deflate(JSON.stringify(e),{to:"string"}))}(function(e){let t;switch(e.displayedAccidental){case"sharp":t=0;break;case"flat":t=1}const{numberOfSubdivisions:n,sequence:s}=e,{numberOfTracks:r,secondsPerStep:a,steps:c}=s,i=c.length,l=[];c.forEach((e,t)=>e.forEach((e,n)=>{if("empty"!==e.type){let s;switch(e.type){case"pitch":s=e.pitchIndex;break;case"hold":s=-1}const r=[i*t+n,s];l.push(r)}}));const o={ns:i,nt:r,ss:a,e:l};return{i:e.instrument,ac:t,ns:n,s:[o]}}(e))}function I(e){var t;if(e.startsWith("#sequence/1="))try{const n=e.substr("#sequence/1=".length);return function(e){const t=e.i,n=e.ns,s=e.s[0];if(void 0===s)throw new Error("No sequence found");let r;switch(e.ac){case 0:r="sharp";break;case 1:r="flat";break;default:throw new Error("Invalid accidental index: "+e.ac)}const a=s.ns,c=s.nt,i=s.ss,l=[...f(a,c).map(e=>[...e])];s.e.forEach(([e,t])=>{const n=Math.floor(e/a),s=Math.floor(e%a),r=-1===t?{type:"hold"}:{type:"pitch",pitchIndex:t};l[n][s]=r});return{instrument:t,numberOfSubdivisions:n,displayedAccidental:r,sequence:{numberOfTracks:c,secondsPerStep:i,steps:l}}}((t=n,JSON.parse(P.inflate(atob(t),{to:"string"}))))}catch(t){return void console.warn(`Failed to import project: ${t}; hash: ${e}`)}}function C(e,t,n=0){const s=new E(e.instrument),r=e.sequence,a=n>=0&&n<r.steps.length?n:0,c=[g(e.pitches,r)],i=[...y(r)],l=new v.b((e,{stepIndex:n})=>{for(const t of c[0][n])s.synth.triggerAttackRelease(t.frequency,t.duration,e);t(n)},i),o=r.secondsPerStep*r.steps.length,u=r.secondsPerStep*a;return v.f.cancel(),v.f.start(),l.loopStart=0,l.loopEnd=o,l.loop=!0,l.start(0,u),{instrument:s,stepEventsRef:c,onPlaybackStep:t,currentStepIndex:a}}function F(e){return void 0===e.sequencerPlayback?void 0:(A(e),C(e,e.sequencerPlayback.onPlaybackStep,e.sequencerPlayback.currentStepIndex))}function A(e){v.f.stop(),v.f.cancel(),void 0!==e.sequencerPlayback&&e.sequencerPlayback.instrument.free()}const T=["triangle","sawtooth","square","sine","sine3"];function N(e,t){switch(t.type){case"openPanel":return Object.assign(Object.assign({},e),{openPanel:t.panel});case"setNumberOfSubdivisions":{const n=4*t.numberOfSubdivisions;return A(e),Object.assign(Object.assign(Object.assign(Object.assign({},e),{numberOfSubdivisions:t.numberOfSubdivisions}),x(t.numberOfSubdivisions,n)),{keyboardOffset:n,sequence:h,sequencerPlayback:void 0,shareUrl:""})}case"setDisplayedAccidental":return Object.assign(Object.assign({},e),{displayedAccidental:t.displayedAccidental,shareUrl:""});case"setKeyboardOffset":{const{pitches:n,numberOfSubdivisions:s}=e,{keyboardOffset:r}=t,a=q(s),c=p(n.slice(r,r+a*s+1));return Object.assign(Object.assign({},e),{keyboardOffset:r,keys:c})}case"updateInstrument":{const n=function(e,t){return{synth:t.synth?Object.assign(Object.assign({},e.synth),t.synth):e.synth,lowPassFilter:t.lowPassFilter?Object.assign(Object.assign({},e.lowPassFilter),t.lowPassFilter):e.lowPassFilter,reverb:t.reverb?Object.assign(Object.assign({},e.reverb),t.reverb):e.reverb}}(e.instrument,t.diff);return e.playbackInstrument.set(n),void 0!==e.sequencerPlayback&&e.sequencerPlayback.instrument.set(n),Object.assign(Object.assign({},e),{instrument:n,shareUrl:""})}case"triggerNoteOn":{const n=e.keys[t.keyIndex];if(void 0===n||e.pressedKeyIndices.indexOf(t.keyIndex)>=0)return e;{e.playbackInstrument.synth.triggerAttack(n.pitch.frequency);const s=[...e.pressedKeyIndices,t.keyIndex];return("sequencer"===e.openPanel&&void 0!==e.sequencerSelection?n=>M(n,{type:"pitch",pitchIndex:t.keyIndex+e.keyboardOffset}):e=>e)(Object.assign(Object.assign({},e),{pressedKeyIndices:s}))}}case"triggerNoteOff":{const n=e.keys[t.keyIndex];if(void 0===n||e.pressedKeyIndices.indexOf(t.keyIndex)<0)return e;{e.playbackInstrument.synth.triggerRelease(n.pitch.frequency);const s=e.pressedKeyIndices.filter(e=>e!==t.keyIndex);return Object.assign(Object.assign({},e),{pressedKeyIndices:s})}}case"setSequencerSelection":return Object.assign(Object.assign({},e),{sequencerSelection:t.selection});case"moveSequencerSelection":if(void 0===e.sequencerSelection)return Object.assign(Object.assign({},e),{sequencerSelection:{step:0,track:0}});{const n={step:e.sequencerSelection.step+t.diff.step,track:e.sequencerSelection.track+t.diff.track};return n.step>=0&&n.step<e.sequence.steps.length&&n.track>=0&&n.track<e.sequence.numberOfTracks?Object.assign(Object.assign({},e),{sequencerSelection:n}):e}case"setSelectedStep":return M(e,t.step);case"resizeSequenceSteps":{const n=function(e,t){if(e<1||e>256)return t;if(e<t.steps.length){const n=t.steps.slice(0,e);return Object.assign(Object.assign({},t),{steps:n})}if(e>t.steps.length){const n=e-t.steps.length,s=[...t.steps,...f(n,t.numberOfTracks)];return Object.assign(Object.assign({},t),{steps:s})}return t}(t.numberOfSteps,e.sequence),s=Object.assign(Object.assign({},e),{sequence:n}),r=F(s);return Object.assign(Object.assign({},s),{sequencerPlayback:r,shareUrl:""})}case"setSequenceTempo":if(t.secondsPerStep>0){const n=Object.assign(Object.assign({},e.sequence),{secondsPerStep:t.secondsPerStep}),s=Object.assign(Object.assign({},e),{sequence:n}),r=F(s);return Object.assign(Object.assign({},s),{sequencerPlayback:r,shareUrl:""})}return e;case"toggleSequencerPlaying":if(void 0===e.sequencerPlayback){const n=C(e,e=>t.dispatch({type:"setSequencerPlaybackStepIndex",stepIndex:e}));return Object.assign(Object.assign({},e),{sequencerPlayback:n})}return A(e),Object.assign(Object.assign({},e),{sequencerPlayback:void 0});case"setSequencerPlaybackStepIndex":if(void 0===e.sequencerPlayback)return e;{const n=Object.assign(Object.assign({},e.sequencerPlayback),{currentStepIndex:t.stepIndex});return Object.assign(Object.assign({},e),{sequencerPlayback:n})}case"shareProject":{let t;try{const n=j(e),s=new URL(window.location.href);s.hash=n,t=s.toString()}catch(e){console.warn("Failed to export project to URL: "+e)}return void 0===t?e:Object.assign(Object.assign({},e),{shareUrl:t})}}}function M(e,t){if(void 0===e.sequencerSelection)return e;{const n=function(e,t,n){const s=b(e.step,n=>b(e.track,e=>t,n),n.steps);return Object.assign(Object.assign({},n),{steps:s})}(e.sequencerSelection,t,e.sequence);return void 0!==e.sequencerPlayback&&(e.sequencerPlayback.stepEventsRef[0]=g(e.pitches,n)),Object.assign(Object.assign({},e),{sequence:n,shareUrl:""})}}function K(e,t){window.addEventListener("keydown",(e=>t=>{if(!(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)){const n=d[t.key];void 0!==n&&(t.repeat||e(n),t.preventDefault())}})(e),!0),window.addEventListener("keyup",(e=>t=>{const n=t.shiftKey||t.ctrlKey||t.altKey||t.metaKey,s=d[t.key];n||void 0===s||(e(s),t.preventDefault())})(t),!0)}function U(e){const{dispatch:t}=e,n=s.useCallback(e=>n=>1&n.buttons?t({type:"triggerNoteOn",keyIndex:e}):null,[]),r=s.useCallback(e=>()=>t({type:"triggerNoteOff",keyIndex:e}),[]),a=s.useCallback((e,t,a)=>s.createElement("rect",{key:t,onMouseDown:n(t),onMouseUp:r(t),onMouseOver:n(t),onMouseOut:r(t),x:36*e.x,y:"0",width:36*e.width,height:e.isShort?"60%":"100%",stroke:"black",fill:a.indexOf(t)>=0?"#ffeb99":m(e.color)}),[]),c=s.useCallback((e,t)=>{const n=void 0===e.keyboardChar?null:s.createElement(L,{x:36*(e.x+e.width/2),y:"25%",fill:e.isShort?"white":"black"},e.keyboardChar),r=e.isShort||void 0===e.pitch.note.nearestTo12EdoNote?null:s.createElement(L,{x:36*(e.x+e.width/2),y:"95%",fill:"black",fillOpacity:.3},l.sharp[e.pitch.note.nearestTo12EdoNote]);return s.createElement(s.Fragment,{key:"l"+t},n,r)},[]),{keys:i,pressedKeyIndices:o,keyboardOffset:u,numberOfSubdivisons:d}=e,p=s.useMemo(()=>u/d,[u,d]),b=s.useCallback(e=>t({type:"setKeyboardOffset",keyboardOffset:d*parseInt(e.target.value)}),[d]);return s.createElement(D,null,s.createElement(R,null,s.createElement(z,null,"Octave"),s.createElement(V,{type:"number",min:0,max:6,value:p,onChange:b})),s.createElement($,null,i.map((e,t)=>e.isShort?null:a(e,t,o)),i.map((e,t)=>e.isShort?a(e,t,o):null),i.map((e,t)=>c(e,t))))}const D=r.a.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`,R=r.a.div`
  text-align: center;
  & input { text-align: right; }
`,z=r.a.div`
  font-size: 0.8rem;
`,V=r.a.input`
  width: 2.5rem;
`,$=r.a.svg`
  width: 100%;
  height: 120px;
  margin-left: 1rem;
`,L=r.a.text`
  pointer-events: none;
  text-anchor: middle;
  text-transform: uppercase;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`,B=[["tuning","Tuning"],["sequencer","Sequencer"],["synth","Synth"]],G=(e,t)=>()=>t({type:"openPanel",panel:e});function H({dispatch:e,openPanel:t}){return s.createElement(J,null,B.map(([n,r])=>s.createElement(W,{key:n,isActive:t===n,onClick:G(n,e)},r)),s.createElement(_,null),s.createElement(W,{href:"https://github.com/vtan/microtones",isActive:!1},"Source code"))}const J=r.a.nav`
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
`,W=r.a.a`
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
`,_=r.a.div`
  flex: auto;
`,Q=r.a.div`
  margin-bottom: 0.5rem;

  & > :not(:first-child) {
    margin-left: 0.5rem;
  }
`,X=r.a.span`
  display: inline-block;
  min-width: 7rem;
  margin-right: 0.5rem;
  font-weight: bold;
`,Y=r.a.p`
  margin: 0.25rem 0 0.5rem 0;
  color: #666;
  font-size: 0.8rem;
`;var Z=n(682);const ee=e=>e.toString(),te=({initialValue:e,min:t,max:n,step:r=1,onThrottledChange:a,valueToString:c=ee})=>{const[i,l]=s.useState(e),o=s.useMemo(()=>c(i),[c,i]),u=s.useCallback(Z.throttle(a,300,{leading:!1}),[]),d=s.useCallback(e=>{const s=parseFloat(e.target.value);!isNaN(s)&&s>=t&&s<=n&&(u(s),l(s))},[u]);return s.createElement(s.Fragment,null,s.createElement(ne,null,o),s.createElement(se,{onChange:d,type:"range",min:t,max:n,step:r,value:i}))},ne=r.a.span`
  display: inline-block;
  width: 4rem;
`,se=r.a.input`
  width: 16rem;
  height: 0.75rem;
`;function re({dispatch:e,sequence:t,displayedAccidental:n,pitches:r,selection:a,playbackStepIndex:c,shareUrl:o}){s.useEffect(()=>{const t=ce(e);return window.addEventListener("keydown",t,!0),()=>window.removeEventListener("keydown",t,!0)},[]);const u=s.useCallback(t=>()=>e({type:"setSequencerSelection",selection:t}),[]),d=s.useCallback(t=>e({type:"resizeSequenceSteps",numberOfSteps:parseInt(t.target.value)}),[]),p=s.useMemo(()=>60/(4*t.secondsPerStep),[t.secondsPerStep]),m=s.useCallback(t=>{const n=60/Math.round(t)/4;e({type:"setSequenceTempo",secondsPerStep:n})},[]),b=s.useCallback(()=>e({type:"shareProject"}),[]),h=s.useRef(null);return s.useEffect(()=>{""!==o&&(navigator.clipboard.writeText(o),null!==h.current&&h.current.select())},[o]),s.createElement(s.Fragment,null,s.createElement(Q,null,s.createElement(ie,{onClick:b},"Share & copy URL"),s.createElement(le,{ref:h,readOnly:!0,value:o,style:{width:"20rem"}})),s.createElement(Q,null,s.createElement(X,null,"Steps"),s.createElement(le,{onChange:d,type:"number",min:4,max:256,value:t.steps.length})),s.createElement(Q,null,s.createElement(X,null,"Tempo"),s.createElement(te,{onThrottledChange:m,initialValue:p,min:40,max:200})),s.createElement(Q,null,s.createElement(ie,{onClick:()=>e({type:"toggleSequencerPlaying",dispatch:e}),style:{width:"3.5rem"}},void 0===c?"Play":"Stop"),s.createElement(ie,{onClick:()=>function(e){e({type:"setSelectedStep",step:{type:"empty"}})}(e),disabled:void 0===a},"Delete note"),s.createElement(ie,{onClick:()=>function(e){e({type:"setSelectedStep",step:{type:"hold"}})}(e),disabled:void 0===a},"Hold note")),s.createElement(oe,null,s.createElement("thead",null,s.createElement("tr",null,s.createElement("th",{key:-1}),[...Array(t.numberOfTracks)].map((e,t)=>s.createElement("th",{key:t},"Track ",t+1)))),s.createElement("tbody",null,t.steps.map((e,t)=>{const o=void 0!==a&&a.step===t,d=c===t;return s.createElement(ue,{key:t,isCurrentlyPlayed:d},s.createElement(de,{key:t},t+1),e.map((e,c)=>{const d=o&&void 0!==a&&a.track===c,p=function(e,t,n){switch(e.type){case"empty":return"_";case"pitch":const r=t[e.pitchIndex],a=l[n][r.note.nearest12EdoNote],c=i(r.note);return s.createElement(s.Fragment,null,a,s.createElement("sub",null,r.octave)," ",c);case"hold":return s.createElement("small",null,"hold")}}(e,r,n);return s.createElement(pe,{key:c,isSelected:d,onClick:u({step:t,track:c})},p)}))}))),s.createElement(Y,null,"Use the keyboard to enter & delete notes, hold notes (",s.createElement("kbd",null,"↵"),"), start/stop playback (",s.createElement("kbd",null,"Space"),") and move the selection"))}const ae={Backspace:()=>({type:"setSelectedStep",step:{type:"empty"}}),Delete:()=>({type:"setSelectedStep",step:{type:"empty"}}),Enter:()=>({type:"setSelectedStep",step:{type:"hold"}}),ArrowLeft:()=>({type:"moveSequencerSelection",diff:{track:-1,step:0}}),ArrowRight:()=>({type:"moveSequencerSelection",diff:{track:1,step:0}}),ArrowUp:()=>({type:"moveSequencerSelection",diff:{step:-1,track:0}}),ArrowDown:()=>({type:"moveSequencerSelection",diff:{step:1,track:0}})," ":e=>({type:"toggleSequencerPlaying",dispatch:e})},ce=e=>t=>{if(!(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)){const n=ae[t.key];void 0!==n&&(t.preventDefault(),e(n(e)))}},ie=r.a.button`
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
`,le=r.a.input`
  padding: 0.125rem 0.5rem;
  color: inherit;
  font: inherit;
`,oe=r.a.table`
  margin-top: 2rem;
  border-collapse: separate;
  border-spacing: 0;
`,ue=r.a.tr`
  background-color: ${e=>e.isCurrentlyPlayed?"#dce8b1":"transparent"};
  height: 1.6rem;

  &:nth-of-type(4n-3) {
    background-color: ${e=>e.isCurrentlyPlayed?"#dce8b1":"#f0f0f0"};
  }
`,de=r.a.td`
  width: 2rem;
  padding-right: 1rem;
  text-align: right;
  vertical-align: baseline;
`,pe=r.a.td`
  width: 6rem;
  background-color: ${e=>e.isSelected?"#ffeb99":"transparent"}

  & small {
    font-size: 70%;
  }
`,me=(e,t)=>n=>e({type:"updateInstrument",diff:{synth:{[t]:n}}}),be=(e,t)=>n=>e({type:"updateInstrument",diff:{reverb:{[t]:n}}}),he=e=>e+" dB",fe=e=>e+" s",ye=e=>(100*e).toFixed(0)+"%",ge=e=>{const t=ke(e);return t>=1e4?(t/1e3).toFixed(1)+" kHz":t>=1e3?(t/1e3).toFixed(2)+" kHz":t.toFixed(0)+" Hz"},ke=e=>100*Math.pow(2,e);function ve({dispatch:e,instrument:t}){const{synth:n,lowPassFilter:r,reverb:a}=t,c=s.useMemo(()=>{return e=r.frequency,Math.round(Math.log2(e/100));var e},[r.frequency]),i=s.useCallback(t=>{const n=t.target.value;e({type:"updateInstrument",diff:{synth:{waveform:n}}})},[]),l=s.useCallback(me(e,"volume"),[]),o=s.useCallback(me(e,"attack"),[]),u=s.useCallback(me(e,"decay"),[]),d=s.useCallback(me(e,"sustain"),[]),p=s.useCallback(me(e,"release"),[]),m=s.useCallback(t=>e({type:"updateInstrument",diff:{lowPassFilter:{frequency:ke(t)}}}),[]),b=s.useCallback(be(e,"wet"),[]),h=s.useCallback(be(e,"decay"),[]);return s.createElement(s.Fragment,null,s.createElement(Q,null,s.createElement(X,null,"Waveform"),s.createElement("select",{onChange:i,value:n.waveform},T.map(e=>s.createElement("option",{key:e,value:e},e)))),s.createElement(Q,null,s.createElement(X,null,"Volume"),s.createElement(te,{onThrottledChange:l,initialValue:n.volume,min:-20,max:0,valueToString:he})),s.createElement(Q,null,s.createElement(X,null,"Attack"),s.createElement(te,{onThrottledChange:o,initialValue:n.attack,min:.01,max:.5,step:.01,valueToString:fe})),s.createElement(Q,null,s.createElement(X,null,"Decay"),s.createElement(te,{onThrottledChange:u,initialValue:n.decay,min:.01,max:.5,step:.01,valueToString:fe})),s.createElement(Q,null,s.createElement(X,null,"Sustain"),s.createElement(te,{onThrottledChange:d,initialValue:n.sustain,min:.01,max:1,step:.01,valueToString:ye})),s.createElement(Q,null,s.createElement(X,null,"Release"),s.createElement(te,{onThrottledChange:p,initialValue:n.release,min:.1,max:1.5,step:.1,valueToString:fe})),s.createElement(Q,null,s.createElement(X,null,"Low-pass filter"),s.createElement(te,{onThrottledChange:m,initialValue:c,min:0,max:7.5,step:.1,valueToString:ge})),s.createElement(Q,null,s.createElement(X,null,"Reverb mix"),s.createElement(te,{onThrottledChange:b,initialValue:a.wet,min:0,max:1,step:.05,valueToString:ye})),s.createElement(Q,null,s.createElement(X,null,"Reverb decay"),s.createElement(te,{onThrottledChange:h,initialValue:a.decay,min:.1,max:6,step:.1,valueToString:fe})))}function Ee({dispatch:e,numberOfSubdivisions:t,displayedAccidental:n,notes:r,keys:a,pressedKeyIndices:u}){const d=s.useMemo(()=>u.map(e=>a[e].pitch.note.rootMultiplier),[u,a]),p=s.useMemo(()=>r.map(e=>m(c(e,o.indexOf(e.nearest12EdoNote)<0))),[r]);return s.createElement(s.Fragment,null,s.createElement("div",null,s.createElement(X,null,"Tuning"),s.createElement("select",{onChange:t=>e({type:"setNumberOfSubdivisions",numberOfSubdivisions:Number.parseInt(t.target.value)}),value:t},[12,17,19,24,31,5,7,8,9,10,11,13,14,15,16,18,20,21,22,23].map(e=>s.createElement("option",{key:e,value:e},e,"-EDO"))),s.createElement(Y,null,"Changing the tuning clears the sequencer")),s.createElement("div",null,s.createElement(X,null,"Accidental"),s.createElement("select",{onChange:t=>e({type:"setDisplayedAccidental",displayedAccidental:t.target.value}),value:n},s.createElement("option",{value:"sharp"},"#"),s.createElement("option",{value:"flat"},"b"))),s.createElement(Se,null,s.createElement("tbody",null,r.map((e,t)=>{const r=l[n][e.nearest12EdoNote],a=i(e);return s.createElement("tr",{key:t,style:{backgroundColor:d.indexOf(e.rootMultiplier)>=0?"#ffeb99":"transparent"}},s.createElement("td",{style:{backgroundColor:p[t],width:"1lh"}}),s.createElement("td",null,t),s.createElement("td",null,r," ",a))}))))}const Se=r.a.table`
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
`;function Oe(){return function(e){const t=void 0===e?"tuning":"sequencer",{instrument:n,numberOfSubdivisions:s,displayedAccidental:r,sequence:a}=e||k,c=4*s,i=new E(n),{notes:l,pitches:o,keys:u}=x(s,c);return{openPanel:t,playbackInstrument:i,instrument:n,numberOfSubdivisions:s,displayedAccidental:r,notes:l,pitches:o,keys:u,keyboardOffset:c,pressedKeyIndices:[],sequence:a,shareUrl:""}}(I(window.location.hash))}const we=r.a.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`,xe=r.a.main`
  flex: auto;
  padding: 1rem;
`;var qe=n(683);Object(qe.render)(s.createElement((function(){const[e,t]=s.useReducer(N,void 0,Oe),{openPanel:n,numberOfSubdivisions:r,displayedAccidental:a,instrument:c,notes:i,pitches:l,keys:o,keyboardOffset:u,pressedKeyIndices:d,sequence:p,sequencerSelection:m,sequencerPlayback:b,shareUrl:h}=e;return s.useEffect(()=>{K(e=>t({type:"triggerNoteOn",keyIndex:e}),e=>t({type:"triggerNoteOff",keyIndex:e}))},[]),s.createElement(we,null,s.createElement(H,{dispatch:t,openPanel:n}),s.createElement(xe,null,s.createElement(U,{dispatch:t,keys:o,keyboardOffset:u,numberOfSubdivisons:r,pressedKeyIndices:d}),"sequencer"===n?s.createElement(re,{dispatch:t,sequence:p,displayedAccidental:a,pitches:l,selection:m,playbackStepIndex:b&&b.currentStepIndex,shareUrl:h}):"tuning"===n?s.createElement(Ee,{dispatch:t,numberOfSubdivisions:r,displayedAccidental:a,notes:i,keys:o,pressedKeyIndices:d}):"synth"===n?s.createElement(ve,{dispatch:t,instrument:c}):null))}),null),document.getElementById("root"))}},[[724,1,2]]]);
//# sourceMappingURL=main.af591f782401438806ec.js.map