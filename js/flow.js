const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// const oauthtoken = urlParams.get('oauthtoken');
const apikey = urlParams.get('apikey');

let spikers_data = JSON.parse(httpGet(`https://api.pipe.bot/bot?apikey=2669587c11487310c8a07e66793ad0b0&program_data`));
spikers_data = JSON.parse(spikers_data.data.program_data);

spikers_data = spikers_data.values.filter(
    (word) => {
        let check = word[2] || '';
        return check!=''
    }
);

let curr_spiker = 0;
let default_image_url = "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg";

let tg = window.Telegram.WebApp;
tg.expand();


spikers_hidden_swither_prev.addEventListener("click",function(){
    curr_spiker = ((curr_spiker-1)>=0)?curr_spiker-1:list_to_show.length-1;
    showHidden(curr_spiker)
})
spikers_hidden_swither_next.addEventListener("click",function(){
    curr_spiker = ((curr_spiker+1)<list_to_show.length)?curr_spiker+1:0;
    showHidden(curr_spiker)
})
spikers_hidden_swither_home.addEventListener("click",function(){
    spikers_list.style.display = "block";
    document.querySelector(".spikers_hidden").style.opacity = "0";
    setTimeout(function(){
        document.querySelector(".spikers_hidden").style.display = "none";
        spikers_list.style.opacity = "100";
    },500)
})

function showHidden(num){
    curr_spiker = num;

    let item_pos = 0;
    document.querySelectorAll(".spikers_hidden_list_item").forEach(function(item){
        item.style.display = (item_pos==curr_spiker)?"block":"none";
        item_pos++;
    })

    // spikers_hidden_list.style.left=(curr_spiker * -100)+"vw";
    document.querySelector(".spikers_hidden").style.display = "block";
    spikers_list.style.opacity = "0";
    setTimeout(function(){
        spikers_list.style.display = "none";
        document.querySelector(".spikers_hidden").style.opacity = "100";
    },500)
}

let days_list = [];
let directions_list = [];
spikers_data.forEach(spiker_item => {
    let spiker_performance_day = spiker_item[7]||'';
    let spiker_direction = spiker_item[11]||'';
    if(spiker_performance_day!=''){
        let result = days_list.find((element) => element == spiker_performance_day);
        if(!result) days_list.push(spiker_performance_day);
    }
    if(spiker_direction!=''){
        let result = directions_list.find((element) => element == spiker_direction);
        if(!result) directions_list.push(spiker_direction);
    }
})
console.log(directions_list);

if(days_list.length>1){
    days_list.forEach(performance_day=>{
        let performance_day_button = document.createElement("button");
        performance_day_button.innerText = performance_day;
        performance_day_button.className = "yellow_stroke btn";
        performance_days.appendChild(performance_day_button);

        performance_day_button.addEventListener("click",function(e){
            list_to_show = spikers_data.filter((spiker) => spiker[7] == performance_day);

            let performance_days_childrens = document.getElementById('performance_days').children;
            let directions_list_buttons_childrens = document.getElementById('directions_list_buttons').children;
            for(let i=0;i<performance_days_childrens.length;i++){
                performance_days_childrens[i].style.transform = "scale(1)";
            }
            for(let i=0;i<directions_list_buttons_childrens.length;i++){
                directions_list_buttons_childrens[i].style.transform = "scale(1)";
            }
            performance_day_button.style.transform = "scale(1.05)";

            spikers_draw(list_to_show)
        })
    })
}else{
    performance_days_title.style.display = "none";
    performance_days.style.display = "none";
}
//
if(directions_list.length>1){
    directions_list.forEach(direction=>{
        let direction_button = document.createElement("button");
        direction_button.innerText = "🎯 "+direction;
        direction_button.className = "yellow_stroke btn";
        directions_list_buttons.appendChild(direction_button);

        direction_button.addEventListener("click",function(e){
            list_to_show = spikers_data.filter((spiker) => spiker[11] == direction);

            let performance_days_childrens = document.getElementById('performance_days').children;
            let directions_list_buttons_childrens = document.getElementById('directions_list_buttons').children;
            for(let i=0;i<performance_days_childrens.length;i++){
                performance_days_childrens[i].style.transform = "scale(1)";
            }
            for(let i=0;i<directions_list_buttons_childrens.length;i++){
                directions_list_buttons_childrens[i].style.transform = "scale(1)";
            }
            direction_button.style.transform = "scale(1.05)";

            spikers_draw(list_to_show)
        })
    })
}else{
    directions_title.style.display = "none";
    directions_list_buttons.style.display = "none";
}

let list_to_show = spikers_data;
spikers_draw(list_to_show)


let x;
addEventListener('touchstart', e => x = e.changedTouches[0].clientX);
addEventListener('touchend', e =>{
    e.changedTouches[0].clientX - x < -100 && swipeRight()

    e.changedTouches[0].clientX - x > 100 && swipeLeft()
});

function swipeLeft() {
    if(document.querySelector(".spikers_hidden").style.display == "block"){
        curr_spiker = ((curr_spiker-1)>=0)?curr_spiker-1:list_to_show.length-1;
        showHidden(curr_spiker)
    }
}

function swipeRight() {
    if(document.querySelector(".spikers_hidden").style.display == "block"){
        curr_spiker = ((curr_spiker+1)<list_to_show.length)?curr_spiker+1:0;
        showHidden(curr_spiker)
    }
}