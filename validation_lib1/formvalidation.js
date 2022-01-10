
function Validator (options) { 
        var formElement = document.querySelector(options.form);     //Lấy form element
        var selectorRules =[];
/* -------------------------------------------------------------------- */
        if(formElement) {
            
            formElement.onsubmit=(e) => {

                //Cấm submit
                e.preventDefault();
                var isFormValid = true;

                //Lặp qua toàn bộ rule và validate luôn
                options.rules.forEach((rule) => { 
                    var inputElement = formElement.querySelector(rule.selector);
                    var isValid = validate(inputElement, rule);
                    if(!isValid) {
                        isFormValid = false;
                    } 
                });
                if(isFormValid) {
                    formElement.submit();
                    //formElement.unbind('submit');
                    //console.log("Form is valid");
                } 
            }

            options.rules.forEach((rule) => {       //Nếu thấy form => duyệt toàn bộ rule của form
                selectorRules.push(rule);
                var inputElement = formElement.querySelector(rule.selector);
                if(inputElement) {
                    /* -------------------------- */
                    inputElement.onblur = () => {
                        validate(inputElement, rule);
                    }
                    /* -------------------------- */
                    inputElement.oninput = function () {
                        errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                        errorElement.innerText = '';
                        inputElement.classList.remove('field-invalid');
                    }
                    /* -------------------------- */
                } 
            })
        }

    /* -------------------------------------------------------------------- */
    function validate(inputElement, rule) {
        var errorMessage; //= rule.check(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

        if (selectorRules) {
            var rules = groupArrayByKey(selectorRules, 'selector')[rule.selector];
            for(var i = 0; i < rules.length; i++) {
                errorMessage = (rules[i].check(inputElement.value));
                if(errorMessage) break;
            }
        }
        if(errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.classList.add('field-invalid');
        } else {
            errorElement.innerText = '';
            inputElement.classList.remove('field-invalid');
        }
        return !errorMessage;
    }
    /* -------------------------------------------------------------------- */
}
/////////////////////////////////////////////////////////////////////////////
function groupArrayByKey (array, key)  {
    return array.reduce((accumulate, currentValue) => {
        if (!accumulate[currentValue[key]]) {
            accumulate[currentValue[key]] = [];
            accumulate[currentValue[key]].push(currentValue);
        } else {
            accumulate[currentValue[key]].push(currentValue);
        }
        return accumulate;
    }, []); 
};
 /* --------------------------------------------------------- */
////////////////////////////////////////////////////////////////
/////////////////////// CÁC HÀM  CỦA VALIDATOR /////////////////
  Validator.isRequired = function (selector) { 
    return {
        selector: selector,
        check   : (input_value) =>  {
            return input_value.trim() ? '' : 'Bạn chưa nhập trường này';
        }
    }
  }
    /* ------------------------------------------------- */
  Validator.isEmail = function (selector) {
    return {
        selector: selector,
        check   : (input_value) =>  {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(input_value) ? '' : 'Không phải địa chỉ email';
        }
    }
   }
    /* ------------------------------------------------- */
   Validator.minLength = function (selector, min) { 
        return {
            selector: selector,
            check   : (input_value) =>  {
                return input_value.length >= min ? '' : `Hãy nhập đủ ${min} ký tự`;
            }
        }
    }
    /* ------------------------------------------------- */
   Validator.isPassword = function (selector, min, max) { 
    return {
        selector: selector,
        check   : (input_value) =>  {
                if(input_value.length < min || input_value.length > max) {
                    return `Số ký tự phải từ ${min} đến ${max} ký tự`;
                } else {
                    //console.log(join(','));
                    //return (input_value.length < min || input_value.length > max)? '': `Mật khẩu phải bao gồm 3 kiểu: Chữ cái, chữ thường, số, ký tự đặc biệt`;
                } 
            }
        }
    }
    /* ------------------------------------------------- */
    Validator.isConfirmPassword = function (selector, passwordSelector) { 
        return {
            selector: selector,
            check   : (input_value) =>  {
                passwordValue = document.querySelector(passwordSelector).value;
                return input_value === passwordValue  ? '' : 'Mật khẩu ko khớp'; 
            }
        }
    }
  /* ------------------------------------------------- */
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////