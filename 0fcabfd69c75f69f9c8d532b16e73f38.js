ace.define("ace/ext/menu_tools/overlay_page",["require","exports","module","ace/lib/dom"],(function(e,o,t){"use strict";var n=e("../../lib/dom"),r="#ace_settingsmenu, #kbshortcutmenu {background-color: #F7F7F7;color: black;box-shadow: -5px 4px 5px rgba(126, 126, 126, 0.55);padding: 1em 0.5em 2em 1em;overflow: auto;position: absolute;margin: 0;bottom: 0;right: 0;top: 0;z-index: 9991;cursor: default;}.ace_dark #ace_settingsmenu, .ace_dark #kbshortcutmenu {box-shadow: -20px 10px 25px rgba(126, 126, 126, 0.25);background-color: rgba(255, 255, 255, 0.6);color: black;}.ace_optionsMenuEntry:hover {background-color: rgba(100, 100, 100, 0.1);transition: all 0.3s}.ace_closeButton {background: rgba(245, 146, 146, 0.5);border: 1px solid #F48A8A;border-radius: 50%;padding: 7px;position: absolute;right: -8px;top: -8px;z-index: 100000;}.ace_closeButton{background: rgba(245, 146, 146, 0.9);}.ace_optionsMenuKey {color: darkslateblue;font-weight: bold;}.ace_optionsMenuCommand {color: darkcyan;font-weight: normal;}.ace_optionsMenuEntry input, .ace_optionsMenuEntry button {vertical-align: middle;}.ace_optionsMenuEntry button[ace_selected_button=true] {background: #e7e7e7;box-shadow: 1px 0px 2px 0px #adadad inset;border-color: #adadad;}.ace_optionsMenuEntry button {background: white;border: 1px solid lightgray;margin: 0px;}.ace_optionsMenuEntry button:hover{background: #f0f0f0;}";n.importCssString(r,"settings_menu.css",!1),t.exports.overlayPage=function(e,o,t){var n=document.createElement("div"),r=!1;function a(e){27===e.keyCode&&i()}function i(){n&&(document.removeEventListener("keydown",a),n.parentNode.removeChild(n),e&&e.focus(),n=null,t&&t())}function c(e){r=e,e&&(n.style.pointerEvents="none",o.style.pointerEvents="auto")}return n.style.cssText="margin: 0; padding: 0; position: fixed; top:0; bottom:0; left:0; right:0;z-index: 9990; "+(e?"background-color: rgba(0, 0, 0, 0.3);":""),n.addEventListener("click",(function(e){r||i()})),document.addEventListener("keydown",a),o.addEventListener("click",(function(e){e.stopPropagation()})),n.appendChild(o),document.body.appendChild(n),e&&e.blur(),{close:i,setIgnoreFocusOut:c}}})),ace.define("ace/ext/menu_tools/get_editor_keyboard_shortcuts",["require","exports","module","ace/lib/keys"],(function(e,o,t){"use strict";var n=e("../../lib/keys");t.exports.getEditorKeybordShortcuts=function(e){n.KEY_MODS;var o=[],t={};return e.keyBinding.$handlers.forEach((function(e){var n=e.commandKeyBinding;for(var r in n){var a=r.replace(/(^|-)\w/g,(function(e){return e.toUpperCase()})),i=n[r];Array.isArray(i)||(i=[i]),i.forEach((function(e){"string"!=typeof e&&(e=e.name),t[e]?t[e].key+="|"+a:(t[e]={key:a,command:e},o.push(t[e]))}))}})),o}})),ace.define("ace/ext/keybinding_menu",["require","exports","module","ace/editor","ace/ext/menu_tools/overlay_page","ace/ext/menu_tools/get_editor_keyboard_shortcuts"],(function(e,o,t){"use strict";var n=e("../editor").Editor;function r(o){if(!document.getElementById("kbshortcutmenu")){var t=e("./menu_tools/overlay_page").overlayPage,n=e("./menu_tools/get_editor_keyboard_shortcuts").getEditorKeybordShortcuts,r=n(o),a=document.createElement("div"),i=r.reduce((function(e,o){return e+'<div class="ace_optionsMenuEntry"><span class="ace_optionsMenuCommand">'+o.command+'</span> : <span class="ace_optionsMenuKey">'+o.key+"</span></div>"}),"");a.id="kbshortcutmenu",a.innerHTML="<h1>Keyboard Shortcuts</h1>"+i+"</div>",t(o,a)}}t.exports.init=function(e){n.prototype.showKeyboardShortcuts=function(){r(this)},e.commands.addCommands([{name:"showKeyboardShortcuts",bindKey:{win:"Ctrl-Alt-h",mac:"Command-Alt-h"},exec:function(e,o){e.showKeyboardShortcuts()}}])}})),function(){ace.require(["ace/ext/keybinding_menu"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}))}();