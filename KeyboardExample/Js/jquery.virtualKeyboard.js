(function($){

    var defaults = {
        styleClassParentInput: 'vkb-css-parent-input',
        styleClassKeyboardIcon: 'vkb-css-keyboard-icon',
        srcKeyboardIcon: './keyboard.png'
    };

    var virtualKeyboard = {
        template: ' <div  id="vkb-js-keyboard"   class="vkb-css-hide"><div class="vkb-css-background vkb-js-close" ></div><div class="vkb-css-keyboard-box" >    <div class="vkb-css-button-box">            <div class="vkb-css-button-line"> <button type="button">1</button> <button type="button">2</button> <button type="button">3</button> <button type="button">4</button> <button type="button">5</button> <button type="button">6</button> <button type="button">7</button> <button type="button">8</button> <button type="button">9</button> <button type="button">0</button>      <button type="button" id="vkb_8">SİL</button></div>  <div class="vkb-css-button-line"> <button type="button">Q</button> <button type="button">W</button> <button type="button">E</button> <button type="button">R</button> <button type="button">T</button> <button type="button">Y</button> <button type="button">U</button> <button type="button">İ</button> <button type="button">O</button> <button type="button">P</button></div>  <div class="vkb-css-button-line"> <button type="button">A</button> <button type="button">S</button> <button type="button">D</button> <button type="button">F</button> <button type="button">G</button> <button type="button">H</button> <button type="button">J</button> <button type="button">K</button> <button type="button">L</button> </div>  <div class="vkb-css-button-line"> <button type="button">Z</button> <button type="button">X</button> <button type="button">C</button>  <button type="button">Ç</button> <button type="button">V</button> <button type="button">B</button> <button type="button">N</button> <button type="button">M</button></div><div class="vkb-css-button-line"> <button type="button"id="vkb_close">VAZGEÇ</button> <button type="button" id="vkb_success">TAMAM</button></div></div></div>',
        clickSumbolButton: function (e) {
           
            return function (e) {
        
                e.currentTarget
                switch($(e.currentTarget).attr('id')) {
                    case "vkb_8":
                        this.pasteSymbolInPosition("");
                        break
                    case "vkb_32":
                        this.pasteSymbolInPosition(" ");
                        break
                    case "vkb_37":
                        if(this.source[0].selectionStart === this.source[0].selectionEnd)
                            this.setCursorPosition(this.source[0].selectionStart - 1);
                        else
                            this.setCursorPosition(this.source[0].selectionStart);
                        break
                    case "vkb_39":
                        if(this.source[0].selectionStart === this.source[0].selectionEnd)
                            this.setCursorPosition(this.source[0].selectionStart + 1);
                        else
                            this.setCursorPosition(this.source[0].selectionEnd);
                        break
                    case "vkb_close":
                        this.keyboard.hide();
                        this.source.val('');
                        break
                    case "vkb_success":
                        this.source.val(this.source.val());
                        // this.keyboard.hide();

                        alert()
                        break
                    default:

                        this.pasteSymbolInPosition($(e.currentTarget).html()); // SEÇİLEN BUTTON
                      

                }
            }
        },
        show: function ($source) {
            this.source = $source;
            this.keyboard.show();
            $(this.source).focus()
          
        },
        pasteSymbolInPosition: function (symbol) {
                var selectionStart = (!symbol.length && this.source[0].selectionStart === this.source[0].selectionEnd && this.source[0].selectionStart !== 0) ? this.source[0].selectionStart - 1 : this.source[0].selectionStart; // 0 1 2 3 4 5 ç...
                var parth1 = this.source.val().slice(0, selectionStart); // 0 dan son rakama kadar
                var parth2 = this.source.val().slice(this.source[0].selectionEnd, this.source.val().length);
                this.source.val(parth1 + symbol + parth2);
                this.setCursorPosition(selectionStart + symbol.length+1); // cursoru sona gelir 
                this.source.focus();
        },
        setCursorPosition: function (position) {
            if (this.source[0].setSelectionRange) {
                this.source[0].setSelectionRange(position, position);
            } else if (this.source[0].createTextRange) {
                var range = this.source[0].createTextRange();
                range.collapse(true);
                range.moveEnd('character', position);
                range.moveStart('character', position);
                range.select();
            }
        this.source.focus();
        }
    }



    function Vkb(element, options) {


        this.config = $.extend({}, defaults, options);
        this.element = element;
        this.init();
    }




    Vkb.prototype.init = function () {

        this.element.addClass(this.config.styleClassParentInput);

        $('#keybd').append(virtualKeyboard.template);
        virtualKeyboard.keyboard = $('#vkb-js-keyboard');
        virtualKeyboard.input = $('#vkb-js-input');
        $('#vkb-js-keyboard button').on('click', $.proxy(virtualKeyboard.clickSumbolButton(this), virtualKeyboard));

        $('<img/>',{
            alt: 'Keyboard',
            src: this.config.srcKeyboardIcon,
            class: this.config.styleClassKeyboardIcon + ' vkb-js-key'
        })
            .insertAfter(this.element)
            .on('click', function(e) {
                virtualKeyboard.show($(e.currentTarget).prev('input'));
                $('#vkb-js-input').val($(e.currentTarget).prev('input').val()).focus();
 
            });
    }

    $.fn.vkb = function (options) {
        new Vkb(this, options);
        return this;
    }

})(jQuery);