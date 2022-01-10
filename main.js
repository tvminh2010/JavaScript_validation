
var buttonElement = document.querySelector('button');
buttonElement.addEventListener('mouseover', (event) => {
    console.log(event.target.innerText);
})


var courses = [
    {
        id: 1,
        name: 'JavaScript',
        Price: 200,
        ghichu: 'JavaScript cơ bản',
    },
    {
        id: 2,
        name: 'PHP',
        Price: 300,
        ghichu: 'PHP cơ bản',
    },
    {
        id: 3,
        name: 'Spring',
        Price: 400,
        ghichu: 'Spring cơ bản',
    },
    {
        id: 4,
        name: 'NodeJS',
        Price: 700,
        ghichu: 'NodeJS cơ bản',
    },
]

console.log(courses);
var totalPrice = 0;
courses.forEach(function(course) {
    totalPrice += course.Price;
})
console.log(totalPrice);


var totalPriceHandler = function(accumulator, course, indexCourse, courses) {

    return accumulator + course.Price;
}
console.log(`---------------------------------------------`);
const tonggiakhoahoc = courses.reduce((sum, course) => {
    return sum += course.Price;
}, 0)
console.log(tonggiakhoahoc);



var deepArray = [1,2,3, [4,5], 6, 7, 8, [9,10,11]]

var flatArray = deepArray.reduce((result, element) => {
    return result.concat(element);
}, [])
Array.prototype.testMethod1 = 11;

console.log(flatArray);
console.log(`---------------------------------------------`);

for (const key in flatArray) {
    console.log('REsult: ', key);
}
