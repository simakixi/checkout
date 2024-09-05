let product = ["ぎょうざ","ギョウザ","餃子","スーパー餃子","アルティメット餃子","緑茶","綾鷹","お～いお茶","Monster","ドリンクセット"];   //商品名を格納
let price = [10,100,1000,10000,100000,100,500,200,1000,50000]; //値段を確認
let amount = [];
let menu = product.length;
let drink = 5;  //ドリンクが始まる要素番号
let set = 9;    //セットメニューが始まる要素番号

Createmenu();
function Createmenu(){
    let list = document.createElement("div");
    list.id = "list";
    document.body.appendChild(list);
    let title = document.createElement("h1");
    title.textContent = "メニュー";
    list.appendChild(title);
    title = document.createElement("h2");
    title.textContent = "料理";
    list.appendChild(title);
    for(let i=0;i<menu;i++){
        if(drink==i){
            title = document.createElement("h2");
            title.textContent = "ドリンク";
            list.appendChild(title);
        }else if(set==i){
            title = document.createElement("h2");
            title.textContent = "セットメニュー";
            list.appendChild(title);
        }
        let div = document.createElement("div");
        div.id = "menu";
        let productname = document.createElement("p");
        productname.textContent = product[i];
        div.appendChild(productname);        
        let productprice = document.createElement("p");
        productprice.textContent = price[i]+"円";
        productprice.id = "price";
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
                event.target.value = 0;
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

        list.appendChild(div);
    }
    let checkout = document.createElement("div");
    checkout.id = "checkout";
    list.appendChild(checkout);

    let totalprice = document.createElement("p");
    totalprice.textContent = "0円";
    totalprice.id = "total";
    checkout.appendChild(totalprice);

    let check = document.createElement("p");
    check.textContent = "お会計";
    check.id = "check";
    check.addEventListener("click",function(event){
        payment();
    });
    checkout.appendChild(check);
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
    let total = 0;
    for(let i=0;i<menu;i++){
        total += price[i]*amount[i];
    }
        document.getElementById("total").innerHTML = total+"円";
}

function payment(){
    document.getElementById("payment").classList.remove("hidden");
}

document.getElementById("close").onclick = function(){
    document.getElementById("payment").classList.add("hidden");
}