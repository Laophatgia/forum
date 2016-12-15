/*======================================================================*\
|| #################################################################### ||
|| # vBulletin 4.1.9
|| # ---------------------------------------------------------------- # ||
|| # Copyright �2000-2011 vBulletin Solutions Inc. All Rights Reserved. ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
|| # http://www.vbulletin.com | http://www.vbulletin.com/license.html # ||
|| #################################################################### ||
\*======================================================================*/
var layout_reserved_names=new Array("xyz_modified","xyz_widgetid","xyz_widgetinstanceid","xyz_column");function vB_CMS_Layout_Config(C,A,B){if(AJAX_Compatible&&(typeof vb_disable_ajax=="undefined"||vb_disable_ajax<2)){this.init(C,A,B)}}vB_CMS_Layout_Config.prototype.init=function(H,B,G){this.ddtargets=Array();this.sGroup=B;this.widgetbox=YAHOO.util.Dom.get("widgetbox");this.form=YAHOO.util.Dom.get("cpform");this.activebox=null;this.backupbox=null;this.containerid=H;this.container=YAHOO.util.Dom.get(H);this.parambox=YAHOO.util.Dom.get("parambox");this.parambox_content=YAHOO.util.Dom.get("parambox_content");this.titlebox=YAHOO.util.Dom.get("ctrl_title").getElementsByTagName("input")[0];this.gridselect=YAHOO.util.Dom.get("ctrl_gridid").getElementsByTagName("select")[0];if(typeof this.inited=="undefined"){this.inited=false;this.idlist=Array();this.ddobjs=Array();this.ajaxreq=null;YAHOO.util.Event.on("paramsave","click",this.saveparam,this,true);YAHOO.util.Event.on("paramcancel","click",this.cancelparam,this,true);YAHOO.util.Event.on(this.form,"submit",this.save,this,true);YAHOO.util.Event.on("addwidget","click",this.addwidget_event,this,true);YAHOO.util.Event.on(this.gridselect,"change",this.fetchgrid,this,true);YAHOO.util.Dom.setStyle(this.parambox,"display","");this.overlay=new vB_Overlay(this.parambox)}var F=this.container.getElementsByTagName("ul");var C=0;for(var E=0;E<F.length;E++){if(F[E].id.substr(0,11)=="widgetlist_"){this.ddtargets[this.ddtargets.length]=new YAHOO.util.DDTarget(F[E],B);var D=F[E].getElementsByTagName("li");if(D.length==0){YAHOO.util.Dom.setStyle(F[E],"paddingBottom","60px")}}}if(G){for(var A=0;A<G.length;A++){this.addwidget(G[A][0],G[A][1],G[A][2],G[A][3])}}else{if(!this.inited){this.addwidget("content")}}this.inited=true};vB_CMS_Layout_Config.prototype.saveparam=function(A){YAHOO.util.Event.stopEvent(A);this.hide_parambox(1)};vB_CMS_Layout_Config.prototype.cancelparam=function(A){YAHOO.util.Event.stopEvent(A);this.hide_parambox()};vB_CMS_Layout_Config.prototype.addwidget_event=function(A){YAHOO.util.Event.stopEvent(A);if(this.widgetbox.selectedIndex>=0){this.addwidget(1,this.widgetbox.options[this.widgetbox.selectedIndex].value,this.widgetbox.options[this.widgetbox.selectedIndex].text,0)}};vB_CMS_Layout_Config.prototype.addwidget=function(E,G,I,K){var J=document.createElement("li");var C=this.fetch_freeid();J.setAttribute("id","widget"+C);J.widgetid=G;J.widgetinstanceid=K;YAHOO.util.Dom.addClass(J,"widget_container");var L=document.createElement("div");L.setAttribute("id","widget"+C+"_div");J.appendChild(L);var D=document.createElement("div");D.setAttribute("id","widget"+C+"_handle");YAHOO.util.Dom.addClass(D,"widget_title");L.appendChild(D);var B=document.createElement("div");B.setAttribute("id","widget"+C+"_desc");YAHOO.util.Dom.addClass(B,"widget_description");if(!G){YAHOO.util.Dom.addClass(D,"widget_title_primary");YAHOO.util.Dom.addClass(B,"widget_description_primary")}else{if(K){YAHOO.util.Dom.addClass(D,"widget_title_active");YAHOO.util.Dom.addClass(B,"widget_description_active")}}L.appendChild(B);var A=document.createElement("div");if(G){var F=document.createElement("div");F.setAttribute("id","widget"+C+"_button");F.innerHTML="x";D.appendChild(F);YAHOO.util.Dom.addClass(F,"closebutton")}A.innerHTML=I;D.appendChild(A);A.setAttribute("title",I);YAHOO.util.Dom.addClass(A,"title");var H=YAHOO.util.Dom.get("widgetlist_column"+E);if(H){H.appendChild(J)}else{YAHOO.util.Dom.get("widgetlist_column1").appendChild(J)}this.ddobjs[C]=new vB_CMS_Layout_Widget(J.id,this.sGroup,this)};vB_CMS_Layout_Config.prototype.fetch_freeid=function(){for(var A=0;A<this.ddobjs.length;A++){if(typeof (this.ddobjs[A])=="undefined"){return A}}return this.ddobjs.length};vB_CMS_Layout_Config.prototype.save=function(D){YAHOO.util.Event.stopEvent(D);if(this.titlebox.value==""){this.titlebox.focus();alert(vbphrase.please_enter_layout_title);return }var E=false;var G=this.form.firstChild;var H=this.container.getElementsByTagName("ul");for(var B=0;B<H.length;B++){if(H[B].id.substr(0,11)=="widgetlist_"){var I=H[B].getElementsByTagName("li");for(var F=0;F<I.length;F++){var C=I[F].id.match(/^widget(\d+)$/);var A=document.createElement("input");A.setAttribute("type","hidden");A.setAttribute("name","widgets["+C[1]+"][xyz_widgetid]");A.setAttribute("value",I[F].widgetid);this.form.insertBefore(A,G);A=document.createElement("input");A.setAttribute("type","hidden");A.setAttribute("name","widgets["+C[1]+"][xyz_column]");A.setAttribute("value",H[B].id);this.form.insertBefore(A,G)}}}this.form.submit()};vB_CMS_Layout_Config.prototype.hide_parambox=function(E){if(this.overlay.check_status(3)){this.overlay.set_status(0,"hide_parambox");this.overlay.hide();YAHOO.util.Dom.setStyle(this.activebox,"display","none");var B=this.activebox.id.match(/^widget(\d+)_parambox$/);var F=B[1];if(typeof E!="undefined"){this.backupbox.parentNode.removeChild(this.backupbox);this.ddobjs[F].saved=1;YAHOO.util.Dom.get("widget"+F+"_param").innerHTML=vbphrase.modify_params;var D=YAHOO.util.Dom.get("widget"+F+"_handle");var C=YAHOO.util.Dom.get("widget"+F+"_desc");YAHOO.util.Dom.addClass(D,"widget_title_active");YAHOO.util.Dom.addClass(C,"widget_description_active");var A=document.createElement("input");A.setAttribute("type","hidden");A.setAttribute("name","widgets["+F+"][xyz_modified]");A.setAttribute("id","widget"+F+"_modified");A.setAttribute("value",1);this.form.appendChild(A)}else{if(typeof this.ddobjs[F].saved=="undefined"){this.activebox.parentNode.removeChild(this.activebox);this.backupbox.parentNode.removeChild(this.backupbox)}else{this.activebox.parentNode.replaceChild(this.backupbox,this.activebox)}}this.activebox=null}};vB_CMS_Layout_Config.prototype.fetchgrid=function(){var A=this.gridselect[this.gridselect.selectedIndex].value;if(A>0&&this.overlay.check_status(0)&&!YAHOO.util.Connect.isCallInProgress(this.overlay.ajax_req)){this.overlay.set_status(2,"load grid html");this.overlay.showprogress();this.overlay.ajaxreq=YAHOO.util.Connect.asyncRequest("POST","cms_admin.php",{success:this.displaygrid,failure:this.handle_ajax_error,timeout:vB_Default_Timeout,scope:this},SESSIONURL+"securitytoken="+SECURITYTOKEN+"&adminhash="+ADMINHASH+"&ajax=1&do=gridhtml&gridid="+A)}};vB_CMS_Layout_Config.prototype.displaygrid=function(O){this.overlay.hideprogress();if(!this.overlay.check_status(2)){return }if(O.responseXML){var M=O.responseXML.getElementsByTagName("error");if(M.length){this.set_status(0,"display - error");alert(M[0].firstChild.nodeValue)}else{this.overlay.set_status(3,"handle_ajax_response - success");var K=string_to_node(O.responseXML.getElementsByTagName("html")[0].firstChild.nodeValue);YAHOO.util.Dom.setStyle(this.container,"display","none");var E=this.container.getElementsByTagName("ul");var A=K.getElementsByTagName("ul");var L,B,J,F;for(var I=0;I<A.length;I++){if(!J&&YAHOO.util.Dom.hasClass(A[I].parentNode,"yui-header")){J=A[I]}if(!B&&YAHOO.util.Dom.hasClass(A[I].parentNode,"yui-sidebar")){B=A[I]}if(!L&&YAHOO.util.Dom.hasClass(A[I].parentNode,"yui-panel")){L=A[I]}if(!F&&YAHOO.util.Dom.hasClass(A[I].parentNode,"yui-footer")){F=A[I]}}var P,D;for(var H=0;H<E.length;H++){if(E[H].id.substr(0,11)=="widgetlist_"){P=null;for(var I=0;I<A.length;I++){if(E[H].id==A[I].id&&E[H].parentNode.className==A[I].parentNode.className){P=A[I]}}if(!P){if(YAHOO.util.Dom.hasClass(E[H].parentNode,"yui-header")&&J){P=J}else{if(YAHOO.util.Dom.hasClass(E[H].parentNode,"yui-sidebar")&&B){P=B}else{if(YAHOO.util.Dom.hasClass(E[H].parentNode,"yui-panel")&&L){P=L}else{if(YAHOO.util.Dom.hasClass(E[H].parentNode,"yui-footer")&&F){P=F}else{P=L}}}}}var Q=E[H].getElementsByTagName("li");var D=Q.length;for(var N=0;N<D;N++){P.appendChild(Q[0])}}}var C=this.container.parentNode.insertBefore(K,this.container);this.container.parentNode.removeChild(this.container);this.container=C;var D=this.ddtargets.length;for(var G=0;G<D;G++){this.ddtargets[G].unreg();delete this.ddtargets[G]}this.init(this.containerid,this.sGroup)}}};vB_CMS_Layout_Config.prototype.handle_ajax_error=function(A){this.overlay.hide();vBulletin_AJAX_Error_Handler(A)};function vB_CMS_Layout_Widget(C,B,A){this.init(C,B,A)}vB_CMS_Layout_Widget.prototype.init=function(H,C,B){var E=YAHOO.util.Dom.get(H);this.objectid=E.parentNode.id;if(E.id.substr(0,6)=="widget"){var D=YAHOO.util.Dom.get(E.id+"_widgetid");if(D){E.widgetid=D.innerHTML}var G=YAHOO.util.Dom.get(E.id+"_widgetinstanceid");if(G){E.widgetinstanceid=G.value}var F=YAHOO.util.Dom.get(E.id+"_handle");if(E.parentNode.id==this.objectid&&F){B.idlist[E.id.substr(6)]=E.id;var A=new vB_CMS_Layout_Widget_DDProxy(E.id,C);A.addInvalidHandleId(E.id+"_button");A.setHandleElId(E.id+"_handle");A.owner=B;YAHOO.util.Dom.setStyle(F,"cursor","move");YAHOO.util.Event.on(E.id+"_button","click",A.killwidget,A,true);YAHOO.util.Event.on(E.id+"_param","click",A.editwidget,A,true)}}YAHOO.util.Dom.setStyle(E.parentNode,"paddingBottom","")};vB_CMS_Layout_Widget_DDProxy=function(D,A,B){vB_CMS_Layout_Widget_DDProxy.superclass.constructor.call(this,D,A,B);var C=this.getDragEl();YAHOO.util.Dom.setStyle(C,"opacity",0.67);this.goingUp=false;this.lastY=0};YAHOO.extend(vB_CMS_Layout_Widget_DDProxy,YAHOO.util.DDProxy);vB_CMS_Layout_Widget_DDProxy.prototype.startDrag=function(I,H){var A=this.getDragEl();var E=this.getEl();YAHOO.util.Dom.setStyle(E,"visibility","hidden");var F=E.parentNode.getElementsByTagName("li");E.parentNode.blockorder="";for(var D=0;D<F.length;D++){var J=YAHOO.util.Dom.get(F[D]);var G=YAHOO.util.Dom.get(J.id+"_handle");if(J.parentNode.id==E.parentNode.id&&G){E.parentNode.blockorder+=J.id}}var C=YAHOO.util.Dom.get(E.id+"_div");if(C){var B=C.cloneNode(true);YAHOO.util.Dom.setStyle(B,"display","none");E.appendChild(B);YAHOO.util.Dom.setStyle(B,"margin","0px");YAHOO.util.Dom.setStyle(B,"padding","0px");YAHOO.util.Dom.setStyle(B,"borderWidth","0px");A.innerHTML=B.innerHTML;B.parentNode.removeChild(B)}else{A.innerHTML=E.innerHTML}YAHOO.util.Dom.setStyle(A,"color",YAHOO.util.Dom.setStyle(E,"color"));YAHOO.util.Dom.setStyle(A,"backgroundColor",YAHOO.util.Dom.setStyle(E,"backgroundColor"));YAHOO.util.Dom.setStyle(A,"border","2px solid gray");YAHOO.util.Dom.setStyle(E.parentNode,"borderWidth","2px");YAHOO.util.Dom.setStyle(E.parentNode,"borderColor","red");YAHOO.util.Dom.setStyle(E.parentNode,"borderStyle","dashed");YAHOO.util.DragDropMgr.lastborderset=E.parentNode.id};vB_CMS_Layout_Widget_DDProxy.prototype.endDrag=function(J){var A=this.getEl();var B=this.getDragEl();var M="";var E="";var G=A.parentNode.getElementsByTagName("li");var I=1;for(var F=0;F<G.length;F++){var N=YAHOO.util.Dom.get(G[F]);var H=YAHOO.util.Dom.get(N.id+"_handle");if(N.parentNode.id==A.parentNode.id&&H){M+=N.id;E+="&block["+N.id+"]="+I;I++}}YAHOO.util.Dom.setStyle(B,"visibility","");var L=new YAHOO.util.Motion(B,{points:{to:YAHOO.util.Dom.getXY(A)}},0.2,YAHOO.util.Easing.easeOut);var D=B.id;var C=this.id;var K=this;L.onComplete.subscribe(function(){YAHOO.util.Dom.setStyle(D,"visibility","hidden");YAHOO.util.Dom.setStyle(C,"visibility","");YAHOO.util.Dom.get(D).innerHTML="";K.clearborder(1)});L.animate()};vB_CMS_Layout_Widget_DDProxy.prototype.onDrag=function(A){var B=YAHOO.util.Event.getPageY(A);if(B<this.lastY){this.goingUp=true}else{if(B>this.lastY){this.goingUp=false}}this.lastY=B};vB_CMS_Layout_Widget_DDProxy.prototype.onDragOver=function(K,B){var A=this.getEl();var I=YAHOO.util.Dom.get(B);var E=this.getDragEl();if(I.nodeName.toLowerCase()=="li"){var F=A.parentNode;var C=I.parentNode;if(I.parentNode.id!=A.parentNode.id){this.setborder(C)}if(this.goingUp){C.insertBefore(A,I)}else{C.insertBefore(A,I.nextSibling)}}else{if(I.nodeName.toLowerCase()=="ul"&&I.id!=A.parentNode.id){this.setborder(I);var J=I.getElementsByTagName("li");var G=YAHOO.util.Dom.getY(E);var D=true;for(var H=0;H<J.length;H++){listitemY=YAHOO.util.Dom.getY(J[H]);if(G<=listitemY){I.insertBefore(A,J[H]);D=false;break}}if(D){I.appendChild(A)}}}YAHOO.util.DragDropMgr.refreshCache()};vB_CMS_Layout_Widget_DDProxy.prototype.onDragDrop=function(E,F){var A=YAHOO.util.Dom.get(F);if(YAHOO.util.DragDropMgr.interactionInfo.drop.length===1){var D=YAHOO.util.DragDropMgr.interactionInfo.point;var C=YAHOO.util.DragDropMgr.interactionInfo.sourceRegion;if(!C.intersect(D)){var A=YAHOO.util.Dom.get(F);var B=YAHOO.util.DragDropMgr.getDDById(F);B.isEmpty=false;YAHOO.util.DragDropMgr.refreshCache()}}};vB_CMS_Layout_Widget_DDProxy.prototype.clearborder=function(C){if(typeof YAHOO.util.DragDropMgr.lastborderset!="undefined"){var B=YAHOO.util.Dom.get(YAHOO.util.DragDropMgr.lastborderset);YAHOO.util.Dom.setStyle(B,"borderWidth","");YAHOO.util.Dom.setStyle(B,"borderColor","");YAHOO.util.Dom.setStyle(B,"borderStyle","");var A=B.getElementsByTagName("li");if(!C&&A.length==1){YAHOO.util.Dom.setStyle(B,"paddingBottom","60px")}}};vB_CMS_Layout_Widget_DDProxy.prototype.setborder=function(A){this.clearborder();YAHOO.util.Dom.setStyle(A,"borderWidth","2px");YAHOO.util.Dom.setStyle(A,"borderColor","red");YAHOO.util.Dom.setStyle(A,"borderStyle","dashed");YAHOO.util.Dom.setStyle(A,"paddingBottom","");YAHOO.util.DragDropMgr.lastborderset=A.id};vB_CMS_Layout_Widget_DDProxy.prototype.killwidget=function(F){YAHOO.util.Event.stopEvent(F);var G=this.id.substr(6);var D=this.owner.ddobjs[G].saved?confirm(vbphrase.remove_widget):true;if(D){delete this.owner.idlist[G];delete this.owner.ddobjs[G];var B=YAHOO.util.Dom.get(this.id);var C=B.parentNode;var A=C.getElementsByTagName("li");var E=YAHOO.util.Dom.get("widget"+G+"_parambox");if(E){E.parentNode.removeChild(E)}C.removeChild(B);if(A.length==0){YAHOO.util.Dom.setStyle(C,"paddingBottom","60px")}}};vB_CMS_Layout_Widget_DDProxy.prototype.editwidget=function(C){if(this.owner.overlay.check_status(0)&&!YAHOO.util.Connect.isCallInProgress(this.owner.overlay.ajax_req)){this.owner.overlay.show_background();this.owner.overlay.set_status(2,"load parambox");var B=YAHOO.util.Dom.get("widget"+this.id.substr(6)+"_parambox");if(B){this.owner.overlay.set_status(3,"div exists - success");YAHOO.util.Dom.setStyle(B,"display","");this.owner.activebox=B;this.owner.backupbox=this.cloneform(this.owner.activebox);YAHOO.util.Dom.setStyle(this.owner.backupbox,"display","none");this.owner.parambox.appendChild(this.owner.backupbox);this.owner.overlay.show_overlaybox()}else{var A=YAHOO.util.Dom.get(this.id);this.owner.overlay.ajaxreq=YAHOO.util.Connect.asyncRequest("POST","cms_admin.php",{success:this.display,failure:this.owner.handle_ajax_error,timeout:vB_Default_Timeout,scope:this},SESSIONURL+"securitytoken="+SECURITYTOKEN+"&adminhash="+ADMINHASH+"&ajax=1&do=widgethtml&id="+this.id.substr(6)+"&widgetid="+A.widgetid+"&widgetinstanceid="+A.widgetinstanceid)}}};vB_CMS_Layout_Widget_DDProxy.prototype.display=function(H){this.owner.overlay.hideprogress();if(!this.owner.overlay.check_status(2)||this.owner.activebox){return }if(H.responseXML){var D=H.responseXML.getElementsByTagName("error");if(D.length){this.owner.overlay.set_status(0,"display - error");alert(D[0].firstChild.nodeValue)}else{this.owner.overlay.set_status(3,"handle_ajax_response - success");var G=string_to_node(H.responseXML.getElementsByTagName("html")[0].firstChild.nodeValue);G.setAttribute("id","widget"+this.id.substr(6)+"_parambox");this.owner.activebox=this.owner.parambox_content.appendChild(G);var B=fetch_tags(this.owner.activebox,"input");var F,C;for(F=0;F<B.length;F++){if(C=B[F].name.match(/^(.+)(\[\])$/)){if(PHP.in_array(C[1],layout_reserved_names)>-1){alert(vbphrase.do_not_use_the_following_input_field_names_in_widgets)}B[F].name="widgets["+this.id.substr(6)+"]["+C[1]+"][]"}else{if(PHP.in_array(B[F].name,layout_reserved_names)>-1){alert(vbphrase.do_not_use_the_following_input_field_names_in_widgets)}B[F].name="widgets["+this.id.substr(6)+"]["+B[F].name+"]"}}var A=fetch_tags(this.owner.activebox,"textarea");for(F=0;F<A.length;F++){if(C=A[F].name.match(/^(.+)(\[\])$/)){if(PHP.in_array(C[1],layout_reserved_names)>-1){alert(vbphrase.do_not_use_the_following_input_field_names_in_widgets)}A[F].name="widgets["+this.id.substr(6)+"]["+C[1]+"][]"}else{if(PHP.in_array(A[F].name,layout_reserved_names)>-1){alert(vbphrase.do_not_use_the_following_input_field_names_in_widgets)}A[F].name="widgets["+this.id.substr(6)+"]["+A[F].name+"]"}}var E=fetch_tags(this.owner.activebox,"select");for(F=0;F<E.length;F++){if(C=E[F].name.match(/^(.+)(\[\])$/)){if(PHP.in_array(C[1],layout_reserved_names)>-1){alert(vbphrase.do_not_use_the_following_input_field_names_in_widgets)}E[F].name="widgets["+this.id.substr(6)+"]["+C[1]+"][]"}else{if(PHP.in_array(E[F].name,layout_reserved_names)>-1){alert(vbphrase.do_not_use_the_following_input_field_names_in_widgets)}E[F].name="widgets["+this.id.substr(6)+"]["+E[F].name+"]"}}this.owner.backupbox=this.cloneform(this.owner.activebox);this.owner.parambox.appendChild(this.owner.backupbox);YAHOO.util.Dom.setStyle(this.owner.backupbox,"display","none");this.owner.overlay.show_overlaybox()}}};vB_CMS_Layout_Widget_DDProxy.prototype.cloneform=function(H){var G=H.cloneNode(true);var B=G.getElementsByTagName("input");for(var F=0;F<B.length;F++){if(B[F].type=="text"||B[F].type=="button"){B[F].setAttribute("value",H.getElementsByTagName("input")[F].value)}if(B[F].type=="checkbox"||B[F].type=="radio"){if(H.getElementsByTagName("input")[F].checked==true){B[F].setAttribute("checked",true)}}}var A=G.getElementsByTagName("textarea");for(F=0;F<A.length;F++){A[F].setAttribute("value",H.getElementsByTagName("textarea")[F].value);A[F].defaultValue=H.getElementsByTagName("textarea")[F].value}var E=G.getElementsByTagName("select");for(F=0;F<E.length;F++){if(E[F].multiple){for(var D=0;D<E[F].options.length;D++){if(H.getElementsByTagName("select")[D].selected){E[F].options[D].selected=true}}}else{var C=H.getElementsByTagName("select")[F].selectedIndex;if(C!=-1){E[F].selectedIndex=C;E[F].getElementsByTagName("option")[C].setAttribute("selected",true)}}}return G};