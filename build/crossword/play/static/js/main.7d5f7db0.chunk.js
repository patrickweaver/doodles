(this.webpackJsonpcrossword=this.webpackJsonpcrossword||[]).push([[0],{21:function(e,t,r){e.exports=r(42)},26:function(e,t,r){},27:function(e,t,r){},28:function(e,t,r){},29:function(e,t,r){},30:function(e,t,r){},31:function(e,t,r){},32:function(e,t,r){},33:function(e,t,r){},34:function(e,t,r){},40:function(e,t,r){},41:function(e,t,r){},42:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),c=r(19),o=r.n(c),u=(r(26),r(7)),l=r(2),i=(r(27),r(9)),s=r(1);r(28),r(29),r(30);var d=function(e){var t="game"===e.mode&&e.checkAnswers?e.answer===e.square.letter?"correct":"incorrect":"",r="",n=e.selectedSquare[0]===e.square.acrossWordNumber,c=e.selectedSquare[1]===e.square.downWordNumber;(n&&"across"===e.selectedDirection||c&&"down"===e.selectedDirection)&&e.square.active&&(r="selected-word",n&&c&&(r+=" selected-square"));var o=a.a.createElement("div",{className:"letter"},a.a.createElement("input",{id:"".concat(e.square.squareNumber,"-input"),className:t,type:"text",value:e.square.letter||"",onChange:function(t){var r=e.square,n=t.target;if(r.letter=n.value.toUpperCase(),e.setBoardSquare(r),n.setSelectionRange(0,n.value.length),0!==r.letter.length){var a="down"===e.selectedDirection?"down":"right";e.moveInput(e.square.squareNumber,a)}},onClick:function(t){e.onSelectSquare(e.square.acrossWordNumber||0,e.square.downWordNumber||0);var r=t.target;r.setSelectionRange(0,r.value.length)},maxLength:1,onKeyDown:function(t){var r=null;"ArrowUp"!==t.key&&"ArrrowDown"!==t.key||t.preventDefault(),("ArrowUp"===t.key||"down"===e.selectedDirection&&"Backspace"===t.key)&&(r="up"),("ArrowLeft"===t.key||"across"===e.selectedDirection&&"Backspace"===t.key)&&(r="left"),"ArrowDown"===t.key&&(r="down"),"ArrowRight"===t.key&&(r="right"),null!==r&&e.moveInput(e.square.squareNumber,r)},autoComplete:"off"}));return a.a.createElement("div",{className:"board-square ".concat(e.square.active?r:"inactive"),onDoubleClick:function(t){if("game"!==e.mode){e.onSelectSquare(-1,-1);var r=e.square;r.active=!r.active,r.letter="",e.setBoardSquare(r)}}},a.a.createElement("div",{className:"clue-number"},"".concat(e.square.wordStart[0]?e.square.acrossWordNumber:e.square.wordStart[1]?e.square.downWordNumber:"")),e.square.active?o:null)};var m=function(e){var t=function(t,r){var n=e.boardSize-1,a=e.mode,c=[];if("diagonal"===a||"square"===a){var o=[n-t,n-r];c.push(o)}if("horizontal"===a||"horizontal-vertical"===a||"square"===a){var u=[t,n-r];c.push(u)}if("vertical"===a||"horizontal-vertical"===a||"square"===a){var l=[n-t,r];c.push(l)}return function(n){var a=Object(i.a)(e.board),o=n.active;a[t][r]=n,c.forEach((function(e){var t=Object(s.a)(e,2),r=t[0],n=t[1];a[r][n].active=o})),e.updateBoard(a)}};function r(t,r){var n=t+{right:1,left:-1,down:e.boardSize,up:-e.boardSize}[r],a=document.getElementById("".concat(n,"-input")),c=a;if(a){c.focus(),c.select();var o=e.board.flat().filter((function(e){return e.squareNumber===n}));if(o&&o[0]){var u=o[0];e.onSelectSquare(u.acrossWordNumber||0,u.downWordNumber||0)}}}var n=e.board.map((function(n,c){return a.a.createElement("div",{key:"row-".concat(c),className:"board-row"},n.map((function(n,o){var u=e.correctBoard?e.correctBoard[c][o].letter:null;return a.a.createElement(d,{key:"".concat(c,"-").concat(o),rowIndex:c,colIndex:o,boardSize:e.boardSize,square:n,setBoardSquare:t(c,o),mode:e.mode,answer:u,selectedSquare:e.selectedSquare,onSelectSquare:e.onSelectSquare,selectedDirection:e.selectedDirection,moveInput:r,checkAnswers:e.checkAnswers})})))})),c=a.a.createElement("div",{id:"board"},n);return a.a.createElement("div",null,a.a.createElement("h2",null,"Board"),c)};r(31);function f(e){var t,r=Object(n.useState)(!1),c=Object(s.a)(r,2),o=c[0],u=c[1],l=Object(n.useState)(e.boardSize),i=Object(s.a)(l,2),d=i[0],m=i[1];return t=o?a.a.createElement("div",null,a.a.createElement("label",{className:"bs-label"},"Update Board Size:"),a.a.createElement("input",{className:"bs-element",type:"number",value:d,onChange:function(e){var t=parseInt(e.target.value);m(t)}}),a.a.createElement("button",{className:"bs-element",onClick:function(){u(!1),e.updateBoardSize(d)}},"Save")):a.a.createElement("div",null,a.a.createElement("h4",{className:"bs-element"},"Board Size: ",e.boardSize),a.a.createElement("button",{className:"bs-element",onClick:function(){return u(!0)}},"Change")),a.a.createElement("div",{id:"board-size"},t)}r(32),r(33);var b=function(e){var t=Object(n.useRef)(null),r=Object(n.useState)(0),c=Object(s.a)(r,2),o=c[0],u=c[1];Object(n.useEffect)((function(){if(t.current&&null!==o){var e=o||0;t.current.setSelectionRange(e,e),u(null)}}),[o]);var l,i,d={background:"repeating-linear-gradient(90deg, black 0, black 1.25ch, transparent 0, transparent 2ch) 5px 85%/ ".concat(2*e.clueAnswer.answer.length,"ch 1px no-repeat"),width:"Calc(2ch * ".concat(e.clueAnswer.answer.length," - 1px)")};return"editor"===e.mode?(l=a.a.createElement("li",null,a.a.createElement("label",{className:"ca-label"},"Answer:"),a.a.createElement("input",{style:d,className:"answer",ref:t,value:e.clueAnswer.answer,onChange:function(t){var r=t.target,n=r.value,a=r.selectionStart;u(a||0),e.updateClueAnswer("answer",n.toUpperCase(),e.index,e.dirIndex,a||0)},autoComplete:"off"})),i=a.a.createElement("li",null,a.a.createElement("label",{className:"ca-label"},"Clue:"),a.a.createElement("input",{className:"clue",value:e.clueAnswer.clue,onChange:function(t){var r=t.target.value;e.updateClueAnswer("clue",r,e.index,e.dirIndex)},autoComplete:"off"}))):i=a.a.createElement("li",null,a.a.createElement("p",null,e.clueAnswer.clue)),a.a.createElement("ul",{className:"clue-answer"},i,l)};var w=function(e){function t(t,r,n,a,c){e.updateClueAnswer&&e.updateClueAnswer(t,r,a,n,c)}var r=function(r,n){return a.a.createElement("ol",{className:"clue-answers-list"},r.map((function(r,c){return a.a.createElement("li",{key:c,value:r.number},a.a.createElement(b,{clueAnswer:r,updateClueAnswer:t,dirIndex:n,index:c,mode:e.mode}))})))};return a.a.createElement("div",null,a.a.createElement("ul",{className:"clue-answers-sections"},a.a.createElement("li",null,a.a.createElement("h3",null,"Across:"),r(e.clueAnswers[0],0)),a.a.createElement("li",null,a.a.createElement("h3",null,"Down:"),r(e.clueAnswers[1],1))))};r(34);function v(e){return a.a.createElement("div",{className:"mode-select"},a.a.createElement("h4",null,"Toggle Square Symmetry Mode:"),a.a.createElement("select",{onChange:e.onChange},a.a.createElement("option",null,"normal"),a.a.createElement("option",null,"horizontal"),a.a.createElement("option",null,"vertical"),a.a.createElement("option",null,"diagonal"),a.a.createElement("option",null,"horizontal-vertical"),a.a.createElement("option",null,"square")))}function p(e,t,r){return{active:!0,letter:"",wordStart:[!1,!1],acrossWordNumber:null,downWordNumber:null,squareNumber:e*r+t}}function h(e){return Array.from({length:e},(function(e,t){return t}))}function E(e){var t=h(e);return t.map((function(r){return t.map((function(t){return p(r,t,e)}))}))}function S(e){return e||" "}function g(e,t){var r=h(t);return r.map((function(n){return r.map((function(r){return e[n*t+r]}))}))}function N(e){var t=e.length,r=function(e,t){var r=function(e){return e.map((function(e){return e.wordStart=[!1,!1],e.acrossWordNumber=null,e.downWordNumber=null,e}))}(e),n=1;return r.reduce((function(e,r,a,c){var o=function(e){var t=e.flatBoard,r=e.index,n=e.boardSize,a=r%n===0,c=r<n,o=!1,u=!1;a||(o=!t[r-1].active),c||(u=!t[r-n].active);var l=a||o,i=c||u;return{acrossWordStart:l,downWordStart:i,eitherWordStart:l||i}}({flatBoard:c,index:a,boardSize:t}),u=o.downWordStart,l=o.acrossWordStart,i=o.eitherWordStart;if(r.active){var s=null,d=null;i&&(l&&(r.wordStart[0]=!0,s=n),u&&(r.wordStart[1]=!0,d=n),n+=1),r.acrossWordNumber=s||e[a-1].acrossWordNumber,r.downWordNumber=d||e[a-t].downWordNumber}return e.push(r),e}),[])}(e.flat(),t),n=function(e){return e.reduce((function(e,t,r){if(!t.acrossWordNumber||!t.downWordNumber)return e;var n=e[0].map((function(e){return e.number})),a=e[1].map((function(e){return e.number}));if(t.wordStart[0]){var c={direction:"across",number:t.acrossWordNumber,clue:"",answer:S(t.letter),firstLetterSquareNumber:r};e[0].push(c)}else{var o=n.indexOf(t.acrossWordNumber);e[0][o].answer+=S(t.letter)}if(t.wordStart[1]){var u={direction:"down",number:t.downWordNumber,clue:"",answer:S(t.letter),firstLetterSquareNumber:r};e[1].push(u)}else{var l=a.indexOf(t.downWordNumber);e[1][l].answer+=S(t.letter)}return e}),[[],[]])}(r);return[g(r,t),n]}function q(e,t){function r(e){var t=Object(s.a)(e,2);return(t[0]?"t":"f")+(t[1]?"t":"f")}var n=e.map((function(e){return e.map((function(e){return[e.active?"t":"f",e.letter,r(e.wordStart),e.acrossWordNumber,e.downWordNumber,e.squareNumber]}))})),a=t.map((function(e){return e.map((function(e){return["down"===e.direction?"d":"a",e.number,e.clue,e.answer,e.firstLetterSquareNumber]}))})),c=JSON.stringify([n,a]);return btoa(c)}function k(e,t,r,n,a,c){var o=r;-1===a&&-1===c?o="across"===r?"down":"across":(a===e[0]&&c===e[1]?o="across"===r?"down":"across":"none"===r&&(o="across"),t([a,c])),n(o)}function O(e,t,r,n){var a=function(e){return e.map((function(e){return e.reduce((function(e,t){var r=t.firstLetterSquareNumber;return null!=r&&(e[r]=t.clue),e}),{})}))}(t),c=N(e),o=Object(s.a)(c,2),u=o[0],l=function(e,t){return e.map((function(e,r){return e.map((function(e){var n=e.firstLetterSquareNumber;return null!==n&&t[r][n]?e.clue=t[r][n]:e.clue="",e}))}))}(o[1],a);r(u),n(l)}function j(e,t,r){var n=Object(i.a)(e);if(t<r)n=e.map((function(e){return e.slice(0,t)})).filter((function(e,r){return r<t}));else if(t>r){var a=h(t-r),c=h(t),o=a.map((function(e){return n=r+e,c.map((function(e){return p(n,e,t)}));var n}));n=e.map((function(e,n){return e.concat((c=n,a.map((function(e){return p(c,r+e,t)}))));var c})).concat(o)}return n}function y(e,t,r){var n=r||0,a=e.answer.length;if(t.length<a){var c=" ".repeat(a-t.length);e.answer=t.slice(0,n)+c+t.slice(n,t.length)}else e.answer=(t.slice(0,n)+t.slice(n+1,t.length)).slice(0,a);return e}function W(e,t,r){var n=0===r?"acrossWordNumber":"downWordNumber",a=0;return e.flat().map((function(e,r){var c=e;return e[n]===t.number&&(c.letter=t.answer[a],a+=1),c}))}var A=function(){var e=N(E(9)),t=Object(n.useState)(9),r=Object(s.a)(t,2),c=r[0],o=r[1],l=Object(n.useState)(e[0]),d=Object(s.a)(l,2),b=d[0],p=d[1],h=Object(n.useState)(e[1]),S=Object(s.a)(h,2),A=S[0],C=S[1],z=function(e,t){return O(e,t,p,C)},x=Object(n.useState)("normal"),B=Object(s.a)(x,2),D=B[0],I=B[1],L=Object(n.useState)([1,1]),T=Object(s.a)(L,2),R=T[0],U=T[1],G=Object(n.useState)("none"),J=Object(s.a)(G,2),M=J[0],P=J[1];return a.a.createElement("div",{className:"editor"},a.a.createElement("div",{className:"header"},a.a.createElement("h1",null,"Crossword Puzzle Composer"),a.a.createElement("p",{id:"description"},"This is a composer for creating crossword puzzles. Answer updates will display both on the board and next to the clues below. Double click on a square to toggle it on or off."),a.a.createElement("ul",{id:"state"},a.a.createElement("li",null,a.a.createElement(u.b,{to:"".concat("/crossword","/play#").concat(q(b,A))},"Play This Game")),a.a.createElement("li",null,a.a.createElement("button",{onClick:function(e){var t=document.getElementById("game-link");t&&(t.select(),document.execCommand("copy"))}},"Copy Link to This Game")),a.a.createElement("li",null,a.a.createElement("input",{type:"text",id:"game-link",readOnly:!0,value:"".concat("https://doodles.patrickweaver.net").concat("/crossword","/play#").concat(q(b,A))})))),a.a.createElement("div",{id:"sections"},a.a.createElement("div",{id:"board-container"},a.a.createElement(f,{boardSize:c,updateBoardSize:function(e){var t=j(b,e,c);p(t),z(t,A),o(e)}}),a.a.createElement(v,{mode:D,onChange:function(e){return I(e.target.value)}}),a.a.createElement(m,{clueAnswers:A,board:b,boardSize:c,updateBoard:function(e){return z(e,A)},mode:D,selectedSquare:R,onSelectSquare:function(e,t){return k(R,U,M,P,e,t)},selectedDirection:M,checkAnswers:!1}),a.a.createElement("div",{className:"button-section"},a.a.createElement("button",{onClick:function(){return z(b.map((function(e){return e.map((function(e){return e.active=!0,e}))})),A)}},"Activate All"),a.a.createElement("button",{onClick:function(){return z(b.map((function(e){return e.map((function(e){return e.active&&(e.letter=""),e}))})),A)}},"Clear All"))),a.a.createElement("div",{id:"clues-container"},a.a.createElement(w,{clueAnswers:A,updateClueAnswer:function(e,t,r,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,o=Object(i.a)(A),u=o[r][n];if("answer"===e){u=y(u,t,a);var l=W(b,u,r),s=g(l,c);z(s,A)}else u.clue=t,C(o)},mode:"editor"}))))};function C(e){var t=JSON.parse(atob(e)),r=Object(s.a)(t,2),n=r[0],a=r[1];return[n.map((function(e){return e.map((function(e){return{active:"t"===e[0],letter:e[1],wordStart:function(e){var t=e.split(""),r=Object(s.a)(t,2);return["t"===r[0],"t"===r[1]]}(e[2]),acrossWordNumber:e[3],downWordNumber:e[4],squareNumber:e[5]}}))})),a.map((function(e){return e.map((function(e){return{direction:"d"===e[0]?"down":"across",number:e[1],clue:e[2],answer:e[3],firstLetterSquareNumber:e[4]}}))}))]}r(40);function z(){var e,t=window.location.hash,r=C(t.slice(1,t.length)),c=Object(s.a)(r,2),o=c[0],l=c[1],i=N(E(o.length)),d=Object(n.useState)(i[0]),f=Object(s.a)(d,2),b=f[0],v=f[1],p=Object(n.useState)(l),h=Object(s.a)(p,2),S=h[0],g=h[1],q=Object(n.useState)([0,0]),j=Object(s.a)(q,2),y=j[0],W=j[1],A=Object(n.useState)("across"),z=Object(s.a)(A,2),x=z[0],B=z[1],D=Object(n.useState)(!1),I=Object(s.a)(D,2),L=I[0],T=I[1];return e=window.location.hash?a.a.createElement("div",null,a.a.createElement("p",{id:"description"},"This is a crossword puzzle created in this app. The clues and correct answers are encoded in the URL, which is why it is so long. Toggle the checkbox below the board to autocheck your answers."),a.a.createElement("div",{id:"sections"},a.a.createElement("div",{id:"board-container"},a.a.createElement(m,{clueAnswers:S,board:b,correctBoard:o,boardSize:b.length,updateBoard:function(e){return O(e,S,v,g)},mode:"game",selectedSquare:y,onSelectSquare:function(e,t){return k(y,W,x,B,e,t)},selectedDirection:x,checkAnswers:L}),a.a.createElement("div",{id:"check-answers-toggle"},a.a.createElement("label",null,"Check answers:"),a.a.createElement("input",{type:"checkbox",onChange:function(e){T(e.target.checked)}}))),a.a.createElement("div",{id:"clues-container"},a.a.createElement(w,{clueAnswers:S,mode:"game"})))):a.a.createElement("div",null,a.a.createElement("h2",null,"Invalid Game Link"),a.a.createElement("p",null,"This link does not correspond to a crossword. ",a.a.createElement(u.b,{to:"".concat("/crossword","/editor")},"Try making your own here."))),a.a.createElement("div",{id:"game"},a.a.createElement("p",null,a.a.createElement(u.b,{to:"".concat("/crossword","/editor")},"Make your own crossword here.")),a.a.createElement("h1",null,"Crossword Puzzle Game"),e)}r(41);function x(){return a.a.createElement("div",{id:"footer"},a.a.createElement("ul",null,a.a.createElement("li",null,"Made by ",a.a.createElement("a",{href:"https://www.patrickweaver.net/"},"Patrick Weaver")),a.a.createElement("li",null,a.a.createElement("a",{href:"https://github.com/patrickweaver/crossword"},"View Source"))))}var B=function(){return a.a.createElement(u.a,null,a.a.createElement(l.d,null,a.a.createElement(l.b,{exact:!0,path:"".concat("/crossword","/")},a.a.createElement(l.a,{to:"".concat("/crossword","/editor")})),a.a.createElement(l.b,{path:"".concat("/crossword","/editor")},a.a.createElement(A,null)),a.a.createElement(l.b,{path:"".concat("/crossword","/play")},a.a.createElement(z,null))),a.a.createElement(x,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.7d5f7db0.chunk.js.map