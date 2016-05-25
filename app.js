(function () {
    var init = function () {
        var OrderForm = document.forms.order,
            saveBtn = document.getElementById('saveOrder'),
            saveBtnClicked = false;
        
        //    检测浏览器是否支持 formaction 属性,如果不支持,就添加属性。
        var saveForm = function () {
            if (!('formAction' in document.createElement('input'))) {
                var formAction = saveBtn.getAttribute('formaction');
                OrderForm.setAttribute('action', formAction);
            }
            saveBtnClicked = true;
        };
        saveBtn.addEventListener('click', saveForm, false);
    };
    window.addEventListener('load', init, false);
    
})();