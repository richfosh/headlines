const headlinesArray = [];
const rssGuardian = 'https://www.theguardian.com/uk/rss';		
const proxyUrlGuardian = 'https://corsproxy.io/?';
const rssMail = 'https://www.dailymail.co.uk/news/index.rss';	
const proxyUrlMail = 'https://corsproxy.io/?';
const summaryArray = [];
let resultArray = [];
let progress = 1;
let score = 0;
let rando = 0;
let qs = 10;

getHeadLines(); // gets RSS feeds and sets up headlinesArray
//console.log(headlinesArray.length);

//this code creates an array of ten unique numbers
function tenNums(){
//let resultArray = [];
while (resultArray.length < 11) {
    let randomNum = Math.floor(Math.random() * headlinesArray.length) + 1;
		if (!resultArray.includes(randomNum)) {
			resultArray.push(randomNum);
		}
	}
	//console.log(headlinesArray.length);
	//console.log(resultArray);
}

function start() { // the start button function
	clear("top");
	if (progress == 1){
		tenNums();
	}
	document.getElementById("top").insertAdjacentHTML("beforeend", `<h3>${progress} of ${qs}</h3>`);
	
	//rando = Math.floor(Math.random() * headlinesArray.length);
	rando = resultArray[progress-1];
	const head = headlinesArray[rando].title;
	
	document.getElementById("top").insertAdjacentHTML("beforeend", `<h3><em>"${head}"</em></h3>`);	
	createButtonSelect();	
	finish();	
	//console.log(rando);
	progress++;
}

function finish() { // after each guess check for last question and if so display result
	if (progress > qs) {
		clear("top");
		clear("buttons");
		let comment, emoji;

		switch (score) {
			case 0: comment = "Oh dear - back to The Beano for you"; emoji = "😭 💔 🌧️"; break;
			case 1: comment = "Have you read either paper?"; emoji = "😢 🫤 ☔"; break;
			case 2: comment = "Hmmm... at least you got 2"; emoji = "😞 🍂 🌧"; break;
			case 3: comment = "That's not too bad"; emoji = "😕 🌫️ 💭"; break;
			case 4: comment = "A valiant effort"; emoji = "😐 🕰️ 🍵"; break;
			case 5: comment = "Fifty fifty - have another go"; emoji = "🙂 🌤️ 🌷"; break;
			case 6: comment = "Pretty good"; emoji = "😊 🍀 ☀️"; break;
			case 7: comment = "Nice!"; emoji = "😁 🎈 🎶"; break;
			case 8: comment = "You know your headlines"; emoji = "😆 🎉 🍰"; break;
			case 9: comment = "Wow - amazing"; emoji = "🤩 ✨ 🌟"; break;
			case 10: comment = "Perfect - do you work in Fleet Street?"; emoji = "🤗 🌈 💫"; break;
		}

		document.getElementById("top").insertAdjacentHTML("beforeend",`<h3>You scored ${score} out of ${qs}</h3> <span style='font-size: 30px;'>${emoji}</span>`);
		document.getElementById("top").insertAdjacentHTML("beforeend", `<h3>${comment}</h3><hr>`);

		const output = document.getElementById("top");

		// Display detailed summary
		summaryArray.forEach((headline, index) => {
			const scoreLine = document.createElement("h3");
			scoreLine.textContent = `${index + 1} - ${headline.result}`;

			const chose = document.createElement("p");
			chose.textContent = `You chose: "${headline.newspaper}"`;

			const link = document.createElement("a");
			link.href = headline.link;
			link.target = "_blank";
			link.textContent = `"${headline.head}"`;
			link.style.textDecoration = "none";
			link.style.fontStyle = "italic";

			output.appendChild(scoreLine);
			output.appendChild(chose);
			output.appendChild(link);
			output.appendChild(document.createElement("hr"));
		});	

		createButtonNew();
	}	
}

