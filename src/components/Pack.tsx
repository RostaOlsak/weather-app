import Pocit from "./Icons/Pocit";
import Wind from "./Icons/Wind";
import Vlhkost from "./Icons/Vlhkost";
import Viditelnost from "./Icons/Viditelnost";
import Tlak from "./Icons/Tlak";
import Pop from "./Icons/Pop";

type Props = {
  icon: "wind" | "pocit" | "vlhkost" | "viditelnost" | "tlak" | "pop";
  title: string;
  info: string | JSX.Element;
  description: string;
};

const icons = {
  wind: Wind,
  pocit: Pocit,
  vlhkost: Vlhkost,
  viditelnost: Viditelnost,
  tlak: Tlak,
  pop: Pop,
};

const Pack = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon];
  return (
    <article className="article-container">
      <div className="article-icon">
        <Icon />
      </div>
      <div className="article-container-text">
        <h4 className="article-title">{title}</h4>
        <h3 className="article-info">{info}</h3>
        <p className="article-description">{description}</p>
      </div>
    </article>
  );
};

export default Pack;
