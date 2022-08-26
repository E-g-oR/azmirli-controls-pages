var I=Object.defineProperty,K=Object.defineProperties;var L=Object.getOwnPropertyDescriptors;var B=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var q=(e,a,o)=>a in e?I(e,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[a]=o,r=(e,a)=>{for(var o in a||(a={}))$.call(a,o)&&q(e,o,a[o]);if(B)for(var o of B(a))G.call(a,o)&&q(e,o,a[o]);return e},k=(e,a)=>K(e,L(a));import{V as H,ay as J,r as l,az as N,aA as P,p as w,a4 as Q,m as n}from"./index.070e2350.js";import{u as U,K as X,c as Y,C as c,d}from"./index.09c9c94c.js";const E=H(e=>({city:null,isOpen:!1,mode:"create",setCity:a=>e({city:a}),setIsOpen:a=>e({isOpen:a}),setMode:a=>e({mode:a}),setEditCity:a=>e({city:a,mode:"edit",isOpen:!0}),setCreateCity:()=>e({mode:"create",isOpen:!0,city:null})}));function Z(e,a,o){return e().then(()=>a()).catch(f=>{console.log("\u043E\u0448\u0438\u0431\u043A\u0430",f),o()})}const R=e=>()=>N("cities",e),_=e=>()=>P("cities",e.id,e),y=(e,a)=>r(r({},e),a),s4=({onClose:e})=>{var v,x,h,F,S;const{enqueueSnackbar:a}=J(),o=E(s=>s.mode),f=E(s=>s.isOpen),u=E(s=>s.city),{control:i,handleSubmit:T,formState:{errors:D},setValue:m,reset:p,clearErrors:g}=U({defaultValues:{name:(v=u==null?void 0:u.name)!=null?v:"",subDomain:(x=u==null?void 0:u.subDomain)!=null?x:"",instagram:(h=u==null?void 0:u.instagram)!=null?h:"",facebook:(F=u==null?void 0:u.facebook)!=null?F:"",vkontakte:(S=u==null?void 0:u.vkontakte)!=null?S:"",id:u==null?void 0:u.id}}),b=l.exports.useCallback(()=>{p(),g()},[p,g]),V=l.exports.useMemo(()=>o==="edit"?"\u0417\u0430\u043F\u0438\u0441\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0430!":"\u0417\u0430\u043F\u0438\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u043D\u0430!",[o]),j=()=>{a(V,{variant:"success"}),e(),b()},M=()=>{a("\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A",{variant:"error"})};l.exports.useEffect(()=>{var s,t,A,C,O;m("id",u==null?void 0:u.id),m("name",(s=u==null?void 0:u.name)!=null?s:""),m("subDomain",(t=u==null?void 0:u.subDomain)!=null?t:""),m("instagram",(A=u==null?void 0:u.instagram)!=null?A:""),m("vkontakte",(C=u==null?void 0:u.vkontakte)!=null?C:""),m("facebook",(O=u==null?void 0:u.facebook)!=null?O:"")},[u]),l.exports.useEffect(()=>{o==="create"&&b()},[o]);const W=(o==="create"?"\u0421\u043E\u0437\u0434\u0430\u0442\u044C":"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C")+" \u0433\u043E\u0440\u043E\u0434 "+(u?u.name:""),z=l.exports.useCallback(s=>{const t=X(o).with("create",()=>R(s)).with("edit",()=>u?_(y(u,s)):R(s)).exhaustive();return Z(t,j,M)},[u,o]);return w(Y,{isOpen:f,title:W,onCancel:()=>{e(),b()},onClose:()=>{e(),b()},onSubmit:T(z),children:[w(Q,{direction:{xs:"column",sm:"row"},spacing:{xs:1,sm:2},children:[n(c,{name:"name",rules:{required:{message:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C",value:!0}},control:i,render:({field:s})=>{var t;return n(d,k(r({label:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",variant:"soft",fullWidth:!0},s),{error:!!D.name,helperText:(t=D.name)==null?void 0:t.message}))}}),n(c,{name:"subDomain",rules:{required:{message:"\u041F\u043E\u0434\u0434\u043E\u043C\u0435\u043D \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C",value:!0}},control:i,render:({field:s})=>{var t;return n(d,k(r({label:"\u041F\u043E\u0434\u0434\u043E\u043C\u0435\u043D",variant:"soft",fullWidth:!0},s),{error:!!D.subDomain,helperText:(t=D.subDomain)==null?void 0:t.message}))}})]}),n(c,{name:"instagram",control:i,render:({field:s})=>n(d,r({label:"\u0418\u043D\u0441\u0442\u0430\u0433\u0440\u0430\u043C",variant:"soft"},s))}),n(c,{name:"vkontakte",control:i,render:({field:s})=>n(d,r({label:"\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435",variant:"soft"},s))}),n(c,{name:"facebook",control:i,render:({field:s})=>n(d,r({label:"\u0424\u0435\u0439\u0441\u0431\u0443\u043A",variant:"soft"},s))})]})};export{s4 as C,Z as m,E as u};
