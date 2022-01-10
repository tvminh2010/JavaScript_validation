
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
                return value.length > min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự!`;
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

       //Lặp qua các inputs của form
       inputs.forEach(input => {

           //Lấy ra mảng rules của mỗi input (dạng mảng), và input.name của mỗi input
           var rules = input.getAttribute('rules').split('|');
           var inputname = input.name;

           //Lọc luôn mảng rules của mỗi input
           for(var rule of rules) {

                //Nếu rule có dấu ':' chỉ lấy rule là phần tử đầu của mảng
                if(rule.includes(':')) {
                    ruleInfos = rule.split(':')
                    rule = ruleInfos[0].trim();

                    //Cắt mảng từ vị trí thứ 2 đến cuối gán cho ruleParameters
                    parametes = ruleInfos.splice(1)
                    console.log(parametes);
                } else {
                    rule = rule.trim();
                }
                //Nếu formRules[input.name] không phải mảng, là lần đầu chạy
                // => tạo mảng và gán phần tử đầu là function có tên là rule,
                if(!Array.isArray(formRules[input.name])) {                  
                    formRules[inputname] = [validationRules[rule]];
                } 

                //Nếu đã là mảng, push tiếp phần tử tiếp theo 
                //là function tương ứng với rule tiếp theo của mỗi input.name
                else {
                    formRules[inputname].push(validationRules[rule]); 
                }
           }
       })//Kết thúc lặp các inputs
       //console.log(formRules);
    } 
}

/*
object = {
    make: 'Ford',
    model: 'Mustang',
    year: 1969,
};
console.log(object);

for (const prop in object) {
    if (object.hasOwnProperty(prop)) {
        console.log(`object.${prop} = ${object[prop]}`);
    }
}*/


var min = function(value) {
    return function(min) {
        return value.length > min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự!`;
    }
}