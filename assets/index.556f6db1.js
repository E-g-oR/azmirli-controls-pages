import{g as A,h as B,ah as R,i as F,ai as T,aj as $,_ as c,M as z,ak as k,r as h,j as M,a as U,k as j,l as i,m as O,al as I,am as X,z as f,an as N,ao as q,F as u}from"./index.aac1386d.js";import{E as K,D as P,T as W,a as L,F as V}from"./index.f78333c3.js";import{u as m,m as G,C as H}from"./cities-dialog.5c6a350a.js";import{T as b,I as v}from"./IconButton.1a5f5d92.js";import{T as J}from"./Typography.8dd6985a.js";function Q(e){return A("MuiSkeleton",e)}B("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const Y=["animation","className","component","height","style","variant","width"];let p=e=>e,y,x,E,w;const Z=e=>{const{classes:t,variant:n,animation:s,hasChildren:o,width:l,height:r}=e;return j({root:["root",n,s,o&&"withChildren",o&&!l&&"fitContent",o&&!r&&"heightAuto"]},Q,t)},ee=R(y||(y=p`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),te=R(x||(x=p`
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
`)),ae=F("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],n.animation!==!1&&t[n.animation],n.hasChildren&&t.withChildren,n.hasChildren&&!n.width&&t.fitContent,n.hasChildren&&!n.height&&t.heightAuto]}})(({theme:e,ownerState:t})=>{const n=T(e.shape.borderRadius)||"px",s=$(e.shape.borderRadius);return c({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:z(e.palette.text.primary,e.palette.mode==="light"?.11:.13),height:"1.2em"},t.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${s}${n}/${Math.round(s/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},t.variant==="circular"&&{borderRadius:"50%"},t.variant==="rounded"&&{borderRadius:(e.vars||e).shape.borderRadius},t.hasChildren&&{"& > *":{visibility:"hidden"}},t.hasChildren&&!t.width&&{maxWidth:"fit-content"},t.hasChildren&&!t.height&&{height:"auto"})},({ownerState:e})=>e.animation==="pulse"&&k(E||(E=p`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `),ee),({ownerState:e,theme:t})=>e.animation==="wave"&&k(w||(w=p`
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
    `),te,(t.vars||t).palette.action.hover)),ie=h.exports.forwardRef(function(t,n){const s=M({props:t,name:"MuiSkeleton"}),{animation:o="pulse",className:l,component:r="span",height:d,style:a,variant:S="text",width:D}=s,g=U(s,Y),C=c({},s,{animation:o,component:r,variant:S,hasChildren:Boolean(g.children)}),_=Z(C);return i(ae,c({as:r,ref:n,className:O(_.root,l),ownerState:C},g,{style:c({width:D,height:d},a)}))});var ne=ie;const se=e=>()=>q("cities",e),ce=()=>{const{enqueueSnackbar:e}=I(),t=X(a=>a.cities),n=m(a=>a.setIsOpen),s=m(a=>a.setCreateCity),o=m(a=>a.setEditCity),l=h.exports.useCallback(()=>{e("\u0413\u043E\u0440\u043E\u0434 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D!",{variant:"success"})},[e]),r=h.exports.useCallback(()=>{e("\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0433\u043E\u0440\u043E\u0434",{variant:"success"})},[e]),d=h.exports.useMemo(()=>[{key:"actions",header:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",size:"max-content",render:a=>f(N,{direction:"row",spacing:1,children:[i(b,{title:"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",children:i(v,{onClick:()=>o(a),variant:"plain",children:i(K,{})})}),i(b,{title:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",children:i(v,{onClick:()=>G(se(a.id),l,r),variant:"plain",children:i(P,{})})})]})},{key:"name",header:"\u0418\u043C\u044F",size:"max-content",render:a=>i(u,{children:a.name})},{key:"sub_domain",header:"\u041F\u043E\u0434\u0434\u043E\u043C\u0435\u043D",size:"max-content",render:a=>i(u,{children:a.subDomain})},{key:"instagram",header:"\u0418\u043D\u0441\u0442\u0430\u0433\u0440\u0430\u043C",size:"300px",render:a=>i(u,{children:a.instagram})},{key:"vkontakte",header:"\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435",size:"300px",render:a=>i(u,{children:a.vkontakte})},{key:"facebook",header:"\u0424\u0435\u0439\u0441\u0431\u0443\u043A",size:"300px",render:a=>i(u,{children:a.facebook})}],[o]);return f(u,{children:[i(J,{variant:"h3",sx:{paddingBottom:2},children:"\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0433\u043E\u0440\u043E\u0434\u043E\u0432"}),t?i(W,{config:d,children:t==null?void 0:t.map(a=>i(L,{row:a},a.id))}):i(ne,{variant:"rectangular",width:"100%",height:"100%"}),i(V,{onClick:s}),i(H,{onClose:()=>n(!1)})]})};export{ce as default};
