define("mvc/rules/rule-definitions",["exports","utils/localization","pyre-to-regexp"],function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var a=r(t),o=r(n),u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l=function(e,t){if(0==e.length)return"no columns";if(1==e.length)return"column "+t[e[0]];var n=e.map(function(e){return t[e]});return"columns "+[n.slice(0,-1).join(", "),n.slice(-1)[0]].join(" and ")},i=function(e,t){var n=[];for(var r in e)-1===t.indexOf(r)&&n.push(e[r]);return n},d=function(e,t,n,r,a){var u=void 0;try{u=(0,o.default)(String(e))}catch(e){return{error:"Invalid regular expression specified."}}var l=0;return n=n.map(function(e){var n=e[t],o=u.exec(n);return o?r?e.concat([u.pyreReplace(o[0],r)]):(a=a&&parseInt(a))?o.length!=a+1?(l++,null):e.concat(o.splice(1,o.length)):e.concat([o[0]]):(l++,null)}),l>0?{error:l+" row(s) failed to match specified regular expression."}:{data:n}},s=function(e,t){return t.reduce(function(t,n){return t.concat(e(n))},[])},c={add_column_basename:{title:(0,a.default)("Basename of Path of URL"),display:function(e,t){return"Add column using basename of column "+t[e.target_column]},init:function(e,t){e.addColumnBasenameTarget=t?t.target_column:0},save:function(e,t){t.target_column=e.addColumnBasenameTarget},apply:function(e,t,n,r){var a=e.target_column,o=d("[^/]*$",a,t);return r.push("new"),o.columns=r,o}},add_column_rownum:{title:(0,a.default)("Row Number"),display:function(e,t){return"Add column for the current row number."},init:function(e,t){e.addColumnRownumStart=t?t.start:1},save:function(e,t){t.start=parseInt(e.addColumnRownumStart)},apply:function(e,t,n,r){var a=e.start;return t=t.map(function(e){var t=e.slice();return t.push(String(a)),a+=1,t}),r.push("new"),{data:t,columns:r}}},add_column_value:{title:(0,a.default)("Fixed Value"),display:function(e,t){return"Add column for the constant value of "+e.value+"."},init:function(e,t){e.addColumnValue=t?t.value:""},save:function(e,t){t.value=e.addColumnValue},apply:function(e,t,n,r){var a=e.value;return t=t.map(function(e){var t=e.slice();return t.push(a),t}),r.push("new"),{data:t,columns:r}}},add_column_metadata:{title:(0,a.default)("Add Column from Metadata"),display:function(e,t){return"Add column for "+e.value+"."},init:function(e,t){e.addColumnMetadataValue=t?t.value:null},save:function(e,t){t.value=e.addColumnMetadataValue},apply:function(e,t,n,r){var a=e.value,o=void 0;if(a.startsWith("identifier")){var u=parseInt(a.substring("identifier".length));o=function(e,t){var r=e.slice();return r.push(n[t].identifiers[u]),r}}else{if("hid"!=a&&"name"!=a&&"path"!=a)return{error:"Unknown metadata type ["+a+"}]"};o=function(e,t){var r=e.slice();return r.push(n[t][a]),r}}return t=t.map(o),r.push("new"),{data:t,columns:r}}},add_column_regex:{title:(0,a.default)("Using a Regular Expression"),display:function(e,t){return"Add new column using "+e.expression+" applied to column "+t[e.target_column]},init:function(e,t){t?(e.addColumnRegexTarget=t.target_column,e.addColumnRegexExpression=t.expression,e.addColumnRegexReplacement=t.replacement,e.addColumnRegexGroupCount=t.group_count):(e.addColumnRegexTarget=0,e.addColumnRegexExpression="",e.addColumnRegexReplacement=null,e.addColumnRegexGroupCount=null);var n="global";e.addColumnRegexGroupCount?n="groups":e.addColumnRegexReplacement&&(n="replacement"),e.addColumnRegexType=n},save:function(e,t){t.target_column=e.addColumnRegexTarget,t.expression=e.addColumnRegexExpression,e.addColumnRegexReplacement&&(t.replacement=e.addColumnRegexReplacement),e.addColumnRegexGroupCount&&(t.group_count=e.addColumnRegexGroupCount)},apply:function(e,t,n,r){var a=e.target_column,o=d(e.expression,a,t,e.replacement,e.group_count);return r.push("new"),o.columns=r,o}},add_column_concatenate:{title:(0,a.default)("Concatenate Columns"),display:function(e,t){return"Concatenate column "+t[e.target_column_0]+" and column "+t[e.target_column_1]},init:function(e,t){t?(e.addColumnConcatenateTarget0=t.target_column_0,e.addColumnConcatenateTarget1=t.target_column_1):(e.addColumnConcatenateTarget0=0,e.addColumnConcatenateTarget1=0)},save:function(e,t){t.target_column_0=e.addColumnConcatenateTarget0,t.target_column_1=e.addColumnConcatenateTarget1},apply:function(e,t,n,r){var a=e.target_column_0,o=e.target_column_1;return t=t.map(function(e){var t=e.slice();return t.push(e[a]+e[o]),t}),r.push("new"),{data:t,columns:r}}},add_column_substr:{title:(0,a.default)("Keep or Trim Prefix or Suffix"),display:function(e,t){var n=e.substr_type,r=void 0;return r="keep_prefix"==n?"Keep only "+e.length+" characters from the start of column "+t[e.target_column]:"drop_prefix"==n?"Remove "+e.length+" characters from the start of column "+t[e.target_column]:"keep_suffix"==n?"Keep only "+e.length+" characters from the end of column "+t[e.target_column]:"Remove "+e.length+" characters from the end of column "+t[e.target_column],r},init:function(e,t){t?(e.addColumnSubstrTarget=t.target_column,e.addColumnSubstrLength=t.length,e.addColumnSubstrType=t.substr_type):(e.addColumnSubstrTarget=0,e.addColumnSubstrType="keep_prefix",e.addColumnSubstrLength=1)},save:function(e,t){t.target_column=e.addColumnSubstrTarget,t.length=e.addColumnSubstrLength,t.substr_type=e.addColumnSubstrType},apply:function(e,t,n,r){var a=e.target_column,o=e.length,u=e.substr_type;return t=t.map(function(e){var t=e.slice(),n=e[a],r=0,l=n.length;return"keep_prefix"==u?l=o:"drop_prefix"==u?r=o:"keep_suffix"==u?(r=l-o)<0&&(r=0):(l-=o)<0&&(l=0),t.push(n.substr(r,l)),t}),r.push("new"),{data:t}}},remove_columns:{title:(0,a.default)("Remove Column(s)"),display:function(e,t){var n=e.target_columns;return"Remove "+l(n,t)},init:function(e,t){e.removeColumnTargets=t?t.target_columns:[]},save:function(e,t){t.target_columns=e.removeColumnTargets},apply:function(e,t,n,r){var a=e.target_columns;return t=t.map(function(e){var t=[];for(var n in e)-1==a.indexOf(parseInt(n))&&t.push(e[n]);return t}),r=i(r,a),{data:t,columns:r}}},add_filter_regex:{title:(0,a.default)("Using a Regular Expression"),display:function(e,t){return"Filter rows using regular expression "+e.expression+" on column "+t[e.target_column]},init:function(e,t){t?(e.addFilterRegexTarget=t.target_column,e.addFilterRegexExpression=t.expression,e.addFilterRegexInvert=t.invert):(e.addFilterRegexTarget=0,e.addFilterRegexExpression="",e.addFilterRegexInvert=!1)},save:function(e,t){t.target_column=e.addFilterRegexTarget,t.expression=e.addFilterRegexExpression,t.invert=e.addFilterRegexInvert},apply:function(e,t,n,r){var a,u=String(e.expression);try{a=(0,o.default)(u)}catch(e){return{error:"Invalid regular expression specified."}}var l=e.target_column,i=e.invert,d=function(e,n){var r=t[parseInt(n)];return a.exec(r[l])?!i:i};return n=n.filter(d),t=t.filter(d),{data:t,sources:n}}},add_filter_count:{title:(0,a.default)("First or Last N Rows"),display:function(e,t){var n=e.which,r=e.invert;return"first"!=n||r?"first"==n&&r?"Keep only first "+e.count+" row(s).":"last"!=n||r?"Keep only last "+e.count+" row(s).":"Filter out last "+e.count+" row(s).":"Filter out first "+e.count+" row(s)."},init:function(e,t){t?(e.addFilterCountN=t.count,e.addFilterCountWhich=t.which,e.addFilterCountInvert=t.inverse):(e.addFilterCountN=0,e.addFilterCountWhich="first",e.addFilterCountInvert=!1)},save:function(e,t){t.count=e.addFilterCountN,t.which=e.addFilterCountWhich,t.invert=e.addFilterCountInvert},apply:function(e,t,n,r){var a=e.count,o=e.invert,u=e.which,l=t.length,i=function(e,t){return("first"==u?t>=a:t<l-a)?!o:o};return n=n.filter(i),t=t.filter(i),{data:t,sources:n}}},add_filter_empty:{title:(0,a.default)("On Emptiness"),display:function(e,t){return"Filter rows if no value for column "+t[e.target_column]},init:function(e,t){t?(e.addFilterEmptyTarget=t.target_column,e.addFilterEmptyInvert=t.invert):(e.addFilterEmptyTarget=0,e.addFilterEmptyInvert=!1)},save:function(e,t){t.target_column=e.addFilterEmptyTarget,t.invert=e.addFilterEmptyInvert},apply:function(e,t,n,r){var a=e.target_column,o=e.invert,u=function(e,n){return t[parseInt(n)][a].length?!o:o};return n=n.filter(u),t=t.filter(u),{data:t,sources:n}}},add_filter_matches:{title:(0,a.default)("Matching a Supplied Value"),display:function(e,t){return"Filter rows with value "+e.value+" for column "+t[e.target_column]},init:function(e,t){t?(e.addFilterMatchesTarget=t.target_column,e.addFilterMatchesValue=t.value,e.addFilterMatchesInvert=t.invert):(e.addFilterMatchesTarget=0,e.addFilterMatchesValue="",e.addFilterMatchesInvert=!1)},save:function(e,t){t.target_column=e.addFilterMatchesTarget,t.value=e.addFilterMatchesValue,t.invert=e.addFilterMatchesInvert},apply:function(e,t,n,r){var a=e.target_column,o=e.invert,u=e.value,l=function(e,n){return t[parseInt(n)][a]==u?!o:o};return n=n.filter(l),t=t.filter(l),{data:t,sources:n}}},add_filter_compare:{title:(0,a.default)("By Comparing to a Numeric Value"),display:function(e,t){return"Filter rows with value "+e.compare_type+" "+e.value+" for column "+t[e.target_column]},init:function(e,t){t?(e.addFilterCompareTarget=t.target_column,e.addFilterCompareValue=t.value,e.addFilterCompareType=t.compare_type):(e.addFilterCompareTarget=0,e.addFilterCompareValue=0,e.addFilterCompareType="less_than")},save:function(e,t){t.target_column=e.addFilterCompareTarget,t.value=e.addFilterCompareValue,t.compare_type=e.addFilterCompareType},apply:function(e,t,n,r){var a=e.target_column,o=e.compare_type,u=e.value,l=function(e,n){var r=t[parseInt(n)],l=parseFloat(r[a]),i=void 0;return"less_than"==o?i=l<u:"less_than_equal"==o?i=l<=u:"greater_than"==o?i=l>u:"greater_than_equal"==o&&(i=l>=u),i};return n=n.filter(l),t=t.filter(l),{data:t,sources:n}}},sort:{title:(0,a.default)("Sort"),display:function(e,t){return"Sort on column "+t[e.target_column]},init:function(e,t){t?(e.addSortingTarget=t.target_column,e.addSortingNumeric=t.numeric):(e.addSortingTarget=0,e.addSortingNumeric=!1)},save:function(e,t){t.target_column=e.addSortingTarget,t.numeric=e.addSortingNumeric},apply:function(e,t,n,r){var a=e.target_column,o=e.numeric,u=_.zip(t,n);u.sort(function(e,t){var n=e[0][a],r=t[0][a];return o&&(n=parseFloat(n),r=parseFloat(r)),n<r?-1:r<n?1:0});var l=[],i=[];return u.map(function(e){l.push(e[0]),i.push(e[1])}),{data:l,sources:i}}},swap_columns:{title:(0,a.default)("Swap Column(s)"),display:function(e,t){return"Swap "+l([e.target_column_0,e.target_column_1],t)},init:function(e,t){t?(e.swapColumnsTarget0=t.target_column_0,e.swapColumnsTarget1=t.target_column_1):(e.swapColumnsTarget0=0,e.swapColumnsTarget1=0)},save:function(e,t){t.target_column_0=e.swapColumnsTarget0,t.target_column_1=e.swapColumnsTarget1},apply:function(e,t,n,r){var a=e.target_column_0,o=e.target_column_1;t=t.map(function(e){var t=e.slice();return t[a]=e[o],t[o]=e[a],t});var u=r[a];return r[a]=r[o],r[o]=u,{data:t,columns:r}}},split_columns:{title:(0,a.default)("Split Column(s)"),display:function(e,t){return"Duplicate each row and split up columns"},init:function(e,t){t?(e.splitColumnsTargets0=t.target_columns_0,e.splitColumnsTargets1=t.target_columns_1):(e.splitColumnsTargets0=[],e.splitColumnsTargets1=[])},save:function(e,t){t.target_columns_0=e.splitColumnsTargets0,t.target_columns_1=e.splitColumnsTargets1},apply:function(e,t,n,r){var a=e.target_columns_0,o=e.target_columns_1;return t=s(function(e){var t=[],n=[];for(var r in e)r=parseInt(r),a.indexOf(r)>-1?t.push(e[r]):o.indexOf(r)>-1?n.push(e[r]):(t.push(e[r]),n.push(e[r]));return[t,n]},t),n=s(function(e){return[e,e]},n),r=i(r,a),{data:t,sources:n,columns:r}}}},m={list_identifiers:{multiple:!0,label:(0,a.default)("List Identifier(s)"),columnHeader:(0,a.default)("List Identifier"),help:(0,a.default)("This should be a short description of the replicate, sample name, condition, etc... that describes each level of the list structure."),importType:"collections"},paired_identifier:{label:(0,a.default)("Paired-end Indicator"),columnHeader:(0,a.default)("Paired Indicator"),help:(0,a.default)("This should be set to '1', 'R1', 'forward', 'f', or 'F' to indicate forward reads, and '2', 'r', 'reverse', 'R2', 'R', or 'R2' to indicate reverse reads."),importType:"collections"},collection_name:{label:(0,a.default)("Collection Name"),help:(0,a.default)("If this is set, all rows with the same collection name will be joined into a collection and it is possible to create multiple collections at once."),modes:["raw","ftp","datasets","library_datasets"],importType:"collections"},name:{label:(0,a.default)("Name"),importType:"datasets"},dbkey:{label:(0,a.default)("Genome"),modes:["raw","ftp"]},file_type:{label:(0,a.default)("Type"),modes:["raw","ftp"],help:(0,a.default)("This should be the Galaxy file type corresponding to this file.")},url:{label:(0,a.default)("URL"),modes:["raw"],help:(0,a.default)("This should be a URL the file can be downloaded from.")},info:{label:(0,a.default)("Info"),help:(0,a.default)("Unstructured text associated with the dataset that shows up in the history panel, this is optional and can be whatever you would like."),modes:["raw","ftp"]},ftp_path:{label:(0,a.default)("FTP Path"),modes:["raw","ftp"],help:(0,a.default)("This should be the path to the target file to include relative to your FTP directory on the Galaxy server"),requiresFtp:!0}},p=function(e,t){return 0==e.length?t?t.map(function(e,t){return String.fromCharCode(65+t)}):[]:e[0].map(function(e,t){return String.fromCharCode(65+t)})};e.default={applyRules:function(e,t,n,r,o){var o=o||[],u=!1;for(var l in r){var i=p(e,n);o[l]=i;var d=r[l];if(d.error=null,d.warn=null,u)d.warn=(0,a.default)("Skipped due to previous errors.");else{var s=d.type,m=c[s].apply(d,e,t,n);m.error?(u=!0,d.error=m.error):(m.warn&&(d.warn=m.warn),e=m.data||e,t=m.sources||t,n=m.columns||n)}}return{data:e,sources:t,columns:n}},columnDisplay:function(e,t){var n=void 0;return 2==(n="object"==(void 0===e?"undefined":u(e))?e.map(function(e){return t[e]}):[t[e]]).length?"columns "+n[0]+" and "+n[1]:n.length>2?"columns "+n.slice(0,-1).join(", ")+", and "+n[n.length-1]:"column "+n[0]},colHeadersFor:p,RULES:c,MAPPING_TARGETS:m}});