import { useState } from "react";
import "./style.css";
import GameV1Page from "./GameGrid";

export default function MainGame() {
  const [settings, setSettings] = useState({
    isGameGridVisible: false,
    playerOne: {
      playerName: "a",
      color: "",
      point: 0,
    },
    playerTwo: {
      playerName: "",
      color: "b",
      point: 0,
    },
  });
  const colors = [
    { name: "Red", value: "red" },
    { name: "Green", value: "green" },
    { name: "Blue", value: "blue" },
    { name: "Yellow", value: "yellow" },
    { name: "Purple", value: "purple" },
    { name: "Orange", value: "orange" },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Access form values using e.target.elements
    const player1Name = e.target.elements.player1Name.value;
    const player2Name = e.target.elements.player2Name.value;
    const player1Color = e.target.elements.player1Color.value;
    const player2Color = e.target.elements.player2Color.value;

    // Check for validation (same names or colors)
    if (player1Name === player2Name || player1Color === player2Color) {
      alert("Player names and colors must be different!");
    } else {
      // Process form submission
      const payload = {
        playerOne: {
          playerName: player1Name,
          color: player1Color,
          point: 0,
        },
        playerTwo: {
          playerName: player2Name,
          color: player2Color,
          point: 0,
        },
      };
      setSettings({ isGameGridVisible: true, ...payload });
      // after this show instructions
    }
  };

  const handleCount = (player: string) => {
    if (player === "1")
      setSettings((prev) => ({
        ...prev,
        playerOne: { ...prev.playerOne, point: prev.playerOne.point + 1 },
      }));
    else
      setSettings((prev) => ({
        ...prev,
        playerTwo: { ...prev.playerTwo, point: prev.playerTwo.point + 1 },
      }));
  };

  return (
    <>
      {!settings.isGameGridVisible ? (
        <div className="info-card">
          <form onSubmit={handleSubmit}>
            <div className="user-form">
              <label>Enter Player 1 Name</label>
              <input type="text" name="player1Name" required />
            </div>
            <div className="user-form">
              <label>Select Color</label>
              <select name="player1Color" required>
                <option value="">Select a color</option>
                {colors.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="user-form">
              <label>Enter Player 2 Name</label>
              <input type="text" name="player2Name" required />
            </div>
            <div className="user-form">
              <label>Select Color</label>
              <select name="player2Color" required>
                <option value="">Select a color</option>
                {colors.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="user-form" type="submit">
              Next
            </button>
          </form>
        </div>
      ) : (
        <>
          <GameV1Page
            playerOne={settings.playerOne}
            playerTwo={settings.playerTwo}
            onPlayerWin={handleCount}
          />
          <br />
          <br />
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="score-board">
              <label style={{ borderBottom: "1px solid" }}>Score Board</label>
              <div>
                <table className="score-table">
                  <thead>
                    <tr className="score-table-tr">
                      <th>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: "20px",
                          }}
                        >
                          {settings.playerOne.playerName}{" "}
                          <div
                            className="score-table-circle"
                            style={{
                              backgroundColor: settings.playerOne.color,
                            }}
                          ></div>
                        </div>
                      </th>
                      <th>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: "20px",
                          }}
                        >
                          {settings.playerTwo.playerName}{" "}
                          <div
                            className="score-table-circle"
                            style={{
                              backgroundColor: settings.playerTwo.color,
                            }}
                          ></div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{settings.playerOne.point}</td>
                      <td>{settings.playerTwo.point}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
