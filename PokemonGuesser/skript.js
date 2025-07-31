let selectedPokemonStats;

$(document).ready(function () {
    // In selectedPokemon steht nun das zufällig ausgewählte Pokémon
    selectedPokemonStats = selectRandomPokemon();
});


function selectRandomPokemon() {
    // Zufälliges Pokémon wird ausgewählt
    const index = Math.floor(Math.random() * pokedex.length);
    return pokedex[index];
}


function compareGuessToSelectedPokemon(guessedPokemonName) {
    // Pokémon basierend auf dem Namen suchen
    const guessedPokemon = pokedex.find(
        p => p.name.toLowerCase() === guessedPokemonName.toLowerCase()
    );

    if (guessedPokemon) {
        if (guessedPokemonName.toLowerCase() !== selectedPokemonStats.name.toLowerCase()) {
            for (let i = 0; i < 5; i++) {
                
                if (i === 4) {
                    if (inRange(guessedPokemon.data[i], selectedPokemonStats.data[i], 10)) {
                        $("#box" + i).css("background-color", "#0d6645");
                        addGuessedValueToBox(selectedPokemonStats.data[i], i);
                    }
                } else if (guessedPokemon.data[i] === selectedPokemonStats.data[i]) {
                    if (i === 0 || i === 1) {
                        addGuessedValueToBox(firstLetterToUppercase(guessedPokemon.data[i]), i);
                        $("#box" + i).css("background-color", "#0d6645");
                    }else {
                        addGuessedValueToBox(selectedPokemonStats.data[i], i);
                        $("#box" + i).css("background-color", "#0d6645");
                    }
                }

            }

            let current = parseInt($("#guessesLeftNumber").text() - 1);

            if (current > 0) {
                $("#guessesLeftNumber").text(current);
                addGuessToHistory(guessedPokemonName);
            } else {
                alert("You have no guesses left, Game Over");
                $("#guessesLeftNumber").text(0);
            }

        } else {
            alert("richtiges Pokémon geraten");

            for (let i = 0; i < 5; i++) {

                if (i === 0 || i === 1) {
                    addGuessedValueToBox(firstLetterToUppercase(guessedPokemon.data[i]), i);
                    $("#box" + i).css("background-color", "#0d6645");
                }else {
                    addGuessedValueToBox(selectedPokemonStats.data[i], i);
                    $("#box" + i).css("background-color", "#0d6645");
                }

            }

            $("#answerRightPokemonOrHint").text(
                firstLetterToUppercase(guessedPokemonName) + " was the answer!"
            );
            $("#enterGuess").prop("disabled", true);
        }

    } else {
        alert("Pokémon ist nicht in der Liste");
    }
}


function clearInputField() {
    if ($("#enterGuess").val() !== "") {
        const guessedPokemonName = $("#enterGuess").val().trim();
        compareGuessToSelectedPokemon(guessedPokemonName);
        $("#enterGuess").val("");
    } else {
        alert("invalid Name");
    }
}

function addGuessToHistory(guess) {
    $('#oldGuesses').append('<div class="oldGuess">' + guess.toUpperCase() + '</div>');
}

function inRange(value, target, range) {
    return Math.abs(value - target) <= range;
}

function addGuessedValueToBox(rightStat, i) {
    if (rightStat === "null") {
        $("#box" + i).text("Keinen");
    } else {
        $("#box" + i).text(rightStat);
    }
}

function firstLetterToUppercase(givenWord) {
    var firstLetter = givenWord.charAt(0).toUpperCase();
    var rest = givenWord.substring(1);
    return firstLetter + rest;
}

function addHint() {
    var currrentNumberOfTakenHints = parseInt($("#hintsTakenNumber").text());
    $("#hintsTakenNumber").text(currrentNumberOfTakenHints + 1);
    
    giveHint(currrentNumberOfTakenHints);
}


function giveHint(hint) {
    
    if(hint === 0) {
        var hintText1 = "Das Pokemon beginnt mit: " + selectedPokemonStats.name.charAt(0).toUpperCase();
        displayHint(hintText1);

    } else if(hint === 1) {
        var hintText2 = "Zweiter Buchstabe: " + selectedPokemonStats.name.charAt(1).toUpperCase();
        displayHint(hintText2);

    }else if(hint === 2) {
        var hintText3 = "Das Pokemon endet mit: " + selectedPokemonStats.name.charAt(selectedPokemonStats.name.length - 1).toUpperCase();
        displayHint(hintText3);

    }else if(hint === 3){

        for (let i = 0; i < 5; i++) {
            if(!($("#box" + i).css('background-color') === 'rgb(13, 102, 69)')) {
                $("#box" + i).css("background-color", "#0d6645");
                addGuessedValueToBox(firstLetterToUppercase(selectedPokemonStats.data[i]), i);
                if(i === 0 || i === 1) {
                    hintText4 = "Der Typ: " + firstLetterToUppercase(selectedPokemonStats.data[i]) + " wurde aufgedeckt";
                }else if(i === 2) {
                    hintText4 = "Die Entwicklungsstufe " + firstLetterToUppercase(selectedPokemonStats.data[i]) + " wurde aufgedeckt";
                }else if(i === 3) {
                    hintText4 = "Die Generation " + firstLetterToUppercase(selectedPokemonStats.data[i]) + " wurde aufgedeckt";
                }else if(i === 4) {
                    hintText4 = "Das Gewicht von " + firstLetterToUppercase(selectedPokemonStats.data[i]) + "kg wurde aufgedeckt";
                }
                displayHint(hintText4);
                break;
            }
        }

    }else if(hint === 4) {
        hintText5 = "Gibs auf";
        $('#hintButton').prop('disabled', true);
    }
}

function displayHint(hintText) {
        $("#answerRightPokemonOrHint").text(hintText);
        $('#hintHistoryItems').append('<div class="hintHistoryItemAdded">' + hintText + '</div>');
}

