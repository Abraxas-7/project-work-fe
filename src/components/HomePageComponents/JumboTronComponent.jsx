import style from "./JumboTronComponent.module.css";

export default function JumboTronComponent() {
  return (
    <div className={`py-3 ${style.jumbotron}`}>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <h1 className="fw-bold text-center text-white py-5 ">BoolBnB</h1>

        <p className="text-white w-75">
          Viaggiare significa scoprire, esplorare e sentirsi a casa ovunque. Con
          BoolBnB puoi trovare soggiorni incredibili in ogni angolo del mondo,
          dalle metropoli vibranti ai rifugi più nascosti. Che tu cerchi
          avventura o relax, siamo qui per rendere il tuo viaggio
          indimenticabile
        </p>
      </div>
    </div>
  );
}
