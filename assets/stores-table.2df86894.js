var oe=Object.defineProperty,ne=Object.defineProperties;var ae=Object.getOwnPropertyDescriptors;var _=Object.getOwnPropertySymbols;var ie=Object.prototype.hasOwnProperty,ce=Object.prototype.propertyIsEnumerable;var H=(e,u,a)=>u in e?oe(e,u,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[u]=a,h=(e,u)=>{for(var a in u||(u={}))ie.call(u,a)&&H(e,a,u[a]);if(_)for(var a of _(u))ce.call(u,a)&&H(e,a,u[a]);return e},y=(e,u)=>ne(e,ae(u));import{s as le,r as x,c as de,M as me,a as pe,j as s,_ as K,a7 as G,a8 as M,a9 as ge,aa as he,ab as xe,ac as Ce,L as fe,$ as Z,a0 as j,al as ye,ak as ke,p as g,B as f,aN as Be,aO as Ee,aq as ee,a1 as Te,at as be,as as ve,n as De,aw as we}from"./index.749055e5.js";import{u as Fe,b as Se,d as V,C as T,c as F,S as Oe,E as Ie,D as Ne,T as Re,F as Ve,a as je}from"./index.9485b346.js";import{m as ue}from"./cities-dialog.e2794a05.js";import{S as Q,O as U}from"./Option.96b96154.js";import{T as X,I as Y}from"./IconButton.09e81c57.js";import{T as J}from"./Typography.ec6371f6.js";import"./ListItemButton.7c22ea35.js";const Ae=["component","direction","spacing","divider","children"];function qe(e,u){const a=x.exports.Children.toArray(e).filter(Boolean);return a.reduce((i,m,l)=>(i.push(m),l<a.length-1&&i.push(x.exports.cloneElement(u,{key:`separator-${l}`})),i),[])}const Me=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],Pe=({ownerState:e,theme:u})=>{let a=K({display:"flex",flexDirection:"column"},G({theme:u},M({values:e.direction,breakpoints:u.breakpoints.values}),i=>({flexDirection:i})));if(e.spacing){const i=ge(u),m=Object.keys(u.breakpoints.values).reduce((r,d)=>((typeof e.spacing=="object"&&e.spacing[d]!=null||typeof e.direction=="object"&&e.direction[d]!=null)&&(r[d]=!0),r),{}),l=M({values:e.direction,base:m}),p=M({values:e.spacing,base:m});typeof l=="object"&&Object.keys(l).forEach((r,d,B)=>{if(!l[r]){const D=d>0?l[B[d-1]]:"column";l[r]=D}}),a=he(a,G({theme:u},p,(r,d)=>({"& > :not(style) + :not(style)":{margin:0,[`margin${Me(d?l[d]:e.direction)}`]:Ce(i,r)}})))}return a=xe(u.breakpoints,a),a},ze=le("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,u)=>[u.root]})(Pe),Le=x.exports.forwardRef(function(u,a){const i=de({props:u,name:"MuiStack"}),m=me(i),{component:l="div",direction:p="column",spacing:b=0,divider:r,children:d}=m,B=pe(m,Ae);return s(ze,K({as:l,ownerState:{direction:p,spacing:b},ref:a},B,{children:r?qe(d,r):d}))});var P=Le;const k=fe(e=>({isOpen:!1,mode:"create",stores:null,currentStore:null,setIsOpen:u=>e({isOpen:u}),setStores:u=>e({stores:u}),setMode:u=>e({mode:u}),setCurrentStore:u=>e({currentStore:u,mode:"edit"}),clearCurrentStore:()=>e({currentStore:null,mode:"create"})})),We=e=>()=>ke("stores",e),$e=e=>()=>ye("stores",e.id,e),A=["\u0443\u043B\u0438\u0446\u0430","\u043F\u0435\u0440\u0435\u0443\u043B\u043E\u043A","\u043F\u0440\u043E\u0441\u043F\u0435\u043A\u0442"],C={cityName:"",building:"",comment:"",streetName:"",streetType:A[0],workingTimeStart:"9",workingTimeEnd:"21"},_e=()=>{const{enqueueSnackbar:e}=Z(),{control:u,handleSubmit:a,setValue:i,reset:m,clearErrors:l}=Fe({defaultValues:C}),p=k(t=>t.mode),b=k(t=>t.isOpen),r=k(t=>t.currentStore),d=k(t=>t.setIsOpen),B=k(t=>t.clearCurrentStore),o=j(t=>t.getCityById),D=j(t=>t.getCityByName),v=j(t=>t.cities),E=x.exports.useCallback(()=>{m(C),l()},[m,l]),q=()=>{E(),d(!1),B()};x.exports.useEffect(()=>{var t,n,c,S,O,I,N,R,w;i("streetType",(t=r==null?void 0:r.streetType)!=null?t:C.streetType),i("streetName",(n=r==null?void 0:r.streetName)!=null?n:C.streetName),i("building",(c=r==null?void 0:r.building)!=null?c:C.building),i("comment",(S=r==null?void 0:r.comment)!=null?S:C.comment),i("workingTimeStart",(O=r==null?void 0:r.workingTimeStart)!=null?O:C.workingTimeStart),i("workingTimeEnd",(I=r==null?void 0:r.workingTimeEnd)!=null?I:C.workingTimeEnd),i("cityName",(w=(R=o((N=r==null?void 0:r.cityId)!=null?N:""))==null?void 0:R.name)!=null?w:C.cityName)},[r]);const z=()=>{e("Success",{variant:"success"}),q(),E()},L=()=>{e("Something went wrong",{variant:"error"})},re=x.exports.useMemo(()=>`${p==="create"?"\u0421\u043E\u0437\u0434\u0430\u0442\u044C":"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"} \u043C\u0430\u0433\u0430\u0437\u0438\u043D`,[p]),se=x.exports.useCallback(t=>{var W,$;const{workingTimeEnd:n,workingTimeStart:c,comment:S,building:O,streetType:I,streetName:N,cityName:R}=t,w={workingTimeStart:c,workingTimeEnd:n,comment:S,building:O,streetType:I,streetName:N,cityId:($=(W=D(R))==null?void 0:W.id)!=null?$:""},te=p==="edit"&&r?$e(h(h({},r),w)):We(w);return ue(te,z,L)},[p,r,z,L]);return g(Se,{isOpen:b,onClose:q,onCancel:q,onSubmit:a(se),title:re,children:[s(V,{children:"\u0410\u0434\u0440\u0435\u0441"}),s(T,{control:u,name:"cityName",render:({field:t})=>g(f,{children:[s(V,{children:"\u0413\u043E\u0440\u043E\u0434"}),s(Q,y(h({variant:"soft"},t),{componentsProps:{listbox:{sx:{maxHeight:240,overflow:"auto","--List-padding":"0px"}}},children:v==null?void 0:v.map(n=>s(U,{value:n.name,children:n.name},n.id))}))]})}),g(P,{direction:{xs:"column",sm:"row"},spacing:{xs:1,sm:2},alignItems:{xs:"stretch",sm:"flex-end"},children:[s(T,{control:u,name:"streetType",render:({field:t})=>g(f,{sx:{width:{xs:"100%",sm:130},minWidth:{xs:"100%",sm:130},maxWidth:{xs:"100%",sm:130}},children:[s(V,{children:"\u0422\u0438\u043F \u0443\u043B\u0438\u0446\u044B"}),s(Q,y(h({variant:"soft"},t),{componentsProps:{listbox:{sx:{maxHeight:240,overflow:"auto","--List-padding":"0px"}}},children:A==null?void 0:A.map(n=>s(U,{value:n,children:n},n))}))]})}),s(T,{name:"streetName",rules:{required:{message:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0443\u043B\u0438\u0446\u044B \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C",value:!0}},control:u,render:({field:t,fieldState:n})=>{var c;return s(F,y(h({label:"\u0423\u043B\u0438\u0446\u0430",variant:"soft",fullWidth:!0},t),{error:!!n.error,helperText:(c=n.error)==null?void 0:c.message}))}}),s(T,{name:"building",rules:{required:{message:"\u041D\u043E\u043C\u0435\u0440 \u0437\u0434\u0430\u043D\u0438\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C",value:!0}},control:u,render:({field:t,fieldState:n})=>{var c;return s(f,{sx:{width:{xs:"100%",sm:100}},children:s(F,y(h({label:"\u0417\u0434\u0430\u043D\u0438\u0435",variant:"soft"},t),{error:!!n.error,helperText:(c=n.error)==null?void 0:c.message}))})}})]}),s(T,{name:"comment",control:u,render:({field:t,fieldState:n})=>{var c;return s(F,y(h({label:"\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439",variant:"soft",fullWidth:!0},t),{error:!!n.error,helperText:(c=n.error)==null?void 0:c.message}))}}),g(P,{direction:"column",children:[s(V,{sx:{marginTop:1},children:"\u0420\u0430\u0431\u043E\u0447\u0435\u0435 \u0432\u0440\u0435\u043C\u044F:"}),g(P,{direction:{xs:"column",sm:"row"},spacing:{xs:1,sm:2},children:[s(T,{name:"workingTimeStart",control:u,rules:{required:{message:"\u0412\u0440\u0435\u043C\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C",value:!0}},render:({field:t,fieldState:n})=>{var c;return s(F,y(h({label:"\u041D\u0430\u0447\u0430\u043B\u043E",variant:"soft"},t),{error:!!n.error,helperText:(c=n.error)==null?void 0:c.message}))}}),s(T,{name:"workingTimeEnd",control:u,rules:{required:{message:"\u0412\u0440\u0435\u043C\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C",value:!0}},render:({field:t,fieldState:n})=>{var c;return s(F,y(h({label:"\u041A\u043E\u043D\u0435\u0446",variant:"soft"},t),{error:!!n.error,helperText:(c=n.error)==null?void 0:c.message}))}})]})]})]})},He=e=>()=>Te("stores",e),Ge=e=>ee(e,be(({cityId:u})=>u)),uu=()=>{const e=k(o=>o.setMode),u=k(o=>o.setIsOpen),a=j(o=>o.getCityById),i=k(o=>o.setCurrentStore),{enqueueSnackbar:m}=Z(),l=x.exports.useCallback(o=>{e("edit"),i(o),u(!0)},[e,i]),p=Be(Ee("stores")),b=x.exports.useMemo(()=>Ge(p!=null?p:[]),[p]),r=()=>{m("\u0410\u0440\u043E\u043C\u0430\u0442 \u0431\u044B\u043B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D.",{variant:"success"})},d=()=>{m("\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0430\u0440\u043E\u043C\u0430\u0442 ://",{variant:"error"})},B=x.exports.useMemo(()=>[{key:"actions",header:"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",size:"100px",render:o=>g(Oe,{direction:"row",spacing:1,children:[s(X,{title:"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",children:s(Y,{variant:"plain",onClick:()=>l(o),children:s(Ie,{})})}),s(X,{title:"\u0423\u0434\u0430\u043B\u0438\u0442\u044C",children:s(Y,{variant:"plain",onClick:()=>ue(He(o.id),r,d),children:s(Ne,{})})})]})},{key:"address",header:"\u0410\u0434\u0440\u0435\u0441",size:"200px",render:o=>g(f,{children:["\u0443\u043B. ",o.streetName,", \u0434. ",o.building]})},{key:"workingTime",header:"\u0432\u0440\u0435\u043C\u044F \u0440\u0430\u0431\u043E\u0442\u044B",size:"150px",render:o=>g(f,{children:[o.workingTimeStart,":",o.workingTimeEnd]})},{key:"comment",header:"\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439",size:"minmax(200px, 1fr)",render:o=>s(f,{children:o.comment})}],[a,l]);return g(f,{children:[s(J,{level:"h3",component:"h1",marginBottom:2,children:"\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u043E\u0432"}),s(f,{sx:{minWidth:670},children:s(Re,{config:B,loading:!1,gap:2,children:ee(b,we,ve(([o,D])=>{var v;return g(f,{children:[s(De,{variant:"soft",sx:{position:"sticky",top:48,marginTop:3,paddingX:1,paddingY:.5,zIndex:5,borderRadius:E=>E.radius.sm},children:s(J,{fontSize:"large",fontWeight:"bold",textTransform:"capitalize",children:(v=a(o))==null?void 0:v.name})}),D.map(E=>s(je,{row:E},E.id))]},o)}))})}),s(_e,{}),s(Ve,{onClick:()=>{e("create"),u(!0)}})]})};export{uu as default};
