import { forecastType } from "../types";

type Props = {
  forecastData: forecastType;
};

const Forecast = ({ forecastData }: Props) => {
  return (
    <div>
      <p>Forecast</p>
    </div>
  );
};

export default Forecast;
