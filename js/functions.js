function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function spikers_draw(list_to_draw){
    let serial_number=0;
    spikers_list.innerHTML = "";
    spikers_hidden_list.innerHTML = "";
    list_to_draw.forEach(spiker_item => {
        let spiker_id = spiker_item[12];
        let spiker_start = spiker_item[0]||"";
        let spiker_end = spiker_item[1]||"";
        let spiker_name = spiker_item[2]||"";
        let spiker_image = spiker_item[3]||"";
        let spiker_subject = spiker_item[4] || "";
        spiker_subject = (spiker_subject.length>0)?spiker_subject.replace(/$/gm,'<br>'):spiker_subject;

        let spiker_details = spiker_item[5] || "";
        spiker_details = (spiker_details.length>0)?spiker_details.replace(/$/gm,'<br>'):spiker_details;

        let spiker_category = spiker_item[6]||"";

        let spiker_performance_day = spiker_item[7]||"";

        let spiker_site = spiker_item[8] || "";
        let spiker_facebook = spiker_item[9] || "";
        let spiker_instagram = spiker_item[10] || "";

        let spiker_direction = spiker_item[11] || "";
        var new_spikers_list_item = document.createElement('div');
        new_spikers_list_item.setAttribute('class', `spikers_list_item`);
        new_spikers_list_item.innerHTML = `
        <div class="spikers_list_item_image">
            <img src="${(spiker_image.length>0)?spiker_image:default_image_url}" onclick="showHidden(${serial_number})">
        </div>
        <div class="spikers_list_item_info">
            <p class="spikers_list_item_info_title" onclick="showHidden(${serial_number})">${spiker_name}</p>
            ${(spiker_direction.length>0)?`<span class="yellow_stroke">${spiker_direction}</span>`:""}
            ${(spiker_start.length>0)?`<p>⏳ <u>${spiker_performance_day+"</u>"} ${spiker_start}-${spiker_end}</p>`:""}
            ${(spiker_subject.length>0)?`<p onclick="showHidden(${serial_number})">📋 ${spiker_subject}</p>`:""}
        </div>
        `;
        spikers_list.appendChild(new_spikers_list_item);

        /////////////////////////////////////////////////

        var new_hidden_spikers_list_item = document.createElement('div');
        new_hidden_spikers_list_item.setAttribute('class', `spikers_hidden_list_item`);
        new_hidden_spikers_list_item.innerHTML = `
        <div class="spikers_hidden_list_item_image">
            <img src="${(spiker_image.length>0)?spiker_image:default_image_url}">
        </div>
        <div class="spikers_hidden_list_item_info">
            <h2>${spiker_name} ${(spiker_direction.length>0)?`<span class="yellow_stroke">${spiker_direction}</span>`:""}</h2>
            ${(spiker_start.length>0)?`<p><span class="yellow_stroke">Час виступу</span> ${spiker_start}-${spiker_end}</p>`:""}
            ${(spiker_subject.length>0)?`<p><span class="yellow_stroke">Тема:</span> ${spiker_subject}</p>`:""}
            ${(spiker_details.length>0)?`<p><span class="yellow_stroke">Детальніше:</span> ${spiker_details}</p>`:""}
            ${(spiker_category.length>0)?`<p> ${spiker_category}</p>`:""}
            
        </div>
        `;
        spikers_hidden_list.appendChild(new_hidden_spikers_list_item);
        serial_number++;
    });
}