import react from "react";
export default interface ToggleReload {
  toggleReload: boolean;
  setToggleReload: react.Dispatch<react.SetStateAction<boolean>>;
}
