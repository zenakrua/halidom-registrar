//document.addEventListener("DOMContentLoaded", function (event) {

// initial
var db, x, i
var lang = document.documentElement.lang

// content elements
var nav = document.getElementsByClassName("nav")
var content = document.getElementsByTagName("content")[0]
var subcontent = document.getElementsByTagName("subcontent")[0]

// Initialize Firebase
var firebaseConfig = {
	// ...
	apiKey: "AIzaSyC4XwSfWKINC59fjQusX6ox_g-eWaUArIQ",
	authDomain: "new-alberia-census.firebaseapp.com",
	databaseURL: "https://new-alberia-census.firebaseio.com",
	projectId: "new-alberia-census",
	storageBucket: "new-alberia-census.appspot.com",
	messagingSenderId: "377724389599",
	appId: "1:377724389599:web:b79d509c26ded573"
}

firebase.initializeApp(firebaseConfig)
firebase
	.auth()
	.signInAnonymously()
	.catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code
		var errorMessage = error.message
		console.log(errorMessage + errorCode)
	})

//initialize the database
db = firebase.firestore()

for (i = 0; i < nav.length; i++) {
	nav[i].addEventListener("click", function () {
		var lookup = this.value
		switch (lookup) {
			case "adventurers":
				content.innerHTML = ""
				subcontent.innerHTML = ""
				fetchAdventurers()
				break
			case "weapons":
				content.innerHTML = ""
				subcontent.innerHTML = "weapons"
				break
			case "wyrmprints":
				content.innerHTML = ""
				subcontent.innerHTML = "wyrmprints"
				break
			case "dragons":
				content.innerHTML = ""
				subcontent.innerHTML = "dragons"
				break
			case "halidom":
				content.innerHTML = ""
				subcontent.innerHTML = "halidom"
				break
			case "home":
				content.innerHTML = ""
				subcontent.innerHTML = "HOME PAGE SHIT"
				break
			default:
				content.innerHTML = ""
				subcontent.innerHTML = "No data."
		}
	})
}

var name, element, elementID, rarity, adventurer

// elemental orbs
var eleOrb1, eleOrb2, eleOrb3

// dragon scales
var dragonScale1, dragonScale2

// skills
var skill1, skill2

// hp
var hp01,
	hp02,
	hp03,
	hp04,
	hp11,
	hp12,
	hp13,
	hp14,
	hp21,
	hp22,
	hp23,
	hp24,
	hp31,
	hp32,
	hp33,
	hp41,
	hp42

// strength
var str01,
	str02,
	str03,
	str11,
	str12,
	str13,
	str14,
	str15,
	str21,
	str22,
	str23,
	str31,
	str32,
	str33,
	str34,
	str41

// abilities
var ability11,
	ability11Might,
	ability12,
	ability12Might,
	ability21,
	ability21Might,
	ability22,
	ability22Might,
	ability31,
	ability31Might,
	ability32,
	ability32Might

// coabilities
var coability1,
	coability1Might,
	coability2,
	coability2Might,
	coability3,
	coability3Might,
	coability4,
	coability4Might,
	coability5,
	coability5Might

function fetchAdventurers() {
	db.collection("Adventurers")
		.get()
		.then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				var adventurerName = document.createElement("button")
				var name = doc.data().FullName[lang]
				// collected = adventurers.find(findID, id, variation)
				adventurerName.classList.add("adventurer")
				adventurerName.setAttribute("elementID", doc.data().ElementID)
				adventurerName.setAttribute("rarity", doc.data().Rarity)
				adventurerName.setAttribute("collected", "1")
				adventurerName.id = doc.data().ID
				adventurerName.setAttribute("variant", doc.data().Variant)
				adventurerName.innerHTML += name
				adventurerName.addEventListener("click", function () {
					fetchAdventurer(doc.data().FullName[lang])
				})
				content.innerHTML = "<h4>Adventurers</h4>"
				content.appendChild(adventurerName)
			})
		})
}

function fetchAdventurer(name) {
	db.collection("Adventurers")
		.doc(name)
		.get()
		.then(function (doc) {
			var circleTables = document.createElement("div")
			circleTables.setAttribute("id", "circleTables")

			subcontent.appendChild(circleTables)

			var adventurerTitle = document.createElement("h2")
			adventurerTitle.innerHTML = doc.data().Title[lang]
			var adventurerName = document.createElement("h1")
			adventurerName.innerHTML = name
			circleTables.appendChild(adventurerTitle)
			circleTables.appendChild(adventurerName)

			manaCircles(doc.data())
		})
		.catch(function (error) {
			console.log("Error getting Adventurer data:", error)
		})
}

