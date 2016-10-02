define("santaProps/utils/santaTypesUtils",["lodash"],function(a){"use strict";function b(a){for(var b=[a],c=0;c<b.length;c++){var d=b[c].mixins;d&&d.length&&b.push.apply(b,d)}return b}function c(b){return a.isFunction(b.fetch)}function d(c){var d=b(c),e=a.map(d,"propTypes");return a.defaults.apply(a,[{}].concat(e))}function e(b){return a.pick(d(b),c)}function f(b,d){if(d.useSantaTypes)return a.pick(d,a.keys(b).concat(["useSantaTypes"]));var e=d.siteData,f=e.getExistingRootNavigationInfo(e.getFocusedRootId()),g={stylesMap:d.loadedStyles,siteData:d.siteData,siteAPI:d.siteAPI},h={structure:d.structure,rootId:d.rootId,rootNavigationInfo:f},i=a.pick(b,c),j=a.mapValues(i,function(a){return a.fetch(g,h)});return a.assign({useSantaTypes:!0},j,a.pick(d,a.keys(b)))}return{resolveComponentProps:f,getPropTypesByDefinition:d,getSantaTypesByDefinition:e}}),define("santaProps/utils/propsSelectorsFactory",["lodash","santaProps/utils/santaTypesUtils"],function(a,b){"use strict";function f(a,b){c[a]=b,d[a]=g(b)}function g(c){var d=b.getPropTypesByDefinition(c);return a.pick(d,function(b){return a.isFunction(b.fetch)})}function h(a){return d[a]||{}}function i(b){var d=c[b];if(!d)return null;var f=null;return e[b]=e[b]||function(b,c){return f=f||g(d),a.mapValues(f,function(a){return a.fetch(b,c)})},e[b]}var c={},d={},e={};return{registerComponent:f,getPropTypesForComponent:h,getPropsSelectorForComponent:i}}),define("santaProps/propsBuilder/componentPropsBuilder",["lodash","utils","santaProps/utils/propsSelectorsFactory","experiment"],function(a,b,c,d){"use strict";function f(a,b){return a.styleId&&b.getAllTheme()[a.styleId]?b.getAllTheme()[a.styleId].skin:a.skin}function g(c,d,f){var g=d.getSiteData(),h=b.layout.getStyle(c,g.getPageBottomMargin(),g.getScreenWidth(),g.getSiteWidth(),g.getSiteX());return a.includes(a.get(g,["renderRealtimeConfig","compsToShowOnTop"]),f)&&(h.zIndex=e),h}function h(a,b,c,e){if(!c)return{};var f=d.isOpen("wixCodeBinding")&&a.getRuntimeDal().getCompProps(b);return f||a.getSiteData().getDataByQuery(c,e,"component_properties")||{}}function i(a,b,c,e){var f=d.isOpen("wixCodeBinding")&&a.getRuntimeDal().getCompData(b);return f||a.getSiteData().getDataByQuery(c,e,"document_data")}function j(a,b,c,e){return d.isOpen("wixCodeBinding"),a.getSiteData().getDataByQuery(c,e,"design_data")}function k(a,b){return b?a.styleId&&b[a.styleId]||a.skin&&b[a.skin]:a.styleId}function l(a,c,e,g,j){var l=c.getSiteData(),m=l.pagesData[a].structure,n=c.getSiteAspect("behaviorsAspect"),o={viewerPrivateServices:e,structure:m,siteData:l,siteAPI:c,id:a,key:a,ref:a,refInParent:a,pageId:a,rootId:a,currentUrlPageId:l.getCurrentUrlPageId(),rootNavigationInfo:l.getExistingRootNavigationInfoWithTransitionInfo(a),loadedStyles:g,styleId:k(m,g),skin:f(m,l),style:{width:"100%",height:"100%"},compProp:h(c,a,m.propertyQuery,a),compActions:n.getActions("comp",a),compBehaviors:n.extractBehaviors(a),renderFlags:l.renderFlags};return d.isOpen("sv_dpages")&&o.rootNavigationInfo&&o.rootNavigationInfo.routerDefinition&&(o.key=a+o.rootNavigationInfo.routersRendererIndex),m.dataQuery&&(o.compData=i(c,a,m.dataQuery,a)),d.isOpen("sv_hoverBox")&&(o.activeModes=b.objectUtils.cloneDeep(l.activeModes),o.measureMap=j),o}function m(b,d,e,l,m){var n=d.getSiteData(),o=e||"masterPage",p=n.getExistingRootNavigationInfoWithTransitionInfo(o);if(c.getPropsSelectorForComponent(b.componentType))return a.assign(c.getPropsSelectorForComponent(b.componentType)({stylesMap:l,siteData:n,siteAPI:d},{structure:b,rootNavigationInfo:p,rootId:e}),{useSantaTypes:!0});var q=d.getSiteAspect("behaviorsAspect"),r=b.id,s={viewerPrivateServices:m||{},structure:b,siteData:n,siteAPI:d,id:r,key:r,ref:r,refInParent:r,pageId:o,rootId:o,currentUrlPageId:n.getCurrentUrlPageId(),rootNavigationInfo:p,loadedStyles:l,styleId:k(b,l),skin:f(b,n),style:g(b.layout,d,r),compProp:h(d,r,b.propertyQuery,e),compActions:q.getActions("comp",r),compBehaviors:q.extractBehaviors(r),renderFlags:n.renderFlags};return b.designQuery&&(s.compDesign=j(d,r,b.designQuery,e)),b.dataQuery&&(s.compData=i(d,r,b.dataQuery,e)),s}var e=b.style.MAX_Z_INDEX,n={getCompProps:m,getStyleId:k,getSkin:f,getCompProp:h,getCompData:i,getStyle:g,getRootProps:l};return n.getCompDesign=j,n}),define("santaProps/utils/propsSelectorsUtils",["lodash"],function(a){"use strict";function b(b,c){return a.get(c,"structure.id")}function c(a,b){var c=a.bind(null);return c.isRequired=a.isRequired.bind(null),c.fetch=b,c.isRequired.fetch=b,c}return{idSelector:b,applyFetch:c}}),define("santaProps/types/modules/BrowserSantaTypes",["react","santaProps/utils/propsSelectorsUtils"],function(a,b){"use strict";var c=b.applyFetch,d=c(a.PropTypes.object,function(a){return a.siteData.getBrowser()}),e=c(a.PropTypes.bool,function(a){return a.siteData.mobile.isAndroidOldBrowser()});return{browser:d,isAndroidOldBrowser:e}}),define("santaProps/types/modules/ComponentSantaTypes",["react","santaProps/utils/propsSelectorsUtils","santaProps/propsBuilder/componentPropsBuilder"],function(a,b,c){"use strict";var d=b.applyFetch,e=a.PropTypes.oneOfType([a.PropTypes.string,a.PropTypes.number]),f=d(a.PropTypes.shape({componentType:a.PropTypes.string.isRequired,dataQuery:a.PropTypes.oneOfType([a.PropTypes.string,a.PropTypes.object]),propertyQuery:a.PropTypes.oneOfType([a.PropTypes.string,a.PropTypes.object]),designQuery:a.PropTypes.oneOfType([a.PropTypes.string,a.PropTypes.object]),behaviorQuery:a.PropTypes.oneOfType([a.PropTypes.string,a.PropTypes.object]),components:a.PropTypes.array,skin:a.PropTypes.string,styleId:a.PropTypes.string,id:a.PropTypes.string,type:a.PropTypes.string}),function(a,b){return b.structure}),g=d(a.PropTypes.shape({bottom:e,height:e,left:e,position:a.PropTypes.string,right:e,top:e,width:e}),function(a,b){return c.getStyle(b.structure.layout,a.siteAPI,b.structure.id)}),h=d(a.PropTypes.object,function(a,b){return c.getCompProp(a.siteAPI,b.structure.id,b.structure.propertyQuery,b.rootId)}),i=d(a.PropTypes.object,function(a,b){return c.getCompData(a.siteAPI,b.structure.id,b.structure.dataQuery,b.rootId)}),j=d(a.PropTypes.object,function(a,b){return a.siteAPI.getSiteAspect("behaviorsAspect").getActions("comp",b.structure.id)}),k=d(a.PropTypes.object,function(a,b){return a.siteData.getAllTheme()[b.structure.styleId]}),l=d(a.PropTypes.string,function(a,b){return c.getStyleId(b.structure,a.stylesMap)}),m=d(a.PropTypes.oneOfType([a.PropTypes.array,a.PropTypes.object]),function(a,b){var c=a.siteAPI.getSiteAspect("behaviorsAspect");return c.extractBehaviors(b.structure&&b.structure.id)}),n=d(a.PropTypes.string,function(a,b){return c.getSkin(b.structure,a.siteData)}),o=d(a.PropTypes.string,b.idSelector),p=d(a.PropTypes.string,function(a,b){return b.rootId}),q=d(a.PropTypes.shape({pageId:a.PropTypes.string.isRequired,title:a.PropTypes.string,pageAdditionalData:a.PropTypes.string,pageItemId:a.PropTypes.string,pageItemAdditionalData:a.PropTypes.string,anchorData:a.PropTypes.string}),function(a,b){return b.rootNavigationInfo}),r=d(a.PropTypes.string,function(a){return a.siteData.getCurrentUrlPageId()});return{structure:f,id:o,key:o,ref:o,refInParent:o,pageId:p,rootId:p,rootNavigationInfo:q,currentUrlPageId:r,styleId:l,skin:n,style:g,compBehaviors:m,compData:i,compProp:h,compActions:j,theme:k}}),define("santaProps/types/modules/DeviceSantaTypes",["react","santaProps/utils/propsSelectorsUtils"],function(a,b){"use strict";var c=b.applyFetch,d=c(a.PropTypes.bool,function(a){return a.siteData.isTouchDevice()}),e=c(a.PropTypes.number,function(a){return a.siteData.mobile.getDevicePixelRatio()}),f=c(a.PropTypes.bool,function(a){return a.siteData.isMobileDevice()}),g=c(a.PropTypes.bool,function(a){return a.siteData.isTabletDevice()});return{devicePixelRatio:e,isTouchDevice:d,isTabletDevice:g,isMobileDevice:f}}),define("santaProps/types/modules/LayoutSantaTypes",["react","santaProps/utils/propsSelectorsUtils"],function(a,b){"use strict";var c=b.applyFetch,d=c(a.PropTypes.func,function(a){return a.siteAPI.reLayoutIfPending}),e=c(a.PropTypes.func,function(a){return a.siteAPI.registerReLayoutPending});return{reLayoutIfPending:d,registerReLayoutPending:e}}),define("santaProps/types/modules/LinkSantaTypes",["lodash","react","santaProps/utils/propsSelectorsUtils","wixUrlParser"],function(a,b,c,d){"use strict";var e=c.applyFetch,f=e(b.PropTypes.shape({primaryPageId:b.PropTypes.string,currentUrl:b.PropTypes.object,currentUrlPageId:b.PropTypes.string,urlFormat:b.PropTypes.string,mainPageId:b.PropTypes.string,externalBaseUrl:b.PropTypes.string,unicodeExternalBaseUrl:b.PropTypes.string,publicBaseUrl:b.PropTypes.string,isFeedbackEndpoint:b.PropTypes.bool,isViewerMode:b.PropTypes.bool,isWixSite:b.PropTypes.bool,isTemplate:b.PropTypes.bool,isUsingSlashUrlFormat:b.PropTypes.bool,isPremiumDomain:b.PropTypes.bool,serviceTopology:{staticDocsUrl:b.PropTypes.string,basePublicUrl:b.PropTypes.string,baseDomain:b.PropTypes.string},routersConfigMap:b.PropTypes.object,allPageIds:b.PropTypes.array,pagesDataItemsMap:b.PropTypes.array,mapFromPageUriSeoToPageId:b.PropTypes.object,permalinksMap:b.PropTypes.array}),function(a){return d.utils.getResolvedSiteData(a.siteData)});return{linkRenderInfo:f}}),define("santaProps/types/modules/PinterestSantaTypes",["lodash","react","santaProps/utils/propsSelectorsUtils"],function(a,b,c){"use strict";function e(){var b=a.initial(arguments),c=a.last(arguments);return function(d,e){return c.apply(c,a.map(b,function(a){return a(d,e)}))}}function f(a){return a.siteAPI.getSiteAspect("PinterestWidgetPostMessageAspect")}var d=c.applyFetch,g=d(b.PropTypes.string,e(f,c.idSelector,function(a,b){return a.shouldPresentErrorMessage(b)})),h=d(b.PropTypes.shape({height:b.PropTypes.number.isRequired,width:b.PropTypes.number.isRequired}),e(f,c.idSelector,function(a,b){return a.getIframeDimensions(b)}));return{shouldPresentErrorMessage:g,iframeDimensions:h}}),define("santaProps/types/modules/RenderFlagsSantaTypes",["react","santaProps/utils/propsSelectorsUtils"],function(a,b){"use strict";var c=b.applyFetch,d=c(a.PropTypes.bool,function(a){return a.siteData.renderFlags.isPlayingAllowed});return{isPlayingAllowed:d}}),define("santaProps/types/modules/ServiceTopologySantaTypes",["react","santaProps/utils/propsSelectorsUtils"],function(a,b){"use strict";var c=b.applyFetch,d=c(a.PropTypes.string,function(a){return a.siteData.getStaticMediaUrl()}),e=c(a.PropTypes.func,function(a){return a.siteData.getMediaFullStaticUrl.bind(a.siteData)});return{staticMediaUrl:d,getMediaFullStaticUrl:e}}),define("santaProps/types/modules/SiteAspectsSantaTypes",["react","santaProps/utils/propsSelectorsUtils"],function(a,b){"use strict";var c=b.applyFetch,d=c(a.PropTypes.object,function(a){return a.siteAPI.getSiteAspect("windowTouchEvents")}),e=c(a.PropTypes.object,function(a){return a.siteAPI.getSiteAspect("windowScrollEvent")});return{windowTouchEvents:d,windowScrollEvent:e}}),define("santaProps/types/modules/ThemeSantaTypes",["react","santaProps/utils/propsSelectorsUtils"],function(a,b){"use strict";var c=b.applyFetch,d=c(a.PropTypes.object,function(a){return a.siteData.getAllTheme()}),e=c(a.PropTypes.array,function(a){return a.siteData.getAllTheme().THEME_DATA.color}),f=c(a.PropTypes.func,function(a){return a.siteData.getColor.bind(a.siteData)});return{all:d,colors:e,colorGetter:f}}),define("santaProps/types/SantaTypes",["lodash","react","santaProps/utils/propsSelectorsUtils","santaProps/types/modules/BrowserSantaTypes","santaProps/types/modules/ComponentSantaTypes","santaProps/types/modules/DeviceSantaTypes","santaProps/types/modules/LayoutSantaTypes","santaProps/types/modules/LinkSantaTypes","santaProps/types/modules/PinterestSantaTypes","santaProps/types/modules/RenderFlagsSantaTypes","santaProps/types/modules/ServiceTopologySantaTypes","santaProps/types/modules/SiteAspectsSantaTypes","santaProps/types/modules/ThemeSantaTypes"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){"use strict";var n=c.applyFetch,o=n(b.PropTypes.object,function(a){return a.siteAPI.getSiteAspect("windowClickEventAspect")}),p=n(b.PropTypes.func,function(a){return a.siteAPI.getSiteAspect("behaviorsAspect").handleAction}),q=n(b.PropTypes.func,function(a){return a.siteAPI.getRootIdsWhichShouldBeRendered}),r=n(b.PropTypes.func,function(a){var b=a.siteAPI.getRuntimeDal();return b.setCompState}),s=n(b.PropTypes.func,function(a){var b=a.siteAPI.getRuntimeDal();return b.setCompData}),t=n(b.PropTypes.func,function(a){var b=a.siteAPI.getRuntimeDal();return b.setCompProps}),u=n(b.PropTypes.func,function(a){var b=a.siteAPI.getRuntimeDal();return b.removeCompState}),v=n(b.PropTypes.func,function(a){return a.siteData.getFont.bind(a.siteData)}),w=n(b.PropTypes.bool,function(a){return a.siteData.isDebugMode()}),x=n(b.PropTypes.bool,function(a){return a.siteData.isMobileView()}),y=n(b.PropTypes.string,function(a){return a.siteData.santaBase}),z=n(b.PropTypes.func,function(a){return a.siteData.onImageUnmount}),A=n(b.PropTypes.string,function(b){return a.get(b,"siteData.rendererModel.geo")}),B=n(b.PropTypes.func,function(a){return a.siteAPI.closePopupPage}),C=n(b.PropTypes.object,function(a){return a.siteData.currentUrl}),D=n(b.PropTypes.object,function(a){return a.siteData.getCurrentUrlPageId()}),E=n(b.PropTypes.object,function(a){return a.siteData.renderFlags}),F=n(b.PropTypes.object,function(a){return a.siteData.renderRealtimeConfig}),G=n(b.PropTypes.func,function(a){return a.siteAPI.reportBI}),H=n(b.PropTypes.func,function(a){return a.siteAPI.isSiteBusy}),I=n(b.PropTypes.bool,function(a){return a.siteAPI.isZoomOpened()});return{Component:e,Browser:d,Device:f,Layout:g,Link:h,Pinterest:i,RenderFlags:j,ServiceTopology:k,Theme:m,reportBI:G,isMobileView:x,isDebugMode:w,santaBase:y,currentUrl:C,currentUrlPageId:D,Behaviors:{handleAction:p},DAL:{setCompState:r,setCompData:s,setCompProps:t,removeCompState:u},Fonts:{getFont:v},Images:{onImageUnmount:z},getRootIdsWhichShouldBeRendered:q,popup:{close:B},isSiteBusy:H,renderFlags:E,renderRealtimeConfig:F,Aspects:{windowClickEventAspect:o},RendererModel:{geo:A},isZoomOpened:I,SiteAspects:l}}),define("santaProps/utils/santaTypesPropsMixin",["santaProps/utils/santaTypesUtils"],function(a){"use strict";return{getInitialState:function(){return this.santaTypesProps=a.resolveComponentProps(this.constructor.propTypes,this.props),{}},componentWillReceiveProps:function(b){this.nextSantaTypesProps=a.resolveComponentProps(this.constructor.propTypes,b)}}}),define("santaProps",["santaProps/propsBuilder/componentPropsBuilder","santaProps/types/SantaTypes","santaProps/utils/santaTypesUtils","santaProps/utils/propsSelectorsFactory","santaProps/utils/santaTypesPropsMixin"],function(a,b,c,d,e){"use strict";return{componentPropsBuilder:a,santaTypesUtils:c,propsSelectorsFactory:d,santaTypesPropsMixin:e,Types:b}});