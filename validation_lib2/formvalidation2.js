
function Validator (formSelector) { 
    /**
     * Tạo function chứa các validation rules, 
     * Có tên là validationRules
     * là 1 đối tượng chứa các rule để validate bên dưới
     * Hướng dẫn sử dụng:
     *  - Mỗi input phải có 1 tên khác nhau bởi thuộc tính name
     *  - Mỗi input có 1 attribute là rules, liệt kê các rule, phân cách nhau bởi dấu '|' để validate
     *      + required, email, min, max, min_max
     *      + confirm_password      : 
     */
    var validationRules = {
        required: function(value) {
            return value ? undefined : 'Yêu cầu nhập trường này';
        },
        email: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Không phải địa chỉ email!';
        },
        min: function(min) {
            return function(value) {
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất: '${min}' ký tự!`;
            }  
        },
        max: function(max) {
            return function(value) {
                return value.length >= max ? undefined : `Vui lòng nhập tối đa: '${max}' ký tự!`;
            }  
        },
        min_max: function(min, max) {
            return function(value) {
                if(value.length < min || value.length > max) {
                    return `Số ký tự phải từ ${min} đến ${max} ký tự`;
                }
            }
        },
        confirm_password: function(passwordSelector) {
            return function(value) {
                return value === document.querySelector(passwordSelector).value  ? undefined : 'Mật khẩu ko khớp'; 
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

                var ruleFunc;

                if(rule.includes(':')) {
                    ruleInfos = rule.split(':')
                    rule = ruleInfos[0].trim();                     //Nếu rule có dấu ':' lấy rule là phần tử đầu của mảng
                    parametes = ruleInfos.splice(1)                 //Lấy các tham số từ vị trí thứ 2 đến cuối mảng đưa vào parameters
                    //console.log(parametes);
                    ruleFunc = validationRules[rule](...parametes); //Lấy hàm bên trong của rule kèm thêm tham số vào, sử dụng closure và 
                } else if (rule.includes('=')){
                    ruleInfos = rule.split('=')
                    rule = ruleInfos[0].trim();
                    parametes = ruleInfos.splice(1)
                    ruleFunc = validationRules[rule](...parametes);
                } else {
                    rule = rule.trim();
                    ruleFunc =  validationRules[rule];
                }

                //Nếu formRules[input.name] không phải mảng, => tạo mảng và gán phần tử đầu là function ruleFunc,
                if(!Array.isArray(formRules[input.name])) {                  
                    formRules[inputname] = [ruleFunc];
                } 

                //Nếu đã là mảng, push tiếp ruleFunc làm phần tử tiếp theo 
                //là function tương ứng với rule tiếp theo của mỗi input.name
                else {
                    formRules[inputname].push(ruleFunc); 
                }
           }    //Kết thúc lọc các rules của mỗi input

           input.onblur = handlerValidate;
       })//Kết thúc lọc các inputs
       //console.log(formRules);
    /* ------------------------------------------------- */
       function handlerValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;
            rules.find(function(rule) {
                errorMessage = rule(event.target.value);
                return errorMessage;
            })


            //Nếu có lỗi thì hiển thị ra UI
            var formGroup = getParent(event.target, '.form-group');
            if(errorMessage) {
                if(formGroup) {
                    var messageElement = formGroup.querySelector('.form-message');
                    if(messageElement) {
                        messageElement.innerText = errorMessage;
                        this.classList.add('field-invalid')
                    }
                        
                }
            } else {
                if(formGroup) {
                    var messageElement = formGroup.querySelector('.form-message');
                    if(messageElement) {
                        messageElement.innerText = '';
                        this.classList.remove('field-invalid')
                    }
                        
                }
            }

       }
       /* ------------------------------------------------- */
       formElement.onsubmit = function (event)  {
            event.preventDefault()
            var inputs = formElement.querySelectorAll('input[name][rules]');
            inputs.forEach(input => {
                handlerValidate({ target: input })
            })
        }
        /* ------------------------------------------------- */
    } 

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