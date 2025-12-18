const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify readline question
function ask(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  let input;
  
  // Intro
  let seenIntroOne = false;
  let seenIntroTwo = false;
  let inventory = [];
  let keys = [];
  
  console.log("You wake up in an unfamiliar shack. You don't remember much of the past few days - got drunk with a few friends and decided to wander into the woods to get some fresh air away from the campfire. You suppose someone found you and brought you here. You feel something restricting your wrist.\n");
  console.log("[Type in the number of the option given to you to choose it. To see available options again, type \"actions\". If you're not asked for input, press enter to see the next section.]\n");
  console.log("1. Look around\n2. Examine yourself\n");
  
  input = (await ask("Input: ")).toLowerCase();
  
  // SECTION 1
  while(true) {
    if(input === "1") {
      console.log("\nThe shack is well lit with the still burning fireplace. The windows show only a blizzard. On the bedside table you see some food, as well as a fork and a knife. How nice of them.\n");
      seenIntroOne = true;
      if(seenIntroTwo === true) {
        console.log("The knife seems somewhat sharp. The same can't be said about whoever left you here. You take the knife and start cutting the rope...\n");
        await ask("");
        break;
      }
    }
    else if(input === "2") {
      console.log("You seemed to be tied with a rope to the leg of the bed you're laying on. Not the best first impression of whoever found you. You think you should probably try to avoid an in-person meeting with them.\n");
      seenIntroTwo = true;
      if(seenIntroOne === true) {
        console.log("Wait, wasn't there a knife nearby? You wonder if it could cut the rope.\n");
      }
    }
    else if(input === "actions" || input === "action" || input === "help") {
      console.log("Available actions:\n1. Look around\n2. Examine yourself\n");
    }
    else if(input === "exit") {
      console.log("SECTION EXITED");
      break;
    }
    else {
      console.log("Not an option.\n");
    }
    input = (await ask("Input: ")).toLowerCase();
  }
  
  console.log("After some time you manage to free yourself. The wind is howling outside. The blizzard seems to have worsened since you got here. Even if you get out of the house, you would need some supplies to simply not die of the cold, not to mention even finding your way. You think you can \"borrow\" some stuff from this property before their owner comes back, whenever that is...\n");
  await ask("");
  
  // SECTION 2: THE HOUSE
  console.log("SECTION 2: THE HOUSE\n");
  let time = Math.floor(Math.random() * 31) + 10;
  let reachedExit = false;
  let survivalPoints = 0;
  let actions = "\nAvailable actions:\n\"Look\" - [5 min] find a few items in the current room, can be repeated.\n\"Move\" - Choose a room to move to. \n\"Trap\" - [10 min] Place a trap in the current room. Traps slow down anyone who is unaware of them. If you have items you can use to make traps, making one can take less time\n\"Inventory\" - Check to see what your inventory contains.\n\"Keys\" - Check what keys you have.";
  
  let room = "bedroom";
  let bedroomCheck = 0;
  let officeCheck = 0;
  let trophyCheck = 0;
  let kitchenCheck = 0;
  let officeUnlocked = false;
  let trophyUnlocked = false;
  let entranceUnlocked = false;
  let officeSeen = false;
  let corridorSeen = false;
  let kitchenSeen = false;
  let entranceSeen = false;
  let trophySeen = false;
  let bedroomTrap = 0;
  let officeTrap = 0;
  let corridorTrap = 0;
  let kitchenTrap = 0;
  let trophyTrap = 0;
  let entranceTrap = 0;
  let makingTrap = false;
  
  console.log("Now that you're not tied to the bed, you can gather your surrounding better. There are two doors leading out of the room. One of them is labeled \"Office\". It seems to be locked. The other is unlabeled and unlocked.\n");
  inventory.push("food");
  inventory.push("Small knife");
  console.log("(Tutorial: You have a certain amount of time before the host returns. You do not know how much that is. You can spend this time [min] to do certain actions. To see what you can do, type \"actions\")");
  
  while(time > 0) {
    input = (await ask("Input: ")).toLowerCase();
    
    if(input === "look") {
      if(room === "bedroom") {
        if(bedroomCheck === 0) {
          console.log("You have found an entrance key, lighter, and some firewood. You cannot get firewood yet, because you need rope to tie it so that you can carry it.");
          console.log("If you have rope and want to take the firewood, look for an available action in this room.");
          console.log("Other than that, you think you found everything here.\n");
          keys.push("entrance key");
          inventory.push("lighter");
          bedroomCheck++;
          time -= 5;
          survivalPoints += 1;
        }
        else {
          console.log("Nothing to look for here. (No time used up)\n");
        }
      }
      else if(room === "office") {
        if(officeCheck === 0) {
          console.log("You have found a trophy room key, a fishing rod and bait. You feel like you have missed some things... Maybe you should have a look again sometime?\n");
          keys.push("trophy room key");
          inventory.push("fishing rod");
          inventory.push("bait");
          officeCheck++;
          time -= 5;
          survivalPoints += 2;
        }
        else if(officeCheck === 1) {
          console.log("You have found a few blank pieces of paper, a map of the surrounding area, and a firearm locker key. You think you found everything here.\n");
          inventory.push("paper");
          inventory.push("map of the surroundings");
          keys.push("firearm locker key");
          officeCheck++;
          time -= 5;
          survivalPoints += 3;
        }
        else {
          console.log("Nothing to look for here. (No time used up)\n");
        }
      }
      else if(room === "trophy") {
        if(trophyCheck === 0) {
          console.log("You have found a firearm locker, but you're goint to need to use a key in your actions to unlock it...");
          console.log("You have also found a taxidermied fox! Sure, not a very surprising find in this room, but something about it seems very... entrancing...");
          console.log("After staring at it for a straight minute, you break out of it. Whatever this thing actually is, you think you can use it for a trap or distraction.\n");
          inventory.push("taxidermied fox?");
          trophyCheck++;
          time -= 6;
        }
        else {
          console.log("Nothing to look for here. (No time used up)\n");
        }
      }
      else if(room === "kitchen") {
        if(kitchenCheck === 0) {
          console.log("You have found an office key, and a sharp knife. You feel like you have missed some things... Maybe you should have a look again sometime?\n");
          inventory.push("sharp knife");
          keys.push("office key");
          kitchenCheck++;
          time -= 5;
          survivalPoints += 2;
        }
        else if(kitchenCheck === 1) {
          process.stdout.write("You have found some bottled water and raw meat. ");
          if(!inventory.includes("firewood")) {
            console.log("The meat will be useless if you dont have any firewood to cook it on though. You think you found everything here.\n");
          }
          else {
            console.log("You think you could cook it with the firewood you found.\n");
            survivalPoints += 2;
          }
          inventory.push("bottled water");
          inventory.push("raw meat");
          kitchenCheck++;
          time -= 5;
          survivalPoints += 1;
        }
        else {
          console.log("Nothing to look for here. (No time used up)\n");
        }
      }
      else {
        console.log("Nothing to look for here. (No time used up)\n");
      }
    }
    else if(input === "actions" || input === "action" || input === "help") {
      console.log(actions);
      if(room === "bedroom") {
        if(inventory.includes("sharp knife")) {
          console.log("\"Rope\" - [1min] Cut off some of the rope. Now that you have a sharper knife, you can do it quicker.");
        }
        else {
          console.log("\"Rope\" - [5min] Cut off some of the rope. Useful, but will take a while to cut with such a small knife.");
        }
        if(bedroomCheck === 1) {
          console.log("\"Firewood\" - [3min] get the firewood. Rope is needed to tie it together if you want to carry it.");
        }
        if(keys.includes("office key")) {
          console.log("\"Unlock\" - [0min] Unlock the office and make it available to move to.");
        }
      }
      else if(room === "corridor" && keys.includes("trophy room key")) {
        console.log("\"Unlock\" - [0min] Unlock the trophy room and make it available to move to.");
      }
      else if(room === "trophy" && keys.includes("firearm locker key") && trophyCheck === 1) {
        console.log("\"Unlock\" - [0min] Unlock the firearm locker and take what's inside.");
      }
      else if(room === "entrance" && keys.includes("entrance key")) {
        console.log("\"Unlock\" - [0min] Unlock the entrance door and make the outside available to move to.");
      }
    }
    else if(input === "move") {
      console.log("\nChoose a room to move to:");
      console.log("Stay");
      if(room === "bedroom") {
        console.log("Corridor");
        if(officeUnlocked === true) {
          console.log("Office");
        }
      }
      else if(room === "office") {
        console.log("Bedroom");
      }
      else if(room === "corridor") {
        console.log("Bedroom\nEntrance room\nKitchen");
        if(trophyUnlocked === true) {
          console.log("Trophy room");
        }
      }
      else if(room === "entrance") {
        console.log("Corridor");
        if(entranceUnlocked === true) {
          console.log("Outside");
        }
      }
      else if(room === "kitchen" || room === "trophy") {
        console.log("Corridor");
      }
      else {
        console.log("You're not in a known room");
      }
      
      input = (await ask("\nInput: ")).toLowerCase();
      
      if(input === "stay") {
        console.log("You stayed in the same room.\n");
      }
      else if(input === "bedroom") {
        if(room === "bedroom" || room === "corridor" || room === "office") {
          console.log("You moved to the bedroom.\n");
          room = "bedroom";
        }
        else {
          console.log("Can't access it right now.\n");
        }
      }
      else if(input === "corridor") {
        if(room === "corridor" || room === "bedroom" || room === "trophy" || room === "kitchen" || room === "entrance") {
          console.log("You moved to the corridor.\n");
          if(corridorSeen === false) {
            console.log("The corridor is dark but not too long. Surprisingly empty too. Unless there are any secret compartments here, you doubt you could find anything worthwhile. There are four doors, all labeled. What is this person's deal with labeling rooms?\n");
            corridorSeen = true;
          }
          room = "corridor";
        }
        else {
          console.log("Can't access it right now.\n");
        }
      }
      else if(input === "office") {
        if(officeUnlocked === true && (room === "office" || room === "bedroom")) {
          console.log("You moved to the office.\n");
          if(officeSeen === false) {
            console.log("When you enter the room, the first things you notice are the strong smell of dust and mountains of papers scattered about. Many of them seem to be personal documents of various different people... There is also a variety of equipment for hunting and fishing. No guns though, sadly. There are no doors except for the one you entered through.\n");
            officeSeen = true;
          }
          room = "office";
        }
        else {
          console.log("Can't access it right now.\n");
        }
      }
      else if(input === "trophy room" || input === "trophy") {
        if(trophyUnlocked === true && (room === "trophy" || room === "corridor")) {
          console.log("You moved to the trophy room.\n");
          if(trophySeen === false) {
            console.log("Mounted animal heads. So many of them. You don't think there is an inch of a wall that doesn't have one or some other kind of hunting trophy. A few cabinets are placed haphazardly around the room, as well as pedestals with full-body taxidermied animals. Even the chandelier is made of deer antlers. You can't tell if the host absolutely loves or hates animals, but they seem to feel very strongly about it.\n");
            trophySeen = true;
          }
          room = "trophy";
        }
        else {
          console.log("Can't access it right now.\n");
        }
      }
      else if(input === "kitchen") {
        if(room === "kitchen" || room === "corridor") {
          console.log("You moved to the kitchen.\n");
          if(kitchenSeen === false) {
            console.log("A normal kitchen - fridge, counters, a sink, some cabinets. There is a strong smell of raw meat, so you doubt you will find anything else here.\n");
            kitchenSeen = true;
          }
          room = "kitchen";
        }
        else {
          console.log("Can't access it right now.\n");
        }
      }
      else if(input === "entrance" || input === "entrance room") {
        if(room === "entrance" || room === "corridor") {
          console.log("You moved to the entrance room.\n");
          if(entranceSeen === false) {
            console.log("It is quite barren, but not the the same extent the corridor is. There are a few chairs, a table, and a chandelier at least. You notice that the only window in the room has a circular pattern of cracks on it, almost like a spiderweb. It seems it has been shot at once, and has turned out bullet proof. You think it is safe to assume that all of the other windows are reinforced too, meaning that the only exit is the door here.");
            console.log("You try the handle of the front door. It's locked. Sadly, it seems your captor actually does have some sense in them. You push a chair up against it. Just in case.\n");
            entranceSeen = true;
          }
          room = "entrance";
        }
        else {
          console.log("Can't access it right now.\n");
        }
      }
      else if(input === "outside" || input === "out") {
        console.log("You got out of the house.\n");
        reachedExit = true;
        break;
      }
      else {
        console.log("Not an available room\n");
      }
    }
    else if(input === "inventory") {
      console.log(inventory);
    }
    else if(input === "keys" || input === "key") {
      console.log(keys);
    }
    else if(input === "unlock") {
      if(room === "bedroom" && keys.includes("office key")) {
        console.log("Office unlocked\n");
        officeUnlocked = true;
      }
      else if(room === "corridor" && keys.includes("trophy room key")) {
        console.log("Trophy room unlocked\n");
        trophyUnlocked = true;
      }
      else if(room === "trophy" && keys.includes("firearm locker key")) {
        console.log("Firearm locker unlocked\n Inside is a loaded rifle. You pick up the rifle. You feel safer.");
        inventory.push("loaded rifle");
      }
      else if(room === "entrance" && keys.includes("entrance key")) {
        console.log("Entrance door unlocked");
        entranceUnlocked = true;
      }
      else console.log("Nothing to unlock.");
    }
    else if(input === "trap" || input === "traps") {
      console.log("Setting a trap takes 10 minutes. If you have items that can be used for a trap, however, it will take only 3 minutes, at the cost of the item.\n");
      console.log("Items available for trap making: ");
      if(inventory.includes("rope")) console.log("Rope");
      if(inventory.includes("taxidermied fox?")) console.log("taxidermied fox?");
      if(inventory.includes("sharp knife")) console.log("sharp knife");
      if(inventory.includes("fishing rod")) console.log("fishing rod");
      if(inventory.includes("bottled water")) console.log("bottled water");
      if(!(inventory.includes("rope") || inventory.includes("taxidermied fox?") || inventory.includes("sharp knife") || inventory.includes("fishing rod") || inventory.includes("bottled water"))) {
        console.log("No items found");
      }
      
      makingTrap = true;
      input = (await ask("If you'd like to use any of these items, type a name here. Otherwise, type none. \nInput: ")).toLowerCase();
      
      if(input === "rope" && inventory.includes("rope")) {
        inventory.splice(inventory.indexOf("rope"), 1);
        console.log("You have used the rope for a trap.");
        time -= 3;
      }
      else if((input === "taxidermied fox" || input === "fox") && inventory.includes("taxidermied fox?")) {
        inventory.splice(inventory.indexOf("taxidermied fox?"), 1);
        console.log("You have used the taxidermied fox for a trap.");
        time -= 3;
      }
      else if(input === "sharp knife" && inventory.includes("sharp knife")) {
        inventory.splice(inventory.indexOf("sharp knife"), 1);
        console.log("You have used the sharp knife for a trap.");
        time -= 3;
      }
      else if(input === "fishing rod" && inventory.includes("fishing rod")) {
        inventory.splice(inventory.indexOf("fishing rod"), 1);
        console.log("You have used the fishing rod for a trap.");
        time -= 3;
      }
      else if((input === "bottled water" || input === "water") && inventory.includes("bottled water")) {
        inventory.splice(inventory.indexOf("bottled water"), 1);
        console.log("You have used the bottled water for a trap.");
        time -= 3;
      }
      else if(input === "none") {
        console.log("You have set a trap.");
        time -= 10;
      }
      else {
        console.log("Not a valid option.");
        makingTrap = false;
      }
      
      if(makingTrap === true) {
        if(room === "bedroom") bedroomTrap++;
        if(room === "corridor") corridorTrap++;
        if(room === "office") officeTrap++;
        if(room === "trophy") trophyTrap++;
        if(room === "kitchen") kitchenTrap++;
        if(room === "entrance") entranceTrap++;
        makingTrap = false;
      }
    }
    else if(input === "rope") {
      if(inventory.includes("sharp knife")) {
        console.log("You cut the rope with the sharp knife.");
        inventory.push("rope");
        time -= 1;
      }
      else {
        console.log("You cut the rope with the small knife.");
        inventory.push("rope");
        time -= 5;
      }
    }
    else if((input === "firewood" || input === "fire wood") && room === "bedroom" && inventory.includes("rope")) {
      console.log("You tied the firewood together with the rope. Now you can carry it.");
      inventory.push("firewood");
    }
    else if(input === "exit") {
      console.log("SECTION EXITED");
      break;
    }
    else if(input === "moretime") {
      time = 360;
      console.log("Time set to 360. Don't forget to call the host ;)\n");
    }
    else if(input === "points") {
      try {
        survivalPoints = parseInt(await ask("Set survival points: "));
      } catch(e) {}
    }
    else {
      console.log("Not an option.\n");
    }
  }
  
  await ask("");
  
  // SECTION 3
  if(reachedExit === false) {
    console.log("Right as you finished doing this, you hear someone try to open the entrance door, the chair you set up blocking their way. It seems you are out of time. You need to get out of here. Although… maybe you are able to put up a fight with the host?");
    console.log("SECTION 3: THE HOST\n");
    console.log("(Tutorial: You start before the host. On your turn, you can use two available actions, including moving to a different room (the actions have changed. To see the new actions, type \"actions\".) Either reach the entrance room and try your chances at surviving outside with what you have, or fight the host. If you manage to defeat them, you are guaranteed to survive the wilderness.");
    console.log("If the host notices you being in the same room as them, they will injure you. Injuries lower your chances of traversing the wilderness alive, but you get one more action immediately after receiving one. Talk about adrenaline!)\n");
  }
  
  const hostPath = ["entrance","corridor","bedroom","office","bedroom","corridor","kitchen","corridor","trophy","corridor"];
  actions = "\nAvailable actions:\n\"Move\" - Choose a room to move to. \n\"Inventory\" - Check to see what your inventory contains.\n\"Keys\" - Check what keys you have.\n\"Attack\" - Attack the host with a weapon. If you manage to kill the host, you gain a 100% chance of surviving the wilderness.";
  actions = actions.concat("\n\"Hide\" - Hide from the host. At first they won't notice you, but every time they return to a room, there's a greater chance you will be found.\n\"Wait\" - Skip one action.");
  
  let playerActions = 2;
  let hostRoom = "none";
  let turn = 0;
  let injuries = 0;
  let hiding = false;
  let repeat = false;
  let hostStall = 0;
  let hostHealth = 10;
  let rifleUsed = false;
  let sharpKnifeEquipped = false;
  let smallKnifeEquipped = false;
  
  if(reachedExit === false) {
    while(true) {
      while(playerActions > 0) {
        input = (await ask("Input: ")).toLowerCase();
        
        if(input === "actions" || input === "action" || input === "help") {
          console.log(actions);
        }
        else if(input === "move") {
          console.log("\nChoose a room to move to:");
          console.log("Stay");
          if(room === "bedroom") {
            console.log("Corridor");
            if(officeUnlocked === true) {
              console.log("Office");
            }
          }
          else if(room === "office") {
            console.log("Bedroom");
          }
          else if(room === "corridor") {
            console.log("Bedroom\nEntrance room\nKitchen");
            if(trophyUnlocked === true) {
              console.log("Trophy room");
            }
          }
          else if(room === "entrance") {
            console.log("Corridor");
            if(entranceUnlocked === true) {
              console.log("Outside");
            }
          }
          else if(room === "kitchen" || room === "trophy") {
            console.log("Corridor");
          }
          else {
            console.log("You're not in a known room");
          }
          
          input = (await ask("\nInput: ")).toLowerCase();
          
          if(input === "stay") {
            console.log("You stayed in the same room. No actions taken.\n");
          }
          else {
            hiding = false;
            if(input === "bedroom") {
              if(room === "corridor" || room === "office") {
                console.log("You moved to the bedroom.\n");
                room = "bedroom";
                playerActions -= 1;
              }
              else {
                console.log("Can't access it right now.\n");
              }
            }
            else if(input === "corridor") {
              if(room === "bedroom" || room === "trophy" || room === "kitchen" || room === "entrance") {
                console.log("You moved to the corridor.\n");
                if(corridorSeen === false) {
                  console.log("The corridor is dark but not too long. Surprisingly empty too. Unless there are any secret compartments here, you doubt you could find anything worthwhile. There are four doors, all labeled. What is this person's deal with labeling rooms?\n");
                  corridorSeen = true;
                }
                room = "corridor";
                playerActions -= 1;
              }
              else {
                console.log("Can't access it right now.\n");
              }
            }
            else if(input === "office") {
              if(officeUnlocked === true && room === "bedroom") {
                console.log("You moved to the office.\n");
                if(officeSeen === false) {
                  console.log("When you enter the room, the first things you notice are the strong smell of dust and mountains of papers scattered about. Many of them seem to be personal documents of various different people... There is also a variety of equipment for hunting and fishing. No guns though, sadly. There are no doors except for the one you entered through.\n");
                  officeSeen = true;
                }
                room = "office";
                playerActions -= 1;
              }
              else {
                console.log("Can't access it right now.\n");
              }
            }
            else if(input === "trophy room" || input === "trophy") {
              if(trophyUnlocked === true && room === "corridor") {
                console.log("You moved to the trophy room.\n");
                if(trophySeen === false) {
                  console.log("Mounted animal heads. So many of them. You don't think there is an inch of a wall that doesn't have one or some other kind of hunting trophy. A few cabinets are placed haphazardly around the room, as well as pedestals with full-body taxidermied animals. Even the chandelier is made of deer antlers. You can't tell if the host absolutely loves or hates animals, but they seem to feel very strongly about it.\n");
                  trophySeen = true;
                }
                room = "trophy";
                playerActions -= 1;
              }
              else {
                console.log("Can't access it right now.\n");
              }
            }
            else if(input === "kitchen") {
              if(room === "corridor") {
                console.log("You moved to the kitchen.\n");
                if(kitchenSeen === false) {
                  console.log("A normal kitchen - fridge, counters, a sink, some cabinets. There is a strong smell of raw meat, so you doubt you will find anything else here.\n");
                  kitchenSeen = true;
                }
                room = "kitchen";
                playerActions -= 1;
              }
              else {
                console.log("Can't access it right now.\n");
              }
            }
            else if(input === "entrance" || input === "entrance room") {
              if(room === "corridor") {
                console.log("You moved to the entrance room.\n");
                if(entranceSeen === false) {
                  console.log("It is quite barren, but not the the same extent the corridor is. There are a few chairs, a table, and a chandelier at least. You notice that the only window in the room has a circular pattern of cracks on it, almost like a spiderweb. It seems it has been shot at once, and has turned out bullet proof. You think it is safe to assume that all of the other windows are reinforced too, meaning that the only exit is the door here.");
                  console.log("You try the handle of the front door. It's locked. Sadly, it seems your captor actually does have some sense in them. You push a chair up against it. Just in case.\n");
                  entranceSeen = true;
                }
                room = "entrance";
                playerActions -= 1;
              }
              else {
                console.log("Can't access it right now.\n");
              }
            }
            else if(input === "outside" || input === "out") {
              console.log("You get out of the house.\n");
              reachedExit = true;
              break;
            }
            else {
              console.log("Not an available room\n");
            }
            if(room === hostRoom) {
              console.log("As you open the door you see a tall figure searching around the room.");
              break;
            }
          }
        }
        else if(input === "hide") {
          if(room !== "corridor") {
            console.log("You are now hiding.");
            hiding = true;
            playerActions -= 1;
          }
          else console.log("Nowhere to hide here.(no actions taken)");
        }
        else if(input === "attack") {
          if(room === hostRoom) {
            if(rifleUsed === false && inventory.includes("loaded rifle")) {
              console.log("\nYou take out the rifle. You didn't notice it before, but it is a single shot rifle. You can only shoot once.\nNevertheless you point it at the host and pull the trigger. In such a small range, you were practically guaranteed to hit.");
              console.log("The host is greatly wounded. They are also stalled for one turn.");
              hostHealth -= 7;
              rifleUsed = true;
              playerActions -= 1;
            }
            else if(inventory.includes("sharp knife")) {
              if(sharpKnifeEquipped === false) {
                console.log("\nYou pull out the sharp knife. It feels nice in your hand. You can't be sure you will hit the host but the chances are good.");
                sharpKnifeEquipped = true;
              }
              process.stdout.write("You use the knife and ");
              if(Math.floor(Math.random() * 101) >= 50) {
                process.stdout.write("manage to hit the host!");
                hostHealth -= 3;
                if(hostHealth > 0) {
                  console.log("\nThey are wounded and stalled for one turn.");
                  hostStall += 1;
                  playerActions -= 1;
                }
                else {
                  console.log("They stop moving.");
                  break;
                }
              }
              else {
                console.log("miss!");
                playerActions -= 1;
              }
            }
            else {
              if(smallKnifeEquipped === false) {
                console.log("\nYou pull out the small knife. It feels awkward in your hand. You can't be sure you will hit the host.");
                smallKnifeEquipped = true;
              }
              process.stdout.write("You use the knife and ");
              if(Math.floor(Math.random() * 101) >= 75) {
                process.stdout.write("manage to hit the host!");
                hostHealth -= 2;
                if(hostHealth > 0) {
                  console.log("\nThey are wounded and stalled for one turn.");
                  hostStall += 1;
                  playerActions -= 1;
                }
                else {
                  console.log("They stop moving.");
                  break;
                }
              }
              else {
                console.log("miss!");
                playerActions -= 1;
              }
            }
          }
          else console.log("\nNo one to attack.(no actions taken)");
        }
        else if(input === "wait") {
          console.log("You waited.");
          playerActions -= 1;
        }
        else if(input === "inventory") {
          console.log(inventory);
        }
        else if(input === "keys" || input === "key") {
          console.log(keys);
        }
        else if(input === "exit") {
          console.log("SECTION EXITED");
          break;
        }
        else if(input === "points") {
          try {
            survivalPoints = parseInt(await ask("Set survival points: "));
          } catch(e) {}
        }
        else {
          console.log("Not an option.\n");
        }
      }
      
      if(reachedExit === true) break;
      
      if(hostHealth > 0) {
        console.log("End of your turn... The host is acting.");
        playerActions = 2;
        
        if(hostRoom === "bedroom" && bedroomTrap !== 0) {
          console.log("The host set off a trap!");
          hostStall++;
          bedroomTrap -= 1;
        }
        else if(hostRoom === "office" && officeTrap !== 0) {
          console.log("The host set off a trap!");
          hostStall++;
          officeTrap -= 1;
        }
        else if(hostRoom === "corridor" && corridorTrap !== 0) {
          console.log("The host set off a trap!");
          hostStall++;
          corridorTrap -= 1;
        }
        else if(hostRoom === "trophy" && trophyTrap !== 0) {
          console.log("The host set off a trap!");
          hostStall++;
          trophyTrap -= 1;
        }
        else if(hostRoom === "kitchen" && kitchenTrap !== 0) {
          console.log("The host set off a trap!");
          hostStall++;
          kitchenTrap -= 1;
        }
        else if(hostRoom === "entrance" && entranceTrap !== 0) {
          console.log("The host set off a trap!");
          hostStall++;
          entranceTrap -= 1;
        }
        
        if(hostStall === 0) {
          if(room === hostRoom && hiding === true) {
            if(repeat === false) console.log("You manage to avoid the host. Their eyes don't fall on your hiding spot.");
            else {
              if(Math.floor(Math.random() * 50) > 65) {
                console.log("Your hiding spot fails");
                hiding = false;
              }
              else console.log("You manage to avoid the host. Their eyes don't fall on your hiding spot.");
            }
          }
          if(room === hostRoom && hiding === false) {
            console.log("You are noticed and the figure quickly moves toward you and attacks you! You feel a burst of pain and adrenaline.(You gain an aditional action for 1 turn)");
            playerActions += 1;
            injuries += 1;
            if(injuries > 5) break;
          }
          else {
            hostRoom = hostPath[turn];
            turn++;
            if(turn === 10) {
              turn = 0;
              repeat = true;
            }
          }
        }
        else {
          console.log("The host is stalled. They will not act right now.");
          hostStall -= 1;
        }
      }
      else {
        survivalPoints = 69;
        console.log("You did it. The host is dead now... You gather everything that can be useful in their house and leave as soon as you can.");
        break;
      }
    }
  }
  
  if(injuries > 5) {
    console.log("\nEverything hurts... You've been hit too many times. Your vision darkens...");
    console.log("(You lost... Better luck next time!)");
  }
  else {
    console.log("You feel the crunch of snow beneath your feet. You start running. Each step takes you further away from the house, and into the unknown.");
    
    // SECTION 4
    let success = false;
    survivalPoints -= injuries;
    
    if(Math.floor(Math.random() * 101) <= (survivalPoints * 10)) {
      success = true;
    }
    
    if(success === true) {
      console.log("After some time, you take a break. The resources you gathered keeping you alive. For the next few days, you continue moving through the forest, and finally find a small populated town. You are safe now.\n");
      console.log("(Congradulations! You won!)");
    }
    else {
      process.stdout.write("After a day or so of walking, you realize you do not enough supplies for the next few days");
      if(injuries > 0) console.log(", and your injuries don't help either.");
      console.log(". You hope that maybe you'll find help sooner than you run out of them, but as the days go by and the resources dwindle there is nothing but trees and snow in sight. You do not have the energy to keep going.");
      console.log("(You lost... Better luck next time!)");
    }
  }
  
  rl.close();
}

main().catch(err => {
  console.error(err);
  rl.close();
});
