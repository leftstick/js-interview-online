(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[24],{"9kvl":function(e,t,n){"use strict";n.d(t,"a",(function(){return a["b"]})),n.d(t,"b",(function(){return l}));var a=n("FfOG"),c=(n("bCY9"),n("ODXe")),i=n("q1tI"),r=n("aUsF"),o=n.n(r),s=n("FMtG");function l(e,t){var n=Object(i["useContext"])(s["UmiContext"]),a=Object(i["useRef"])(t);a.current=t;var r=Object(i["useState"])(()=>a.current?a.current(n.data[e]):n.data[e]),l=Object(c["a"])(r,2),u=l[0],m=l[1],d=Object(i["useRef"])(u);return Object(i["useEffect"])(()=>{var c=e=>{if(t&&a.current){var n=a.current(e);o()(n,d.current)||(d.current=n,m(n))}else m(e)};try{n.callbacks[e].add(c)}catch(i){n.callbacks[e]=new Set,n.callbacks[e].add(c)}return()=>{n.callbacks[e].delete(c)}},[e]),u}},"Ae/F":function(e,t,n){"use strict";n.r(t);n("+L6B");var a=n("2/Rp"),c=(n("T2oS"),n("W9HT")),i=n("tJVT"),r=n("q1tI"),o=n.n(r),s=n("9kvl"),l=n("Ty5D"),u=n("9BLJ"),m=n("n+Aq"),d=n("woEc"),b=n("Nhdc");function h(){var e=Object(s["b"])("useInterviewModel",e=>Object(d["d"])(e,"workingExam","modifyCode")),t=e.workingExam,n=e.modifyCode,a=t,c=a.code;return o.a.createElement(b["b"],{value:c,onCodeChange:n})}var g=h,E=n("WGjm"),p=n("4i/N"),f=n("UESt"),x=n("TSYQ"),v=n.n(x),_=n("6+LV"),j=n("BNKF"),w=n.n(j),O=e=>{var t=e.maxWidth,n=e.height,a=Object(s["b"])("useInterviewModel",e=>Object(d["d"])(e,"workingExam","toggleExecutorVisible","execTestcases")),i=a.workingExam,r=a.toggleExecutorVisible,l=a.execTestcases,u=i,m=u.testcases;return console.log("maxWidth",t),o.a.createElement(E["Resizable"],{className:w.a.container,defaultSize:{height:n,width:600},style:{position:"absolute"},maxWidth:t,minWidth:400,enable:{bottom:!1,bottomLeft:!1,bottomRight:!1,left:!0,right:!1,top:!1,topLeft:!1,topRight:!1}},o.a.createElement(p["a"],{className:w.a.closeBtn,onClick:r}),o.a.createElement(f["a"],{className:w.a.runBtn,onClick:l}),o.a.createElement("div",{className:w.a.innerContainer,style:{height:"".concat(n-40,"px")}},m.map(e=>{var t=e.content,n=e.status,a=22*t.split("\n").length+20;return o.a.createElement("div",{className:v()(w.a.caseContainer,{[w.a.execFailed]:n===_["a"].EXEC_FAILED,[w.a.execSuccess]:n===_["a"].EXEC_SUCCESS}),key:t,style:{height:"".concat(a+10,"px")}},o.a.createElement(c["a"],{spinning:n===_["a"].EXECUTING,className:w.a.spinning}),o.a.createElement(b["a"],{height:a,value:t}))})))},k=n("eP9B"),C=n.n(k);function y(){var e=Object(s["b"])("useAppModel",e=>Object(d["d"])(e,"height","sayHi")),t=e.height,n=e.sayHi,b=Object(r["useRef"])(null),h=Object(m["b"])(b.current),E=Object(i["a"])(h,1),p=E[0].width,f=Object(s["b"])("useInterviewModel",e=>Object(d["d"])(e,"setupExam","workingExam","executorVisible","toggleExecutorVisible")),x=f.setupExam,v=f.workingExam,_=f.executorVisible,j=f.toggleExecutorVisible,w=Object(r["useMemo"])(()=>t-64-10,[t]),k=Object(l["k"])();return Object(r["useEffect"])(()=>x(k.examId),[x,k]),Object(r["useEffect"])(()=>n(),[n]),Object(d["c"])(v)?o.a.createElement("div",{style:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}},o.a.createElement(c["a"],{spinning:!0,size:"large"})):o.a.createElement("div",{ref:b,className:C.a.content,style:{height:w}},o.a.createElement(a["a"],{shape:"circle",icon:o.a.createElement(u["a"],null),className:C.a.verifyBtn,onClick:j}),o.a.createElement(g,null),_&&o.a.createElement(O,{height:w,maxWidth:p}))}t["default"]=y},BNKF:function(e,t,n){e.exports={container:"container___3nsn_",innerContainer:"innerContainer___3YLB3",closeBtn:"closeBtn___EQBCO",runBtn:"runBtn___13sgn",caseContainer:"caseContainer___hEIdZ",execFailed:"execFailed___2NW7a",execSuccess:"execSuccess___1jqEL",spinning:"spinning___3xYRR"}},Nhdc:function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return g}));var a=n("q1tI"),c=n.n(a),i=n("dxGJ"),r=n("wJku");function o(e){var t=e.collapsed,n=e.onToggle;return t?c.a.createElement(i["a"],{onClick:n}):c.a.createElement(r["a"],{onClick:n})}var s=n("0Owb"),l=n("k1fw"),u=n("3Mpw"),m=n("FEKs"),d=c.a.memo((function(e){var t=e.height,n=e.value;return console.count("ReadOnlyEditor"),c.a.createElement(u["a"],Object(s["a"])({},u["b"],{code:n,language:"javascript",theme:m["a"]}),e=>{var n=e.className,a=e.style,i=e.tokens,r=e.getLineProps,o=e.getTokenProps;return c.a.createElement("pre",{className:n,style:Object(l["a"])(Object(l["a"])({},a),{},{width:"100%",height:t,marginBottom:0,padding:"5px 5px 15px 5px"})},i.map((e,t)=>c.a.createElement("div",r({line:e,key:t}),e.map((e,t)=>c.a.createElement("span",o({token:e,key:t}))))))})})),b=n("lc5D"),h=n.n(b),g=(n("ZdjR"),n("kiLR"),n("sX3c"),n("2nlJ"),n("7E8U"),c.a.memo((function(e){var t=e.onCodeChange,n=e.value;return console.count("ControlledEditor"),c.a.createElement(h.a,{width:"100%",height:"100%",mode:"javascript",theme:"tomorrow",fontSize:14,onChange:t,showPrintMargin:!0,showGutter:!0,highlightActiveLine:!0,value:n,setOptions:{enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,enableSnippets:!0,showLineNumbers:!0,tabSize:2},editorProps:{$blockScrolling:1/0}})})))},eP9B:function(e,t,n){e.exports={content:"content___2z6Cd",verifyBtn:"verifyBtn___3cLgw"}}}]);