// calcStats([circle number, node number, stat keyname, stat type (hp, str, etc.)])
function calcStats(circle, node, stat, type) {
	switch (circle) {
		case 0:
			if (type === "HP") {
				var mod = 4
				var div = 4
				var plus = 1
			} else if (type === "Strength") {
				var mod = 3
				var div = 3
				var plus = 1
			}
			break
		case 1:
			if (type === "HP") {
				var mod = 4
				var div = 4
				var plus = 1
			} else if (type === "Strength") {
				var mod = 5
				var div = 5
				var plus = 1
			}
			break
		case 2:
			if (type === "HP") {
				var mod = 4
				var div = 4
				var plus = 1
			} else if (type === "Strength") {
				var mod = 3
				var div = 3
				var plus = 1
			}
			break
		case 3:
			if (type === "HP") {
				var mod = 3
				var div = 3
				var plus = 1
			} else if (type === "Strength") {
				var mod = 4
				var div = 4
				var plus = 1
			}
			break
		case 4:
			if (type === "HP") {
				var mod = 2
				var div = 2
				var plus = 1
			} else if (type === "Strength") {
				var mod = 1
				var div = 1
				var plus = 1
			}
			break
		default:
			return "Unknown circle number."
	}
	if (node <= stat % mod) {
		return parseInt(stat / div + plus)
	} else {
		return parseInt(stat / div)
	}

}

