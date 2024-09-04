let product = ["ぎょうざ","ぎょーざ","ギョウザ","餃子","アルティメット餃子"];   //商品名を格納
let price = [10,100,1000,10000,100000]; //値段を確認
let amount = [];
let menu = product.length;

Createmenu();
function Createmenu(){
    for(let i=0;i<menu;i++){
        let div = document.createElement("div");
        div.id = "menu";
        let productname = document.createTextNode(product[i]);
        div.appendChild(productname);
        let productprice = document.createTextNode("¥"+price[i]);
        div.appendChild(productprice);

        amount.push(0);

        let countdiv = document.createElement("div");
        countdiv.id = "count";
        div.appendChild(countdiv);

        let plus = document.createElement("span");
        plus.textContent = "＋";
        plus.id = i;
        plus.classList.add("plus");
        plus.addEventListener("click",function(event){
            increase(event.target.id);
        });
        countdiv.appendChild(plus);

        let count = document.createElement("input");
        count.id = "count"+i;
        count.classList.add("count");
        count.value = "0";
        count.addEventListener("input",function(event){
            change(event.target.id,event.target.value);
        });
        count.addEventListener("blur",function(event){
            if(event.target.value == "" || isNaN(event.target.value)){
                event.target.value = "0";
            }
            change(event.target.id,event.target.value);
        });
        countdiv.appendChild(count);

        let minus = document.createElement("span");
        minus.textContent = "ー";
        minus.id = i;
        minus.classList.add("minus");
        minus.addEventListener("click",function(event){
            decrease(event.target.id);
        });
        countdiv.appendChild(minus);


        document.body.appendChild(div);
    }
}

function increase(i){
    amount[i]++;
    update();
}

function decrease(i){
    if(0<amount[i]){
        amount[i]--;
    }
    update();
}

function change(i,value){
    if(0<=value){
        amount[i.slice(-1)] = value;
    }else{
        amount[i.slice(-1)] = 0;
    }
    update();
}

function update(){
    for(let i=0;i<menu;i++){
        document.getElementById("count"+i).value = amount[i];
    }
}