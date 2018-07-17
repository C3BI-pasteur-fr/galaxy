define("mvc/tool/tool-form",["exports","utils/localization","utils/utils","mvc/ui/ui-misc","mvc/ui/ui-modal","mvc/tool/tool-form-base","mvc/webhooks"],function(e,t,o,a,i,r,s){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var n=l(t),u=l(o),d=l(a),c=l(i),f=l(r),h=l(s),m=Backbone.View.extend({initialize:function(e){var t=this;this.modal=parent.Galaxy.modal||new c.default.View,this.form=new f.default(u.default.merge({listen_to_history:!0,always_refresh:!1,buildmodel:function(e,o){var a=o.model.attributes,i="",r={},s=a.job_id;s?i=Galaxy.root+"api/jobs/"+s+"/build_for_rerun":(i=Galaxy.root+"api/tools/"+a.id+"/build",(r=$.extend({},Galaxy.params)).tool_id&&delete r.tool_id),a.version&&(r.tool_version=a.version),u.default.get({url:i,data:r,success:function(a){a.display?(o.model.set(a),t._customize(o),Galaxy.emit.debug("tool-form-base::_buildModel()","Initial tool model ready.",a),e.resolve()):window.location=Galaxy.root},error:function(t,i){var r=t&&t.err_msg||"Uncaught error.";401==i?window.location=Galaxy.root+"user/login?"+$.param({redirect:Galaxy.root+"?tool_id="+a.id}):o.$el.is(":empty")?o.$el.prepend(new d.default.Message({message:r,status:"danger",persistent:!0,large:!0}).$el):Galaxy.modal&&Galaxy.modal.show({title:(0,n.default)("Tool request failed"),body:r,buttons:{Close:function(){Galaxy.modal.hide()}}}),Galaxy.emit.debug("tool-form-base::_buildModel()","Initial tool model request failed.",t),e.reject()}})},postchange:function(e,t){var o={tool_id:t.model.get("id"),tool_version:t.model.get("version"),inputs:$.extend(!0,{},t.data.create())};t.wait(!0),Galaxy.emit.debug("tool-form::postchange()","Sending current state.",o),u.default.request({type:"POST",url:Galaxy.root+"api/tools/"+t.model.get("id")+"/build",data:o,success:function(o){t.update(o),t.wait(!1),Galaxy.emit.debug("tool-form::postchange()","Received new model.",o),e.resolve()},error:function(t){Galaxy.emit.debug("tool-form::postchange()","Refresh request failed.",t),e.reject()}})}},e)),this.deferred=this.form.deferred,this.setElement("<div/>"),this.$el.append(this.form.$el)},_customize:function(e){var t=this,o=e.model.attributes,a=new d.default.Button({icon:"fa-check",tooltip:"Execute: "+o.name+" ("+o.version+")",title:(0,n.default)("Execute"),cls:"btn btn-primary ui-clear-float",wait_cls:"btn btn-info ui-clear-float",onclick:function(){a.wait(),e.portlet.disable(),t.submit(o,function(){a.unwait(),e.portlet.enable()})}});if(o.buttons={execute:a},o.job_id&&o.job_remap){if("job_produced_collection_elements"===o.job_remap)var i="Replace elements in collection ?",r="The previous run of this tool failed. Use this option to replace the failed element(s) in the dataset collectio that were produced during the previous tool run.";else var i="Resume dependencies from this job ?",r="The previous run of this tool failed and other tools were waiting for it to finish successfully. Use this option to resume those tools using the new output(s) of this tool run.";o.inputs.push({label:i,name:"rerun_remap_job_id",type:"select",display:"radio",ignore:"__ignore__",value:"__ignore__",options:[["Yes",o.job_id],["No","__ignore__"]],help:r})}var s={};Galaxy.user.attributes.preferences&&"extra_user_preferences"in Galaxy.user.attributes.preferences&&(s=JSON.parse(Galaxy.user.attributes.preferences.extra_user_preferences)),"true"===("use_cached_job|use_cached_job_checkbox"in s&&s["use_cached_job|use_cached_job_checkbox"])&&o.inputs.push({label:"BETA: Attempt to re-use jobs with identical parameters ?",help:"This may skip executing jobs that you have already run",name:"use_cached_job",type:"select",display:"radio",ignore:"__ignore__",value:"__ignore__",options:[["No",!1],["Yes",!0]]})},submit:function(e,t){var o=this,a={tool_id:e.id,tool_version:e.version,inputs:this.form.data.create()};if(this.form.trigger("reset"),!o.validate(a))return Galaxy.emit.debug("tool-form::submit()","Submission canceled. Validation failed."),void(t&&t());if(e.action!==Galaxy.root+"tool_runner/index"){var i=$("<form/>").attr({action:e.action,method:e.method,enctype:e.enctype});return _.each(a.inputs,function(e,t){i.append($("<input/>").attr({name:t,value:e}))}),i.hide().appendTo("body").submit().remove(),void(t&&t())}Galaxy.emit.debug("tool-form::submit()","Validation complete.",a),u.default.request({type:"POST",url:Galaxy.root+"api/tools",data:a,success:function(e){if(t&&t(),o.$el.children().hide(),o.$el.append(o._templateSuccess(e)),e.jobs&&e.jobs.length>0){o.$el.append($("<div/>",{id:"webhook-view"}));new h.default.WebhookView({type:"tool",toolId:a.tool_id})}parent.Galaxy&&parent.Galaxy.currHistoryPanel&&parent.Galaxy.currHistoryPanel.refreshContents()},error:function(e){t&&t(),Galaxy.emit.debug("tool-form::submit","Submission failed.",e);var i=!1;if(e&&e.err_data){var r=o.form.data.matchResponse(e.err_data);for(var s in r){o.form.highlight(s,r[s]),i=!0;break}}i||o.modal.show({title:(0,n.default)("Job submission failed"),body:o._templateError(a,e&&e.err_msg),buttons:{Close:function(){o.modal.hide()}}})}})},validate:function(e){var t=this,o=e.inputs,a=-1,i=null;for(var r in o){var s=o[r],l=this.form.data.match(r),n=this.form.field_list[l],u=this.form.input_list[l];if(l&&u&&n){if(!u.optional&&null==s)return this.form.highlight(l),!1;if(n.validate){var d=n.validate(function(){t.form.trigger("reset")});if(!d.valid)return this.form.highlight(l,d.message),!1}if(s&&s.batch){var c=s.values.length,f=c>0&&s.values[0]&&s.values[0].src;if(f)if(null===i)i=f;else if(i!==f)return this.form.highlight(l,"Please select either dataset or dataset list fields for all batch mode fields."),!1;if(-1===a)a=c;else if(a!==c)return this.form.highlight(l,"Please make sure that you select the same number of inputs for all batch mode fields. This field contains <b>"+c+"</b> selection(s) while a previous field contains <b>"+a+"</b>."),!1}}else Galaxy.emit.debug("tool-form::validate()","Retrieving input objects failed.")}return!0},_templateSuccess:function(e){if(e.jobs&&e.jobs.length>0){var t=e.jobs.length,o=1==t?"1 job has":t+" jobs have",a=$("<div/>").addClass("donemessagelarge").append($("<p/>").text(o+" been successfully added to the queue - resulting in the following datasets:"));return _.each(e.outputs,function(e){a.append($("<p/>").addClass("messagerow").append($("<b/>").text(e.hid+": "+e.name)))}),a.append($("<p/>").append("<b/>").text("You can check the status of queued jobs and view the resulting data by refreshing the History pane. When the job has been run the status will change from 'running' to 'finished' if completed successfully or 'error' if problems were encountered.")),a}return this._templateError(e,"Invalid success response. No jobs found.")},_templateError:function(e,t){return $("<div/>").addClass("errormessagelarge").append($("<p/>").text("The server could not complete the request. Please contact the Galaxy Team if this error persists. "+(t||""))).append($("<pre/>").text(JSON.stringify(e,null,4)))}});e.default={View:m}});