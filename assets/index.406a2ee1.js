import{g as T,f as D,M as w,h as $,a0 as F,a1 as M,_ as l,w as U,a2 as C,r as E,i as z,j as B,k as I,l as i,m as O,a3 as j,n as h,a4 as X,I as r}from"./index.e6b59a28.js";import{u as c,T as f,I as k,E as N,D as K,a as P,b as W,c as H,F as L,C as V}from"./index.b8b2d03d.js";import{T as q}from"./Typography.11414a77.js";import"./menu.c4f945e1.js";function G(t){return T("MuiSkeleton",t)}D("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const J=["animation","className","component","height","style","variant","width"];let d=t=>t,b,v,y,x;const Q=t=>{const{classes:a,variant:n,animation:s,hasChildren:o,width:e,height:u}=t;return I({root:["root",n,s,o&&"withChildren",o&&!e&&"fitContent",o&&!u&&"heightAuto"]},G,a)},Y=w(b||(b=d`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),Z=w(v||(v=d`
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
`)),ee=$("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:n}=t;return[a.root,a[n.variant],n.animation!==!1&&a[n.animation],n.hasChildren&&a.withChildren,n.hasChildren&&!n.width&&a.fitContent,n.hasChildren&&!n.height&&a.heightAuto]}})(({theme:t,ownerState:a})=>{const n=F(t.shape.borderRadius)||"px",s=M(t.shape.borderRadius);return l({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:U(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em"},a.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${s}${n}/${Math.round(s/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},a.variant==="circular"&&{borderRadius:"50%"},a.variant==="rounded"&&{borderRadius:(t.vars||t).shape.borderRadius},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})},({ownerState:t})=>t.animation==="pulse"&&C(y||(y=d`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `),Y),({ownerState:t,theme:a})=>t.animation==="wave"&&C(x||(x=d`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 1.6s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),Z,(a.vars||a).palette.action.hover)),te=E.exports.forwardRef(function(a,n){const s=z({props:a,name:"MuiSkeleton"}),{animation:o="pulse",className:e,component:u="span",height:p,style:R,variant:_="text",width:A}=s,m=B(s,J),g=l({},s,{animation:o,component:u,variant:_,hasChildren:Boolean(m.children)}),S=Q(g);return i(ee,l({as:u,ref:n,className:O(S.root,e),ownerState:g},m,{style:l({width:A,height:p},R)}))});var ae=te;const re=()=>{const t=j(e=>e.cities),a=c(e=>e.setIsOpen),n=c(e=>e.setCreateCity),s=c(e=>e.setEditCity),o=E.exports.useMemo(()=>[{key:"actions",header:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",size:"max-content",render:e=>h(X,{direction:"row",spacing:1,children:[i(f,{title:"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",children:i(k,{onClick:()=>s(e),variant:"plain",children:i(N,{})})}),i(f,{title:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",children:i(k,{onClick:()=>console.log("delete",e.name),variant:"plain",children:i(K,{})})})]})},{key:"name",header:"\u0418\u043C\u044F",size:"max-content",render:e=>i(r,{children:e.name})},{key:"sub_domain",header:"\u041F\u043E\u0434\u0434\u043E\u043C\u0435\u043D",size:"max-content",render:e=>i(r,{children:e.subDomain})},{key:"instagram",header:"\u0418\u043D\u0441\u0442\u0430\u0433\u0440\u0430\u043C",size:"300px",render:e=>i(r,{children:e.instagram})},{key:"vkontakte",header:"\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435",size:"300px",render:e=>i(r,{children:e.vkontakte})},{key:"facebook",header:"\u0424\u0435\u0439\u0441\u0431\u0443\u043A",size:"300px",render:e=>i(r,{children:e.facebook})}],[s]);return h(r,{children:[i(q,{variant:"h3",sx:{paddingBottom:2},children:"\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0433\u043E\u0440\u043E\u0434\u043E\u0432"}),t?h(P,{config:o,children:[i(W,{}),i("tbody",{children:t==null?void 0:t.map(e=>i(H,{row:e},e.id))})]}):i(ae,{variant:"rectangular",width:"100%",height:"100%"}),i(L,{onClick:n}),i(V,{onClose:()=>a(!1)})]})};export{re as default};