function manaCircles(adventurer) {
	hp01 = calcStats(0, 1, adventurer.PlusHp0, "HP")
	hp02 = calcStats(0, 2, adventurer.PlusHp0, "HP")
	hp03 = calcStats(0, 3, adventurer.PlusHp0, "HP")
	hp04 = calcStats(0, 4, adventurer.PlusHp0, "HP")
	hp11 = calcStats(1, 1, adventurer.PlusHp1, "HP")
	hp12 = calcStats(1, 2, adventurer.PlusHp1, "HP")
	hp13 = calcStats(1, 3, adventurer.PlusHp1, "HP")
	hp14 = calcStats(1, 4, adventurer.PlusHp1, "HP")
	hp21 = calcStats(2, 1, adventurer.PlusHp2, "HP")
	hp22 = calcStats(2, 2, adventurer.PlusHp2, "HP")
	hp23 = calcStats(2, 3, adventurer.PlusHp2, "HP")
	hp24 = calcStats(2, 4, adventurer.PlusHp2, "HP")
	hp31 = calcStats(3, 1, adventurer.PlusHp3, "HP")
	hp32 = calcStats(3, 2, adventurer.PlusHp3, "HP")
	hp33 = calcStats(3, 3, adventurer.PlusHp3, "HP")
	hp41 = calcStats(4, 1, adventurer.PlusHp4, "HP")
	hp42 = calcStats(4, 2, adventurer.PlusHp4, "HP")
	str01 = calcStats(0, 1, adventurer.PlusAtk0, "Strength")
	str02 = calcStats(0, 2, adventurer.PlusAtk0, "Strength")
	str03 = calcStats(0, 3, adventurer.PlusAtk0, "Strength")
	str11 = calcStats(1, 1, adventurer.PlusAtk1, "Strength")
	str12 = calcStats(1, 2, adventurer.PlusAtk1, "Strength")
	str13 = calcStats(1, 3, adventurer.PlusAtk1, "Strength")
	str14 = calcStats(1, 4, adventurer.PlusAtk1, "Strength")
	str15 = calcStats(1, 5, adventurer.PlusAtk1, "Strength")
	str21 = calcStats(2, 1, adventurer.PlusAtk2, "Strength")
	str22 = calcStats(2, 2, adventurer.PlusAtk2, "Strength")
	str23 = calcStats(2, 3, adventurer.PlusAtk2, "Strength")
	str31 = calcStats(3, 1, adventurer.PlusAtk3, "Strength")
	str32 = calcStats(3, 2, adventurer.PlusAtk3, "Strength")
	str33 = calcStats(3, 3, adventurer.PlusAtk3, "Strength")
	str34 = calcStats(3, 4, adventurer.PlusAtk3, "Strength")
	str41 = calcStats(4, 1, adventurer.PlusAtk4, "Strength")
	skill1 = adventurer.Skill1.FullName[lang]
	skill2 = adventurer.Skill2.FullName[lang]
	ability11 = adventurer.Abilities11.FullName[lang]
	ability12 = adventurer.Abilities12.FullName[lang]
	ability21 = adventurer.Abilities21.FullName[lang]
	ability22 = adventurer.Abilities22.FullName[lang]
	ability31 = adventurer.Abilities31.FullName[lang]
	ability32 = adventurer.Abilities32.FullName[lang]
	coability1 = adventurer.ExAbilityData1.FullName[lang]
	coability2 = adventurer.ExAbilityData2.FullName[lang]
	coability3 = adventurer.ExAbilityData3.FullName[lang]
	coability4 = adventurer.ExAbilityData4.FullName[lang]
	coability5 = adventurer.ExAbilityData5.FullName[lang]

	if (adventurer.NodeMap === "0501") {
		var nodes = [
			["Unbind", "Unbind", "Unbind", "Unbind", "Unbind"],
			["HP +" + hp04, "New Skill " + skill2 + " Lv. 1", "HP +" + hp24, "Strength +" + str34, "Upgrade Ability " + ability32],
			["Strength +" + str03, "Strength +" + str15, "New Ability " + ability31, "HP +" + hp33, "HP +" + hp42],
			["New Ability " + ability11, "HP +" + hp13, "Strength +" + str22, "Upgrade Force Strike", "Damascus Crystal"],
			["HP +" + hp03, "Strength +" + str14, "HP +" + hp23, "Strength +" + str33, "Strength +" + str41],
			[
				"New Adventurer Story",
				"New Adventurer Story",
				"New Adventurer Story",
				"HP +" + hp32,
				"Upgrade Co-ability " + coability2
			],
			["HP +" + hp02, "Strength +" + str13, "HP +" + hp22, "Strength +" + str32, "Upgrade Co-ability " + coability3],
			["Force Strike", "HP +" + hp12, "Upgrade Ability " + ability12, "Upgrade Ability " + ability22, "Upgrade Skill " + skill1 + " Lv. 3"],
			["Strength +" + str01, "Strength +" + str12, "Strength +" + str21, "HP +" + hp31, "Upgrade Co-ability " + coability4],
			["HP +" + hp01, "New Adventurer Story", "HP +" + hp21, "Strength +" + str31, "Upgrade Co-ability " + coability5],
			["New Ability " + ability21, "Strength +" + str11, "Upgrade Skill " + skill1 + " Lv. 2", "Upgrade Skill " + skill2 + " Lv. 2", "HP +" + hp41]
		]
	}

	// add circle filters
	var circleList = document.createElement("p")
	var circlenum = 1

	for (i = 1; i <= 5; i++) {
		var circleListing = document.createElement("button")
		circleListing.classList.add("circle", adventurer.ElementID)
		circleListing.innerHTML = "Circle " + i
		circleListing.value = i
		circleList.appendChild(circleListing)
		circleListing.addEventListener("click", function () {
			var circle = this.value
			var nodeTables = document.getElementsByTagName("table")
			for (i = 0; i < nodeTables.length; i++) {
				if (nodeTables[i].getAttribute("circle") === circle) {
					nodeTables[i].style.display = "table"
				} else if (nodeTables[i].getAttribute("circle") !== circle) {
					nodeTables[i].style.display = "none"
				}
			}
		})
	}

	var circleTables = document.getElementById("circleTables")
	circleTables.appendChild(circleList)

	while (circlenum <= 5) {
		// add node tables
		for (i = 1; i <= 10; i++) {
			// generate node table skeletons
			var nodeTable = document.createElement("table")
			nodeTable.setAttribute("circle", circlenum)
			nodeTable.setAttribute("node", i)
			if (circlenum !== 1) {
				nodeTable.style.display = "none"
			}
			var nodeTHead = document.createElement("thead")
			nodeTable.appendChild(nodeTHead)
			var nodeHeaderRow = nodeTHead.insertRow(0)
			nodeTHead.setAttribute("elementID", adventurer.ElementID)
			nodeHeaderRow.setAttribute("id", "nodeHeaderRow")
			var nodeHeader = document.createElement("th")
			nodeHeader.setAttribute("id", "nodeHeader")
			var nodeHeading = document.createElement("span")
			nodeHeading.setAttribute("id", "nodeHeading")
			var rewardHeading = document.createElement("span")
			rewardHeading.setAttribute("id", "rewardHeading")
			nodeHeading.innerHTML = i
			rewardHeading.innerHTML = nodes[i][circlenum - 1]
			nodeHeaderRow.appendChild(nodeHeader)
			nodeHeader.appendChild(nodeHeading)
			nodeHeader.appendChild(rewardHeading)

			var nodeTBody = document.createElement("tbody")

			nodeTable.appendChild(nodeTBody)

			circleTables.appendChild(nodeTable)
		}
		circlenum++
	}

	fetchMaterials(adventurer)
}

