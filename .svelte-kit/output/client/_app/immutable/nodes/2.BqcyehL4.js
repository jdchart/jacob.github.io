import{s as D,n as _}from"../chunks/scheduler.C0r85OrY.js";import{S,i as q,e as d,t as v,s as w,c as h,a as p,b,d as m,f as y,k as f,g as B,h as u,j as k,l as E,m as I,n as X,o as x,p as A,q as C}from"../chunks/index._UPG16gM.js";import{b as G}from"../chunks/paths.CR-lhYuY.js";function K(o){let e,t,r,i,n,a;return{c(){e=d("div"),t=d("a"),r=v(o[0]),i=w(),n=d("p"),a=v(o[2]),this.h()},l(s){e=h(s,"DIV",{class:!0});var l=p(e);t=h(l,"A",{href:!0,class:!0});var c=p(t);r=b(c,o[0]),c.forEach(m),i=y(l),n=h(l,"P",{class:!0});var g=p(n);a=b(g,o[2]),g.forEach(m),l.forEach(m),this.h()},h(){f(t,"href",o[1]),f(t,"class","svelte-1rseels"),f(n,"class","svelte-1rseels"),f(e,"class","container svelte-1rseels")},m(s,l){B(s,e,l),u(e,t),u(t,r),u(e,i),u(e,n),u(n,a)},p(s,[l]){l&1&&k(r,s[0]),l&2&&f(t,"href",s[1]),l&4&&k(a,s[2])},i:_,o:_,d(s){s&&m(e)}}}function M(o,e,t){let{label:r=""}=e,{link:i=""}=e,{desc:n=""}=e;return o.$$set=a=>{"label"in a&&t(0,r=a.label),"link"in a&&t(1,i=a.link),"desc"in a&&t(2,n=a.desc)},[r,i,n]}class V extends S{constructor(e){super(),q(this,e,M,K,D,{label:0,link:1,desc:2})}}function P(o){let e,t,r,i,n,a;return r=new V({props:{label:"Corpus Explorer",link:G+"/explorer",desc:"A simple interface for exploring a sound corpus."}}),n=new V({props:{label:"Corpus Maker",link:"https://colab.research.google.com/drive/1IBGfX52AYIIccxhS5dXXQblXNKXKiVWF?usp=sharing",desc:"A python notebook for creating a sound corpus on Google Collab."}}),{c(){e=d("div"),t=d("div"),E(r.$$.fragment),i=w(),E(n.$$.fragment),this.h()},l(s){e=h(s,"DIV",{class:!0});var l=p(e);t=h(l,"DIV",{class:!0});var c=p(t);I(r.$$.fragment,c),i=y(c),I(n.$$.fragment,c),c.forEach(m),l.forEach(m),this.h()},h(){f(t,"class","inner_container"),f(e,"class","container")},m(s,l){B(s,e,l),u(e,t),X(r,t,null),u(t,i),X(n,t,null),a=!0},p:_,i(s){a||(x(r.$$.fragment,s),x(n.$$.fragment,s),a=!0)},o(s){A(r.$$.fragment,s),A(n.$$.fragment,s),a=!1},d(s){s&&m(e),C(r),C(n)}}}class Q extends S{constructor(e){super(),q(this,e,null,P,D,{})}}export{Q as component};