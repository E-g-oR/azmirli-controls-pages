import{Y as h,Z as p,r as y,$ as g,X as B,k as N,m as S,_}from"./index.070e2350.js";function n(t){var o,s,e="";if(typeof t=="string"||typeof t=="number")e+=t;else if(typeof t=="object")if(Array.isArray(t))for(o=0;o<t.length;o++)t[o]&&(s=n(t[o]))&&(e&&(e+=" "),e+=s);else for(o in t)t[o]&&(e&&(e+=" "),e+=o);return e}function v(){for(var t,o,s=0,e="";s<arguments.length;)(t=arguments[s++])&&(o=n(t))&&(e&&(e+=" "),e+=o);return e}const P=["className","component"];function F(t={}){const{defaultTheme:o,defaultClassName:s="MuiBox-root",generateClassName:e,styleFunctionSx:c=p}=t,u=h("div",{shouldForwardProp:r=>r!=="theme"&&r!=="sx"&&r!=="as"})(c);return y.exports.forwardRef(function(f,x){const i=g(o),a=B(f),{className:l,component:m="div"}=a,d=N(a,P);return S(u,_({as:m,ref:x,className:v(l,e?e(s):s),theme:i},d))})}export{v as a,F as c};
