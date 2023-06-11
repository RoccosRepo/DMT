import "../css/main.css"
import Map from "./Map";

export default function Welcome() {
  return (
    <>
      <div className="articles">
        <h1>Discover MO Trails</h1>
        <div className="articles"><Map /></div>
      </div>
    </>
  );
}
