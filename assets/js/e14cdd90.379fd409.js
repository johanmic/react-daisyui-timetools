(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[113],{4232:(e,t,n)=>{"use strict";n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"timepicker","title":"TimePicker","description":"The TimePicker component is a versatile, responsive UI element designed for effortless time selection. It provides an intuitive interface with support for:","source":"@site/docs/timepicker.mdx","sourceDirName":".","slug":"/timepicker","permalink":"/react-daisyui-timetools/timepicker","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/timepicker.mdx","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3},"sidebar":"tutorialSidebar","previous":{"title":"DatePicker","permalink":"/react-daisyui-timetools/datepicker"},"next":{"title":"Date And TimePicker","permalink":"/react-daisyui-timetools/dateandtimepicker"}}');var s=n(6070),i=n(5658),a=n(3790);const o={sidebar_position:3},c="TimePicker",l={},d=[{value:"Usage",id:"usage",level:2},{value:"Light (default) 60 minutes interval",id:"light-default-60-minutes-interval",level:3},{value:"AMPM",id:"ampm",level:3},{value:"Props",id:"props",level:2}];function h(e){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"timepicker",children:"TimePicker"})}),"\n",(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.code,{children:"TimePicker"})," component is a versatile, responsive UI element designed for effortless time selection. It provides an intuitive interface with support for:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Date Range Control:"})," Limit user selection via ",(0,s.jsx)(t.code,{children:"minDate"})," and ",(0,s.jsx)(t.code,{children:"maxDate"}),"."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Localization:"})," Format dates to various locales using the ",(0,s.jsx)(t.code,{children:"locale"})," prop."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Custom Navigation:"})," Easily customize navigation controls using ",(0,s.jsx)(t.code,{children:"forwardIcon"})," and ",(0,s.jsx)(t.code,{children:"backwardIcon"}),"."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Time Integration:"})," Optionally incorporate time selection through the ",(0,s.jsx)(t.code,{children:"timeModule"}),"."]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Built with accessibility in mind, and leveraging DasiyUI and Tailwind CSS, this component ensures a modern, mobile-first experience across all devices."}),"\n",(0,s.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-tsx",children:'import TimePicker from "react-daisyui-timetools"\n<TimePicker value="2024-01-01 12:00" onChange={() => {}} interval="60" />\n'})}),"\n",(0,s.jsx)(t.h3,{id:"light-default-60-minutes-interval",children:"Light (default) 60 minutes interval"}),"\n",(0,s.jsxs)("div",{className:"flex gap-4",children:[(0,s.jsxs)("div",{"data-theme":"light",className:"rounded-2xl w-32",children:[(0,s.jsx)("div",{className:"opacity-50 text-xs",children:"60 minutes interval"}),(0,s.jsx)(a.h,{value:new Date,onChange:()=>{},interval:"60"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"opacity-50 text-xs",children:"30 minutes interval"}),(0,s.jsx)("div",{"data-theme":"light",className:"rounded-2xl w-32",children:(0,s.jsx)(a.h,{value:new Date,onChange:()=>{},interval:"30"})})]}),(0,s.jsxs)("div",{className:"",children:[(0,s.jsx)("div",{className:"opacity-50 text-xs",children:"15 minutes interval"}),(0,s.jsx)("div",{"data-theme":"light",className:"rounded-2xl w-32",children:(0,s.jsx)(a.h,{value:new Date,onChange:()=>{},interval:"15"})})]})]}),"\n",(0,s.jsx)(t.h3,{id:"ampm",children:"AMPM"}),"\n",(0,s.jsxs)("div",{className:"flex gap-4",children:[(0,s.jsxs)("div",{className:"",children:[(0,s.jsx)("div",{className:"opacity-50 text-xs",children:"Inline AMPM"}),(0,s.jsx)("div",{"data-theme":"light",className:"rounded-2xl w-32",children:(0,s.jsx)(a.h,{value:"2024-01-01 12:00",AMPM:!0,onChange:()=>{}})})]}),(0,s.jsxs)("div",{className:"",children:[(0,s.jsx)("div",{className:"opacity-50 text-xs",children:"Outside AMPM"}),(0,s.jsx)("div",{"data-theme":"light",className:"rounded-2xl",children:(0,s.jsx)(a.h,{value:"2024-01-01 12:00",AMPM:!0,externalAMPM:!0,onChange:()=>{}})})]})]}),"\n",(0,s.jsx)(t.h2,{id:"props",children:"Props"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Prop"}),(0,s.jsx)(t.th,{children:"Type"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"value"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | null | Date"})}),(0,s.jsx)(t.td,{children:"The current selected date/time value. Can be a string, null, or Date object."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"open"})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:"boolean"})," (optional)"]}),(0,s.jsxs)(t.td,{children:["Controls whether the calendar popup is explicitly open (",(0,s.jsx)(t.code,{children:"true"}),") or closed (",(0,s.jsx)(t.code,{children:"false"}),")."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"onChange"})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"(value: string) => void"})}),(0,s.jsx)(t.td,{children:"Callback invoked when the date/time value changes, passing the updated value as a string."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"AMPM"})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:"boolean"})," (optional)"]}),(0,s.jsx)(t.td,{children:"Enables AM/PM time format."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"maxDate"})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:"Date | string | null"})," (optional)"]}),(0,s.jsx)(t.td,{children:"The maximum selectable date. Limits selection to dates on or before this value."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"minDate"})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:"Date | string | null"})," (optional)"]}),(0,s.jsx)(t.td,{children:"The minimum selectable date. Limits selection to dates on or after this value."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"closeOnHour"})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:"boolean"})," (optional)"]}),(0,s.jsx)(t.td,{children:"Determines if the picker should close after selecting an hour."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"closeOnMinute"})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:"boolean"})," (optional)"]}),(0,s.jsx)(t.td,{children:"Determines if the picker should close after selecting a minute."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"placeholder"})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:"string"})," (optional)"]}),(0,s.jsx)(t.td,{children:"Placeholder text in the input field when no date is selected."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"hideInput"})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:"boolean"})," (optional)"]}),(0,s.jsx)(t.td,{children:"Hides the input field if set to true."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"size"})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:'"xs" | "sm" | "md" | "lg"'})," (optional)"]}),(0,s.jsx)(t.td,{children:"Controls the size variation of the DatePicker UI."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"interval"})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:'"60" | "15" | "30"'})," (optional)"]}),(0,s.jsx)(t.td,{children:"Sets the interval for time selection in minutes."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"className"})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:"string"})," (optional)"]}),(0,s.jsx)(t.td,{children:"Additional CSS classes for the outer container of the DatePicker."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"inputClassName"})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:"string"})," (optional)"]}),(0,s.jsx)(t.td,{children:"Additional CSS classes for styling the input element itself."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"calendarClassName"})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:"string"})," (optional)"]}),(0,s.jsx)(t.td,{children:"Additional CSS classes for styling the calendar popup component."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"externalAMPM"})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:"boolean"})," (optional)"]}),(0,s.jsx)(t.td,{children:"Displays AM/PM selection outside the main picker interface."})]})]})]})]})}function u(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},3790:(e,t,n)=>{"use strict";n.d(t,{h:()=>x});var r=n(4795),s=n.n(r),i=n(8447),a=n.n(i),o=n(1624),c=n.n(o),l=n(758),d=n(4201),h=n(6070);s().extend(a()),s().extend(c());const u=e=>{const t=Math.floor(3)+2;return[...Array(t).fill(""),...e,...Array(t).fill("")]},f=u(Array.from({length:12},((e,t)=>(t+1).toString().padStart(2,"0")))),m=u(Array.from({length:24},((e,t)=>t.toString().padStart(2,"0"))));const x=function(e){let{open:t=!1,value:n,onChange:r,AMPM:i=!1,maxDate:a,minDate:o,className:c,inputClassName:u,calendarClassName:x,closeOnHour:p=!1,closeOnMinute:v=!0,placeholder:j,hideInput:g=!1,interval:$="15",externalAMPM:M=!1}=e;const[y,D]=(0,l.useState)(t),[w,b]=(0,l.useState)("12"),[S,k]=(0,l.useState)("00"),[C,A]=(0,l.useState)("AM"),O=(0,l.useRef)(null),Y=(0,l.useRef)(Array(24).fill(null)),T=(0,l.useRef)(null),N=(0,l.useRef)(null),P=(0,l.useMemo)((()=>{return"60"===(e=$)?Array.from({length:60},((e,t)=>t.toString().padStart(2,"0"))):"30"===e?["00","30"]:["00","15","30","45"];var e}),[$]),L=(0,l.useMemo)((()=>(e=>{const t=Math.floor(3)+2;return[...Array(t).fill(""),...e,...Array(t).fill("")]})(P)),[P]),H=(0,l.useRef)(Array(L.length).fill(null));(0,l.useEffect)((()=>{H.current.length!==L.length&&(H.current=Array(L.length).fill(null))}),[L.length]),(0,l.useEffect)((()=>{const e=e=>{O.current&&!O.current.contains(e.target)&&D(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)}),[]),(0,l.useEffect)((()=>{if(n){const e=s()(n).utc().local(),t=P;let r=e.format("mm");t.includes(r)||(r=t[0]),i?(b(e.format("hh")),A(e.format("A"))):b(e.format("HH")),k(r)}else b(i?"12":"00"),k(P[0]),A("AM")}),[n,i,P]),(0,l.useEffect)((()=>{if(y){const e=(i?f:m).indexOf(w),t=L.findIndex((e=>e===S));requestAnimationFrame((()=>{const n=T.current,r=N.current,s=Y.current[e],i=H.current[t];if(n&&r&&s&&i){const e=s.offsetHeight,t=n.clientHeight/2,a=s.offsetTop-t+e/2,o=i.offsetTop-t+e/2;n.scroll({top:Math.max(0,a),behavior:"smooth"}),r.scroll({top:Math.max(0,o),behavior:"smooth"})}}))}}),[y,w,S,i,L,H]);const I=(e,t)=>{const r=s()(),i=s()().set("hour",parseInt(e)).set("minute",parseInt(t)),c=o?s()(o):null,l=a?s()(a):null;return!(!n||!s()(n).startOf("day").isAfter(r.startOf("day")))||(!(!c||!c.startOf("day").isAfter(r.startOf("day")))||!(c&&c.startOf("day").isSame(r.startOf("day"))&&i.isBefore(c))&&(!l||!i.isAfter(l)))},U=(0,l.useCallback)(((e,t,n)=>{if(I(e,t)){b(e),k(t);let s=e;if(i){const t=parseInt(e);"PM"===C&&12!==t?s=(t+12).toString().padStart(2,"0"):"AM"===C&&12===t&&(s="00")}r(`${s}:${t}`),(n&&p||!n&&v)&&D(!1)}}),[i,r,p,v,C]);return(0,l.useCallback)((()=>{A((e=>"AM"===e?"PM":"AM")),U(w,S,!0)}),[w,S,U]),(0,h.jsxs)("div",{className:(0,d.cn)("relative",g?"w-32":"",c),ref:O,children:[!g&&(0,h.jsxs)("div",{className:"flex items-center",children:[(0,h.jsx)("div",{onClick:()=>D(!y),className:(0,d.cn)("inline-flex input input-bordered relative justify-center w-32 items-center rounded-box cursor-pointer",u),children:(0,h.jsxs)("div",{className:"flex items-center gap-1",children:[(0,h.jsx)("span",{className:"text-lg",children:w}),(0,h.jsx)("span",{className:"text-lg",children:":"}),(0,h.jsx)("span",{className:"text-lg",children:S}),!M&&i&&(0,h.jsx)("span",{className:"text-lg ml-1",children:C})]})}),M&&i&&(0,h.jsx)("div",{className:"flex border rounded-box input-bordered flex-col min-h-12 ml-2",children:["AM","PM"].map((e=>(0,h.jsx)("button",{className:(0,d.cn)("badge join-item",e===C?"badge-outline badge-primary":"badge-outline"),onClick:()=>{A(e),U(w,S,!0)},children:e},e)))})]}),(y||g)&&(0,h.jsxs)("div",{className:(0,d.cn)("absolute grid left-0 right-0",g?"top-0":"top-14 shadow-xl",M?"grid-cols-2":i?"grid-cols-3":"grid-cols-2","z-[10] bg-base-100",x),children:[(0,h.jsx)("div",{className:"overflow-y-scroll h-72 scroll-smooth ",ref:T,style:{scrollPaddingTop:"96px",scrollPaddingBottom:"96px"},children:(i?f:m).map(((e,t)=>(0,h.jsx)("div",{ref:e=>{Y.current[t]=e},tabIndex:0,className:(0,d.cn)("flex items-center justify-center text-lg text-center py-3",!e&&"invisible",e===w&&"bg-primary text-primary-content",e&&I(e,"00")?"cursor-pointer hover:bg-primary/50 hover:text-primary-content":"opacity-30 cursor-not-allowed"),onClick:()=>e&&I(e,S)&&U(e,S,!0),children:(0,h.jsx)("span",{className:"text-lg",children:e})},`${e}-${t}`)))}),(0,h.jsx)("div",{className:"overflow-y-scroll h-72 scroll-smooth ",ref:N,style:{scrollPaddingTop:"96px",scrollPaddingBottom:"96px"},children:L.map(((e,t)=>(0,h.jsx)("div",{ref:e=>{H.current[t]=e},tabIndex:0,className:(0,d.cn)("flex items-center justify-center text-lg text-center py-3",!e&&"invisible",e===S&&"bg-primary text-primary-content",e&&I(w,e)?"cursor-pointer hover:bg-primary/50 hover:text-primary-content":"opacity-30 cursor-not-allowed"),onClick:()=>e&&I(w,e)&&U(w,e,!1),children:(0,h.jsx)("span",{className:"text-lg",children:e})},`${e}-${t}`)))}),!M&&i&&(0,h.jsx)("div",{className:"overflow-y-scroll h-72 ",children:["AM","PM"].map((e=>(0,h.jsx)("div",{className:(0,d.cn)("flex items-center justify-center text-lg text-center cursor-pointer py-3",e===C&&"bg-primary text-primary-content","hover:bg-primary/50 hover:text-primary-content"),onClick:()=>{A(e),U(w,S,!0)},children:(0,h.jsx)("span",{className:"text-lg",children:e})},e)))})]})]})}},4201:(e,t,n)=>{"use strict";n.d(t,{cn:()=>r});const r=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(Boolean).join(" ")}},4795:function(e){e.exports=function(){"use strict";var e=1e3,t=6e4,n=36e5,r="millisecond",s="second",i="minute",a="hour",o="day",c="week",l="month",d="quarter",h="year",u="date",f="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,x=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,p={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},v=function(e,t,n){var r=String(e);return!r||r.length>=t?e:""+Array(t+1-r.length).join(n)+e},j={s:v,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),r=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+v(r,2,"0")+":"+v(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var r=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(r,l),i=n-s<0,a=t.clone().add(r+(i?-1:1),l);return+(-(r+(n-s)/(i?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:h,w:c,d:o,D:u,h:a,m:i,s:s,ms:r,Q:d}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},g="en",$={};$[g]=p;var M="$isDayjsObject",y=function(e){return e instanceof S||!(!e||!e[M])},D=function e(t,n,r){var s;if(!t)return g;if("string"==typeof t){var i=t.toLowerCase();$[i]&&(s=i),n&&($[i]=n,s=i);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var o=t.name;$[o]=t,s=o}return!r&&s&&(g=s),s||!r&&g},w=function(e,t){if(y(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new S(n)},b=j;b.l=D,b.i=y,b.w=function(e,t){return w(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var S=function(){function p(e){this.$L=D(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[M]=!0}var v=p.prototype;return v.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(b.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var r=t.match(m);if(r){var s=r[2]-1||0,i=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)}}return new Date(t)}(e),this.init()},v.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},v.$utils=function(){return b},v.isValid=function(){return!(this.$d.toString()===f)},v.isSame=function(e,t){var n=w(e);return this.startOf(t)<=n&&n<=this.endOf(t)},v.isAfter=function(e,t){return w(e)<this.startOf(t)},v.isBefore=function(e,t){return this.endOf(t)<w(e)},v.$g=function(e,t,n){return b.u(e)?this[t]:this.set(n,e)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(e,t){var n=this,r=!!b.u(t)||t,d=b.p(e),f=function(e,t){var s=b.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return r?s:s.endOf(o)},m=function(e,t){return b.w(n.toDate()[e].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},x=this.$W,p=this.$M,v=this.$D,j="set"+(this.$u?"UTC":"");switch(d){case h:return r?f(1,0):f(31,11);case l:return r?f(1,p):f(0,p+1);case c:var g=this.$locale().weekStart||0,$=(x<g?x+7:x)-g;return f(r?v-$:v+(6-$),p);case o:case u:return m(j+"Hours",0);case a:return m(j+"Minutes",1);case i:return m(j+"Seconds",2);case s:return m(j+"Milliseconds",3);default:return this.clone()}},v.endOf=function(e){return this.startOf(e,!1)},v.$set=function(e,t){var n,c=b.p(e),d="set"+(this.$u?"UTC":""),f=(n={},n[o]=d+"Date",n[u]=d+"Date",n[l]=d+"Month",n[h]=d+"FullYear",n[a]=d+"Hours",n[i]=d+"Minutes",n[s]=d+"Seconds",n[r]=d+"Milliseconds",n)[c],m=c===o?this.$D+(t-this.$W):t;if(c===l||c===h){var x=this.clone().set(u,1);x.$d[f](m),x.init(),this.$d=x.set(u,Math.min(this.$D,x.daysInMonth())).$d}else f&&this.$d[f](m);return this.init(),this},v.set=function(e,t){return this.clone().$set(e,t)},v.get=function(e){return this[b.p(e)]()},v.add=function(r,d){var u,f=this;r=Number(r);var m=b.p(d),x=function(e){var t=w(f);return b.w(t.date(t.date()+Math.round(e*r)),f)};if(m===l)return this.set(l,this.$M+r);if(m===h)return this.set(h,this.$y+r);if(m===o)return x(1);if(m===c)return x(7);var p=(u={},u[i]=t,u[a]=n,u[s]=e,u)[m]||1,v=this.$d.getTime()+r*p;return b.w(v,this)},v.subtract=function(e,t){return this.add(-1*e,t)},v.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var r=e||"YYYY-MM-DDTHH:mm:ssZ",s=b.z(this),i=this.$H,a=this.$m,o=this.$M,c=n.weekdays,l=n.months,d=n.meridiem,h=function(e,n,s,i){return e&&(e[n]||e(t,r))||s[n].slice(0,i)},u=function(e){return b.s(i%12||12,e,"0")},m=d||function(e,t,n){var r=e<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(x,(function(e,r){return r||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return b.s(t.$y,4,"0");case"M":return o+1;case"MM":return b.s(o+1,2,"0");case"MMM":return h(n.monthsShort,o,l,3);case"MMMM":return h(l,o);case"D":return t.$D;case"DD":return b.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return h(n.weekdaysMin,t.$W,c,2);case"ddd":return h(n.weekdaysShort,t.$W,c,3);case"dddd":return c[t.$W];case"H":return String(i);case"HH":return b.s(i,2,"0");case"h":return u(1);case"hh":return u(2);case"a":return m(i,a,!0);case"A":return m(i,a,!1);case"m":return String(a);case"mm":return b.s(a,2,"0");case"s":return String(t.$s);case"ss":return b.s(t.$s,2,"0");case"SSS":return b.s(t.$ms,3,"0");case"Z":return s}return null}(e)||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(r,u,f){var m,x=this,p=b.p(u),v=w(r),j=(v.utcOffset()-this.utcOffset())*t,g=this-v,$=function(){return b.m(x,v)};switch(p){case h:m=$()/12;break;case l:m=$();break;case d:m=$()/3;break;case c:m=(g-j)/6048e5;break;case o:m=(g-j)/864e5;break;case a:m=g/n;break;case i:m=g/t;break;case s:m=g/e;break;default:m=g}return f?m:b.a(m)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return $[this.$L]},v.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),r=D(e,t,!0);return r&&(n.$L=r),n},v.clone=function(){return b.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},p}(),k=S.prototype;return w.prototype=k,[["$ms",r],["$s",s],["$m",i],["$H",a],["$W",o],["$M",l],["$y",h],["$D",u]].forEach((function(e){k[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),w.extend=function(e,t){return e.$i||(e(t,S,w),e.$i=!0),w},w.locale=D,w.isDayjs=y,w.unix=function(e){return w(1e3*e)},w.en=$[g],w.Ls=$,w.p={},w}()},8447:function(e){e.exports=function(){"use strict";var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d/,r=/\d\d/,s=/\d\d?/,i=/\d*[^-_:/,()\s\d]+/,a={},o=function(e){return(e=+e)+(e>68?1900:2e3)},c=function(e){return function(t){this[e]=+t}},l=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),n=60*t[1]+(+t[2]||0);return 0===n?0:"+"===t[0]?-n:n}(e)}],d=function(e){var t=a[e];return t&&(t.indexOf?t:t.s.concat(t.f))},h=function(e,t){var n,r=a.meridiem;if(r){for(var s=1;s<=24;s+=1)if(e.indexOf(r(s,0,t))>-1){n=s>12;break}}else n=e===(t?"pm":"PM");return n},u={A:[i,function(e){this.afternoon=h(e,!1)}],a:[i,function(e){this.afternoon=h(e,!0)}],Q:[n,function(e){this.month=3*(e-1)+1}],S:[n,function(e){this.milliseconds=100*+e}],SS:[r,function(e){this.milliseconds=10*+e}],SSS:[/\d{3}/,function(e){this.milliseconds=+e}],s:[s,c("seconds")],ss:[s,c("seconds")],m:[s,c("minutes")],mm:[s,c("minutes")],H:[s,c("hours")],h:[s,c("hours")],HH:[s,c("hours")],hh:[s,c("hours")],D:[s,c("day")],DD:[r,c("day")],Do:[i,function(e){var t=a.ordinal,n=e.match(/\d+/);if(this.day=n[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===e&&(this.day=r)}],w:[s,c("week")],ww:[r,c("week")],M:[s,c("month")],MM:[r,c("month")],MMM:[i,function(e){var t=d("months"),n=(d("monthsShort")||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(n<1)throw new Error;this.month=n%12||n}],MMMM:[i,function(e){var t=d("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[/[+-]?\d+/,c("year")],YY:[r,function(e){this.year=o(e)}],YYYY:[/\d{4}/,c("year")],Z:l,ZZ:l};function f(n){var r,s;r=n,s=a&&a.formats;for(var i=(n=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var i=r&&r.toUpperCase();return n||s[r]||e[r]||s[i].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,n){return t||n.slice(1)}))}))).match(t),o=i.length,c=0;c<o;c+=1){var l=i[c],d=u[l],h=d&&d[0],f=d&&d[1];i[c]=f?{regex:h,parser:f}:l.replace(/^\[|\]$/g,"")}return function(e){for(var t={},n=0,r=0;n<o;n+=1){var s=i[n];if("string"==typeof s)r+=s.length;else{var a=s.regex,c=s.parser,l=e.slice(r),d=a.exec(l)[0];c.call(t,d),e=e.replace(d,"")}}return function(e){var t=e.afternoon;if(void 0!==t){var n=e.hours;t?n<12&&(e.hours+=12):12===n&&(e.hours=0),delete e.afternoon}}(t),t}}return function(e,t,n){n.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(o=e.parseTwoDigitYear);var r=t.prototype,s=r.parse;r.parse=function(e){var t=e.date,r=e.utc,i=e.args;this.$u=r;var o=i[1];if("string"==typeof o){var c=!0===i[2],l=!0===i[3],d=c||l,h=i[2];l&&(h=i[2]),a=this.$locale(),!c&&h&&(a=n.Ls[h]),this.$d=function(e,t,n,r){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var s=f(t)(e),i=s.year,a=s.month,o=s.day,c=s.hours,l=s.minutes,d=s.seconds,h=s.milliseconds,u=s.zone,m=s.week,x=new Date,p=o||(i||a?1:x.getDate()),v=i||x.getFullYear(),j=0;i&&!a||(j=a>0?a-1:x.getMonth());var g,$=c||0,M=l||0,y=d||0,D=h||0;return u?new Date(Date.UTC(v,j,p,$,M,y,D+60*u.offset*1e3)):n?new Date(Date.UTC(v,j,p,$,M,y,D)):(g=new Date(v,j,p,$,M,y,D),m&&(g=r(g).week(m).toDate()),g)}catch(e){return new Date("")}}(t,o,r,n),this.init(),h&&!0!==h&&(this.$L=this.locale(h).$L),d&&t!=this.format(o)&&(this.$d=new Date("")),a={}}else if(o instanceof Array)for(var u=o.length,m=1;m<=u;m+=1){i[1]=o[m-1];var x=n.apply(this,i);if(x.isValid()){this.$d=x.$d,this.$L=x.$L,this.init();break}m===u&&(this.$d=new Date(""))}else s.call(this,e)}}}()},1624:function(e){e.exports=function(){"use strict";var e="minute",t=/[+-]\d\d(?::?\d\d)?/g,n=/([+-]|\d\d)/g;return function(r,s,i){var a=s.prototype;i.utc=function(e){return new s({date:e,utc:!0,args:arguments})},a.utc=function(t){var n=i(this.toDate(),{locale:this.$L,utc:!0});return t?n.add(this.utcOffset(),e):n},a.local=function(){return i(this.toDate(),{locale:this.$L,utc:!1})};var o=a.parse;a.parse=function(e){e.utc&&(this.$u=!0),this.$utils().u(e.$offset)||(this.$offset=e.$offset),o.call(this,e)};var c=a.init;a.init=function(){if(this.$u){var e=this.$d;this.$y=e.getUTCFullYear(),this.$M=e.getUTCMonth(),this.$D=e.getUTCDate(),this.$W=e.getUTCDay(),this.$H=e.getUTCHours(),this.$m=e.getUTCMinutes(),this.$s=e.getUTCSeconds(),this.$ms=e.getUTCMilliseconds()}else c.call(this)};var l=a.utcOffset;a.utcOffset=function(r,s){var i=this.$utils().u;if(i(r))return this.$u?0:i(this.$offset)?l.call(this):this.$offset;if("string"==typeof r&&(r=function(e){void 0===e&&(e="");var r=e.match(t);if(!r)return null;var s=(""+r[0]).match(n)||["-",0,0],i=s[0],a=60*+s[1]+ +s[2];return 0===a?0:"+"===i?a:-a}(r),null===r))return this;var a=Math.abs(r)<=16?60*r:r,o=this;if(s)return o.$offset=a,o.$u=0===r,o;if(0!==r){var c=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(a+c,e)).$offset=a,o.$x.$localOffset=c}else o=this.utc();return o};var d=a.format;a.format=function(e){var t=e||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return d.call(this,t)},a.valueOf=function(){var e=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*e},a.isUTC=function(){return!!this.$u},a.toISOString=function(){return this.toDate().toISOString()},a.toString=function(){return this.toDate().toUTCString()};var h=a.toDate;a.toDate=function(e){return"s"===e&&this.$offset?i(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():h.call(this)};var u=a.diff;a.diff=function(e,t,n){if(e&&this.$u===e.$u)return u.call(this,e,t,n);var r=this.local(),s=i(e).local();return u.call(r,s,t,n)}}}()},5658:(e,t,n)=>{"use strict";n.d(t,{R:()=>a,x:()=>o});var r=n(758);const s={},i=r.createContext(s);function a(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(i.Provider,{value:t},e.children)}}}]);