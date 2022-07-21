import{m as R,n as D,W as w,p as F,a as l,B as $,a0 as f,r as E,q as B,_ as U,t as z,j as i,c as M,a1 as O,v as h,a2 as j,N as r}from"./index.115109fe.js";import{T as I,a as N,b as X}from"./table-row.a20980f1.js";import{u as c,T as C,E as W,D as K,F as P,C as q}from"./index.f27489c9.js";import{I as k}from"./menu.624616bb.js";import{T as H}from"./Typography.45f44efc.js";function L(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function V(t){return parseFloat(t)}function G(t){return R("MuiSkeleton",t)}D("MuiSkeleton",["root","text","rectangular","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const J=["animation","className","component","height","style","variant","width"];let d=t=>t,b,y,v,x;const Q=t=>{const{classes:a,variant:n,animation:o,hasChildren:s,width:e,height:u}=t;return z({root:["root",n,o,s&&"withChildren",s&&!e&&"fitContent",s&&!u&&"heightAuto"]},G,a)},Y=w(b||(b=d`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),Z=w(y||(y=d`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),ee=F("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:n}=t;return[a.root,a[n.variant],n.animation!==!1&&a[n.animation],n.hasChildren&&a.withChildren,n.hasChildren&&!n.width&&a.fitContent,n.hasChildren&&!n.height&&a.heightAuto]}})(({theme:t,ownerState:a})=>{const n=L(t.shape.borderRadius)||"px",o=V(t.shape.borderRadius);return l({display:"block",backgroundColor:$(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},a.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${o}${n}/${Math.round(o/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},a.variant==="circular"&&{borderRadius:"50%"},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&f(v||(v=d`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `),Y),({ownerState:t,theme:a})=>t.animation==="wave"&&f(x||(x=d`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 1.6s linear 0.5s infinite;
        background: linear-gradient(90deg, transparent, ${0}, transparent);
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),Z,a.palette.action.hover)),te=E.exports.forwardRef(function(a,n){const o=B({props:a,name:"MuiSkeleton"}),{animation:s="pulse",className:e,component:u="span",height:m,style:S,variant:_="text",width:A}=o,p=U(o,J),g=l({},o,{animation:s,component:u,variant:_,hasChildren:Boolean(p.children)}),T=Q(g);return i(ee,l({as:u,ref:n,className:M(T.root,e),ownerState:g},p,{style:l({width:A,height:m},S)}))});var ae=te;const ue=()=>{const t=O(e=>e.cities),a=c(e=>e.setIsOpen),n=c(e=>e.setCreateCity),o=c(e=>e.setEditCity),s=E.exports.useMemo(()=>[{key:"actions",header:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",size:"max-content",render:e=>h(j,{direction:"row",spacing:1,children:[i(C,{title:"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",children:i(k,{onClick:()=>o(e),children:i(W,{})})}),i(C,{title:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",children:i(k,{onClick:()=>console.log("delete",e.name),children:i(K,{})})})]})},{key:"name",header:"\u0418\u043C\u044F",size:"max-content",render:e=>i(r,{children:e.name})},{key:"sub_domain",header:"\u041F\u043E\u0434\u0434\u043E\u043C\u0435\u043D",size:"max-content",render:e=>i(r,{children:e.subDomain})},{key:"instagram",header:"\u0418\u043D\u0441\u0442\u0430\u0433\u0440\u0430\u043C",size:"300px",render:e=>i(r,{children:e.instagram})},{key:"vkontakte",header:"\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435",size:"300px",render:e=>i(r,{children:e.vkontakte})},{key:"facebook",header:"\u0424\u0435\u0439\u0441\u0431\u0443\u043A",size:"300px",render:e=>i(r,{children:e.facebook})}],[o]);return h(r,{children:[i(H,{variant:"h3",sx:{paddingBottom:2},children:"\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0433\u043E\u0440\u043E\u0434\u043E\u0432"}),t?h(I,{config:s,children:[i(N,{}),i("tbody",{children:t==null?void 0:t.map(e=>i(X,{row:e},e.id))})]}):i(ae,{variant:"rectangular",width:"100%",height:"100%"}),i(P,{onClick:n}),i(q,{onClose:()=>a(!1)})]})};export{ue as default};
