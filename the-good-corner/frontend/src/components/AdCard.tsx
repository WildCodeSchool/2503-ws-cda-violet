export type AdCardProps = {
  id?: number;
  title: string;
  picture: string;
  price: number;
};

const AdCard = ({ title, picture, price }: AdCardProps) => {
  return (
    <div className="ad-card-container">
      <img className="ad-card-image" src={picture} alt={title} />
      <div className="ad-card-text">
        <div className="ad-card-title">{title}</div>
        <div className="ad-card-price">{price} €</div>
      </div>
    </div>
  );
};
export default AdCard;
