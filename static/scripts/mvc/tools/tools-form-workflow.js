define(["utils/utils","mvc/tools/tools-form-base"],function(a,b){var c=b.extend({initialize:function(c){var d=this;this.node=c.node,this.node&&(this.post_job_actions=this.node.post_job_actions||{},c=a.merge(c,{text_enable:"Set in Advance",text_disable:"Set at Runtime",is_workflow:!0,narrow:!0,initial_errors:!0,cls:"ui-portlet-narrow",update_url:galaxy_config.root+"api/workflows/build_module",update:function(a){d.node.update_field_data(a),d.form.errors(a&&a.tool_model)}}),a.deepeach(c.inputs,function(a){a.type&&-1==["data","data_collection"].indexOf(a.type)&&(a.collapsible=!0,a.collapsible_value={__class__:"RuntimeValue"})}),a.deepeach(c.inputs,function(a){a.type&&"conditional"==a.type&&(a.test_param.collapsible=!1)}),this._makeSections(c),b.prototype.initialize.call(this,c))},_makeSections:function(b){var c=b.inputs,d=b.datatypes;c[a.uid()]={label:"Annotation / Notes",name:"annotation",type:"text",area:!0,help:"Add an annotation or note for this step. It will be shown with the workflow.",value:this.node.annotation};var e=this.node.output_terminals&&Object.keys(this.node.output_terminals)[0];if(e){c[a.uid()]={name:"pja__"+e+"__EmailAction",label:"Email notification",type:"boolean",value:String(Boolean(this.post_job_actions["EmailAction"+e])),ignore:"false",help:"An email notification will be send when the job has completed.",payload:{host:window.location.host}},c[a.uid()]={name:"pja__"+e+"__DeleteIntermediatesAction",label:"Output cleanup",type:"boolean",value:String(Boolean(this.post_job_actions["DeleteIntermediatesAction"+e])),ignore:"false",help:"Delete intermediate outputs if they are not used as input for another job."};for(var f in this.node.output_terminals)c[a.uid()]=this._makeSection(f,d)}},_makeSection:function(a,b){function c(b,d){d=d||[],d.push(b);for(var e in b.inputs){var g=b.inputs[e];if(g.action){if(g.name="pja__"+a+"__"+g.action,g.argument&&(g.name+="__"+g.argument),g.payload)for(var h in g.payload){var i=g.payload[h];g.payload[g.name+"__"+h]=i,delete i}var j=f.post_job_actions[g.action+a];if(j){for(var k in d)d[k].expanded=!0;g.value=g.argument?j.action_arguments&&j.action_arguments[g.argument]||g.value:"true"}}g.inputs&&c(g,d.slice(0))}}var d=[];for(key in b)d.push({0:b[key],1:b[key]});d.sort(function(a,b){return a.label>b.label?1:a.label<b.label?-1:0}),d.unshift({0:"Sequences",1:"Sequences"}),d.unshift({0:"Roadmaps",1:"Roadmaps"}),d.unshift({0:"Leave unchanged",1:"__empty__"});var e={title:"Add Actions: '"+a+"'",type:"section",flat:!0,inputs:[{action:"RenameDatasetAction",argument:"newname",show_arg:!1,label:"Rename dataset",type:"text",value:"",ignore:"",help:'This action will rename the output dataset. Click <a href="https://wiki.galaxyproject.org/Learn/AdvancedWorkflow/Variables">here</a> for more information.'},{action:"ChangeDatatypeAction",argument:"newtype",show_arg:!1,label:"Change datatype",type:"select",ignore:"__empty__",value:"__empty__",options:d,help:"This action will change the datatype of the output to the indicated value."},{action:"TagDatasetAction",argument:"tags",show_arg:!1,label:"Tags",type:"text",value:"",ignore:"",help:"This action will set tags for the dataset."},{title:"Assign columns",type:"section",flat:!0,inputs:[{action:"ColumnSetAction",argument:"chromCol",label:"Chrom column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",argument:"startCol",label:"Start column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",argument:"endCol",label:"End column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",argument:"strandCol",label:"Strand column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",argument:"nameCol",label:"Name column",type:"integer",value:"",ignore:""}],help:"This action will set column assignments in the output dataset. Blank fields are ignored."}]},f=this;return c(e),e}});return{View:c}});
//# sourceMappingURL=../../../maps/mvc/tools/tools-form-workflow.js.map