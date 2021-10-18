var album = 4;
var album_number = [4, 3, 0, 3];
var current_album = 'mountains_album';

var mountains_album_url = [
    "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    "https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    "https://images.pexels.com/photos/326058/pexels-photo-326058.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
];

var sea_album_url = [
    "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    "https://images.pexels.com/photos/1298684/pexels-photo-1298684.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    "https://images.pexels.com/photos/386148/pexels-photo-386148.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
];

var animals_album_url=[
    ];

var architecture_album_url=[
    "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    "https://images.pexels.com/photos/301469/pexels-photo-301469.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
];
function show_img(imgs){
    var chooseImg = document.getElementById("chosenImg");
    chooseImg.src = imgs.src;
}

function show_album(album_name, div){
    var list = document.querySelector('.image-windows');
    
    // clear old album
    var myNode = document.getElementById("image-windows");
    myNode.innerHTML = '';

    // cancel div colar

    // change div colar

    if (album_name == 'mountains_album'){
        var album_url = mountains_album_url;
        var album_num = album_number[0];
        current_album = 'mountains_album';
    }
    else if (album_name == 'sea_album'){
        var album_url = sea_album_url;
        var album_num = album_number[1];
        current_album = 'sea_album';
    }
    else if (album_name == 'animals_album'){
        var album_url = animals_album_url;
        var album_num = album_number[2];
        current_album = 'animals_album';
    }
    else if (album_name == 'architecture_album'){
        var album_url = architecture_album_url;
        var album_num = album_number[3];
        current_album = 'architecture_album';
    }

    if (album_num == 0){
        alert("No image! ");
    }
    else{
        for (let i = 0; i < album_num; i++){
        let new_img = document.createElement('img');
        
        new_img.src = album_url[i];
        new_img.setAttribute( "onclick", "javascript: show_img(this);" );
        list.appendChild(new_img);
        
        // open first img
        if (i == 0)
            show_img(new_img);
        }
    }

}

function num_of_album(album_name){
    var num_album = 0;
    if (album_name == 'mountains_album')
        num_album = album_number[0];
    else if (album_name == 'sea_album')
        num_album = album_number[1];
    else if (album_name == 'animals_album')
        num_album = album_number[2];
    else if (album_name == 'architecture_album')
        num_album = album_number[3];
    
    return num_album;
};

function total_num(){
    var total_num = 0;
    for(let i = 0; i < album; i ++)
        total_num += album_number[i];
    return total_num;
};

window.onload = function(){
    show_album(current_album);
};


// add img
const inputText = document.querySelector('#txt');
const add_button = document.querySelector('.btn-list');
add_button.addEventListener('click', (e)=>{
    if(imputText.value != ''){
        e.preventDefault();
        
        // apend
        let new_img = document.createElement('img');
        
        new_img.src = imputText.value;
        new_img.setAttribute( "onclick", "javascript: show_img(this);" );
        album_url.appendChild(new_img);

        if (current_album == 'mountains_album'){
            var album_no = 0;
            mountains_album_url.appendChild(new_img);

        }
        else if (current_album == 'sea_album'){
            var album_no = 1;
            sea_album_url.appendChild(new_img);

        }
        else if (current_album == 'animals_album'){
            var album_no = 2;
            animals_album.appendChild(new_img);
        }
        else if (current_album == 'architecture_album'){
            var album_no = 3;
            architecture_album.appendChild(new_img);
        }
        album_number[album_no] += 1

        
    }
});
