//////////////VARIABLES/////////////////////////////////////////////////////////////////////////////////////
var mydata;
var item_box = document.getElementById("item-box");
///////////////FETCHING DATA////////////////////////////////////////////////////////////////////////////////////
async function loadData() {
    var url = "json/food-items.json";
    var myData = await fetch(url).then(result =>result.json()).then(result =>result.items);
    mydata = myData;
};
/////////////////DIVIDING ELEMENT//////////////////////////////////////////////////////////////////////////////////
function separate_objects(mydata) {
    for (let index = 0; index < mydata.length; index++) {
        const element = mydata[index];
            image(element);
    }
}

/////////////////CALL ON LOAD PAGE///////////////////////////////////////////////////////////////////////////////////////
window.onload=loadData();
loadData().then(()=>{
    separate_objects(mydata);
});
/////////////////MAKE IMAGES///////////////////////////////////////////////////////////////////////////////////////
function image(element) {
    var div = document.createElement('div');
    div.style.width="80px"
    div.style.height="80px"
    div.style.overflow="hidden"
    for (let index = 0; index < element.qty; index++) {
        var img = document.createElement('img');
        img.classList.add('img-item');
        img.setAttribute('id',element.id+index);
        img.setAttribute('src',element.image);
        img.draggable = true;
        img.dataset.name=element.name;
        img.dataset.price=element.price;
        img.dataset.calorie=element.calorie;        
        img.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData('text/plain',event.target.id);})
        div.appendChild(img); 
    }
    item_box.appendChild(div)
 }
 ///////////////ALLOW DROP/////////////////////////////////////////////////////////////////////////////////////////
function allowDrop(event){
    event.preventDefault();
}
////////////////ON DROP ACTION FUNCTION////////////////////////////////////////////////////////////////////////////////////////
function onDrop(event){
    var item_id = event.dataTransfer.getData('text/plain');
    var item = document.getElementById(item_id);
    var dropzone = document.getElementById("pizza-dough")
    dropzone.appendChild(item)
    calc_price(item);
    calc_calorie(item);
    dropzone.style.position ='static';
    item.style.position = 'absolute';
    item.style.top = (event.pageY - 40)+"px";
    item.style.left =(event.pageX - 40)+"px";
}
////////////////CALCULATING PRICE////////////////////////////////////////////////////////////////////////////////////////
function calc_price(item) {
    var price = Number(document.getElementById('total-price').innerText);
price +=Number(item.dataset.price);
document.getElementById('total-price').innerText=price;
}
//////////////////CALCULATING CALORIES//////////////////////////////////////////////////////////////////////////////////////
function calc_calorie(item) {
    var calorie = Number(document.getElementById('total-calorie').innerText);
calorie +=Number(item.dataset.calorie);
document.getElementById('total-calorie').innerText=calorie;
}

/////////////////////////////////////////////////////////////////////////////////////////////