function fetchMaterials(adventurer) {

	eleOrb1 = ["Flame Orb", "Water Orb"];
	eleOrb2 = ["Blaze Orb", "Stream Orb"];
	eleOrb3 = ["Inferno Orb", "Deluge Orb"];
	dragonScale1 = ["Flamewyrm's Scale", "Waterwyrm's Scale"];
	dragonScale2 = ["Flamewyrm's Scaldscale", "Waterwyrm's Glistscale"]


	switch (elementID) {
		// Wind
		case 3:
			eleOrb1 = "Wind Orb"
			eleOrb2 = "Storm Orb"
			eleOrb3 = "Maelstrom Orb"
			dragonScale1 = "Windwyrm's Scale"
			dragonScale2 = "Windwyrm's Squallscale"
			break
		// Light
		case 4:
			eleOrb1 = "Light Orb"
			eleOrb2 = "Radiance Orb"
			eleOrb3 = "Refulgence Orb"
			dragonScale1 = "Lightwyrm's Scale"
			dragonScale2 = "Lightwyrm's Glowscale"
			break
		// Shadow
		case 5:
			eleOrb1 = "Shadow Orb"
			eleOrb2 = "Nightfall Orb"
			eleOrb3 = "Nether Orb"
			dragonScale1 = "Shadowwyrm's Scale"
			dragonScale2 = "Shadowwyrm's Darkscale"
			break
		default:
			eleOrb1 = "Unknown Orb"
			eleOrb2 = "Unknown Orb"
			eleOrb3 = "Unknown Orb"
			dragonScale1 = "Unknown Scale"
			dragonScale2 = "Unknown Scale"
			break
	}

	if (adventurer.NodeMap === "0501") {
		var nodes = [
			["Unbind", "Unbind", "Unbind", "Unbind", "Unbind"],
			["HP +" + hp04, "New Skill " + skill2 + " Lv. 1", "HP +" + hp24, "Strength +" + str34, "Upgrade Ability " + ability32],
			["Strength +" + str03, "Strength +" + str15, "New Ability " + ability31, "HP +" + hp33, "HP +" + hp42],
			["New Ability " + ability11, "HP +" + hp13, "Strength +" + str22, "Upgrade Force Strike", "Damascus Crystal"],
			["HP +" + hp03, "Strength +" + str14, "HP +" + hp23, "Strength +" + str33, "Strength +" + str41],
			[
				"New Adventurer Story",
				"New Adventurer Story",
				"New Adventurer Story",
				"HP +" + hp32,
				"Upgrade Co-ability " + coability2
			],
			["HP +" + hp02, "Strength +" + str13, "HP +" + hp22, "Strength +" + str32, "Upgrade Co-ability " + coability3],
			["Force Strike", "HP +" + hp12, "Upgrade Ability " + ability12, "Upgrade Ability " + ability22, "Upgrade Skill " + skill1 + " Lv. 3"],
			["Strength +" + str01, "Strength +" + str12, "Strength +" + str21, "HP +" + hp31, "Upgrade Co-ability " + coability4],
			["HP +" + hp01, "New Adventurer Story", "HP +" + hp21, "Strength +" + str31, "Upgrade Co-ability " + coability5],
			["New Ability " + ability21, "Strength +" + str11, "Upgrade Skill " + skill1 + " Lv. 2", "Upgrade Skill " + skill2 + " Lv. 2", "HP +" + hp41]
		]
	}
}

//})
