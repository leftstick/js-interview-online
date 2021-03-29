ace.define("ace/mode/io_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(e,t,i){"use strict";var o=e("../lib/oop"),n=e("./text_highlight_rules").TextHighlightRules,r=function(){this.$rules={start:[{token:"keyword.control.io",regex:"\\b(?:if|ifTrue|ifFalse|ifTrueIfFalse|for|loop|reverseForeach|foreach|map|continue|break|while|do|return)\\b"},{token:"punctuation.definition.comment.io",regex:"/\\*",push:[{token:"punctuation.definition.comment.io",regex:"\\*/",next:"pop"},{defaultToken:"comment.block.io"}]},{token:"punctuation.definition.comment.io",regex:"//",push:[{token:"comment.line.double-slash.io",regex:"$",next:"pop"},{defaultToken:"comment.line.double-slash.io"}]},{token:"punctuation.definition.comment.io",regex:"#",push:[{token:"comment.line.number-sign.io",regex:"$",next:"pop"},{defaultToken:"comment.line.number-sign.io"}]},{token:"variable.language.io",regex:"\\b(?:self|sender|target|proto|protos|parent)\\b",comment:"I wonder if some of this isn't variable.other.language? --Allan; scoping this as variable.language to match Objective-C's handling of 'self', which is inconsistent with C++'s handling of 'this' but perhaps intentionally so -- Rob"},{token:"keyword.operator.io",regex:"<=|>=|=|:=|\\*|\\||\\|\\||\\+|-|/|&|&&|>|<|\\?|@|@@|\\b(?:and|or)\\b"},{token:"constant.other.io",regex:"\\bGL[\\w_]+\\b"},{token:"support.class.io",regex:"\\b[A-Z](?:\\w+)?\\b"},{token:"support.function.io",regex:"\\b(?:clone|call|init|method|list|vector|block|\\w+(?=\\s*\\())\\b"},{token:"support.function.open-gl.io",regex:"\\bgl(?:u|ut)?[A-Z]\\w+\\b"},{token:"punctuation.definition.string.begin.io",regex:'"""',push:[{token:"punctuation.definition.string.end.io",regex:'"""',next:"pop"},{token:"constant.character.escape.io",regex:"\\\\."},{defaultToken:"string.quoted.triple.io"}]},{token:"punctuation.definition.string.begin.io",regex:'"',push:[{token:"punctuation.definition.string.end.io",regex:'"',next:"pop"},{token:"constant.character.escape.io",regex:"\\\\."},{defaultToken:"string.quoted.double.io"}]},{token:"constant.numeric.io",regex:"\\b(?:0(?:x|X)[0-9a-fA-F]*|(?:[0-9]+\\.?[0-9]*|\\.[0-9]+)(?:(?:e|E)(?:\\+|-)?[0-9]+)?)(?:L|l|UL|ul|u|U|F|f)?\\b"},{token:"variable.other.global.io",regex:"Lobby\\b"},{token:"constant.language.io",regex:"\\b(?:TRUE|true|FALSE|false|NULL|null|Null|Nil|nil|YES|NO)\\b"}]},this.normalizeRules()};r.metaData={fileTypes:["io"],keyEquivalent:"^~I",name:"Io",scopeName:"source.io"},o.inherits(r,n),t.IoHighlightRules=r})),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],(function(e,t,i){"use strict";var o=e("../../lib/oop"),n=e("../../range").Range,r=e("./fold_mode").FoldMode,a=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};o.inherits(a,r),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,i){var o=e.getLine(i);if(this.singleLineBlockCommentRe.test(o)&&!this.startRegionRe.test(o)&&!this.tripleStarBlockCommentRe.test(o))return"";var n=this._getFoldWidgetBase(e,t,i);return!n&&this.startRegionRe.test(o)?"start":n},this.getFoldWidgetRange=function(e,t,i,o){var n=e.getLine(i);if(this.startRegionRe.test(n))return this.getCommentRegionBlock(e,n,i);var r=n.match(this.foldingStartMarker);if(r){var a=r.index;if(r[1])return this.openingBracketBlock(e,r[1],i,a);var s=e.getCommentFoldRange(i,a+r[0].length,1);return s&&!s.isMultiLine()&&(o?s=this.getSectionRange(e,i):"all"!=t&&(s=null)),s}if("markbegin"!==t){r=n.match(this.foldingStopMarker);if(r){a=r.index+r[0].length;return r[1]?this.closingBracketBlock(e,r[1],i,a):e.getCommentFoldRange(i,a,-1)}}},this.getSectionRange=function(e,t){var i=e.getLine(t),o=i.search(/\S/),r=t,a=i.length;t+=1;var s=t,l=e.getLength();while(++t<l){i=e.getLine(t);var g=i.search(/\S/);if(-1!==g){if(o>g)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=r)break;if(c.isMultiLine())t=c.end.row;else if(o==g)break}s=t}}return new n(r,a,s,e.getLine(s).length)},this.getCommentRegionBlock=function(e,t,i){var o=t.search(/\s*$/),r=e.getLength(),a=i,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,l=1;while(++i<r){t=e.getLine(i);var g=s.exec(t);if(g&&(g[1]?l--:l++,!l))break}var c=i;if(c>a)return new n(a,o,c,t.length)}}.call(a.prototype)})),ace.define("ace/mode/io",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/io_highlight_rules","ace/mode/folding/cstyle"],(function(e,t,i){"use strict";var o=e("../lib/oop"),n=e("./text").Mode,r=e("./io_highlight_rules").IoHighlightRules,a=e("./folding/cstyle").FoldMode,s=function(){this.HighlightRules=r,this.foldingRules=new a,this.$behaviour=this.$defaultBehaviour};o.inherits(s,n),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/io",this.snippetFileId="ace/snippets/io"}.call(s.prototype),t.Mode=s})),function(){ace.require(["ace/mode/io"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}))}();