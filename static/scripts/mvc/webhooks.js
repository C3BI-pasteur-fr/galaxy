define("mvc/webhooks",["exports","utils/utils"],function(t,e){"use strict";function r(t,e){return t.models.filter(function(t){var r=t.get("type");return!!r&&-1!==r.indexOf(e)})}function n(t){var e=t.pluck("weight"),r=e.reduce(function(t,e){return t+e}),n=new Map;e.forEach(function(t,e){n.set(e,parseFloat((t/r).toFixed(2)))});var o=[],a=!0,u=!1,l=void 0;try{for(var c,f=n[Symbol.iterator]();!(a=(c=f.next()).done);a=!0)for(var s=c.value,d=i(s,2),h=d[0],y=d[1],v=0;v<100*y;v++)o.push(h)}catch(t){u=!0,l=t}finally{try{!a&&f.return&&f.return()}finally{if(u)throw l}}return t.at(o[Math.floor(Math.random()*o.length)])}Object.defineProperty(t,"__esModule",{value:!0});var o=function(t){return t&&t.__esModule?t:{default:t}}(e),i=function(){function t(t,e){var r=[],n=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{!n&&u.return&&u.return()}finally{if(o)throw i}}return r}return function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=Backbone.Collection.extend({url:function(){return Galaxy.root+"api/webhooks"}}),u=Backbone.View.extend({el:"#webhook-view",initialize:function(t){var e=this,o=t.toolId||"",i=t.toolVersion||"";this.$el.attr("tool_id",o),this.$el.attr("tool_version",i),(new a).fetch({success:function(o){t.type&&o.reset(r(o,t.type)),o.length>0&&e.render(n(o))}})},render:function(t){var e=t.toJSON();return this.$el.html('<div id="'+e.id+'"></div>'),o.default.appendScriptStyle(e),this}});t.default={WebhookView:u,load:function(t){(new a).fetch({async:void 0===t.async||t.async,success:function(e){t.type&&e.reset(r(e,t.type)),t.callback(e)}})}}});