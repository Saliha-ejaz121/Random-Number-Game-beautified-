
import React from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, View, Image, StatusBar } from "react-native";

export default function App() {
  const [getText, setText] = useState("0");
  const [getmsg, setmsg] = useState("");
  const [chances, setChances] = useState(5);
  const [score, setscore] = useState(0);
  const [getRandom, setRandom] = useState(Number.parseInt(Math.random() * 10));
  const [totalattempts, settotalattempts] = useState(0);
  const [totalwrongattempts, settotalwrongattempts] = useState(0);
  const [totalcorrectattempts, settotalcorrectattempts] = useState(0);
  const [getRound, setRound] = useState(1);
  const [nextroundmodel, setnextroundmodel] = useState(0);

  // Reset the hooks and variables
  const reset = () => {
    setmsg("");
    setText(0);
    setChances(5);
    setRound(1);
    setscore(0);
    settotalattempts(0);
    settotalcorrectattempts(0);
    settotalwrongattempts(0);
    setnextroundmodel(1);
    setRandom(Number.parseInt(Math.random() * 10));
  };


  // Returns the specific screen after each round ends
  const nextRound = (score) => {
    setRound(getRound + 1);
    if (getRound >= 3) {
      setnextroundmodel(2);
      return <EndGameView />;
    }
     else {
      setnextroundmodel(3);
      return <OnNextRoundView />;
    }
  };


  // called as soon as any number is pressed
  const buttonClick = (txt) => {
    settotalattempts(totalattempts + 1);
    setText(txt);
    checkMatch(txt);
  };

  // checks if the user has entered correct input or not
  const checkMatch = (txt) => { 
    // correct match
    if (txt == getRandom) {
      setmsg("Correct!");
      settotalcorrectattempts(totalcorrectattempts + 1);
      var s = score + 10;
      setscore(s);
      setChances(5);
      setRandom(Number.parseInt(Math.random() * 10));
      nextRound(s);
      return <OnNextRoundView />;
    } 
    //incorrect match
    else {
      setmsg("Wrong Guess!");
      settotalwrongattempts(totalwrongattempts + 1);
      setChances(chances - 1);
    }
    //chances finished
    if (chances < 1) {
      alert(
        "you ran out of chances!\n total attempts : " +
          totalattempts +
          "\n wrong attempts: " +
          totalwrongattempts +
          "\n correct attempts : " +
          totalcorrectattempts
      );
      reset();
    }
  };
  const resetGame = () => {
    reset();
  }; 

  //Calculating Hint 
  const Hint = () => {
    setscore(score - 2);
    var lower = getRandom - 2;
    var upper = getRandom + 2;
    if (lower < 0) lower = 0;
    if (upper > 9) upper = 9;
    alert(`the actual guess is between ${lower} and ${upper}`);
  };

  //return sthe specific View on the basis of nextroundmodel hook
  const screenSwitching = () => {
    if (nextroundmodel === 0)
      return <StartGameView LetsBegin={() => setnextroundmodel(1)} />;
    else if (nextroundmodel === 2)
      return <EndGameView LetsBegin={() => setnextroundmodel(-1)} />;
    else if (nextroundmodel === 3) return <OnNextRoundView />;
    else return <GameView />;
  };
  //  the actual game view
  const GameView = () => {
    return (
      <View style={styles.container}>
        <Text
          style={styles.Title}
        >
          Guess a Number!
        </Text>
        <StatusBar style="auto" />
        <Text style={{ fontSize: 50, paddingTop: 20 }}>{getText}</Text>
        <Text style={{ fontSize: 20, paddingTop: 30, color: "green" }}>
          {getmsg}
        </Text>
        <Text style={{ fontSize: 20, paddingTop: 10, color: "#a12a73" }}>
          Score : {score}
        </Text>
        <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
          <Text
            style={{ fontSize: 20, paddingTop: 20, color: "rgb(255, 0, 102)" }}
          >
            Chances left : {chances}
          </Text>
          
          <Text
            style={{
              fontSize: 20,
              paddingTop: 20,
              color: "#9849b3",
              marginLeft: 50,
            }}
          >
            Round : {getRound}
          </Text>
        </View>
        <View
          style={styles.BtnTile}
        >
          <Button
            style={{ width: "10", margin: 10 }}
            color="red"
            title="reset"
            onPress={resetGame.bind(this)}
          ></Button>
          <Button
            style={{ width: "10", margin: 10 }}
            color="#e69d20"
            title="Hint"
            onPress={Hint.bind(this)}
          ></Button>
        </View>

        <View style={styles.numericpad}>
          <View style={styles.numericbtnrow}>
            <View style={{ width: 60 }}>
              <Button title="1" onPress={buttonClick.bind(this, 1)}></Button>
            </View>
            <View style={styles.secondbtn}>
              <Button title="2" onPress={buttonClick.bind(this, 2)}></Button>
            </View>
            <View style={styles.secondbtn}>
              <Button title="3" onPress={buttonClick.bind(this, 3)}></Button>
            </View>
          </View>
          <View style={styles.numericbtnrow}>
            <View style={{ width: 60 }}>
              <Button title="4" onPress={buttonClick.bind(this, 4)}></Button>
            </View>
            <View style={styles.secondbtn}>
              <Button title="5" onPress={buttonClick.bind(this, 5)}></Button>
            </View>
            <View style={styles.secondbtn}>
              <Button title="6" onPress={buttonClick.bind(this, 6)}></Button>
            </View>
          </View>
          <View style={styles.numericbtnrow}>
            <View style={{ width: 60 }}>
              <Button title="7" onPress={buttonClick.bind(this, 7)}></Button>
            </View>
            <View style={styles.secondbtn}>
              <Button title="8" onPress={buttonClick.bind(this, 8)}></Button>
            </View>
            <View style={styles.secondbtn}>
              <Button title="9" onPress={buttonClick.bind(this, 9)}></Button>
            </View>
          </View>
              <View style={{width: 60, marginLeft: 115 , marginTop : 10}}>
            <Button title="0" onPress={buttonClick.bind(this, 0)}></Button>
          </View>
        </View>
      </View>
    );
  };
  // start of the game view
  const StartGameView = () => {
    return (
      <View>
        <Image
          source={require("./assets/icon.png")}
          style={styles.Iconstyles}
        />
        <Text style={{ textAlign: "center", fontSize: 20 , paddingBottom : 20 }}>
         Guess a Number Game
        </Text>
        <Button title="Lets Play" onPress={() => reset()} />
      </View>
    );
  };

  // End of the game view
  const EndGameView = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.FinalMessage}>Game Finished!🥇</Text>
        <Text style={styles.ScoreBoard}>
          {`Total Attempts : ${totalattempts}
      \n Wrong Attempts: ${totalwrongattempts}
      \n Correct Attempts : ${totalcorrectattempts} 
      \n Your Score : ${score}
      \n Round Number : ${getRound}`}
        </Text>
        <Button
          title="Restart"
          color="green"
          onPress={() => {
            setnextroundmodel(0);
          }}
        />
      </View>
    );
  };

  // End of a round view
  const OnNextRoundView = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.FinalMessage}>
          {`Congratulations! 🥳\n you have passed Round ${getRound - 1}`}
        </Text>
        <Text style={styles.ScoreBoard}>
          {`Your Score :${score}
                   \n total attempts : ${totalattempts} 
                   \n wrong attempts: ${totalwrongattempts}
                    \n correct attempts : ${totalcorrectattempts}`}
        </Text>
        <View
          style={styles.BtnTile}
        >
          <Button
            title="Restart"
            color="green"
            onPress={() => {
              setnextroundmodel(0);
            }}
          />
          <Button
            title="Next Level ➡"
            color="purple"
            onPress={() => setnextroundmodel(1)}
          />
        </View>
      </View>
    );
  };

  return <View style={styles.container}>{screenSwitching()}</View>;
}


//styles
const styles = StyleSheet.create({
  Title : {
    fontSize: 30,
    color: "rgb(49, 79, 89)",
    backgroundColor: "rgb(166, 224, 245)",
    padding: 10,
    borderColor : '#4f7f8f',
    borderWidth : 0.5,
    borderRadius : 10
  } ,
  numericbtnrow : { 
    flexDirection: "row", margin: 10
   },
   secondbtn : { 
     width: 60, marginLeft: 45
     },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  numericpad: {
    paddingTop: 50,
    flex: 1,
  },
  ScoreBoard: {
    fontSize: 15,
    color: "rgb(49, 79, 89)",
    backgroundColor: "rgb(166, 224, 245)",
    padding: 15,
    borderBottomColor: "#6dafc9",
    borderBottomWidth: 2,
    borderRadius: 2,
    marginBottom: 20,
  },
  FinalMessage: {
    alignSelf: "center",
    marginBottom: 20,
    color: "#207548",
    fontSize: 20,
    textAlign: "center",
    marginTop: 0,
    paddingBottom: 30,
  },
  Iconstyles :{
    width: 270,
    height: 200,
    alignSelf: "center",
    marginBottom: 40,
  } , 
  BtnTile : {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
    paddingTop: 20,
  }
});
