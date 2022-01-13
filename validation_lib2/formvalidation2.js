
function Validator (formSelector) { 

    /**
     * Tạo function chứa các validation rules, 
     * Có tên là validationRules
     * là 1 đối tượng chứa các rule để validate bên dưới
     */
    /* ---------------------------------------- */
    var validationRules = {
        required: function(value) {
            return value ? undefined : 'Yêu cầu nhập trường này';
        },
        email: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? '' : 'Không phải địa chỉ email!';
        },
        min: function(value) {
            return function(min) {
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự!`;
            }
            
        },
    }
    /* ---------------------------------------- */

    formRules = {};
    //formRules[input.name] = input.getAttribute('rules');
    formElement = document.querySelector(formSelector);
    /* ---------------------------------------- */
    if (formElement) {

       //Nếu thấy form, lấy các thẻ inputs
       var inputs = formElement.querySelectorAll('input[name][rules]');

       //Lọc các inputs của form
       inputs.forEach(input => {

           //Lấy ra mảng rules của mỗi input (dạng mảng), và giá trị input.name của mỗi input
           var rules = input.getAttribute('rules').split('|');
           var inputname = input.name;

           //Lọc các rules của mỗi input vừa lấy được
           for(var rule of rules) {

                var ruleFunc =  validationRules[rule];

                if(rule.includes(':')) {
                    ruleInfos = rule.split(':')
                    rule = ruleInfos[0].trim();             //Nếu rule có dấu ':' lấy rule là phần tử đầu của mảng
                    parametes = ruleInfos.splice(1)         //Lấy các tham số từ vị trí thứ 2 đến cuối mảng đưa vào parameters
                    ruleFunc = validationRules[rule](...parametes);     //Lấy hàm bên trong của rule kèm thêm tham số vào, sử dụng closure và 

                } else {
                    rule = rule.trim();
                }
                //Nếu formRules[input.name] không phải mảng, là lần đầu chạy
                // => tạo mảng và gán phần tử đầu là function có tên là rule,
                if(!Array.isArray(formRules[input.name])) {                  
                    formRules[inputname] = [ruleFunc];
                } 

                //Nếu đã là mảng, push tiếp ruleFunc làm phần tử tiếp theo 
                //là function tương ứng với rule tiếp theo của mỗi input.name
                else {
                    formRules[inputname].push(ruleFunc); 
                }
           }    //Kết thúc lọc các rules của mỗi input
           //Lắng nghe sự kiện validate

           input.onblur = handlerValidate;

       })//Kết thúc lọc các inputs
       /* ------------------------------------------------- */
       function handlerValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;
            rules.find(function(rule) {
                errorMessage = rule(event.target.value);
                return errorMessage;
            })


            //Nếu có lỗi thì hiển thị ra UI
            if(errorMessage) {
                var formGroup = getParent(event.target, '.form-group');
                if(formGroup) {
                    var messageElement = formGroup.querySelector('.form-message');
                    if(messageElement) {
                        messageElement.innerText = errorMessage;
                    }
                        
                }
                
            }

       }
    } 
    /* ------------------------------------------------- */
    function getParent(element, selector) {
        while (element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    /* ------------------------------------------------- */  
}