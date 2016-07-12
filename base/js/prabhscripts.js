
window.onload = function() {
	loadMenuItems();
}
function updatePrice (counterID,plus) {
	var itemPriceIndex=0;
	for(var i=0;i<ItemList.length;i++){
		if(counterID == ItemList[i][4]){
			itemPriceIndex=i;
			break;
		}
	}
	console.log("in updatePrice");
	totalAmount = document.getElementById("total-amount");
	console.log(ItemList[itemPriceIndex][2]);
	console.log(totalAmount);
	if(plus){
		totalAmount.innerHTML = +totalAmount.innerHTML + parseInt(ItemList[itemPriceIndex][2]);
	}else{
		totalAmount.innerHTML = +totalAmount.innerHTML - parseInt(ItemList[itemPriceIndex][2]);
	}
	console.log(totalAmount.innerHTML);
}

function addItem(counterID) {
	console.log(counterID);
	var itemCounter = document.getElementsByName(counterID)[0];
	itemCounter.firstChild.data = +itemCounter.firstChild.data + 1;
	updatePrice(counterID,true );
}

function removeItem(counterID) {
	var itemCounter = document.getElementsByName(counterID)[0];
	if (+itemCounter.firstChild.data > 1) {
		itemCounter.firstChild.data = +itemCounter.firstChild.data - 1;
		updatePrice(counterID,false );
	}else{
		document.getElementById("key"+counterID).remove();
		var index = ItemsInCartList.indexOf(counterID);
		if (index > -1) {
		    ItemsInCartList.splice(index, 1);
		    updatePrice(counterID,false);
		}
	}
}

function loadMenuItems() {
	console.log("in m");
	ItemList = [
		["Paneer Shahi ", "Mushroom sautéed with baby corn", "270", "V","dishID0"],
		["Shahi Korma", "onion, tomato, poppy seeds", "230", "N","dishID1"],
		["Corn Korma", "garlic cloves and spice", "170", "V","dishID2"],
		["Paneer Shahi and corn Korma", "Mushroom sautéed with baby corn", "270", "V","dishID3"],
		["Korma", "onion, tomato, poppy seeds", "230", "N","dishID4"],
		["Corn", "garlic cloves and spice", "170", "V","dishID5"]
	];

	for (let i = 0; i < ItemList.length; i++) {
		menuList = document.getElementById("menu-list");

		listItem = document.createElement("li");
		listItem.setAttribute("class", "media");

		stickerDiv = document.createElement("div");
		stickerDiv.setAttribute("class", "media-left");

		stickerImg = document.createElement("img");
		stickerImg.setAttribute("class", "media-object stickers");

		if (ItemList[i][3] == "V") {
			stickerImg.setAttribute("src", "./img/veg-sticker.png");
			stickerImg.setAttribute("alt", "veg");
		} else {
			stickerImg.setAttribute("src", "./img/non-veg-sticker.png");
			stickerImg.setAttribute("alt", "non-veg");
		}
		stickerDiv.appendChild(stickerImg);
		listItem.appendChild(stickerDiv);
		itemName = document.createElement("div");
		itemName.setAttribute("class", "media-body our-media-body");

		itemHeading = document.createElement("h4");
		itemHeading.setAttribute("class", "media-heading");
		if (ItemList[i][3] == "V") {
			itemHeading.setAttribute("role", "veg");
		} else {
			itemHeading.setAttribute("role", "nveg");
		}
		itemHeading.innerHTML = ItemList[i][0];

		addItemSymbol = document.createElement("button");
		addItemSymbol.setAttribute("class", "btn glyphicon glyphicon-plus add-button pull-right");
		addItemSymbol.setAttribute("id", ItemList[i][4]);
		addItemSymbol.setAttribute("onclick", "addToCart(id);");
		itemHeading.appendChild(addItemSymbol);

		priceTag = document.createElement("p");
		priceTag.setAttribute("class", "pull-right price-tag");
		priceTag.innerHTML = "₹ " + ItemList[i][2];
		itemHeading.appendChild(priceTag);

		itemName.appendChild(itemHeading);

		itemDescription = document.createElement("p");
		itemDescription.setAttribute("class", "our-menu-content");
		itemDescription.innerHTML = ItemList[i][1];
		itemName.appendChild(itemDescription);
		listItem.appendChild(itemName);

		menuList.appendChild(listItem);

		separator = document.createElement("li");
		separator.setAttribute("class", "divider our-divider");
		separator.setAttribute("role", "separator");
		menuList.appendChild(separator);
	}
}

