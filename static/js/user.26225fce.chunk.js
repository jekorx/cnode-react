(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{203:function(e,t,a){e.exports={wrap:"user_wrap__3xzcs",text:"user_text__3OeRA",icon:"user_icon__1sVdJ",github:"user_github__1ySUl",type:"user_type__1vqFH","type-icon":"user_type-icon__ULyi7","type-text":"user_type-text__2Z6cj",link:"user_link__1BmAy",title:"user_title__31Sph",avatar:"user_avatar__JZIht",bottom:"user_bottom__1Rhyv",right:"user_right__3v1on"}},240:function(e,t,a){"use strict";a.r(t);a(115);var n,r=a(75),c=a.n(r),s=a(25),i=a.n(s),o=a(27),l=a(36),u=(a(116),a(60)),h=a.n(u),m=a(2),p=a(3),_=a(6),d=a(5),b=a(38),f=a(7),y=a(0),g=a.n(y),E=a(15),v=a(196),j=a(50),O=a(77),T=a(78),w=a(99),k=a(24),S=a(32),N=a(203),R=a.n(N),x=function(e){function t(){return Object(m.a)(this,t),Object(_.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props.info,t=e.avatarUrl,a=e.loginname,n=e.createAt,r=e.githubUsername,c=e.score;return g.a.createElement(y.Fragment,null,g.a.createElement(w.a,{name:a,avatar:t}),g.a.createElement("p",{className:R.a.text},g.a.createElement(k.a,{type:"score",className:R.a.icon}),c," \u79ef\u5206",g.a.createElement("a",{className:R.a.github,href:"https://github.com/".concat(r)},g.a.createElement(k.a,{type:"github",className:R.a.icon}),r)),g.a.createElement("p",{className:R.a.text},"\u6ce8\u518c\u65f6\u95f4 ",Object(S.c)(n)))}}]),t}(y.PureComponent),C=a(193),D=function(e){function t(){return Object(m.a)(this,t),Object(_.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props.data,t="/topic/".concat(e.id);return g.a.createElement(C.a,{to:t,className:R.a.link},g.a.createElement("h3",{className:R.a.title},e.title),g.a.createElement("div",{className:R.a.bottom},g.a.createElement("span",{className:R.a.avatar,style:{backgroundImage:"url(".concat(e.author.avatar_url,")")}}),g.a.createElement("div",{className:R.a.right},g.a.createElement("span",null,e.author.loginname),g.a.createElement("span",null,"\u6700\u540e\u56de\u590d ",Object(S.c)(e.last_reply_at)))))}}]),t}(y.PureComponent),U=function(e){function t(){return Object(m.a)(this,t),Object(_.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props.data,t=e.title,a=e.icon;return g.a.createElement("h3",{className:R.a.type},g.a.createElement(k.a,{type:a,className:R.a["type-icon"]}),g.a.createElement("span",{className:R.a["type-text"]},t))}}]),t}(y.PureComponent),q=Object(E.b)("_GV_")(n=Object(E.c)(n=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(_.a)(this,Object(d.a)(t).call(this,e))).state={dataSource:new h.a.DataSource({rowHasChanged:function(e,t){return e.id!==t.id||e.loginname!==t.loginname}}),name:"",pageSize:14,height:0,showBackTop:!1,refreshing:!1},a.handleRefresh=function(){a.setState({refreshing:!0},a.queryData)},a.handleScroll=function(e){a.setState({showBackTop:e.target.scrollTop>200})},a.handleBackTop=function(){a.setState({showBackTop:!1},function(){a.listViewRef.scrollTo(0)})},a.queryData=a.queryData.bind(Object(b.a)(a)),a}return Object(f.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.match.params,a=e._GV_,n=a.headerHeight,r=a.setTitle,c=t.name;r({title:"@".concat(c," \u7684\u4e2a\u4eba\u4e3b\u9875")}),this.setState({name:c,height:(document.documentElement.clientHeight||document.body.clientHeight)-n},this.queryData)}},{key:"componentDidUpdate",value:function(e){var t=this.props,a=t.match.params.name,n=t._GV_.setTitle;a!==e.match.params.name&&(n({title:"@".concat(a," \u7684\u4e2a\u4eba\u4e3b\u9875")}),this.setState({name:a},this.queryData))}},{key:"queryData",value:function(){var e=Object(l.a)(i.a.mark(function e(){var t,a,n,r,c,s,l,u;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state.name,e.next=3,j.a.get("user/".concat(t));case 3:return a=e.sent,e.next=6,j.a.get("topic_collect/".concat(t));case 6:n=e.sent,r=a.success,c=a.data,r&&(s=n.success&&n.data?n.data:[],l=this.state.dataSource,u=[{avatarUrl:c.avatar_url,createAt:c.create_at,githubUsername:c.githubUsername,loginname:c.loginname,score:c.score},{type:"RECENT_TITLE",title:"\u6700\u8fd1\u521b\u5efa\u7684\u8bdd\u9898",icon:"msg"}].concat(Object(o.a)(c.recent_topics),[{type:"RECENT_TITLE",title:"\u6700\u8fd1\u53c2\u4e0e\u7684\u8bdd\u9898",icon:"reply"}],Object(o.a)(c.recent_replies),[{type:"RECENT_TITLE",title:"\u6536\u85cf\u7684\u8bdd\u9898",icon:"collections"}],Object(o.a)(s)),this.setState({dataSource:l.cloneWithRows(u),refreshing:!1}));case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state,a=t.dataSource,n=t.height,r=t.showBackTop,s=t.refreshing,i=t.pageSize;return g.a.createElement(y.Fragment,null,g.a.createElement(h.a,{ref:function(t){e.listViewRef=t},dataSource:a,pageSize:i,style:{height:n,overflow:"auto"},onScroll:this.handleScroll,scrollEventThrottle:800,scrollRenderAheadDistance:400,pullToRefresh:g.a.createElement(c.a,{refreshing:s,onRefresh:this.handleRefresh,indicator:T.a}),renderRow:function(e,t,a){return 0===+a?g.a.createElement(x,{info:e}):"RECENT_TITLE"===e.type?g.a.createElement(U,{data:e}):g.a.createElement(D,{data:e})}}),g.a.createElement(O.a,{show:r,handleClick:this.handleBackTop}))}}]),t}(y.Component))||n)||n,B=Object(v.a)(q);t.default=B}}]);