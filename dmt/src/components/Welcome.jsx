import "../css/main.css"
import Map from "./Map";

export default function Welcome() {
  return (
    <>
      <div className="wrapper">
        <h1>Discover MO Trails</h1>
        <div><Map /></div>
      </div>
    </>
  );
}
