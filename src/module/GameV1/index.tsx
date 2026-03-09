import { useState } from "react";
import "./style.css";

type TButton = "tl" | "tc" | "tr" | "lc" | "m" | "rc" | "bl" | "bc" | "br";
type TPlayerS = {
  playerName: string;
  color: string;
};
type TMapSettings = {
  player: "1" | "2" | "";
  style: string;
  prevPlayer: "1" | "2" | "";
};
interface IGameConfig {
  playerOne: TPlayerS;
  playerTwo: TPlayerS;
  mapSettings: {
    tl: TMapSettings;
    tc: TMapSettings;
    tr: TMapSettings;
    lc: TMapSettings;
    m: TMapSettings;
    rc: TMapSettings;
    bl: TMapSettings;
    bc: TMapSettings;
    br: TMapSettings;
  };
  playersTurn: "1" | "2" | "";
}
import "./style.css";

const GameV1Page = () => {
  const [gameConfig, setGameConfig] = useState<IGameConfig>({
    playerOne: {
      playerName: "Player One",
      color: "#33b054",
    },
    playerTwo: {
      playerName: "Player two",
      color: "#6333b0",
    },
    mapSettings: {
      tl: { player: "", style: "", prevPlayer: "" },
      tc: { player: "", style: "", prevPlayer: "" },
      tr: { player: "", style: "", prevPlayer: "" },
      lc: { player: "", style: "", prevPlayer: "" },
      m: { player: "", style: "", prevPlayer: "" },
      rc: { player: "", style: "", prevPlayer: "" },
      bl: { player: "", style: "", prevPlayer: "" },
      bc: { player: "", style: "", prevPlayer: "" },
      br: { player: "", style: "", prevPlayer: "" },
    },
    playersTurn: "1",
  });

  const handleClick = (input: TButton) => {
    switch (input) {
      case "tl":
        if (checkPlay(gameConfig.playersTurn)) {
          setGameConfig((prev) => ({
            ...prev,
            playersTurn: getNextPlayer(prev.playersTurn),
            mapSettings: {
              ...prev.mapSettings,
              tl: { player: prev.playersTurn, style: "", prevPlayer: "" },
            },
          }));
        } else {
          if (validator("tl"))
            setGameConfig((prev) => ({
              ...prev,
              mapSettings: {
                ...prev.mapSettings,
                tl: { player: "", style: "", prevPlayer: prev.playersTurn },
              },
            }));
        }
        break;
      case "tr":
        if (checkPlay(gameConfig.playersTurn)) {
          setGameConfig((prev) => ({
            ...prev,
            playersTurn: getNextPlayer(prev.playersTurn),
            mapSettings: {
              ...prev.mapSettings,
              tr: { player: prev.playersTurn, style: "", prevPlayer: "" },
            },
          }));
        } else {
          if (validator("tr"))
            setGameConfig((prev) => ({
              ...prev,
              mapSettings: {
                ...prev.mapSettings,
                tr: { player: "", style: "", prevPlayer: prev.playersTurn },
              },
            }));
        }
        break;
      case "tc":
        if (checkPlay(gameConfig.playersTurn)) {
          setGameConfig((prev) => ({
            ...prev,
            playersTurn: getNextPlayer(prev.playersTurn),
            mapSettings: {
              ...prev.mapSettings,
              tc: { player: prev.playersTurn, style: "", prevPlayer: "" },
            },
          }));
        } else {
          if (validator("tc"))
            setGameConfig((prev) => ({
              ...prev,
              mapSettings: {
                ...prev.mapSettings,
                tc: { player: "", style: "", prevPlayer: prev.playersTurn },
              },
            }));
        }
        break;
      case "lc":
        if (checkPlay(gameConfig.playersTurn)) {
          setGameConfig((prev) => ({
            ...prev,
            playersTurn: getNextPlayer(prev.playersTurn),
            mapSettings: {
              ...prev.mapSettings,
              lc: { player: prev.playersTurn, style: "", prevPlayer: "" },
            },
          }));
        } else {
          if (validator("lc"))
            setGameConfig((prev) => ({
              ...prev,
              mapSettings: {
                ...prev.mapSettings,
                lc: { player: "", style: "", prevPlayer: prev.playersTurn },
              },
            }));
        }
        break;
      case "m":
        if (checkPlay(gameConfig.playersTurn)) {
          setGameConfig((prev) => ({
            ...prev,
            playersTurn: getNextPlayer(prev.playersTurn),
            mapSettings: {
              ...prev.mapSettings,
              m: { player: prev.playersTurn, style: "", prevPlayer: "" },
            },
          }));
        } else {
          if (validator("m"))
            setGameConfig((prev) => ({
              ...prev,
              mapSettings: {
                ...prev.mapSettings,
                m: { player: "", style: "", prevPlayer: prev.playersTurn },
              },
            }));
        }
        break;
      case "rc":
        if (checkPlay(gameConfig.playersTurn)) {
          setGameConfig((prev) => ({
            ...prev,
            playersTurn: getNextPlayer(prev.playersTurn),
            mapSettings: {
              ...prev.mapSettings,
              rc: { player: prev.playersTurn, style: "", prevPlayer: "" },
            },
          }));
        } else {
          if (validator("rc"))
            setGameConfig((prev) => ({
              ...prev,
              mapSettings: {
                ...prev.mapSettings,
                rc: { player: "", style: "", prevPlayer: prev.playersTurn },
              },
            }));
        }
        break;
      case "bl":
        if (checkPlay(gameConfig.playersTurn)) {
          setGameConfig((prev) => ({
            ...prev,
            playersTurn: getNextPlayer(prev.playersTurn),
            mapSettings: {
              ...prev.mapSettings,
              bl: { player: prev.playersTurn, style: "", prevPlayer: "" },
            },
          }));
        } else {
          if (validator("bl"))
            setGameConfig((prev) => ({
              ...prev,
              mapSettings: {
                ...prev.mapSettings,
                bl: { player: "", style: "", prevPlayer: prev.playersTurn },
              },
            }));
        }
        break;
      case "bc":
        if (checkPlay(gameConfig.playersTurn)) {
          setGameConfig((prev) => ({
            ...prev,
            playersTurn: getNextPlayer(prev.playersTurn),
            mapSettings: {
              ...prev.mapSettings,
              bc: { player: prev.playersTurn, style: "", prevPlayer: "" },
            },
          }));
        } else {
          if (validator("bc"))
            setGameConfig((prev) => ({
              ...prev,
              mapSettings: {
                ...prev.mapSettings,
                bc: { player: "", style: "", prevPlayer: prev.playersTurn },
              },
            }));
        }
        break;
      case "br":
        if (checkPlay(gameConfig.playersTurn)) {
          setGameConfig((prev) => ({
            ...prev,
            playersTurn: getNextPlayer(prev.playersTurn),
            mapSettings: {
              ...prev.mapSettings,
              br: { player: prev.playersTurn, style: "", prevPlayer: "" },
            },
          }));
        } else {
          if (validator("br"))
            setGameConfig((prev) => ({
              ...prev,
              mapSettings: {
                ...prev.mapSettings,
                br: { player: "", style: "", prevPlayer: prev.playersTurn },
              },
            }));
        }
        break;
      default:
        break;
    }
  };

  const getStyles = (input: TButton) => {
    const cell = gameConfig.mapSettings[input];

    if (!cell.player) {
      return { backgroundColor: "#d4d4d4" };
    }

    const color =
      cell.player === "1"
        ? gameConfig.playerOne.color
        : gameConfig.playerTwo.color;

    const baseStyle = {
      backgroundColor: color,
      width: "40px",
      height: "40px",
    };

    switch (input) {
      case "lc":
        return { ...baseStyle, top: "36%", left: "-14%" };

      case "m":
        return { ...baseStyle, top: "36%", left: "36%" };

      case "rc":
        return { ...baseStyle, top: "36%", left: "86%" };

      case "bl":
        return { ...baseStyle, left: "1%" };

      case "br":
        return { ...baseStyle, left: "85%" };

      default:
        return baseStyle;
    }
  };

  const checkPlay = (player: "1" | "2" | ""): boolean => {
    const count = Object.values(gameConfig.mapSettings).filter(
      (v) => v.player === player,
    ).length;

    return count < 3;
  };

  const validator = (position: TButton): boolean => {
    if (
      gameConfig.mapSettings[position].player !== gameConfig.playersTurn ||
      gameConfig.mapSettings[position].player === ""
    )
      return false;
    else return true;
  };

  const setChecker = (input: TButton, player: string): boolean => {
    const { tl, tc, tr, lc, m, rc, bl, bc, br } = gameConfig.mapSettings;
    switch (input) {
      case "tl":
        if (
          (tl.player === player &&
            tc.player === player &&
            tr.player === player) ||
          (tl.player === player &&
            lc.player === player &&
            bl.player === player) ||
          (tl.player === player && m.player === player && br.player === player)
        )
          return true;
        else return false;
      case "tc":
        if (
          (tl.player === player &&
            tc.player === player &&
            tr.player === player) ||
          (tc.player === player && m.player === player && bc.player === player)
        )
          return true;
        else return false;
      case "tr":
        if (
          (tl.player === player &&
            tc.player === player &&
            tr.player === player) ||
          (tr.player === player &&
            rc.player === player &&
            br.player === player) ||
          (tr.player === player && m.player === player && bl.player === player)
        )
          return true;
        else return false;
      case "lc":
        if (
          (lc.player === player &&
            tl.player === player &&
            bl.player === player) ||
          (lc.player === player && m.player === player && rc.player === player)
        )
          return true;
        else return false;
      case "m":
        if (
          (m.player === player &&
            tc.player === player &&
            bc.player === player) ||
          (m.player === player && rc.player === player && lc.player === player)
        )
          return true;
        else return false;
      case "rc":
        if (
          (rc.player === player &&
            m.player === player &&
            lc.player === player) ||
          (tr.player === player && rc.player === player && br.player === player)
        )
          return true;
        else return false;
      case "bl":
        if (
          (tl.player === player &&
            lc.player === player &&
            bl.player === player) ||
          (bl.player === player &&
            m.player === player &&
            tr.player === player) ||
          (bl.player === player && bc.player === player && br.player === player)
        )
          return true;
        else return false;
      case "bc":
        if (
          (bc.player === player &&
            m.player === player &&
            tc.player === player) ||
          (bc.player === player && bl.player === player && br.player === player)
        )
          return true;
        else return false;
      case "br":
        if (
          (br.player === player &&
            rc.player === player &&
            tr.player === player) ||
          (br.player === player &&
            m.player === player &&
            tl.player === player) ||
          (bc.player === player && bl.player === player && br.player === player)
        )
          return true;
        else return false;
      default:
        return false;
    }
  };

  return (
    <>
      <div className="player-card">
        {gameConfig.playersTurn === "1"
          ? gameConfig.playerOne.playerName + `'s turn`
          : gameConfig.playerTwo.playerName + `'s turn`}
      </div>
      <div className="main">
        <div className="box">
          <div
            className="circle top-left "
            onClick={() => handleClick("tl")}
            style={getStyles("tl")}
          ></div>
          <div
            className="circle top-center"
            onClick={() => handleClick("tc")}
            style={getStyles("tc")}
          ></div>
          <div
            className="circle top-right"
            onClick={() => handleClick("tr")}
            style={getStyles("tr")}
          ></div>
          <div
            className="circle left-center"
            onClick={() => handleClick("lc")}
            style={getStyles("lc")}
          ></div>
          <div
            className="circle mid"
            onClick={() => handleClick("m")}
            style={getStyles("m")}
          ></div>
          <div
            className="circle right-center"
            onClick={() => handleClick("rc")}
            style={getStyles("rc")}
          ></div>
          <div
            className="circle bottom-left"
            onClick={() => handleClick("bl")}
            style={getStyles("bl")}
          ></div>
          <div
            className="circle bottom-center"
            onClick={() => handleClick("bc")}
            style={getStyles("bc")}
          ></div>
          <div
            className="circle bottom-right"
            onClick={() => handleClick("br")}
            style={getStyles("br")}
          ></div>
        </div>
      </div>
    </>
  );
};
export default GameV1Page;

const getNextPlayer = (input: "1" | "2" | ""): "1" | "2" => {
  return input === "1" ? "2" : "1";
};
