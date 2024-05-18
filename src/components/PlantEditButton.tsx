interface PlantEditButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const PlantEditButton: React.FC<PlantEditButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      {children}
    </button>
  );
};

export default PlantEditButton;