function addToCart(i) {
	var btn = document.getElementById(i);
	var dishName = btn.parentNode.firstChild.data;
	var dishPrice = btn.parentNode.children[1].innerHTML;
	var dishType = btn.parentNode.attributes[1].textContent;
	var item = [];
	item.push(i,dishName, dishPrice, dishType);
	loadCartItems(item);
};

ItemsInCartList=[];

function checkItemsInTheCart(buttonID){
	if($.inArray(buttonID, ItemsInCartList) == -1) {
		ItemsInCartList.push(buttonID);
		return false;
	}
	else{
		addItem(buttonID);
		return true;
	}
};

function loadCartItems(ItemList) {
	if(!checkItemsInTheCart(ItemList[0])){
		addElementToCart(ItemList);
		updatePrice(ItemList[0],true);
	}
};
	

function addElementToCart(ItemList){
	
	cartItems = document.getElementById("cartItems");
	listItem = document.createElement("li");
	listItem.setAttribute("class", "media media-margin");
	listItem.setAttribute("id", "key"+ItemList[0]);

	plusMinusDiv = document.createElement("div");
	plusMinusDiv.setAttribute("class", "media-left btn-group-vertical cart-plus-minus-buttons-group");

	plusBtn = document.createElement("button");
	plusBtn.setAttribute("class", "btn cart-plus-minus-buttons");
	plusBtn.setAttribute("onclick", "addItem('" + ItemList[0] + "');");

	plusIcon = document.createElement("span");
	plusIcon.setAttribute("class", "glyphicon glyphicon-plus");
	plusBtn.appendChild(plusIcon);
	plusMinusDiv.appendChild(plusBtn);

	itemCounter = document.createElement("span");
	itemCounter.setAttribute("class", "item-counter");
	itemCounter.setAttribute("name", ItemList[0]);
	itemCounter.innerHTML = 1;
	plusMinusDiv.appendChild(itemCounter);


	minusBtn = document.createElement("button");
	minusBtn.setAttribute("class", "btn cart-plus-minus-buttons");
	minusBtn.setAttribute("onclick", "removeItem('"+ ItemList[0] + "');");

	minusIcon = document.createElement("span");
	minusIcon.setAttribute("class", "glyphicon glyphicon-minus");
	minusBtn.appendChild(minusIcon);
	plusMinusDiv.appendChild(minusBtn);

	listItem.appendChild(plusMinusDiv);
	itemName = document.createElement("div");
	itemName.setAttribute("class", "media-body our-media-body");

	itemHeading = document.createElement("h4");
	itemHeading.setAttribute("class", "media-heading");
	itemHeading.innerHTML = ItemList[1];

	stickerImg = document.createElement("img");
	stickerImg.setAttribute("class", "pull-right item-in-cart-sticker");

	if (ItemList[3] == "veg") {
		stickerImg.setAttribute("src", "./img/veg-sticker.png");
	} else {
		stickerImg.setAttribute("src", "./img/non-veg-sticker.png");
	}
	itemHeading.appendChild(stickerImg);

	priceTag = document.createElement("p");
	priceTag.setAttribute("class", "pull-right price-tag item-in-cart-price-tag");
	priceTag.innerHTML = ItemList[2];
	itemHeading.appendChild(priceTag);

	itemName.appendChild(itemHeading);
	listItem.appendChild(itemName);

	cartItems.appendChild(listItem);

	separator = document.createElement("li");
	separator.setAttribute("class", "divider our-divider");
	separator.setAttribute("role", "separator");
	cartItems.appendChild(separator);
}