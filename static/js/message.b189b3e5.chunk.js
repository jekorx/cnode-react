(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{235:function(e,t,a){e.exports={type:"message_type__3aJs4","type-icon":"message_type-icon__3tJzf","type-text":"message_type-text__sKFu5",link:"message_link__1TX5B",title:"message_title__3YH8c",avatar:"message_avatar__AlEOv",bottom:"message_bottom__2ikES",right:"message_right__3SB7r"}},241:function(e,t,a){"use strict";a.r(t);a(115);var n,s=a(75),r=a.n(s),c=a(27),o=(a(116),a(60)),i=a.n(o),l=a(2),h=a(3),u=a(6),p=a(5),d=a(7),f=a(0),m=a.n(f),g=a(15),_=a(50),S=a(78),y=a(77),b=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.props.data;return m.a.createElement("div",null,e)}}]),t}(f.PureComponent),v=a(24),E=a(235),O=a.n(E),j=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.props.data,t=e.title,a=e.icon;return m.a.createElement("h3",{className:O.a.type},m.a.createElement(v.a,{type:a,className:O.a["type-icon"]}),m.a.createElement("span",{className:O.a["type-text"]},t))}}]),t}(f.PureComponent),w=Object(g.b)("_GV_","user")(n=Object(g.c)(n=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).state={dataSource:new i.a.DataSource({rowHasChanged:function(e,t){return e.id!==t.id}}),pageSize:14,height:0,showBackTop:!1,refreshing:!1},a.queryData=function(){var e=a.props.user.accessToken;_.a.get("/messages?accesstoken=".concat(e)).then(function(e){var t=e.success,n=e.data;if(t){var s=a.state.dataSource,r=[{type:"MESSAGES",title:"\u65b0\u6d88\u606f",icon:"list"}].concat(Object(c.a)(n.hasnot_read_messages),[{type:"MESSAGES",title:"\u8fc7\u5f80\u4fe1\u606f",icon:"collections"}],Object(c.a)(n.has_read_messages));a.setState({dataSource:s.cloneWithRows(r),refreshing:!1})}})},a.handleRefresh=function(){a.setState({refreshing:!0},a.queryData)},a.handleScroll=function(e){a.setState({showBackTop:e.target.scrollTop>200})},a.handleBackTop=function(){a.setState({showBackTop:!1},function(){a.listViewRef.scrollTo(0)})},a}return Object(d.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this.props._GV_,t=e.headerHeight;(0,e.setTitle)({path:"/message"}),this.setState({height:(document.documentElement.clientHeight||document.body.clientHeight)-t},this.queryData)}},{key:"render",value:function(){var e=this,t=this.state,a=t.dataSource,n=t.height,s=t.showBackTop,c=t.refreshing,o=t.pageSize;return m.a.createElement(f.Fragment,null,m.a.createElement(i.a,{ref:function(t){e.listViewRef=t},dataSource:a,pageSize:o,style:{height:n,overflow:"auto"},onScroll:this.handleScroll,scrollEventThrottle:800,scrollRenderAheadDistance:400,pullToRefresh:m.a.createElement(r.a,{refreshing:c,onRefresh:this.handleRefresh,indicator:S.a}),renderRow:function(e,t,a){return"MESSAGES"===e.type?m.a.createElement(j,{data:e}):m.a.createElement(b,{data:e})}}),m.a.createElement(y.a,{show:s,handleClick:this.handleBackTop}))}}]),t}(f.Component))||n)||n;t.default=w}}]);