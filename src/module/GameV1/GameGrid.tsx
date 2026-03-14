import { useEffect, useState } from "react";
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
  playCount: number;
}

type TGameMapSettings = {
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

type TResult = { player: string; status: boolean };

interface IGameV1Page {
  playerOne: TPlayerS;
  playerTwo: TPlayerS;
  onPlayerWin: (data: string) => void;
}

const GameV1Page = ({ playerOne, playerTwo, onPlayerWin }: IGameV1Page) => {
  const [gameConfig, setGameConfig] = useState<IGameConfig>({
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
    playCount: 0,
  });

  const [result, setResult] = useState<TResult>({ player: "", status: false });

  const handleClick = (pos: TButton) => {
    setGameConfig((prev) => {
      const currentPlayer: "1" | "2" | "" = prev.playersTurn;

      const cell = prev.mapSettings[pos];

      if (!checkPlay(currentPlayer)) {
        if (validator(pos) && cell.player === currentPlayer) {
          return {
            ...prev,
            mapSettings: {
              ...prev.mapSettings,
              [pos]: {
                player: "",
                style: "",
                prevPlayer: currentPlayer,
              } as TMapSettings,
            },
          };
        }
        return prev;
      }

      const updatedMap: typeof prev.mapSettings = {
        ...prev.mapSettings,
        [pos]: {
          player: currentPlayer,
          style: "",
          prevPlayer: "" as "" | "1" | "2",
        },
      };

      const newPlayCount = prev.playCount + 1;

      let winner = false;
      if (newPlayCount > 6) {
        winner = setChecker(pos, currentPlayer, updatedMap);
        if (winner) setResult({ player: currentPlayer, status: true });
      }

      return {
        ...prev,
        mapSettings: updatedMap,
        playCount: newPlayCount,
        playersTurn: getNextPlayer(currentPlayer),
      };
    });
  };
  const getStyles = (input: TButton) => {
    const cell = gameConfig.mapSettings[input];

    if (!cell.player) {
      return { backgroundColor: "#d4d4d4" };
    }

    const color = cell.player === "1" ? playerOne.color : playerTwo.color;

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

  const setChecker = (
    input: TButton,
    player: string,
    data: TGameMapSettings,
  ): boolean => {
    const { tl, tc, tr, lc, m, rc, bl, bc, br } = data;
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

  const handleClose = () => {
    setResult({ player: "", status: false });
    setGameConfig({
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
      playCount: 0,
    });
  };

  useEffect(() => {
    if (result.status) onPlayerWin(result.player);
  }, [result.status]);
  return (
    <>
      <div className="player-card">
        <div
  style={{
    width: "100px",  
    height: "50px",  
    border: "1px solid",
    borderColor:
      gameConfig.playersTurn === "1"
        ? playerOne.color
        : playerTwo.color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px"
  }}
>
  {gameConfig.playersTurn === "1"
    ? `${playerOne.playerName}'s turn`
    : `${playerTwo.playerName}'s turn`}
  
</div>
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
      <Modal
        value={result.status}
        onClose={handleClose}
        title={`Player ${
          result.player === "1" ? playerOne.playerName : playerTwo.playerName
        } wins`}
      />
    </>
  );
};
export default GameV1Page;

const getNextPlayer = (input: "1" | "2" | ""): "1" | "2" => {
  return input === "1" ? "2" : "1";
};

interface IModalProps {
  value: boolean;
  onClose: (val: boolean) => void;
  title: string;
}

const Modal = ({ value, onClose, title }: IModalProps) => {
  return (
    <>
      {value && (
        <div className="modal-overlay" onClick={() => onClose(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{title} </h2>
          </div>
        </div>
      )}
    </>
  );
};