function guarSel() {	// called by Guardian button
	if (headlinesArray[rando].source === "g") {
		document.getElementById("top").insertAdjacentHTML("beforeend", "<h2>CORRECT!!</h2>");
		document.getElementById("top").insertAdjacentHTML("beforeend", "<span style='font-size: 60px;'>😀</span>");	
		score++;
		summaryArray.push({
			head: headlinesArray[rando].title,
			link: headlinesArray[rando].link,
			newspaper: "The Guardian",
			result: "Correct ✅"
		});
	} else {
		document.getElementById("top").insertAdjacentHTML("beforeend", "<h2>UNLUCKY!!</h2>");
		document.getElementById("top").insertAdjacentHTML("beforeend", "<span style='font-size: 60px;'>😢</span>");
		summaryArray.push({
			head: headlinesArray[rando].title,
			link: headlinesArray[rando].link,
			newspaper: "The Guardian",
			result: "Incorrect ❌"
		});
	}
	clear("buttons");
	setTimeout(start, 2000);
}

function mailSel() { // called by Daily Mail button
	if (headlinesArray[rando].source === "m") {
		document.getElementById("top").insertAdjacentHTML("beforeend", "<h2>CORRECT!!</h2>");
		document.getElementById("top").insertAdjacentHTML("beforeend", "<span style='font-size: 60px;'>😀</span>");
		score++;
		summaryArray.push({
			head: headlinesArray[rando].title,
			link: headlinesArray[rando].link,
			newspaper: "The Daily Mail",
			result: "Correct ✅"
		});
	} else {
		document.getElementById("top").insertAdjacentHTML("beforeend", "<h2>UNLUCKY!!</h2>");
		document.getElementById("top").insertAdjacentHTML("beforeend", "<span style='font-size: 60px;'>😢</span>");
		summaryArray.push({
			head: headlinesArray[rando].title,
			link: headlinesArray[rando].link,
			newspaper: "The Daily Mail",
			result: "Incorrect ❌"
		});
	}
	clear("buttons");
	setTimeout(start, 2000);
}

function newGo() { // starts a new go at end of game :-)
	location.reload();
}

function createButtonNew() { // creates button to play again
	const btn = document.createElement("button");
	btn.textContent = "Another Go?";
	btn.onclick = newGo;
	document.getElementById("buttons").appendChild(btn);
}

function createButtonSelect() { // creates the two buttons
	const guar = document.createElement("button");
	guar.textContent = "The Guardian";
	guar.onclick = guarSel;
	guar.style.marginRight = "10px";
	guar.style.marginBottom = "10px";

	const mail = document.createElement("button");
	mail.textContent = "The Daily Mail";
	mail.onclick = mailSel;
	mail.style.marginRight = "10px";

	const container = document.getElementById("buttons");
	container.appendChild(guar);
	container.appendChild(mail);
}

function clear(myDiv) { // clears chosen div 
	document.getElementById(myDiv).innerHTML = "";
}

function getHeadLines() {
	//const seenTitles = new Set(); // track duplicates

	fetch(proxyUrlGuardian + rssGuardian)
		.then(response => response.text())
		.then(str => {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(str, "text/xml");
			const items = xmlDoc.querySelectorAll("item");

			items.forEach(item => {
				const titleTemp = item.querySelector("title").textContent.trim();
				const link = item.querySelector("link").textContent.trim();

				// Skip if title already seen or contains junk text
				//if (!seenTitles.has(titleTemp) && 
				    if(!titleTemp.includes("Guardian") && !titleTemp.includes("|")) {
					headlinesArray.push({
						source: "g",
						title: titleTemp,
						link: link
					});
					//seenTitles.add(titleTemp);
				}
			});
		});

	fetch(proxyUrlMail + rssMail)
		.then(response => response.text())
		.then(str => {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(str, "text/xml");
			const items = xmlDoc.querySelectorAll("item");

			items.forEach(item => {
				const titleTemp = item.querySelector("title").textContent.trim();
				const link = item.querySelector("link").textContent.trim();

				//if (!seenTitles.has(titleTemp) &&
					if(!titleTemp.includes("Mail") && !titleTemp.includes("MAIL")) {
					headlinesArray.push({
						source: "m",
						title: titleTemp,
						link: link
					});
					//seenTitles.add(titleTemp);
				}
			});
		});
}
