// global var
globalThis.total_item = 0;
globalThis.finished_item = 0;

// define class
class to_do{
    constructor(){
        // item
        this.node= document.createElement('li');
        this.node.className = 'todo-app__item';
        this.item_index = globalThis.total_item.toString(10);
        let itemId = this.item_index;

        // input text
        const inputText = document.querySelector('.todo-app__input');

        // checkbox
        let checkbox = document.createElement('div');
        checkbox.className='todo-app__checkbox';
        let checkbox_input = document.createElement('input');
        checkbox_input.id = itemId;
        checkbox_input.type = 'checkbox';
        let checkbox_label = document.createElement('label');
        checkbox_label.htmlFor= itemId;

        // finish or not
        this.finished = false;
        checkbox_input.addEventListener('change', this.finish_or_not.bind(this));
        checkbox.appendChild(checkbox_input);
        checkbox.appendChild(checkbox_label);
        this.node.appendChild(checkbox);

        // item detail
        let item_detail = document.createElement('h1');
        item_detail.classList.add('todo-app__item-detail');
        item_detail.textContent = inputText.value;
        this.node.appendChild(item_detail);
        inputText.value = ''; 
        
        // close img
        let close_img = document.createElement('img');
        close_img.src = "./img/x.png" 
        close_img.className="todo-app__item-x";
        close_img.addEventListener('click', this.remove_item.bind(this));
        this.node.appendChild(close_img);
    }
    get rnode(){
        return this.node;
    };
    finish_or_not(event){
        if(event.currentTarget.checked){
            globalThis.finished_item += 1;
            // renew text style
            let text = this.node.querySelector('.todo-app__item-detail');
            text.setAttribute('style', 'text-decoration: line-through; opacity: 0.5;');
            // renew the total check box
            let left = (globalThis.total_item - globalThis.finished_item).toString(10);
            let total_left = document.getElementById('todo-footer').getElementsByClassName('todo-app__total')[0];
            total_left.textContent = left + ' left';
            this.finished = true;
            // modify record
            globalThis.Completed_list[this.item_index] = 1;
            globalThis.Active_list[this.item_index] = 0;
        }
        else{
            globalThis.finished_item -= 1;
            // renew text style
            let text = this.node.querySelector('.todo-app__item-detail');
            text.setAttribute('style', '');
            // renew the total
            let left = (globalThis.total_item - globalThis.finished_item).toString(10);
            let total_left = document.getElementById('todo-footer').getElementsByClassName('todo-app__total')[0];
            total_left.textContent = left + ' left';
            this.finished = false;
            // modify record
            globalThis.Completed_list[this.item_index] = 0;
            globalThis.Active_list[this.item_index] = 1;
        }
    };
    remove_item(event){
        if(this.finished == true){
            globalThis.finished_item -= 1;
            globalThis.total_item -= 1;
        }
        else{
            globalThis.total_item -= 1;
        }
        // remove the node
        let todo = document.getElementById('todo-list');
        todo.removeChild(this.node);
        // renew the total check box
        let left = (globalThis.total_item - globalThis.finished_item).toString(10);
        let total_left = document.getElementById('todo-footer').getElementsByClassName('todo-app__total')[0];
        total_left.textContent = left + ' left';
        // check whether remove controler
        if(globalThis.total_item === 0){
            close_controller();
        }
    };

};

function add_item(event){
    if(event.keyCode === 13){
        let todo = document.getElementById('todo-list');
        // renew item num
        globalThis.total_item += 1;
        let list_item = new to_do().rnode;
        todo.appendChild(list_item);
        //globalThis.All_set.appendChild(list_item);
        if (globalThis.total_item == 1)
            show_controler();
        // renew total
        let left = (globalThis.total_item - globalThis.finished_item).toString(10);
        let total_left = document.getElementById('todo-footer').getElementsByClassName('todo-app__total')[0];
        total_left.textContent = left + ' left';
    }
};

function show_controler(){
        // controler
        let controler = document.createElement('footer');
        controler.className = 'todo-app__footer';
        controler.id = 'todo-footer';
        // controler's buttons
        let total = document.createElement('div');
        total.className = 'todo-app__total';
        // number of left
        total.textContent = '1 left';
        controler.appendChild(total);
        let buttons = document.createElement('ul');
        buttons.className = 'todo-app__view-buttons';
        // 3 buttons
        let ALL = document.createElement('button');
        ALL.textContent = 'ALL';
        ALL.addEventListener('click', show_all);
        let Active = document.createElement('button');
        Active.textContent = 'Active';
        Active.addEventListener('click', show_active);
        let Completed = document.createElement('button');
        Completed.textContent = 'Completed';
        Completed.addEventListener('click', show_complete);
        buttons.appendChild(ALL);
        buttons.appendChild(Active);
        buttons.appendChild(Completed);
        controler.appendChild(buttons);
        let clean = document.createElement('div');
        clean.className = 'todo-app__clean';
        let Clear_completed = document.createElement('button');
        Clear_completed.textContent = 'Clear completed';
        Clear_completed.addEventListener('click', clear);
        clean.appendChild(Clear_completed);
        controler.appendChild(clean);
        let root = document.getElementById('root');        
        root.appendChild(controler);
};


function close_controller(){
    if(globalThis.total_item === 0){
        let root = document.getElementById('root');
        let controler = document.getElementById('todo-footer');        
        root.removeChild(controler);
    }
};
function clear(){
    let child = document.getElementById('todo-list').children;
    for (let i = 0; i < child.length; i++){
        if(child[i].finished == true){
            // remove this child
            //alert('!');
        }
    }
};

function show_all(){

};

function show_active(){

};

function show_complete(){
    
};

// main
let root = document.getElementById('root');
let main = document.createElement('section');
main.className='todo-app__main';
root.appendChild(main);

// input
let input = document.createElement('input');
input.className='todo-app__input';
input.placeholder = 'What needs to be done?';
main.appendChild(input);
    //add event listener
input.addEventListener('keydown', add_item);

// todo list
let todo_list = document.createElement('ul');
todo_list.className='todo-app__list';
todo_list.id='todo-list';
main.appendChild(todo_list);



