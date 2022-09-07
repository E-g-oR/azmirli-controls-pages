import{f as N,h as j,i as v,_ as e,r as m,k as U,a as T,L as M,d as k,j as h,v as z,l as E,m as b}from"./index.605d8d15.js";function F(r){return N("JoyTypography",r)}j("JoyTypography",["root","h1","h2","h3","h4","h5","h6","body1","body2","body3","noWrap","gutterBottom","startDecorator","endDecorator","colorPrimary","colorNeutral","colorDanger","colorInfo","colorSuccess","colorWarning","variantPlain","variantOutlined","variantSoft","variantSolid"]);const L=["color","textColor"],O=["className","component","gutterBottom","noWrap","level","levelMapping","children","endDecorator","startDecorator","variant"],C=m.exports.createContext(!1),S=r=>{const{gutterBottom:o,noWrap:a,level:s,color:t,variant:n}=r,i={root:["root",s,o&&"gutterBottom",a&&"noWrap",t&&`color${b(t)}`,n&&`variant${b(n)}`],startDecorator:["startDecorator"],endDecorator:["endDecorator"]};return k(i,F,{})},A=v("span",{name:"JoyTypography",slot:"StartDecorator",overridesResolver:(r,o)=>o.startDecorator})(({ownerState:r})=>{var o;return e({display:"inline-flex",marginInlineEnd:"min(var(--Typography-gap, 0.25em), 0.5rem)"},((o=r.sx)==null?void 0:o.alignItems)==="flex-start"&&{marginTop:"2px"})}),V=v("span",{name:"JoyTypography",slot:"endDecorator",overridesResolver:(r,o)=>o.endDecorator})(({ownerState:r})=>{var o;return e({display:"inline-flex",marginInlineStart:"min(var(--Typography-gap, 0.25em), 0.5rem)"},((o=r.sx)==null?void 0:o.alignItems)==="flex-start"&&{marginTop:"2px"})}),q=v("span",{name:"JoyTypography",slot:"Root",overridesResolver:(r,o)=>o.root})(({theme:r,ownerState:o})=>{var a;return e({"--Icon-fontSize":"1.25em",margin:0},o.nested?{display:"inline"}:{fontFamily:r.vars.fontFamily.body,display:"block"},(o.startDecorator||o.endDecorator)&&e({display:"flex",alignItems:"center"},o.nested&&e({display:"inline-flex"},o.startDecorator&&{verticalAlign:"bottom"})),o.level&&o.level!=="inherit"&&r.typography[o.level],o.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},o.gutterBottom&&{marginBottom:"0.35em"},o.variant&&e({borderRadius:r.vars.radius.xs,paddingInline:"0.25em"},!o.nested&&{marginInline:"-0.25em"},(a=r.variants[o.variant])==null?void 0:a[o.color]))}),G={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",display1:"h1",display2:"h2",body1:"p",body2:"p",body3:"span",body4:"span",body5:"span",inherit:"p"},H=m.exports.forwardRef(function(o,a){const s=U({props:o,name:"JoyTypography"}),{color:t,textColor:n}=s,i=T(s,L),p=m.exports.useContext(C),c=M(e({},i,{color:n})),{className:g,component:u,gutterBottom:I=!1,noWrap:P=!1,level:_="body1",levelMapping:W={},children:B,endDecorator:x,startDecorator:f,variant:D=t?"plain":void 0}=c,R=T(c,O),$=t||(D?"neutral":void 0),d=p?o.level||"inherit":_,l=e({},c,{level:d,className:g,component:u,color:$,gutterBottom:I,noWrap:P,nested:p,variant:D}),J=u||(p?"span":W[d]||G[d]||"span"),y=S(l);return h(C.Provider,{value:!0,children:z(q,e({as:J,ref:a,ownerState:l,className:E(y.root,g)},R,{children:[f&&h(A,{ownerState:l,className:y.startDecorator,children:f}),B,x&&h(V,{ownerState:l,className:y.endDecorator,children:x})]}))})});var Q=H;export{Q as T,C as a};
