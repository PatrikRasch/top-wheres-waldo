export interface TimeProp {
  time: number;
  setTime: (time: number) => void;
}

export interface ScoreboardProp {
  scoreboard: {
    id: string;
    name: string;
    time: number;
  }[];
  setScoreboard: React.Dispatch<React.SetStateAction<{ id: string; name: string; time: number }[]>>;
}

export interface ShowScoreboardProp {
  showScoreboard: boolean;
  setShowScoreboard: (value: boolean) => void;
}

export interface ShowGameoverProp {
  showGameover: boolean;
  setShowGameover: (value: boolean) => void;
}

export interface GameStartedProp {
  gameStarted: boolean;
  setGameStarted: (value: boolean) => void;
}

export interface CharacterListProp {
  characterList: { id: string; title: string; found: boolean }[];
  setCharacterList: React.Dispatch<
    React.SetStateAction<{ id: string; title: string; found: boolean }[]>
  >;
}

export interface Target {
  xMax: number;
  xMin: number;
  yMin: number;
  yMax: number;
}

export interface Coordinates {
  xCoordTarget: number;
  yCoordTarget: number;
}

export interface InitialGameStartedProp {
  initialGameStarted: boolean;
  setInitialGameStarted: (value: boolean) => void;
}
