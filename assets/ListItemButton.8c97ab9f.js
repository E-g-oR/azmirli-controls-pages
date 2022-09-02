import{r,n as k,p as x,l,_ as d,a as N,k as W,c as m}from"./index.4243eee6.js";import{s as f,g as P,h as S}from"./IconButton.adb66e1d.js";const C=r.exports.createContext(null);C.displayName="MenuUnstyledContext";var X=C;const _=r.exports.createContext(void 0);function A(t){return k("JoyList",t)}x("JoyList",["root","nesting","row","scoped","sizeSm","sizeMd","sizeLg","colorPrimary","colorNeutral","colorDanger","colorInfo","colorSuccess","colorWarning","variantPlain","variantOutlined","variantSoft","variantSolid"]);const U=r.exports.createContext(!1);var z=U;const D=r.exports.createContext(void 0);var J=D;const H=r.exports.createContext(!1);var M=H;const E=r.exports.createContext(!1);var V=E;const Z={"--NestedList-marginRight":"0px","--NestedList-marginLeft":"0px","--NestedList-item-paddingLeft":"var(--List-item-paddingX)","--List-itemButton-marginBlock":"0px","--List-itemButton-marginInline":"0px","--List-item-marginBlock":"0px","--List-item-marginInline":"0px"},Y=({children:t,nested:i,row:n=!1,wrap:a=!1})=>{const e=l(M.Provider,{value:n,children:l(V.Provider,{value:a,children:r.exports.Children.map(t,(s,o)=>r.exports.isValidElement(s)?r.exports.cloneElement(s,d({},o===0&&{"data-first-child":""})):s)})});return i===void 0?e:l(z.Provider,{value:i,children:e})};var w=Y;const T=["component","className","children","size","row","wrap","variant","color","role"],j=t=>{const{variant:i,color:n,size:a,nesting:e,row:s,instanceSize:o}=t,c={root:["root",i&&`variant${m(i)}`,n&&`color${m(n)}`,!o&&!e&&a&&`size${m(a)}`,o&&`size${m(o)}`,e&&"nesting",s&&"row"]};return W(c,A,{})},F=f("ul",{name:"JoyList",slot:"Root",overridesResolver:(t,i)=>i.root})(({theme:t,ownerState:i})=>{var n;function a(e){return e==="sm"?{"--List-divider-gap":"0.25rem","--List-item-minHeight":"2rem","--List-item-paddingY":"0.25rem","--List-item-paddingX":"0.5rem","--List-item-fontSize":t.vars.fontSize.sm,"--List-decorator-size":i.row?"1.5rem":"2rem","--Icon-fontSize":"1.125rem"}:e==="md"?{"--List-divider-gap":"0.375rem","--List-item-minHeight":"2.5rem","--List-item-paddingY":"0.375rem","--List-item-paddingX":"0.75rem","--List-item-fontSize":t.vars.fontSize.md,"--List-decorator-size":i.row?"1.75rem":"2.5rem","--Icon-fontSize":"1.25rem"}:e==="lg"?{"--List-divider-gap":"0.5rem","--List-item-minHeight":"3rem","--List-item-paddingY":"0.5rem","--List-item-paddingX":"1rem","--List-item-fontSize":t.vars.fontSize.md,"--List-decorator-size":i.row?"2.25rem":"3rem","--Icon-fontSize":"1.5rem"}:{}}return[i.nesting&&d({},a(i.instanceSize),{"--List-item-paddingRight":"var(--List-item-paddingX)","--List-item-paddingLeft":"var(--NestedList-item-paddingLeft)","--List-itemButton-marginBlock":"0px","--List-itemButton-marginInline":"0px","--List-item-marginBlock":"0px","--List-item-marginInline":"0px",padding:0,marginInlineStart:"var(--NestedList-marginLeft)",marginInlineEnd:"var(--NestedList-marginRight)",marginBlockStart:"var(--List-gap)"}),!i.nesting&&d({},a(i.size),{"--List-gap":"0px","--List-decorator-color":t.vars.palette.text.tertiary,"--List-nestedInsetStart":"0px","--List-item-paddingLeft":"var(--List-item-paddingX)","--List-item-paddingRight":"var(--List-item-paddingX)","--internal-child-radius":"max(var(--List-radius, 0px) - var(--List-padding), min(var(--List-padding) / 2, var(--List-radius, 0px) / 2))","--List-item-radius":"min(calc(var(--List-padding) * 999), var(--internal-child-radius))","--List-item-startActionTranslateX":"calc(0.5 * var(--List-item-paddingLeft))","--List-item-endActionTranslateX":"calc(-0.5 * var(--List-item-paddingRight))",margin:"initial"},i.row?d({},i.wrap?{padding:"var(--List-padding)",marginInlineStart:"calc(-1 * var(--List-gap))",marginBlockStart:"calc(-1 * var(--List-gap))"}:{paddingInline:"var(--List-padding, var(--List-divider-gap))",paddingBlock:"var(--List-padding)"}):{paddingBlock:"var(--List-padding, var(--List-divider-gap))",paddingInline:"var(--List-padding)"}),d({borderRadius:"var(--List-radius)",listStyle:"none",display:"flex",flexDirection:i.row?"row":"column"},i.wrap&&{flexWrap:"wrap"},{flexGrow:1,position:"relative"},(n=t.variants[i.variant])==null?void 0:n[i.color])]}),O=r.exports.forwardRef(function(i,n){const a=r.exports.useContext(z),e=r.exports.useContext(X),s=r.exports.useContext(_),o=P({props:i,name:"JoyList"}),{component:c,className:h,children:y,size:I="md",row:p=!1,wrap:v=!1,variant:$="plain",color:b="neutral",role:L}=o,B=N(o,T),g=d({instanceSize:i.size,size:I,nesting:a,row:p,wrap:v,variant:$,color:b},o),R=j(g),u=L!=null?L:e||s?"group":void 0;return l(F,d({ref:n,as:c,className:S(R.root,h),ownerState:g,role:u},B,{children:l(J.Provider,{value:`${typeof c=="string"?c:""}:${u||""}`,children:l(w,{row:p,wrap:v,children:y})})}))});var ii=O;const G=x("JoyListItemButton",["root","horizontal","vertical","colorPrimary","colorNeutral","colorDanger","colorInfo","colorSuccess","colorWarning","colorContext","focusVisible","disabled","selected","variantPlain","variantSoft","variantOutlined","variantSolid"]);var q=G;const ti=f("div",{name:"JoyListItemButton",slot:"Root",overridesResolver:(t,i)=>i.root})(({theme:t,ownerState:i})=>{var n,a,e,s;return[d({},i.selected&&{"--List-decorator-color":"initial"},{boxSizing:"border-box",position:"relative",display:"flex",flexDirection:i.orientation==="vertical"?"column":"row",alignItems:"center",textAlign:"initial",textDecoration:"initial",backgroundColor:"initial",marginInline:"var(--List-itemButton-marginInline)",marginBlock:"var(--List-itemButton-marginBlock)"},i["data-first-child"]===void 0&&{marginInlineStart:i.row?"var(--List-gap)":void 0,marginBlockStart:i.row?void 0:"var(--List-gap)"},{paddingBlock:"calc(var(--List-item-paddingY) - var(--variant-borderWidth))",paddingInlineStart:"calc(var(--List-item-paddingLeft) + var(--List-item-startActionWidth, var(--internal-startActionWidth, 0px)))",paddingInlineEnd:"calc(var(--List-item-paddingRight) + var(--List-item-endActionWidth, var(--internal-endActionWidth, 0px)))",minBlockSize:"var(--List-item-minHeight)",border:"none",borderRadius:"var(--List-item-radius)",flex:i.row?"none":1,minInlineSize:0,transition:"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",fontSize:"var(--List-item-fontSize)",fontFamily:t.vars.fontFamily.body},i.selected&&{fontWeight:t.vars.fontWeight.md},{[t.focus.selector]:t.focus.default}),(n=t.variants[i.variant])==null?void 0:n[i.color],{"&:hover":(a=t.variants[`${i.variant}Hover`])==null?void 0:a[i.color]},{"&:active":(e=t.variants[`${i.variant}Active`])==null?void 0:e[i.color]},{[`&.${q.disabled}`]:(s=t.variants[`${i.variant}Disabled`])==null?void 0:s[i.color]}]});export{J as C,F as L,X as M,z as N,M as R,_ as S,V as W,w as a,ti as b,ii as c,Z as s};
