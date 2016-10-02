define("displayer",["lodash","react","reactDOM","core","santaProps","utils","imageClientApi","skins","image"],function(a,b,c,d,e,f,g,h,i){"use strict";function l(a){if(a)switch(a){case"left":return"alignLeft";case"center":return"alignCenter";case"right":return"alignRight";default:return"alignLeft"}}var j=d.compMixins,k=f.linkRenderer;return{displayName:"Displayer",mixins:[j.skinBasedComp,j.skinInfo],propTypes:a.assign({browser:e.Types.Browser.browser.isRequired,rootNavigationInfo:e.Types.Component.rootNavigationInfo.isRequired,linkRenderInfo:e.Types.Link.linkRenderInfo.isRequired,isMobileView:e.Types.isMobileView,isMobileDevice:e.Types.Device.isMobileDevice,isAndroidOldBrowser:e.Types.Browser.isAndroidOldBrowser,imageIndex:b.PropTypes.number.isRequired,compProp:b.PropTypes.object.isRequired,compData:b.PropTypes.object.isRequired,imageWrapperSize:b.PropTypes.object.isRequired,heightDiff:b.PropTypes.number,widthDiff:b.PropTypes.number,bottomGap:b.PropTypes.number,galleryId:b.PropTypes.string,isSelected:b.PropTypes.bool,galleryDataId:b.PropTypes.string,skin:b.PropTypes.string,id:b.PropTypes.string,showPanelState:b.PropTypes.string,onClick:b.PropTypes.func},e.santaTypesUtils.getSantaTypesByDefinition(i)),statics:{useSantaTypes:!0},getInitialState:function(){return{$showPanel:"defaultPanelState",$displayDevice:this.santaTypesProps.isMobileView?"mobileView":"desktopView",$textAlignmentState:l(this.santaTypesProps.compProp.alignText),$selected:this.santaTypesProps.isSelected?"selected":"unselected",$scaling:this.santaTypesProps.compProp.imageMode||"clipImage",$transitionPhase:"noTransition",$general:"normal",$linkableComponent:this.santaTypesProps.compData.link?"link":"noLink"}},_getImageClickAction:function(){var a=this.santaTypesProps.compProp,b=a.galleryImageOnClickAction;return b||(b=a.expandEnabled===!0?"zoomMode":"disabled"),b},componentDidMount:function(){setTimeout(function(){var a,b="androidNativeBrowserFix";this.isMounted()&&(this.setState({$showPanel:this.santaTypesProps.showPanelState||"notShowPanel"}),this.santaTypesProps.isAndroidOldBrowser&&this.santaTypesProps.isMobileDevice&&(a=c.findDOMNode(this).classList,a.add(b),a.remove(b)))}.bind(this),0)},componentWillReceiveProps:function(){this.setState({$selected:this.nextSantaTypesProps.isSelected?"selected":"unselected"})},getContainerSize:function(){var a=this.santaTypesProps.imageWrapperSize.imageWrapperWidth-this.getDisplayerDefaultParam(this.santaTypesProps.skin,"imageWrapperRight")-this.getDisplayerDefaultParam(this.santaTypesProps.skin,"imageWrapperLeft"),b=this.santaTypesProps.imageWrapperSize.imageWrapperHeight-this.getDisplayerDefaultParam(this.santaTypesProps.skin,"imageWrapperBottom")-this.getDisplayerDefaultParam(this.santaTypesProps.skin,"imageWrapperTop");return this.getFromExports("addMarginToContainer")&&(a+=this.santaTypesProps.imageWrapperSize.imageWrapperMarginLeft+this.santaTypesProps.imageWrapperSize.imageWrapperMarginRight,b+=this.santaTypesProps.imageWrapperSize.imageWrapperMarginTop+this.santaTypesProps.imageWrapperSize.imageWrapperMarginBottom),{containerWidth:a,containerHeight:b}},getSkinProperties:function(){var b=this.santaTypesProps.compData,c=this.santaTypesProps.compProp,d=c.alignText||"left",e="core.components.Image",f=this.getContainerSize(),h=f.containerWidth,i=f.containerHeight,j={position:"relative",overflow:"hidden"};return this.santaTypesProps.browser.ie&&this.santaTypesProps.browser.version<=10&&a.merge(j,{border:"1px solid transparent"}),{"":{onClick:this.santaTypesProps.onClick,onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave,"data-image-index":this.santaTypesProps.imageIndex,"data-displayer-width":b.width,"data-displayer-height":b.height,"data-displayer-uri":b.uri,"data-height-diff":this.santaTypesProps.heightDiff,"data-width-diff":this.santaTypesProps.widthDiff,"data-bottom-gap":this.santaTypesProps.bottomGap,"data-image-wrapper-right":this.getDisplayerDefaultParam(this.santaTypesProps.skin,"imageWrapperRight"),"data-image-wrapper-left":this.getDisplayerDefaultParam(this.santaTypesProps.skin,"imageWrapperLeft"),"data-image-wrapper-top":this.getDisplayerDefaultParam(this.santaTypesProps.skin,"imageWrapperTop"),"data-image-wrapper-bottom":this.getDisplayerDefaultParam(this.santaTypesProps.skin,"imageWrapperBottom"),"data-margin-to-container":this.getFromExports("addMarginToContainer")},imageWrapper:{style:{height:this.santaTypesProps.imageWrapperSize.imageWrapperHeight,width:this.santaTypesProps.imageWrapperSize.imageWrapperWidth,marginLeft:this.santaTypesProps.imageWrapperSize.imageWrapperMarginLeft,marginRight:this.santaTypesProps.imageWrapperSize.imageWrapperMarginRight,marginTop:this.santaTypesProps.imageWrapperSize.imageWrapperMarginTop,marginBottom:this.santaTypesProps.imageWrapperSize.imageWrapperMarginBottom}},title:{children:b.title||"",style:{textAlign:d}},description:{children:this.parseTextIntoLinesArray(b.description)||"",style:{textAlign:d}},image:this.createChildComponent(b,e,"image",{ref:"image",id:this.santaTypesProps.id+"image",imageData:b,containerWidth:h>0?Math.round(h):16,containerHeight:i>0?Math.round(i):16,displayMode:g.fittingTypes.SCALE_TO_FILL,usePreloader:!0,style:j}),zoom:{style:{cursor:this.getCursor()},addChildBefore:[this.generateZoomNode(),"link"]},link:{style:{display:"none"}}}},parseTextIntoLinesArray:function(c){if(a.isString(c)){var d=c.split(/(?:\r\n|\r|\n)/);if(d.length>1){var e=[];return a.forEach(d,function(a,c){e.push(a),c<d.length-1&&e.push(b.createElement("br",null))}),e}return c}},onMouseEnter:function(){this.setState({$general:"rollover"})},onMouseLeave:function(){this.setState({$general:"normal"})},getCursor:function(){var a=this.santaTypesProps.compData,b=this._getImageClickAction();return"zoomMode"===b||a.link&&"goToLink"===b?"pointer":"default"},getLinkData:function(){return k.renderLink(this.santaTypesProps.compData.link,this.santaTypesProps.linkRenderInfo,this.santaTypesProps.rootNavigationInfo)},getDisplayerDefaultParam:function(b,c){var d=this.getSkinExports(),e=h.skins[b],f=e.paramsDefaults?e.paramsDefaults[c]:"";if(!f){var g=d[c];return g?Math.abs(parseInt(g,10)||0):0}return Array.isArray(f)?a.sum(f,function(a){return Math.abs(parseInt(this.getParamFromDefaultSkin(a).value,10))},this):Math.abs(parseInt(f,10))||0},generateZoomNode:function(){var c=this.santaTypesProps.compData,d=this._getImageClickAction(),e={draggable:!1,style:a.assign({cursor:this.getCursor(),height:"100%",display:"block",width:"100%",position:"absolute",top:"0px",left:"0px",backgroundColor:"#ffffff",filter:"alpha(opacity=0)",opacity:"0"},f.style.prefix({userSelect:"none",userDrag:"none",userModify:"read-only"})),"data-page-item-context":this.santaTypesProps.galleryDataId,"data-gallery-id":this.santaTypesProps.galleryId,onDragStart:function(a){return a.preventDefault(),!1}},g={};return g="zoomMode"===d?k.renderImageZoomLink(this.santaTypesProps.linkRenderInfo,this.santaTypesProps.rootNavigationInfo,c,this.santaTypesProps.galleryDataId):c.link&&"goToLink"===d?this.getLinkData():{onClick:function(a){a.preventDefault(),a.stopPropagation()}},a.merge(e,g),b.DOM.a(e)},setPanelState:function(a){this.setState({$showPanel:a})},getPanelState:function(){return this.state.$showPanel},setTransitionPhase:function(a){this.setState({$transitionPhase:a})}}});