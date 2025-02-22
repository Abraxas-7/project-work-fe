import style from "./JumboTronComponent.module.css";

export default function JumboTronComponent() {
  return (
    <div className={`py-1 ${style.jumbotron}`}>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <h1 className={`text-center py-lg-5 py-sm-3 ${style.jumbotronTitle}`}>BoolBnB</h1>

        <div className={`text-center ${style.jumbotronText}`}>
          Viaggiare significa scoprire, esplorare e sentirsi a casa ovunque. Con
          BoolBnB puoi trovare soggiorni incredibili in ogni angolo del mondo,
          dalle metropoli vibranti ai rifugi più nascosti. Che tu cerchi
          avventura o relax, siamo qui per rendere il tuo viaggio
          indimenticabile.
        </div>
      </div>
    </div>
  );
}
