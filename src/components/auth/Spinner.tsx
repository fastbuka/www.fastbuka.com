const Spinner = () => {
  return (
    <div className="lds-ring w-5 h-5">
      <div className="w-5 h-5 border-4 border-white" />
      <div className="w-5 h-5 border-4 border-white" />
      <div className="w-5 h-5 border-4 border-white" />
      <div className="w-5 h-5 border-4 border-white" />
    </div>
  );
};

export default Spinner;
