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
        //    计算总金额的函数
        var qtyFileds = OrderForm.quantity,
            totalFields = document.getElementsByClassName('item_total'),
            orderTotalField = document.getElementById('order_total');
        //  格式化数字:自动切分千位数。
        var formatMoney = function (value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        };
        var calculateTotals = function () {
            var i = 0,
                ln = qtyFileds.length,
                itemQty = 0,
                itemPrice = 0.00,
                itemTotal = 0.00,
                itemTotalMoney = '$0.00',
                orderTotal = 0.00,
                orderTotalMoney = '$0.00';
            for (; i < ln; i++) {
                if (!!qtyFileds[i].valueAsNumber) {
                    itemQty = qtyFileds[i].valueAsNumber;
                    console.log('测试成功');
                } else {
                    itemQty = parseFloat(qtyFileds[i].value);
                    console.log('测试失败');
                }
                //    根据data-*获取产品价格
                if (!!qtyFileds[i].dataset) {
                    itemPrice = parseFloat(qtyFileds[i].dataset.price);
                    console.log('dataset 包含');
                } else {
                    itemPrice = parseFloat(qtyFileds[i].getAtrribute('data-price'));
                }
                itemTotal = itemQty * itemPrice;
                itemTotalMoney = '$' + formatMoney(itemTotal.toFixed(2));
                orderTotal += itemTotal;
                orderTotalMoney = '$' + formatMoney(orderTotal.toFixed(2));
                //    输出经过计算之后的表单价格
                if (!!totalFields[i].value) {
                    totalFields[i].value = itemTotalMoney;
                    orderTotalField.value = orderTotalMoney;
                } else {
                    totalFields[i].innerHTML = itemTotalMoney;
                    orderTotalField.innerHTML = orderTotalMoney;
                }
                
            }
        };
        calculateTotals();
        
        var qtyListeners = function () {
            var i = 0,
                ln = qtyFileds.length;
            for (; i < ln; i++) {
                qtyFileds[i].addEventListener('input', calculateTotals, false);
                qtyFileds[i].addEventListener('keyup', calculateTotals, false);
            }
        };
        qtyListeners();
        
    };
    window.addEventListener('load', init, false);
    
})();